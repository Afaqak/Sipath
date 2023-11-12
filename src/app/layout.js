'use client';
import { Navbar } from '@/components';
import AuthProvider from '@/components/AuthProvider.js';
import './globals.css';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Roboto } from 'next/font/google';
// import { Metadata } from 'next';
export const metadata={
  title:"Sipath"
}
export default function RootLayout({ children, props }) {

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <main className={` app overflow-x-hidden bg-gray-100 min-h-screen`}>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
            <Toaster containerStyle={{zIndex:9999999}}/>
          </main>
        </Provider>
      </body>
    </html>
  );
}
