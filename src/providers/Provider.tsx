import React, { ReactNode } from 'react';
import LayoutsAdmin from '@/layouts/LayoutsAdmin';
import ReduxProvider from './ReduxProvider';

const Provider = ({ children }: { children: ReactNode }) => {
     return (
          <ReduxProvider>
               <LayoutsAdmin>{children}</LayoutsAdmin>
          </ReduxProvider>
     );
};

export default Provider;
