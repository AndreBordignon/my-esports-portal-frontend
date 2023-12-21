import { api, pandascoreapi } from '@/api/api'; // Ajuste o caminho conforme a localização do seu arquivo api.ts

const getMatchDetails = async (teamSlug: string) => {
  try {
    const response = await api.get(`/matches/${teamSlug}`);
    return response.data;
  } catch (error) {
    console.error('Ocorreu um arro ao listar as partidas', error);
    throw error;
  }
};
export { getMatchDetails };
