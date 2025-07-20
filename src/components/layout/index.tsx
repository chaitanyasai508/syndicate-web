import React, { useEffect } from 'react';
import LoggedInHeader from './header';
import { useSubscriptionStatus } from '@/hooks/use-subscription-status';
import { useSubscriptionStore} from '@/store/use-subscription-store';

const Layout = ({children}: {children: React.ReactNode}) => { 
    const { data: subscriptionStatus, isLoading, error   } = useSubscriptionStatus();
    const { status, setStatus  } = useSubscriptionStore();


    useEffect(() => {
        if(subscriptionStatus){
            setStatus((subscriptionStatus as any)?.status ?? 'active');
        }else{
            setStatus(null);
        }
    },[subscriptionStatus]);
    
    return (
        <div className='min-h-screen flex flex-col'>
            <LoggedInHeader />
            <div className='flex-1 p-6  flex flex-col'>
                {children}
            </div>
        </div>
    );
    
 };

export default Layout;
