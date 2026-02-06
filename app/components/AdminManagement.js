'use client'

import { useState, useEffect } from 'react'
import { UserPlus, Trash2, Shield, ShieldCheck, AlertCircle, CheckCircle, Server, Database, X } from 'lucide-react'

export default function AdminManagement() {
  const [dbAdmins, setDbAdmins] = useState([])
  const [envAdmins, setEnvAdmins] = useState([])
  const [currentUserEmail, setCurrentUserEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState('')
  const [adding, setAdding] = useState(false)
  const [removing, setRemoving] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Failed to fetch admins')
        return
      }
      
      setDbAdmins(data.dbAdmins || [])
      setEnvAdmins(data.envAdmins || [])
      setCurrentUserEmail(data.currentUserEmail || '')
    } catch (err) {
      console.error('Error fetching admins:', err)
      setError('Failed to load admin users')
    } finally {
      setLoading(false)
    }
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!newEmail.trim()) {
      setError('Please enter an email address')
      return
    }
    
    setAdding(true)
    
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail.trim() })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Failed to add admin')
        return
      }
      
      setSuccess(data.message)
      setNewEmail('')
      await fetchAdmins()
    } catch (err) {
      console.error('Error adding admin:', err)
      setError('Failed to add admin')
    } finally {
      setAdding(false)
    }
  }

  const handleRemoveAdmin = async (email) => {
    setError('')
    setSuccess('')
    setRemoving(email)
    
    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Failed to remove admin')
        return
      }
      
      setSuccess(data.message)
      await fetchAdmins()
    } catch (err) {
      console.error('Error removing admin:', err)
      setError('Failed to remove admin')
    } finally {
      setRemoving(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add Admin Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}>
            <UserPlus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Add New Admin</h3>
            <p className="text-sm text-slate-500">Grant admin access to another user by email</p>
          </div>
        </div>
        
        <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 placeholder-slate-400"
            disabled={adding}
          />
          <button
            type="submit"
            disabled={adding || !newEmail.trim()}
            className="px-6 py-3 text-white font-medium rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}
          >
            {adding ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Add Admin
              </>
            )}
          </button>
        </form>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm flex-1">{error}</p>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-green-700 text-sm flex-1">{success}</p>
          <button onClick={() => setSuccess('')} className="text-green-400 hover:text-green-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Admin Lists */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Environment Admins */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-900">Environment Admins</h3>
              <span className="ml-auto px-2 py-0.5 bg-slate-200 text-slate-600 text-xs font-medium rounded-full">
                {envAdmins.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Configured via ADMIN_EMAILS environment variable</p>
          </div>
          
          <div className="divide-y divide-slate-100">
            {envAdmins.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                No environment admins configured
              </div>
            ) : (
              envAdmins.map((email) => (
                <div key={email} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {email}
                      {email === currentUserEmail?.toLowerCase() && (
                        <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">You</span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">Environment config</p>
                  </div>
                  <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                    Protected
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Database Admins */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-slate-900">Database Admins</h3>
              <span className="ml-auto px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                {dbAdmins.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Added via admin panel (can be removed)</p>
          </div>
          
          <div className="divide-y divide-slate-100">
            {dbAdmins.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                No database admins added yet
              </div>
            ) : (
              dbAdmins.map((admin) => (
                <div key={admin.id} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {admin.email}
                      {admin.email === currentUserEmail?.toLowerCase() && (
                        <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">You</span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">
                      Added {formatDate(admin.created_at)}
                      {admin.added_by && ` by ${admin.added_by}`}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveAdmin(admin.email)}
                    disabled={removing === admin.email || admin.email === currentUserEmail?.toLowerCase()}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title={admin.email === currentUserEmail?.toLowerCase() ? "Cannot remove yourself" : "Remove admin"}
                  >
                    {removing === admin.email ? (
                      <div className="w-5 h-5 border-2 border-slate-300 border-t-red-500 rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">How Admin Access Works</p>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• <strong>Environment Admins:</strong> Set via ADMIN_EMAILS in Vercel settings. Cannot be removed from this panel.</li>
              <li>• <strong>Database Admins:</strong> Added here. Can be removed at any time by other admins.</li>
              <li>• Users with either type of admin access can manage submissions and add other admins.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
