'use client'
import React, { useState, useEffect } from 'react';
import { getTeamMatches } from '@/services/teams.service'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
const MatchesList = ({ params }: { params: { slug: string } }) => {
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

    console.log(series)
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Partidas</h1>
            <ul className="list-none">
                {series.map((serie: any, index: number) => (
                    serie.name && (
                    <li key={index} className="p-4 border-b border-gray-200">
                        {/* Substitua 'serie.name' pela propriedade correta do seu objeto de partida */}
                        <p className="text-lg font-semibold">{serie.name}</p>
                        <div className='flex align-center justify-center'>
                            <div className='flex align-center justify-center'>
                                {/* <p className='text-bold align-center'>{serie?.opponents[0]?.opponent.name}</p> */}
                                <p className={`text-bold text-3xl ${serie.winner?.slug === serie.opponents[0]?.opponent?.slug ? 'text-green-500' : 'text-red-500'} my-auto`}>{serie.results[0].score}</p>
                                <Image className='rounded-full w-44 h-24 object-scale-down' src={`${serie.opponents[0]?.opponent.image_url || ''}`} width="120" height="120" alt="team 1"/>
                            </div>
                            <p className='align-center justify-center my-auto'>vs</p>
                            <div className='flex align-center justify-center'>
                                {/* <p className='text-bold align-center'>{serie?.opponents[1]?.opponent.name}</p> */}
                                <Image className='rounded-full w-44 h-24 object-scale-down' src={`${serie.opponents[1]?.opponent.image_url || ''}`} width="120" height="120" alt="team 2"/>
                                <p className={`text-bold text-3xl ${serie.winner?.slug === serie.opponents[1]?.opponent?.slug ? 'text-green-500' : 'text-red-500'} my-auto`}>{serie.results[1].score}</p>
                            </div>
                        </div>
                        {/* Você pode adicionar mais detalhes das partidas aqui */}
                    </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default MatchesList;
