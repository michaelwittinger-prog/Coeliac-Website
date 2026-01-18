export default function InOneMinute({ children }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-white">In One Minute</h2>
      </div>
      <div className="text-white text-lg leading-relaxed">
        {children}
      </div>
    </div>
  )
}