import { Clock } from 'lucide-react'

export default function InOneMinute({ children }) {
  return (
    <div className="relative">
      {/* Geometric decoration */}
      <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full opacity-20 blur-xl" style={{backgroundColor: '#854F9B'}}></div>
      <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-20 blur-xl" style={{backgroundColor: '#854F9B'}}></div>
      
      <div className="relative rounded-xl p-8 shadow-lg" style={{background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)'}}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">In One Minute</h2>
        </div>
        <div className="text-white/95 text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}