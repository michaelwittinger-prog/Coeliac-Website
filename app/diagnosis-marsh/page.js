import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import { Microscope, TestTube, Dna, AlertTriangle, Clock, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Diagnosis & Marsh Classification - Celiac Information Hub',
  description: 'Understand how Celiac disease is diagnosed through blood tests, endoscopy, and the Marsh classification system for intestinal damage.',
}

export default function DiagnosisMarchPage() {
  const relatedLinks = [
    { href: '/understanding', title: 'Understanding Celiac Disease' },
    { href: '/healing', title: 'Healing Process and Timeline' },
    { href: '/research', title: 'Latest Research' },
  ]

  const diagnosticSteps = [
    {
      number: 1,
      title: 'Blood Tests',
      description: 'Screening for specific antibodies including tTG-IgA, EMA, and total serum IgA. These tests must be done while on a gluten-containing diet.'
    },
    {
      number: 2,
      title: 'Endoscopy & Biopsy',
      description: 'If blood tests are positive, an upper endoscopy with small intestinal biopsy is performed to confirm diagnosis and assess damage.'
    },
    {
      number: 3,
      title: 'Genetic Testing',
      description: 'HLA-DQ2 and HLA-DQ8 genetic testing can help rule out celiac disease but cannot confirm it on its own.'
    }
  ]

  const marshStages = [
    { stage: 'Marsh 0', label: 'Normal', description: 'Normal intestinal architecture with no significant changes.', color: 'green' },
    { stage: 'Marsh 1', label: 'Infiltrative', description: 'Increased intraepithelial lymphocytes (IELs) with normal villi and crypts.', color: 'yellow' },
    { stage: 'Marsh 2', label: 'Hyperplastic', description: 'Increased IELs with crypt hyperplasia, but villi still present.', color: 'orange' },
    { stage: 'Marsh 3', label: 'Destructive', description: 'Villous atrophy ranging from partial (3a) to subtotal (3b) to total (3c), along with crypt hyperplasia.', color: 'red' },
    { stage: 'Marsh 4', label: 'Hypoplastic', description: 'Total villous atrophy with crypt hypoplasia, representing severe and prolonged damage.', color: 'darkred' }
  ]

  return (
    <div className="bg-slate-50">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Microscope className="w-4 h-4" />
              <span>Diagnostic Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Diagnosis & Marsh Classification
            </h1>
            <p className="text-lg text-slate-600">Understanding testing and damage classification</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                Celiac disease diagnosis involves blood tests for specific antibodies, followed by an endoscopic biopsy of the small intestine. The Marsh classification system (Modified Marsh stages 0-3) categorizes the degree of intestinal damage, from normal villi to complete villous atrophy. Accurate diagnosis requires consuming gluten before testing—never start a gluten-free diet before being tested.
              </p>
            </InOneMinute>
          </div>

          {/* Diagnostic Process */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TestTube className="w-6 h-6 text-blue-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Diagnostic Process</h2>
            </div>
            <div className="space-y-6">
              {diagnosticSteps.map((step) => (
                <div key={step.number} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marsh Classification */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Dna className="w-6 h-6 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">The Marsh Classification System</h2>
            </div>
            <p className="text-slate-600 mb-6">
              The Marsh classification (modified by Oberhuber) is used to categorize the degree of damage to the small intestine based on biopsy results:
            </p>
            <div className="space-y-4">
              {marshStages.map((stage, index) => (
                <div key={index} className="group hover:bg-slate-50 rounded-lg p-4 transition-all border-l-4 border-slate-200 hover:border-purple-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">
                        {stage.stage} - {stage.label}
                      </h3>
                      <p className="text-slate-600 text-sm">{stage.description}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ml-4 mt-1 ${
                      stage.color === 'green' ? 'bg-green-500' :
                      stage.color === 'yellow' ? 'bg-yellow-500' :
                      stage.color === 'orange' ? 'bg-orange-500' :
                      stage.color === 'darkred' ? 'bg-red-700' :
                      'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Important Note</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  You must continue eating gluten-containing foods before testing. Starting a gluten-free diet before diagnosis can lead to false-negative results and delay proper treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Related Reading Section */}
          <RelatedReading links={relatedLinks} />
        </div>
      </div>
    </div>
  )
}