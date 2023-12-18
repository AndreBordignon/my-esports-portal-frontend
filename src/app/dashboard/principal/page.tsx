'use client'

import React, { useState, useEffect } from 'react';
import { getTeams } from '@/services/teams.service';
import Image from 'next/image'
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
      <div className="container py-4 mx-auto my-auto">
          <h1 className="text-2xl font-bold mb-4">Lista de Times</h1>
          <TeamSearch onSearch={handleSearch} />
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className='h-fit flex flex-wrap gap-4'>
              {teams.map((team: any, index: number) => (
                  team.players.length > 0 &&
                  <div key={index} className="w-48 rounded-lg h-80 my-4 border-2 flex p-3 flex-col p-2">
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
                            <p className='text-black text-sm ml-2'>
                              {player.name}
                            </p>
                          </li>
                        )}
                      </ul>
                  </div>
              ))}
          </div>
          )}
          
      </div>
    );
};

export default TeamsPage;
