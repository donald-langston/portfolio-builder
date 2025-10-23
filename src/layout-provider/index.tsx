'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { PrivateLayout } from './private-layout';
import { PublicLayout } from './public-layout';
import PortfolioLayout from '@/app/portfolio/_components/portfolio-layout';

export function LayoutProvider({ children }: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();

    if(pathName.startsWith('/account')) {
        return (
            <PrivateLayout>
                {children}
            </PrivateLayout>
        )
    }

    if(pathName.startsWith("/portfolio")) {
        return <PortfolioLayout>{children}</PortfolioLayout>
    }

    return (
        <PublicLayout>
            {children}
        </PublicLayout>
    )
}
