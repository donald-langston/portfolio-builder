/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { PrivateLayoutHeader } from './_components/header';
import { getCurrentUser } from '@/actions/users';
import { Spinner } from '@/components/ui/spinner';
import toast from 'react-hot-toast';
import usersGlobalStore, { IUsersGlobalStore } from '@/global-store/users-store';

export function PrivateLayout({children}: {
    children: React.ReactNode;
}) {
   const {user, setUser} = usersGlobalStore() as IUsersGlobalStore;
   const [loading, setLoading] = useState<boolean>(true); 
   
   const fetchUser = async () => {
    try {
        setLoading(true);
        const response: any = await getCurrentUser();
        
        if(response.success) {
            setUser(response.data);
        } else {
            throw new Error("Error fetching user data");
        }
    } catch(error: any) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
   }

   useEffect(() => {
    if(!user) {
        fetchUser();
    }
   }, []);

   if(loading && !user) {
    return <div className="flex items-center justify-center h-screen">
        <Spinner />
    </div>
   }

   if(!loading && !user) {
    return <div>
        <h1>Error fetching user data</h1>
    </div>
   }
   
    return (
        <div>
            <PrivateLayoutHeader />
            <div className="p-5">
                {children}
            </div> 
        </div>
    )
}
