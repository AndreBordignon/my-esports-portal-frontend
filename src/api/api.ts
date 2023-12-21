import axios from 'axios';

// Substitua esta URL pela URL base real da API que você está usando
const BASE_URL = 'https://blooming-hollows-13183-117367e14a03.herokuapp.com/pandascore/';
const BASE_URL_PANDASCORE = 'https://api.pandascore.co/';

const api = axios.create({
  baseURL: BASE_URL,
  // Aqui você pode adicionar outros headers padrões, se necessário
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.API_TOKEN || 'kn4JnhL0DEsvVvb0yOL1WEwzJ6rI2KF-dMPu8rnXfb6CboHjRmU',
    // Inclua outros headers como tokens de autenticação, se necessário
  },
});
const pandascoreapi = axios.create({
  baseURL: BASE_URL_PANDASCORE,
  // Aqui você pode adicionar outros headers padrões, se necessário
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.API_TOKEN || 'kn4JnhL0DEsvVvb0yOL1WEwzJ6rI2KF-dMPu8rnXfb6CboHjRmU',
    // Inclua outros headers como tokens de autenticação, se necessário
  },
});

export { api, pandascoreapi };
