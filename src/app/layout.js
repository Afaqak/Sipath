'use client';
import { Navbar } from '@/components';
import AuthProvider from '@/components/AuthProvider.js';
import './globals.css';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Toaster } from '@/components/ui/toaster';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <main className={`${roboto.className} app overflow-x-hidden bg-gray-100 min-h-screen`}>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  );
}
