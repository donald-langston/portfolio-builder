import React, { Suspense} from 'react'

export function PublicLayout({children}: {
    children: React.ReactNode;
}) {
    

    return (
        <div>
            <Suspense fallback={<></>}>
                {children}
            </Suspense>
        </div>
    )
}
