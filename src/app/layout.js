'use client';
import { Navbar } from '@/components';
import AuthProvider from '@/components/AuthProvider.js';
import './globals.css';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
export const metadata = {
  title: 'Sipath',
  description: 'Tutoring Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <main className="app overflow-x-hidden font-sans bg-gray-100 min-h-screen">
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
            <ToastContainer position="top-right" />
          </main>
        </Provider>
      </body>
    </html>
  );
}
