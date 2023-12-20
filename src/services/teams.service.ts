import {api, pandascoreapi} from '@/api/api'; // Ajuste o caminho conforme a localização do seu arquivo api.ts

const getTeams = async (searchTerm: any) => {
    try {
        const response = await api.get('teams', {
            params: {
                filter: {
                    videogame_id: 3,
                },
                search: {
                    name: searchTerm
                },
                sort: 'id',
                per_page: 100
            }
        }); // Substitua '/teams' pela rota correta
        return response.data;
    } catch (error) {
        console.error('Erro ao obter os times:', error);
        throw error;
    }
};

const getTeamMatches = async (teamSlug: string) => {
    try{
        const response = await api.get(`/teams/${teamSlug}/matches`)
        return response.data
    } catch(error) {
        console.error('Ocorreu um arro ao listar as bo3', error);
        throw error;
    }
}
const getTeamBySlug = async (teamSlug: string) => {
    try{
        const response = await api.get(`/teams/${teamSlug}`)
        return response.data
    } catch(error) {
        console.error('Ocorreu um arro ao listar as bo3', error);
        throw error;
    }
}
export { getTeams, getTeamMatches, getTeamBySlug };
