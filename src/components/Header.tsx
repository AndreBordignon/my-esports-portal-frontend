'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'

const Header = ({ defaultTitle }: any) => {
    const router = useRouter();
    const [title, setTitle] = useState(defaultTitle);
    const searchParams = useSearchParams();

   useEffect(() => {
        // Verifica se o router está pronto antes de tentar usar suas propriedades
            const queryTitle = searchParams.get('titulo');
            setTitle(queryTitle || defaultTitle)
    }, [searchParams, defaultTitle]);

    const goBack = () => {
        router.back();
    };

    return (
        <div className='mx-auto fixed z-20 w-full h-18 bg-white'>
            <div className="flex items-center justify-between p-4 shadow-md">
                <button onClick={goBack} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {'<-'}
                </button>
                <h1 className="text-lg ml-6 text-xl font-bold">{title}</h1>
            

                <Link href={{pathname: '/dashboard/principal', query: {titulo: 'Lista de times'}}} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Header;
