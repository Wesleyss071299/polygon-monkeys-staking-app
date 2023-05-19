import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://staking-api.herokuapp.com/'
  baseURL: 'http://localhost:3001/'
});

export { api };
