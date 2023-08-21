import { Navbar } from '@/components';
import AuthProvider from '@/components/AuthProvider.js';
import './globals.css';

export const metadata = {
  title: 'Sipath',
  description: 'Tutoring Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="app overflow-x-hidden font-sans bg-gray-100 min-h-screen">
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
