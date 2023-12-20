'use client'
import React, { useState, useEffect } from 'react';
import { getTeamBySlug } from '@/services/teams.service'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactCountryFlag from "react-country-flag";

const MatchesList = ({ params }: { params: { slug: string } }) => {
    const router = useRouter()
    const [team, setTeamData] = useState<any>([]);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const data = await getTeamBySlug(params.slug);
                setTeamData(data);
            } catch (error) {
                console.error('Erro ao buscar as partidas:', error);
            }
        };

        fetchTeamData();
    }, []);

    return (
        <div className='bg-black container mx-auto block'>
            <div className="mt-8 flex mx-auto bg-bg my-auto flex-wrap">
                {team?.players?.map((player: any, index: number) => (
                    index <= 4 &&
                    <div key={index} className='mx-auto my-2 p-4 w-72 border-2 rounded-lg border-border'>
                        {player.image_url &&
                            <Image className='rounded-full h-24 w-24 mx-auto object-scale-up mb-4' src={player.image_url} width="100" height="100" alt={player.name}/>
                        }
                            <p className='text-primary text-center font-bold mb-8 '>
                                {player.name}
                                {' '}
                                <ReactCountryFlag 
                                    countryCode={player.nationality} // Substitua 'team.countryCode' pela propriedade correta do seu objeto team
                                    svg
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginTop: '-3px',
                                        marginLeft: '4px',
                                    }}
                                    title={player.nationality} // Mostra a sigla do país quando se passa o mouse sobre a bandeira
                                />
                            </p>

                        <p className='text-primary text-xs mb-2'>
                           Nome Completo: <strong>{player.first_name} {player.last_name}</strong>
                        </p>
                        <p className='text-primary text-xs mb-2'>
                            Idade: <strong>{player.age}</strong>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchesList;
