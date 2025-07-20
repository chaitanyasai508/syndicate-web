import React from 'react';
import LoggedInHeader from './header';

const Layout = ({children}: {children: React.ReactNode}) => { 
    return (
        <div className='min-h-screen flex flex-col'>
            <LoggedInHeader />
            <div className='flex-grow p-6 overflow-y-auto flex flex-col'>
                {children}
            </div>
        </div>
    );
    
 };

export default Layout;
