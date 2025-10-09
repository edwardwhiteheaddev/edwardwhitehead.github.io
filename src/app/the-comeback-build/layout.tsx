import React from 'react';

export default function TheComebackBuildLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full relative">
            {children}
        </div>
    );
}