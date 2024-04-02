import React, {ReactNode} from 'react';
import type {Metadata} from 'next';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import LogoMapeando from '../../public/logo_mapeando.webp'
import MapClientLayout from "@/components/map-client-layout";
import getAllBuildings from "@/lib/get-all-buildings";
import buildingsAsGeoJSON from "@/lib/get-all-buildings-geojson";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export type RootLayoutProps = {
    readonly children: ReactNode;
}

export default async function RootLayout(props: RootLayoutProps) {
    const {children} = props;
    const buildings = await getAllBuildings();
    const buildingsGeoJSON = buildingsAsGeoJSON(buildings);
    return (
        <html lang="en">
        <body className='text-stone-950 bg-stone-50'>
        <div className='h-16 px-4 flex items-center bg-yellow-400'>
            <Link href='/' className='font-bold text-xl flex items-center gap-4'>
                <Image src={LogoMapeando} alt='Logo Mapeando y Preservando' width={32} height={32}/>
                Mapeando y Preservando
            </Link>
            <nav className='grow flex justify-end'>
                <Link href='/about'>
                    Acerca de
                </Link>
            </nav>
        </div>
        {children}
        </body>
        </html>
    );
}
