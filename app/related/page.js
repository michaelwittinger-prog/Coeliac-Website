import InOneMinute from '@/components/InOneMinute'
import ExternalResources from '@/components/ExternalResources'
import { Link2, Activity, Dna, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Related Conditions - Coeliac Information Hub',
  description: 'Learn about conditions associated with Coeliac disease including Type 1 diabetes, thyroid disorders, and other autoimmune conditions.',
}

export default function RelatedPage() {
  const externalLinks = [
    {
      title: 'Coeliac UK - Associated Conditions',
      url: 'https://www.coeliac.org.uk/information-and-support/coeliac-disease/conditions-linked-to-coeliac-disease/',
      description: 'Information on conditions commonly associated with coeliac disease.',
      region: 'United Kingdom'
    },
    {
      title: 'Beyond Celiac - Related Conditions',
      url: 'https://www.beyondceliac.org/',
      description: 'Research and resources on autoimmune conditions linked to celiac disease.',
      region: 'United States'
    },
    {
      title: 'ISSCD - Scientific Research',
      url: 'https://isscd.org/',
      description: 'International scientific society research on coeliac disease comorbidities.',
      region: 'International'
    }
  ]

  const conditions = [
    {
      title: 'Type 1 Diabetes',
      description: '5-10% of people with Type 1 diabetes also have celiac disease. Regular screening is recommended for diabetic patients.',
      screening: 'At diagnosis and periodically thereafter'
    },
    {
      title: 'Autoimmune Thyroid Disease',
      description: 'Hashimoto\'s thyroiditis and Graves\' disease occur more frequently in people with celiac disease.',
      screening: 'If symptoms of thyroid dysfunction develop'
    },
    {
      title: 'Dermatitis Herpetiformis',
      description: 'A skin manifestation of celiac disease characterized by intensely itchy, blistering rash. Responds to a gluten-free diet.',
      screening: 'Skin biopsy for diagnosis'
    },
    {
      title: 'Autoimmune Liver Disease',
      description: 'Includes autoimmune hepatitis and primary biliary cholangitis. Elevated liver enzymes may be the only sign.',
      screening: 'Regular liver function tests'
    }
  ]

  return (
    <div className="bg-slate-50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Link2 className="w-4 h-4" />
              <span>Associated Conditions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Related Conditions
            </h1>
            <p className="text-lg text-slate-600">Understanding associated autoimmune disorders</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                Coeliac disease is often associated with other autoimmune conditions. People with celiac disease have a higher risk of developing Type 1 diabetes, autoimmune thyroid disease, autoimmune liver disease, and other conditions. First-degree relatives of people with celiac disease should be screened. If you have celiac disease and experience new symptoms, discuss screening for related conditions with your healthcare provider.
              </p>
            </InOneMinute>
          </div>

          {/* Common Associated Conditions */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-teal-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Common Associated Conditions</h2>
            </div>
            <div className="space-y-4">
              {conditions.map((condition, index) => (
                <div key={index} className="group hover:bg-slate-50 rounded-lg p-5 transition-all border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>{condition.title}</span>
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">{condition.description}</p>
                  <p className="text-xs text-purple-700 font-medium bg-purple-50 inline-block px-3 py-1 rounded-full">
                    Screening: {condition.screening}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chromosomal Conditions */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Dna className="w-6 h-6 text-blue-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Chromosomal Conditions</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Certain genetic conditions are associated with higher rates of celiac disease:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-2">Down Syndrome</h3>
                <p className="text-slate-700 text-sm">12-16% of individuals with Down syndrome have celiac disease. Regular screening is recommended.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <h3 className="font-semibold text-slate-800 mb-2">Turner Syndrome</h3>
                <p className="text-slate-700 text-sm">4-8% of individuals with Turner syndrome have celiac disease. Screening should be performed.</p>
              </div>
            </div>
          </div>

          {/* Family Screening */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Family Screening</h2>
            <p className="text-slate-700 mb-4">
              First-degree relatives (parents, siblings, children) of people with celiac disease have a <strong>10-15% chance</strong> of also having the condition.
            </p>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Screening Recommendations:</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>All first-degree relatives should be tested, even without symptoms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Testing should include celiac antibody blood tests</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Consider genetic testing (HLA-DQ2/DQ8) to help assess risk</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Repeat testing every 2-3 years if initial tests are negative</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Important Note</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  If you have celiac disease and develop new symptoms or have a family history of autoimmune conditions, discuss appropriate screening with your healthcare provider. Early detection and management of related conditions can prevent complications.
                </p>
              </div>
            </div>
          </div>

          {/* Related Reading Section */}
          {/* External Resources Section */}
          <ExternalResources links={externalLinks} title="Related Conditions Resources" />
        </div>
      </div>
    </div>
  )
}