'use client';

import { KyrosFooter } from '@/components/kyros/Footer';
import { KyrosNavbar } from '@/components/kyros/Navbar';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { UnivrsFooter } from './univrs/UnivrsFooter';
import { UnivrsHeader } from './univrs/UnivrsHeader';

export function SiteShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isUnivrs = useMemo(() => {
        if (!pathname) return false;
        return pathname === '/univrs' || pathname.startsWith('/univrs/');
    }, [pathname]);

    if (isUnivrs) {
        return (
            <>
                <UnivrsHeader />
                <main style={{ minHeight: '100vh' }}>{children}</main>
                <UnivrsFooter />
            </>
        );
    }

    return (
        <>
            <KyrosNavbar />
            <main style={{ minHeight: '100vh', paddingTop: '120px' }}>{children}</main>
            <KyrosFooter />
        </>
    );
}
