'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  ArrowLeft, Shield, BarChart3, Users, Eye, FileText, 
  TrendingUp, Clock, Search, ChevronDown, ChevronLeft, 
  ChevronRight, CheckCircle, XCircle, Mail, Calendar,
  Activity, MapPin, RefreshCw
} from 'lucide-react'

// Simple line chart component
function SimpleLineChart({ data, height = 200 }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400">
        No data available
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.views), 1)
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * 100
    const y = 100 - (d.views / maxValue) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="relative" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {/* Grid lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="#e2e8f0" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#e2e8f0" strokeWidth="0.5" />
        
        {/* Area fill */}
        <polygon 
          points={`0,100 ${points} 100,100`} 
          fill="url(#gradient)" 
          opacity="0.3"
        />
        
        {/* Line */}
        <polyline 
          points={points} 
          fill="none" 
          stroke="#854F9B" 
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#854F9B" />
            <stop offset="100%" stopColor="#854F9B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-slate-500">
        <span>{data[0]?.date}</span>
        <span>{data[Math.floor(data.length / 2)]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  )
}

// KPI Card component
function KPICard({ title, value, subtitle, icon: Icon, color = 'purple', loading }) {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-orange-500',
    teal: 'from-teal-500 to-teal-600'
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{title}</p>
          {loading ? (
            <div className="h-8 w-20 bg-slate-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-2xl font-bold text-slate-800">{value}</p>
          )}
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}

// Skeleton loader
function Skeleton({ className }) {
  return <div className={`bg-slate-200 animate-pulse rounded ${className}`}></div>
}

export default function AdminAnalyticsPage() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Overview data
  const [overview, setOverview] = useState(null)
  const [overviewLoading, setOverviewLoading] = useState(true)
  
  // Traffic data
  const [traffic, setTraffic] = useState(null)
  const [trafficLoading, setTrafficLoading] = useState(true)
  const [trafficDays, setTrafficDays] = useState(30)
  
  // Users data
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [usersPagination, setUsersPagination] = useState({ page: 1, totalPages: 1, totalUsers: 0 })
  const [usersSearch, setUsersSearch] = useState('')
  const [usersSortBy, setUsersSortBy] = useState('newest')
  const [usersEmailFilter, setUsersEmailFilter] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/login')
          return
        }
        
        setUser(session.user)
        
        const res = await fetch('/api/admin/check')
        const data = await res.json()
        
        if (!data.isAdmin) {
          router.push('/account')
          return
        }
        
        setIsAdmin(true)
        fetchOverview()
        fetchTraffic()
        fetchUsers()
      } catch (error) {
        console.error('Error checking access:', error)
        router.push('/account')
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [router, supabase.auth])

  const fetchOverview = async () => {
    setOverviewLoading(true)
    try {
      const res = await fetch('/api/admin/analytics/overview')
      const data = await res.json()
      if (res.ok) {
        setOverview(data)
      }
    } catch (err) {
      console.error('Error fetching overview:', err)
    } finally {
      setOverviewLoading(false)
    }
  }

  const fetchTraffic = async (days = trafficDays) => {
    setTrafficLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics/traffic?days=${days}`)
      const data = await res.json()
      if (res.ok) {
        setTraffic(data)
      }
    } catch (err) {
      console.error('Error fetching traffic:', err)
    } finally {
      setTrafficLoading(false)
    }
  }

  const fetchUsers = async (page = 1) => {
    setUsersLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        perPage: '15',
        sortBy: usersSortBy,
        ...(usersSearch && { search: usersSearch }),
        ...(usersEmailFilter && { emailConfirmed: usersEmailFilter })
      })
      
      const res = await fetch(`/api/admin/users/list?${params}`)
      const data = await res.json()
      if (res.ok) {
        setUsers(data.users)
        setUsersPagination(data.pagination)
      }
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setUsersLoading(false)
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetchUsers(1)
    }
  }, [usersSortBy, usersEmailFilter, isAdmin])

  const handleUsersSearch = (e) => {
    e.preventDefault()
    fetchUsers(1)
  }

  const handleTrafficDaysChange = (days) => {
    setTrafficDays(days)
    fetchTraffic(days)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatShortDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Checking access...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Account</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
            <BarChart3 className="w-4 h-4" />
            <span>Admin Analytics</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Monitor website usage and manage users
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'traffic', label: 'Website Analytics', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
              style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KPICard 
                title="Page Views (7d)" 
                value={overview?.pageViews?.last7Days?.toLocaleString() || '0'}
                subtitle={`${overview?.pageViews?.last30Days?.toLocaleString() || '0'} last 30 days`}
                icon={Eye}
                color="purple"
                loading={overviewLoading}
              />
              <KPICard 
                title="Total Users" 
                value={overview?.users?.total?.toLocaleString() || '0'}
                subtitle={`+${overview?.users?.newLast7Days || 0} this week`}
                icon={Users}
                color="blue"
                loading={overviewLoading}
              />
              <KPICard 
                title="Pending Submissions" 
                value={overview?.submissions?.pending?.toLocaleString() || '0'}
                subtitle={`${overview?.submissions?.total || 0} total`}
                icon={FileText}
                color="amber"
                loading={overviewLoading}
              />
              <KPICard 
                title="Active Listings" 
                value={overview?.listings?.total?.toLocaleString() || '0'}
                subtitle="Local support entries"
                icon={MapPin}
                color="teal"
                loading={overviewLoading}
              />
            </div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/admin/submissions"
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">Review Submissions</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {overview?.submissions?.pending || 0} pending review
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
              
              <button
                onClick={() => {
                  fetchOverview()
                  fetchTraffic()
                  fetchUsers()
                }}
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">Refresh Data</h3>
                    <p className="text-sm text-slate-500 mt-1">Update all dashboard metrics</p>
                  </div>
                  <RefreshCw className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:rotate-180 transition-all duration-500" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Traffic Tab */}
        {activeTab === 'traffic' && (
          <div className="space-y-6">
            {/* Time Range Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Time range:</span>
              {[7, 14, 30].map(days => (
                <button
                  key={days}
                  onClick={() => handleTrafficDaysChange(days)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    trafficDays === days
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>

            {/* Traffic Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-slate-800">Page Views Over Time</h3>
                  <p className="text-sm text-slate-500">Daily visits for the last {trafficDays} days</p>
                </div>
                {!trafficLoading && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-800">{traffic?.totalViews?.toLocaleString() || 0}</p>
                    <p className="text-xs text-slate-500">total views</p>
                  </div>
                )}
              </div>
              
              {trafficLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <SimpleLineChart data={traffic?.chartData || []} height={200} />
              )}
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4">Top Pages</h3>
              
              {trafficLoading ? (
                <div className="space-y-3">
                  {[1,2,3,4,5].map(i => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : traffic?.topPages?.length > 0 ? (
                <div className="space-y-2">
                  {traffic.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-medium flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm text-slate-700 font-medium truncate max-w-md">
                          {page.path}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500">{page.count} views</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">No page view data available yet</p>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <form onSubmit={handleUsersSearch} className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by email..."
                      value={usersSearch}
                      onChange={(e) => setUsersSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-sm"
                    />
                  </div>
                </form>
                
                {/* Sort */}
                <select
                  value={usersSortBy}
                  onChange={(e) => setUsersSortBy(e.target.value)}
                  className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-sm bg-white"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="lastSignIn">Last sign in</option>
                </select>
                
                {/* Email confirmed filter */}
                <select
                  value={usersEmailFilter}
                  onChange={(e) => setUsersEmailFilter(e.target.value)}
                  className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-sm bg-white"
                >
                  <option value="">All users</option>
                  <option value="true">Email confirmed</option>
                  <option value="false">Email not confirmed</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Registered</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Sign In</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Provider</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usersLoading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-4 py-3"><Skeleton className="h-5 w-48" /></td>
                          <td className="px-4 py-3"><Skeleton className="h-5 w-24" /></td>
                          <td className="px-4 py-3"><Skeleton className="h-5 w-24" /></td>
                          <td className="px-4 py-3"><Skeleton className="h-5 w-20" /></td>
                          <td className="px-4 py-3"><Skeleton className="h-5 w-16" /></td>
                        </tr>
                      ))
                    ) : users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <Mail className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="text-sm font-medium text-slate-800">{user.email}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatShortDate(user.createdAt)}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                              <Clock className="w-3.5 h-3.5" />
                              {formatShortDate(user.lastSignInAt)}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {user.emailConfirmed ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                <CheckCircle className="w-3 h-3" />
                                Confirmed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                <XCircle className="w-3 h-3" />
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-500 capitalize">{user.provider}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {!usersLoading && usersPagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
                  <p className="text-sm text-slate-600">
                    Showing {((usersPagination.page - 1) * 15) + 1} - {Math.min(usersPagination.page * 15, usersPagination.totalUsers)} of {usersPagination.totalUsers} users
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fetchUsers(usersPagination.page - 1)}
                      disabled={usersPagination.page === 1}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-slate-600">
                      Page {usersPagination.page} of {usersPagination.totalPages}
                    </span>
                    <button
                      onClick={() => fetchUsers(usersPagination.page + 1)}
                      disabled={usersPagination.page === usersPagination.totalPages}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
