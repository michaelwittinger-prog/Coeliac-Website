export default function MedicalDisclaimer() {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Medical Disclaimer</h3>
          <p className="text-sm text-purple-700 leading-relaxed">
            The information provided on this website is for educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
          </p>
        </div>
      </div>
    </div>
  )
}