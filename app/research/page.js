import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'

export const metadata = {
  title: 'Latest Research - Celiac Information Hub',
  description: 'Stay informed about the latest Celiac disease research, including new treatments, diagnostic methods, and scientific discoveries.',
}

export default function ResearchPage() {
  const relatedLinks = [
    { href: '/diagnosis-marsh', title: 'Diagnosis & Marsh Classification' },
    { href: '/healing', title: 'Healing Process' },
    { href: '/understanding', title: 'Understanding Celiac Disease' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-purple-900 mb-6">
          Latest Research
        </h1>

        {/* In One Minute Section */}
        <div className="mb-12">
          <InOneMinute>
            <p>
              Celiac disease research is rapidly advancing. Current areas of investigation include alternative treatments beyond diet (enzyme therapies, vaccines, drugs to restore tolerance), improved diagnostic methods, understanding the role of the microbiome, and identifying environmental triggers. While the gluten-free diet remains the only proven treatment, future therapies may offer additional options for managing celiac disease.
            </p>
          </InOneMinute>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Emerging Treatments Under Investigation</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Enzyme Therapies</h3>
                <p className="text-purple-700 mb-2">
                  Enzymes designed to break down gluten proteins before they trigger an immune response. These may help protect against accidental gluten exposure but are not intended to replace the gluten-free diet.
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Phase 2/3 Trials</span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Immune Modulators</h3>
                <p className="text-purple-700 mb-2">
                  Medications that target specific parts of the immune response to prevent intestinal damage when gluten is consumed. Several approaches are being tested including tight junction regulators and cytokine blockers.
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Clinical Trials</span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Vaccine Approaches</h3>
                <p className="text-purple-700 mb-2">
                  Vaccines designed to induce tolerance to gluten by retraining the immune system. Early trials show promise but more research is needed.
                </p>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Early Phase</span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Hookworm Therapy</h3>
                <p className="text-purple-700 mb-2">
                  Controlled infection with hookworms to modulate immune response. While intriguing, this experimental approach requires much more study before any clinical application.
                </p>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Experimental</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Advances in Diagnosis</h2>
            <div className="space-y-4 text-purple-700">
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Non-Invasive Testing</h3>
                <p>
                  Research into blood tests that could diagnose celiac disease without requiring an endoscopy and biopsy. This includes improved antibody tests and genetic markers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Point-of-Care Tests</h3>
                <p>
                  Development of rapid diagnostic tests that could be performed in a doctor's office, similar to rapid strep tests, making screening more accessible.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Imaging Techniques</h3>
                <p>
                  Advanced imaging methods like confocal laser endomicroscopy that could assess intestinal damage in real-time during endoscopy.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Understanding Disease Mechanisms</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🔬 Microbiome Studies</h3>
                <p className="text-purple-700 text-sm">
                  Research shows that gut bacteria composition differs in people with celiac disease. Studies are exploring whether modifying the microbiome could prevent or treat the condition.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🧬 Genetic Research</h3>
                <p className="text-purple-700 text-sm">
                  While HLA-DQ2/DQ8 are necessary, they're not sufficient for celiac disease. Researchers are identifying additional genetic factors that influence disease development.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🦠 Environmental Triggers</h3>
                <p className="text-purple-700 text-sm">
                  Studies investigating factors that trigger celiac disease in genetically susceptible people, including viral infections, early childhood feeding patterns, and antibiotic use.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🧪 Intestinal Barrier Function</h3>
                <p className="text-purple-700 text-sm">
                  Research on how gluten affects intestinal permeability ("leaky gut") and whether restoring barrier function could be therapeutic.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Grain Development</h2>
            <p className="text-purple-700 mb-4">
              Agricultural scientists are working on several approaches to create safer grain options:
            </p>
            <ul className="space-y-2 text-purple-700 ml-4">
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Gluten-degraded wheat:</strong> Wheat varieties with modified or reduced gluten content</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Ancient grains:</strong> Study of whether some ancestral wheat varieties are less immunogenic</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Sourdough fermentation:</strong> Research on whether specific fermentation processes can reduce gluten immunogenicity</span>
              </li>
            </ul>
            <p className="text-purple-700 mt-4 text-sm italic">
              Note: Until proven safe through rigorous clinical trials, people with celiac disease should continue avoiding all gluten-containing grains.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Quality of Life Research</h2>
            <p className="text-purple-700 mb-4">
              Important studies are examining the psychological and social impacts of celiac disease:
            </p>
            <ul className="space-y-2 text-purple-700 ml-4">
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Mental health challenges associated with chronic dietary restriction</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Social and economic impacts of following a gluten-free diet</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Best practices for supporting children and adolescents with celiac disease</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Interventions to improve dietary adherence and reduce anxiety about food</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Clinical Trials</span>
            </h3>
            <p className="text-blue-800 text-sm mb-2">
              If you're interested in participating in celiac disease research, talk to your healthcare provider or visit ClinicalTrials.gov to find studies recruiting participants. Clinical trials are essential for developing new treatments.
            </p>
            <p className="text-blue-800 text-sm">
              Remember: The gluten-free diet remains the only proven, safe, and effective treatment for celiac disease. Any new therapies will complement, not replace, dietary management.
            </p>
          </div>
        </div>

        {/* Related Reading Section */}
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}