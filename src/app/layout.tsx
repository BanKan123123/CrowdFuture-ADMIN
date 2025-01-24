// import { inter, beVietnamPro } from '../../lib/fonts';
import '@/app/globals.css';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import Provider from '@/providers/Provider';
import { ToastContainer } from 'react-toastify';
import FullPageLoading from '@/components/Loading/Loading';

export const metadata: Metadata = {
     title: 'Crowd Futuer Admin',
     description: 'Crowd Futuer Admin',
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <body
               // className={`${inter.variable} ${beVietnamPro.variable} antialiased`}
               >
                    <div className="abstract-bg"></div>
                    <div className="grid-pattern"></div>
                    <Provider>
                         {children}
                         <ToastContainer />
                         <Toaster />
                         <FullPageLoading />
                    </Provider>
               </body>
          </html>
     );
}
