import { Inter, Urbanist } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'
import Header from '@/components/Header'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const urbanist = Urbanist({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-urbanist',
})

export const metadata = {
  title: 'Coeliac Disease Information Hub',
  description: 'Comprehensive information about Coeliac disease (Coeliac disease), diagnosis, treatment, and living with the condition',
  keywords: 'coeliac disease, celiac disease, gluten free, autoimmune, diagnosis, treatment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${urbanist.variable}`}>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-slate-50">
          {/* Header Navigation */}
          <Header />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 mt-20">
            <div className="container mx-auto px-4 py-12">
              <MedicalDisclaimer />
              
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)'}}>
                      <span className="text-white font-semibold text-sm">C</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700">Coeliac Information Hub</span>
                  </div>
                  <div className="text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} All rights reserved. For educational purposes only.</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}