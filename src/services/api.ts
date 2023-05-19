import axios from 'axios';

const api = axios.create({
  baseURL: 'https://polygon-monkeys-api.herokuapp.com/'
});

export { api };
