'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar/Sidebar';

const LayoutsAdmin = ({ children }: { children: ReactNode }) => {
     const path = usePathname();
     const fullPageRoutes = ['/login'];
     const isFullPage = fullPageRoutes.includes(path);
     if (isFullPage) {
          return <div className="min-h-screen">{children}</div>; // Không có sidebar
     }
     return (
          <div className="h-screen flex">
               <Sidebar />
               <main className="flex-1 overflow-auto flex flex-col justify-between bg-containerLayout max-sm:pb-20 lg:ml-[85px] ml-[0px] p-6">
                    {children}
               </main>
          </div>
     );
};

export default LayoutsAdmin;
