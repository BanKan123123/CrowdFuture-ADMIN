'use client';
import { inter, beVietnamPro } from '../lib/fonts';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'sonner';

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <body className={`${inter.variable} ${beVietnamPro.variable} antialiased`}>
                    <Provider store={store}>{children}</Provider>
                    <Toaster />
               </body>
          </html>
     );
}
