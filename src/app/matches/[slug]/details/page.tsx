'use client'
import React, { useState, useEffect } from 'react';
import { getMatchDetails } from '@/services/matches.service'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
import Link from 'next/link';
import backgroundImage from '@/assets/background/download.png'
const MatchesList = ({ params }: { params: { slug: string } }) => {
    const [match, setMatch] = useState<any>({});

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await getMatchDetails(params.slug);
                setMatch(data);
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
        <div className="mx-auto bg-black my-auto">
           
        </div>
    );
};

export default MatchesList;
