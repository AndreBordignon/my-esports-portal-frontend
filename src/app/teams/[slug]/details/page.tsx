'use client'
import React, { useState, useEffect } from 'react';
import { getTeamBySlug } from '@/services/teams.service'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactCountryFlag from "react-country-flag";

const TeamDetails = ({ params }: { params: { slug: string } }) => {
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
        <div className='container mx-auto mt-8 block'>
            <div className='pr-6 flex justify-between'>
                <div className='flex items-center'> {/* Alterado para alinhar itens verticalmente */}
                    {team.image_url && <Image src={team.image_url} width="100" height="100" alt={team.name}/>}
                    <div className='ml-4'> {/* Adicionado margem esquerda para espaço */}
                        <h1 className='text-3xl font-semibold'>{team.name} {team.acronym && <strong className='text-lg absolute ml-2'>{`(${team?.acronym})`}</strong>}</h1>
                        <ReactCountryFlag 
                            countryCode={team.location}
                            svg
                            style={{
                                width: '20px',
                                height: '20px',
                                marginTop: '10px'
                            }}
                            title={team.location}
                        />
                        <p className='m-0 p-0 text-xs ml-0.5'>{team.location}</p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <Link href={{ pathname: `matches`, query: { titulo: `Partidas ${team.name}` }}} className='p-2 w-18 md:w-28 md:h-auto md:text-center text-xs md:text-md md:px-4 md:py-4 border-2 rounded-md bg-secondary hover:bg-button border-button text-white'>
                        Matches
                    </Link>
                </div>
            </div>
            <div className="mt-8 flex mx-auto my-auto flex-wrap">
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
                                    countryCode={player.nationality}
                                    svg
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginTop: '-3px',
                                        marginLeft: '4px',
                                    }}
                                    title={player.nationality}
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

export default TeamDetails;
