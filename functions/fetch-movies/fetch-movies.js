const axios = require('axios');

const handler = async (event) => {
  const { page, type, language, movieId, query } = event.queryStringParameters;

  const API_KEY = process.env.VITE_REACT_APP_TMDB_KEY;
  let url;
  const baseUrl = `https://api.themoviedb.org/3`;
  if (page && type) {
    url = `${baseUrl}/movie/${type}?api_key=${API_KEY}&language=${language}&page=${page}`;
  }
  if (movieId) {
    url = `${baseUrl}/movie/${movieId}?api_key=${API_KEY}&language=${language}`;
  }
  if (query) {
    url = `${baseUrl}/search/movie?api_key=${API_KEY}&language=${language}&query=${query}`;
  }

  try {
    const { data } = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };
