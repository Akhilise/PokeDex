import axios from "axios";
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/?limit=100";

const apiService = {
  getPokemon: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const results = response.data.results;

      
      const detailedPokemon = await Promise.all(
        results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          const data =details.data;
          return {
            id: data.id,
            name: data.name,
            sprites: data.sprites, 
          };
        })
      );

      return {
        success: true,
        data: detailedPokemon,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

export default apiService;
