'use client';
import { Navbar } from '@/components';
import AuthProvider from '@/components/AuthProvider';
import './globals.css';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';



export default function ClientLayout({ children ,session}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
