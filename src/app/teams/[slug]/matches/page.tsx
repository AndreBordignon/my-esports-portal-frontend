'use client'
import React, { useState, useEffect } from 'react';
import { getTeamMatches } from '@/services/teams.service'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
import Link from 'next/link';
import backgroundImage from '@/assets/background/download.png'
import { useRouter, useSearchParams } from 'next/navigation';

const MatchesList = ({ params }: { params: { slug: string } }) => {
    const router = useRouter()
    const [series, setSeries] = useState<any>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await getTeamMatches(params.slug);
                setSeries(data);
            } catch (error) {
                console.error('Erro ao buscar as partidas:', error);
            }
        };

        fetchMatches();
    }, []);

    const checkWinner = (results: any) => {
        console.log(results)
        if(results?.slug === params.slug){
            return true
        }
        return false
    }

    return (
        <div className="mx-auto bg-bg my-auto">
            <ul className="list-none my-0 md:my-4 mx-auto flex flex-col justify-center">
                {series.map((serie: any, index: number) => (
                    serie.name && (
                        <li key={`${serie + index}`} className={`relative p-4 my-0 md:my-2 bg-transparent md:bg-custom-background bg-cover justify-center border-t-2 md:border-none border-blue-700`}>

                            <div className="hidden md:block absolute inset-0 bg-black opacity-30"></div>
                            <Link  href={`/matches/${serie.slug}/details`}>
                                <div className='hidden md:block absolute left-52'>
                                    <p className="text-lg font-semibold">{serie.name}</p>
                                </div>
                                <div className='flex relative z-10 py-2 justify-center container mx-auto'>
                                    <div className='flex'>
                                        <p className={`text-bold text-3xl ${serie.winner?.slug === serie.opponents[0]?.opponent?.slug ? 'text-green-500' : 'text-red-500'} my-auto`}>{serie.results[0].score}</p>
                                        <div className='flex flex-col'>
                                            <Link href={{ pathname: `/teams/${serie?.opponents[0]?.opponent.slug}/details`, query: { titulo: `Time ${serie?.opponents[0]?.opponent.name}`}}}>
                                                <p className='text-bold text-center'>{serie?.opponents[0]?.opponent.name}</p>
                                                <div className='flex flex-row'>
                                                    <Image className='rounded-full w-44 h-24 object-scale-down' src={`${serie.opponents[0]?.opponent.image_url || ''}`} width="120" height="120" alt="team 1"/>
                                                </div>
                                            </Link>
                                        </div>
                                        
                                        <p className='align-center justify-center m-auto mx-2'>vs</p>

                                        <div>
                                            <Link href={{ pathname: `/teams/${serie?.opponents[1]?.opponent.slug}/details`, query: { titulo: `Time ${serie?.opponents[1]?.opponent.name}`}}}>
                                                <p className='text-bold text-center'>{serie?.opponents[1]?.opponent.name}</p>
                                                <div className='flex flex-row '>
                                                    <Image className='rounded-full w-44 h-24 object-scale-down' src={`${serie.opponents[1]?.opponent.image_url || ''}`} width="120" height="120" alt="team 2"/>
                                                </div>
                                            </Link>
                                        </div>
                                            <p className={`text-bold text-3xl ${serie.winner?.slug === serie.opponents[1]?.opponent?.slug ? 'text-green-500' : 'text-red-500'} my-auto`}>{serie.results[1].score}</p>
                                            
                                                <Link className="py-2 hidden md:block absolute right-5 px-4 border-2 rounded-md bg-secondary hover:bg-button border-button text-white my-8" href={`/matches/${serie.slug}/details`}>
                                                    detalhes -&gt;
                                                </Link>
                                            
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default MatchesList;
