'use client';
import { Navbar } from '@/components';
import AuthProvider from '@/components/AuthProvider';
import './globals.css';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import axios from 'axios';

const CATEGORIES_LOCAL_STORAGE_KEY = 'categories';

export default function ClientLayout({ children ,session}) {

  useEffect(() => {
    const fetchAndStoreCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
        const categories = response.data;

        const storedCategories = localStorage.getItem(CATEGORIES_LOCAL_STORAGE_KEY);
        if (!storedCategories) {
   
          localStorage.setItem(CATEGORIES_LOCAL_STORAGE_KEY, JSON.stringify(categories));
          console.log('Categories stored in local storage:', categories);
        } else {
          console.log('Categories already exist in local storage:', JSON.parse(storedCategories));
        }
      } catch (error) {
        console.error('Error fetching and storing categories:', error);
      }
    };

    fetchAndStoreCategories();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning >
      <body suppressHydrationWarning>
        <Provider store={store}>
          <main className={` app overflow-x-hidden bg-gray-100 min-h-screen`}>
            <AuthProvider session={session}>
              <Navbar />
              {children}
            </AuthProvider>
            <Toaster style={{width:"95%"}} richColors position="bottom-right" />
          </main>
        </Provider>
      </body>
    </html>
  );
}
