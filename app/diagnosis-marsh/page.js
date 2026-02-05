import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import ExternalResources from '@/components/ExternalResources'
import { Microscope, TestTube, Dna, AlertTriangle, Clock, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Diagnosis & Marsh Classification - Coeliac Disease Information Hub',
  description: 'Understand how Coeliac disease (Celiac disease) is diagnosed through blood tests, endoscopy, and the Marsh classification system for intestinal damage.',
  keywords: 'coeliac disease, celiac disease, diagnosis, marsh classification, gluten intolerance, biopsy, blood test',
}

export default function DiagnosisMarchPage() {
  const relatedLinks = [
    { href: '/understanding', title: 'Understanding Coeliac Disease' },
    { href: '/healing', title: 'Healing Process and Timeline' },
    { href: '/research', title: 'Latest Research' },
  ]

  const externalLinks = [
    {
      title: 'International Society for the Study of Celiac Disease (ISSCD)',
      url: 'https://www.coeliacsociety.org.uk/',
      description: 'Professional medical guidelines and diagnostic standards for coeliac disease from international experts.',
      region: 'International'
    },
    {
      title: 'Association of European Coeliac Societies (AOECS)',
      url: 'https://www.aoecs.org/',
      description: 'European diagnostic protocols and clinical practice guidelines for coeliac disease testing.',
      region: 'Europe'
    },
    {
      title: 'Coeliac UK - Getting Diagnosed',
      url: 'https://www.coeliac.org.uk/information-and-support/getting-diagnosed/',
      description: 'Comprehensive UK guidance on coeliac disease testing procedures and what to expect during diagnosis.',
      region: 'United Kingdom'
    },
    {
      title: 'Beyond Celiac - Diagnosis',
      url: 'https://www.beyondceliac.org/celiac-disease/get-tested/',
      description: 'Evidence-based information on celiac disease testing and diagnosis from leading US research organisation.',
      region: 'United States'
    }
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
      description: 'HLA-DQ2 and HLA-DQ8 genetic testing can help rule out coeliac disease but cannot confirm it on its own.'
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
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-bl from-blue-50/40 to-transparent pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium mb-4 border border-blue-100">
              <Microscope className="w-4 h-4" />
              <span>Diagnostic Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Diagnosis & Marsh Classification
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">Understanding testing and damage classification</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                Coeliac disease diagnosis involves blood tests for specific antibodies, followed by an endoscopic biopsy of the small intestine. The Marsh classification system (Modified Marsh stages 0-4) categorizes the degree of intestinal damage, from normal villi to complete villous atrophy. Accurate diagnosis requires consuming gluten before testing—never start a gluten-free diet before being tested.
              </p>
            </InOneMinute>
          </div>

          {/* Diagnostic Process */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <TestTube className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Diagnostic Process</h2>
            </div>
            <div className="space-y-6">
              {diagnosticSteps.map((step) => (
                <div key={step.number} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">{step.number}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-slate-900 mb-1.5">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marsh Classification */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <Dna className="w-6 h-6 text-slate-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">The Marsh Classification System</h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              The Marsh classification (modified by Oberhuber) is used to categorize the degree of damage to the small intestine based on biopsy results:
            </p>
            <div className="space-y-3">
              {marshStages.map((stage, index) => (
                <div key={index} className="group hover:bg-slate-50 rounded-lg p-4 transition-colors border border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1.5">
                        {stage.stage} - {stage.label}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{stage.description}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ml-4 mt-1.5 flex-shrink-0 ${
                      stage.color === 'green' ? 'bg-emerald-500' :
                      stage.color === 'yellow' ? 'bg-amber-500' :
                      stage.color === 'orange' ? 'bg-orange-500' :
                      stage.color === 'darkred' ? 'bg-red-600' :
                      'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEW: The Diagnostic Delay Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Understanding Diagnostic Delay</h2>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-slate-600 leading-relaxed mb-4">
                Many people with coeliac disease experience symptoms for years before receiving a diagnosis. Research indicates an average diagnostic delay of approximately <strong className="text-slate-900">13 years</strong> from symptom onset to confirmation. This extended timeframe is not a measure of individual experience, but a reflection of systemic challenges in recognizing a condition that can present in many different ways.
              </p>
            </div>

            {/* Why Delay Occurs */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Diagnostic Delay Occurs</h3>
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Low Testing Rates</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Despite the availability of reliable screening methods, coeliac disease testing is not routinely performed in many clinical settings unless symptoms are strongly suggestive. This results in missed opportunities for early detection, particularly in populations where the condition is underestimated or misunderstood.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Symptom Overlap with Other Conditions</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Coeliac disease shares symptoms with more than 200 other conditions, including irritable bowel syndrome, chronic fatigue, anaemia, and anxiety disorders. This overlap often leads to alternative diagnoses that address symptoms but not the underlying autoimmune process. The conditions diagnosed during this period are frequently consequences or correlations of untreated coeliac disease rather than separate root causes.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Non Classical Presentations</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    While digestive symptoms are commonly associated with coeliac disease, many individuals present with non gastrointestinal manifestations such as skin conditions, neurological symptoms, joint pain, or reproductive issues. These less recognised presentations can lead clinicians to investigate other diagnostic pathways before considering coeliac disease.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Fragmented Healthcare Pathways</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Individuals with diverse symptoms may consult multiple specialists across different medical domains. Without a coordinated approach or a clinical prompt to test for coeliac disease, the condition may remain outside the diagnostic focus even when symptoms persist across consultations.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Underrecognition in Adults</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Coeliac disease is increasingly recognised as a condition that can develop at any age, yet diagnostic awareness remains higher in paediatric settings. Adults presenting with new or worsening symptoms may not be evaluated for coeliac disease as readily, contributing to prolonged delays in this demographic.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact of Delay */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">The Consequences of Prolonged Gluten Exposure</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                During the years before diagnosis, ongoing gluten consumption continues to trigger the autoimmune response, causing sustained intestinal damage and nutrient malabsorption. The effects of this delay extend across physical, psychological, and social dimensions.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-5 border border-red-200">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Physical Impact</span>
                  </h4>
                  <ul className="space-y-2.5 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Persistent intestinal damage and inflammation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Nutrient deficiencies affecting bones, nerves, and organs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Increased risk of osteoporosis and fractures</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Elevated risk of other autoimmune conditions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Psychological Impact</span>
                  </h4>
                  <ul className="space-y-2.5 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Prolonged uncertainty and health anxiety</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Repeated dismissal of symptoms as psychological</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Frustration from ineffective treatments</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Impact on mental health and quality of life</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                    <span>Social Impact</span>
                  </h4>
                  <ul className="space-y-2.5 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-slate-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Disruption to work, education, and daily activities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-slate-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Strain on personal and family relationships</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-slate-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Financial burden from repeated medical consultations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-slate-600 mt-0.5 flex-shrink-0">•</span>
                      <span>Social isolation due to unexplained symptoms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Closing Context */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">A Systemic Challenge, Not Individual Fault</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    The diagnostic delay in coeliac disease reflects a gap between symptom recognition and clinical testing, not a failure on the part of patients or individual clinicians. Coeliac disease is common, affecting approximately 1% of the population. It is serious when untreated, but highly manageable with early and accurate diagnosis.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Improving awareness across healthcare systems, increasing routine testing in at risk populations, and recognising the full spectrum of coeliac disease presentations are essential steps toward reducing this delay and improving outcomes for those affected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Important Note</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  You must continue eating gluten-containing foods before testing. Starting a gluten-free diet before diagnosis can lead to false-negative results and delay proper treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Related Reading Section */}
          <RelatedReading links={relatedLinks} />

          {/* External Resources Section */}
          <div className="mt-8">
            <ExternalResources links={externalLinks} title="Clinical & Diagnostic Resources" />
          </div>
        </div>
      </div>
    </div>
  )
}
