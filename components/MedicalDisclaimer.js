import { AlertCircle } from 'lucide-react'

export default function MedicalDisclaimer() {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-purple-50 border border-slate-200 rounded-xl p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-purple-700" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Medical Disclaimer</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            The information provided on this website is for educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
          </p>
        </div>
      </div>
    </div>
  )
}