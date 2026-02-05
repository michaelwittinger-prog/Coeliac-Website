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
      {/* Subtle background accent - minimal, clinical */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-bl from-blue-50/40 to-transparent pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-teal-50/80 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-4 border border-teal-100/50">
              <Microscope className="w-4 h-4" />
              <span>Diagnostic Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Diagnosis & Marsh Classification
            </h1>
            <p className="text-lg text-slate-700">Understanding testing and damage classification</p>
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
          <div className="bg-gradient-to-br from-white via-sky-50/20 to-teal-50/30 rounded-xl p-8 shadow-sm border border-teal-100/40 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100/80 to-emerald-100/60 rounded-lg flex items-center justify-center border border-teal-200/30">
                <TestTube className="w-6 h-6 text-teal-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Diagnostic Process</h2>
            </div>
            <div className="space-y-6">
              {diagnosticSteps.map((step) => (
                <div key={step.number} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{step.title}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marsh Classification */}
          <div className="bg-gradient-to-br from-white via-purple-50/20 to-sky-50/30 rounded-xl p-8 shadow-sm border border-purple-100/40 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100/80 to-indigo-100/60 rounded-lg flex items-center justify-center border border-purple-200/30">
                <Dna className="w-6 h-6 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">The Marsh Classification System</h2>
            </div>
            <p className="text-slate-700 mb-6">
              The Marsh classification (modified by Oberhuber) is used to categorize the degree of damage to the small intestine based on biopsy results:
            </p>
            <div className="space-y-4">
              {marshStages.map((stage, index) => (
                <div key={index} className="group hover:bg-white/60 rounded-lg p-4 transition-all border-l-4 border-slate-200/60 hover:border-purple-400">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">
                        {stage.stage} - {stage.label}
                      </h3>
                      <p className="text-slate-700 text-sm">{stage.description}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ml-4 mt-1 ${
                      stage.color === 'green' ? 'bg-emerald-500' :
                      stage.color === 'yellow' ? 'bg-amber-500' :
                      stage.color === 'orange' ? 'bg-orange-500' :
                      stage.color === 'darkred' ? 'bg-rose-700' :
                      'bg-rose-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEW: The Diagnostic Delay Section */}
          <div className="bg-gradient-to-br from-white via-stone-50/40 to-amber-50/20 rounded-xl p-8 shadow-sm border border-stone-200/50 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100/70 to-stone-100/60 rounded-lg flex items-center justify-center border border-amber-200/30">
                <Clock className="w-6 h-6 text-amber-800" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Understanding Diagnostic Delay</h2>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-slate-700 leading-relaxed mb-4">
                Many people with coeliac disease experience symptoms for years before receiving a diagnosis. Research indicates an average diagnostic delay of approximately <strong>13 years</strong> from symptom onset to confirmation. This extended timeframe is not a measure of individual experience, but a reflection of systemic challenges in recognizing a condition that can present in many different ways.
              </p>
            </div>

            {/* Why Delay Occurs */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Why Diagnostic Delay Occurs</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-stone-50/80 to-sand-50/60 rounded-lg p-5 border border-stone-200/40">
                  <h4 className="font-semibold text-slate-800 mb-2">Low Testing Rates</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Despite the availability of reliable screening methods, coeliac disease testing is not routinely performed in many clinical settings unless symptoms are strongly suggestive. This results in missed opportunities for early detection, particularly in populations where the condition is underestimated or misunderstood.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-stone-50/80 to-sand-50/60 rounded-lg p-5 border border-stone-200/40">
                  <h4 className="font-semibold text-slate-800 mb-2">Symptom Overlap with Other Conditions</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Coeliac disease shares symptoms with more than 200 other conditions, including irritable bowel syndrome, chronic fatigue, anemia, and anxiety disorders. This overlap often leads to alternative diagnoses that address symptoms but not the underlying autoimmune process. The conditions diagnosed during this period are frequently consequences or correlations of untreated coeliac disease rather than separate root causes.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-stone-50/80 to-sand-50/60 rounded-lg p-5 border border-stone-200/40">
                  <h4 className="font-semibold text-slate-800 mb-2">Non Classical Presentations</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    While digestive symptoms are commonly associated with coeliac disease, many individuals present with non gastrointestinal manifestations such as skin conditions, neurological symptoms, joint pain, or reproductive issues. These less recognized presentations can lead clinicians to investigate other diagnostic pathways before considering coeliac disease.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-stone-50/80 to-sand-50/60 rounded-lg p-5 border border-stone-200/40">
                  <h4 className="font-semibold text-slate-800 mb-2">Fragmented Healthcare Pathways</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Individuals with diverse symptoms may consult multiple specialists across different medical domains. Without a coordinated approach or a clinical prompt to test for coeliac disease, the condition may remain outside the diagnostic focus even when symptoms persist across consultations.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-stone-50/80 to-sand-50/60 rounded-lg p-5 border border-stone-200/40">
                  <h4 className="font-semibold text-slate-800 mb-2">Underrecognition in Adults</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Coeliac disease is increasingly recognized as a condition that can develop at any age, yet diagnostic awareness remains higher in pediatric settings. Adults presenting with new or worsening symptoms may not be evaluated for coeliac disease as readily, contributing to prolonged delays in this demographic.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact of Delay */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">The Consequences of Prolonged Gluten Exposure</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                During the years before diagnosis, ongoing gluten consumption continues to trigger the autoimmune response, causing sustained intestinal damage and nutrient malabsorption. The effects of this delay extend across physical, psychological, and social dimensions.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-rose-50/80 via-white to-orange-50/60 rounded-lg p-5 border border-rose-200/40">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    <span>Physical Impact</span>
                  </h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-rose-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Persistent intestinal damage and inflammation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-rose-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Nutrient deficiencies affecting bones, nerves, and organs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-rose-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Increased risk of osteoporosis and fractures</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-rose-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Elevated risk of other autoimmune conditions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-sky-50/80 via-white to-teal-50/60 rounded-lg p-5 border border-sky-200/40">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                    <span>Psychological Impact</span>
                  </h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Prolonged uncertainty and health anxiety</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Repeated dismissal of symptoms as psychological</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Frustration from ineffective treatments</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Impact on mental health and quality of life</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/60 rounded-lg p-5 border border-purple-200/40">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Social Impact</span>
                  </h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Disruption to work, education, and daily activities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Strain on personal and family relationships</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Financial burden from repeated medical consultations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Social isolation due to unexplained symptoms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Closing Context */}
            <div className="bg-gradient-to-r from-emerald-50/60 via-white to-teal-50/50 rounded-lg p-6 border border-emerald-200/40">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-teal-700 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">A Systemic Challenge, Not Individual Fault</h4>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    The diagnostic delay in coeliac disease reflects a gap between symptom recognition and clinical testing, not a failure on the part of patients or individual clinicians. Coeliac disease is common, affecting approximately 1% of the population. It is serious when untreated, but highly manageable with early and accurate diagnosis.
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Improving awareness across healthcare systems, increasing routine testing in at risk populations, and recognizing the full spectrum of coeliac disease presentations are essential steps toward reducing this delay and improving outcomes for those affected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-yellow-50/40 border border-amber-200/50 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-100/80 to-yellow-100/60 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-200/40">
                <AlertTriangle className="w-5 h-5 text-amber-800" />
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