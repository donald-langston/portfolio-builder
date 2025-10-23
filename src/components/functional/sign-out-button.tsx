'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import usersGlobalStore, { IUsersGlobalStore } from '@/global-store/users-store';

export function SignOutButton() {
    const {signOut} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
     const {setUser} = usersGlobalStore() as IUsersGlobalStore;

    const onSignOut = async () => {
        try {
            setLoading(true);
            await signOut();
            setUser(null);
            router.push("/");
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button className='w-full cursor-pointer' onClick={onSignOut} disabled={loading}>Signout</Button>
    )
}
