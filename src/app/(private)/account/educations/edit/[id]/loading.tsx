import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function Loading() {
    

    return (
        <div className='h-40 flex justify-center items-center'>
            <Spinner />
        </div>
    )
}
