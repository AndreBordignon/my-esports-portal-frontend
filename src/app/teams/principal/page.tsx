'use client'

import React, { useState, useEffect } from 'react';
import { getTeams } from '@/services/teams.service';
import Image from 'next/image';
import Link from 'next/link';
import ReactCountryFlag from "react-country-flag";
import TeamSearch from './teamSearch/teamSearch';
import useDebounce from '../../../hooks/useDebounce';

const TeamsPage = () => {
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true)
                const data = await getTeams(searchTerm);
                setTeams(data);
            } catch (error) {
                console.error('Erro ao buscar os times:', error);
            } finally {
              setLoading(false)
            }
        };

        fetchTeams();
    }, [debouncedSearchTerm]);

    const handleSearch = (searchTerm: any) => {
      setSearchTerm(searchTerm);
  };
    return (
      <div className="container py-4 px-2 md:px-0 mx-auto my-auto">
        <TeamSearch className="z-50" onSearch={handleSearch} />
          {loading ? (            
            <div className='w-full h-screen absolute top-0 left-0 flex flex-col justify-center align-center'>
              <div className="spinner block align-center justify-center"></div>
              <p className='text-center align-center mt-4 text-gray-500 justify-center'>Carregando...</p>
            </div>
            ) : (
            <div>
                  <div className='h-fit flex flex-wrap mx-2'>
                    {teams.length > 0 ? teams.map((team: any, index: number) => (
                        team.players.length > 0 &&
                        <Link href={{ pathname: `/teams/${team.slug}/details`, query: { titulo: `Partidas ${team.name}` }}} key={index} className="w-72 shadow-lg mx-auto md:mx-0 md:mr-4 rounded-lg h-80 my-4 border-2 border-border flex p-3 flex-col">
                            <Image className="rounded-full w-44 h-24 mx-auto object-scale-down" src={team?.image_url || 'https://dummyimage.com/500x500/000/ffffff.png&text=not+found'} width="100" height="100" alt="logo do time" />
                            <p className="text-center text-black my-4">
                                {team.name}
                            </p>
                            <ul className='mt-2 h-30 overflow-scroll '>
                              {team.players.map((player: any, playerIndex: number) => 
                                <li key={playerIndex} className='flex '>
                                  <ReactCountryFlag 
                                      countryCode={player.nationality} // Substitua 'team.countryCode' pela propriedade correta do seu objeto team
                                      svg
                                      style={{
                                          width: '20px',
                                          height: '20px',
                                      }}
                                      className='mb-1 rounded-full'
                                      title={player.nationality} // Mostra a sigla do país quando se passa o mouse sobre a bandeira
                                  />
                                  <p className='text-black text-sm ml-2 overflow-hidden h-4'>
                                    {player.first_name} <strong className='text-secondary opacity-90'>&quot;{player.name}&quot;</strong> {player.last_name}
                                  </p>
                                </li>
                              )}
                            </ul>
                        </Link>
                    )) : (
                      <div className='flex flex-1'>
                        <p className='text-left m-4 text-gray-500 justify-center'>Nenhum time com o nome &quot;<strong className='text-secondary opacity-90'>
                        {searchTerm}</strong>&quot; encontrado...</p>
                      </div>
                    )}
                  </div>
              </div>
          )}
          
      </div>
    );
};

export default TeamsPage;
