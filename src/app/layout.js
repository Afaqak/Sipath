'use client';
import { Navbar } from '@/components';
import AuthProvider from '@/components/AuthProvider.js';
import './globals.css';
import { store, persistor } from '@/store/store';
import { Provider } from 'react-redux';
// import { Toaster } from '@/components/ui/toaster';
import { Toaster } from 'react-hot-toast';
import { Roboto } from 'next/font/google';
import { PersistGate } from 'redux-persist/integration/react';

const roboto = Roboto({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <main className={`${roboto.className} app overflow-x-hidden bg-gray-100 min-h-screen`}>
              <AuthProvider>
                <Navbar />
                {children}
              </AuthProvider>
              <Toaster />
            </main>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
