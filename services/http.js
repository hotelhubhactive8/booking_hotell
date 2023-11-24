import axios from 'axios';

const http = axios.create({
  baseURL: 'https://hotels4.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'a9f9aba3b3msh333400d4fd20a37p1a1fb9jsnd3b30f48ffc8',
    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
  },
});

export default http;
