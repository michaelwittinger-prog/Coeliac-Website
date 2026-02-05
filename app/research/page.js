import InOneMinute from '@/components/InOneMinute'
import ExternalResources from '@/components/ExternalResources'
import { FlaskConical, Beaker, Dna, Info } from 'lucide-react'

export const metadata = {
  title: 'Latest Research - Coeliac Information Hub',
  description: 'Stay informed about the latest Coeliac disease research, including new treatments, diagnostic methods, and scientific discoveries.',
}

export default function ResearchPage() {
  const externalLinks = [
    {
      title: 'ISSCD - Research Publications',
      url: 'https://www.isscd-global.org/',
      description: 'International Society for the Study of Celiac Disease research and publications.',
      region: 'International'
    },
    {
      title: 'Beyond Celiac - Research News',
      url: 'https://www.beyondceliac.org/',
      description: 'Latest clinical trials and research developments in celiac disease.',
      region: 'United States'
    },
    {
      title: 'Coeliac UK - Research',
      url: 'https://www.coeliac.org.uk/about-us/our-work/',
      description: 'UK-funded research projects and scientific advances.',
      region: 'United Kingdom'
    },
    {
      title: 'ClinicalTrials.gov - Celiac Disease',
      url: 'https://clinicaltrials.gov/search?cond=Celiac%20Disease',
      description: 'Database of current clinical trials for celiac disease treatments.',
      region: 'International'
    }
  ]

  const treatments = [
    {
      title: 'Enzyme Therapies',
      description: 'Enzymes designed to break down gluten proteins before they trigger an immune response. These may help protect against accidental gluten exposure but are not intended to replace the gluten-free diet.',
      status: 'Phase 2/3 Trials',
      color: 'blue'
    },
    {
      title: 'Immune Modulators',
      description: 'Medications that target specific parts of the immune response to prevent intestinal damage when gluten is consumed. Several approaches are being tested including tight junction regulators.',
      status: 'Clinical Trials',
      color: 'purple'
    },
    {
      title: 'Vaccine Approaches',
      description: 'Vaccines designed to induce tolerance to gluten by retraining the immune system. Early trials show promise but more research is needed.',
      status: 'Early Phase',
      color: 'green'
    }
  ]

  return (
    <div className="bg-slate-50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <FlaskConical className="w-4 h-4" />
              <span>Scientific Advances</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Latest Research
            </h1>
            <p className="text-lg text-slate-600">Exploring emerging treatments and scientific discoveries</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                Coeliac disease research is rapidly advancing. Current areas of investigation include alternative treatments beyond diet (enzyme therapies, vaccines, drugs to restore tolerance), improved diagnostic methods, understanding the role of the microbiome, and identifying environmental triggers. While the gluten-free diet remains the only proven treatment, future therapies may offer additional options for managing celiac disease.
              </p>
            </InOneMinute>
          </div>

          {/* Emerging Treatments */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Beaker className="w-6 h-6 text-cyan-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Emerging Treatments Under Investigation</h2>
            </div>
            <div className="space-y-6">
              {treatments.map((treatment, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-800">{treatment.title}</h3>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      treatment.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      treatment.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {treatment.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">{treatment.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Advances */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Dna className="w-6 h-6 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Advances in Diagnosis</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-800 mb-2">Non-Invasive Testing</h3>
                <p className="text-slate-600 text-sm">
                  Research into blood tests that could diagnose celiac disease without requiring an endoscopy and biopsy. This includes improved antibody tests and genetic markers.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-800 mb-2">Point-of-Care Tests</h3>
                <p className="text-slate-600 text-sm">
                  Development of rapid diagnostic tests that could be performed in a doctor's office, similar to rapid strep tests, making screening more accessible.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-800 mb-2">Imaging Techniques</h3>
                <p className="text-slate-600 text-sm">
                  Advanced imaging methods like confocal laser endomicroscopy that could assess intestinal damage in real-time during endoscopy.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding Disease Mechanisms */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Understanding Disease Mechanisms</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-2">🔬 Microbiome Studies</h3>
                <p className="text-slate-700 text-sm">
                  Research shows that gut bacteria composition differs in people with celiac disease. Studies are exploring whether modifying the microbiome could prevent or treat the condition.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
                <h3 className="font-semibold text-slate-800 mb-2">🧬 Genetic Research</h3>
                <p className="text-slate-700 text-sm">
                  While HLA-DQ2/DQ8 are necessary, they're not sufficient for celiac disease. Researchers are identifying additional genetic factors that influence disease development.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200">
                <h3 className="font-semibold text-slate-800 mb-2">🦠 Environmental Triggers</h3>
                <p className="text-slate-700 text-sm">
                  Studies investigating factors that trigger celiac disease in genetically susceptible people, including viral infections and early childhood feeding patterns.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-200">
                <h3 className="font-semibold text-slate-800 mb-2">🧪 Intestinal Barrier Function</h3>
                <p className="text-slate-700 text-sm">
                  Research on how gluten affects intestinal permeability and whether restoring barrier function could be therapeutic.
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Trials Note */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Clinical Trials</h3>
                <p className="text-slate-700 text-sm mb-2 leading-relaxed">
                  If you're interested in participating in celiac disease research, talk to your healthcare provider or visit ClinicalTrials.gov to find studies recruiting participants. Clinical trials are essential for developing new treatments.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong>Remember:</strong> The gluten-free diet remains the only proven, safe, and effective treatment for celiac disease. Any new therapies will complement, not replace, dietary management.
                </p>
              </div>
            </div>
          </div>

          {/* Related Reading Section */}
          {/* External Resources Section */}
          <ExternalResources links={externalLinks} title="Research & Clinical Resources" />
        </div>
      </div>
    </div>
  )
}