import axios from "axios";

const limit = 20;

export const fetchPokemonData = async (currentPage) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
        (currentPage - 1) * limit
      }`
    );
    const detailedData = await Promise.all(
      response.data.results.map(async (pokemon, index) => {
        const detailedResponse = await axios.get(pokemon.url);
        return {
          ...pokemon,
          id: detailedResponse.data.id,
        };
      })
    );
    return{
    pokemon:detailedData,
    totalpages:Math.ceil(response.data.count / limit)};
  } catch (error) {
    console.log("Error fetching Pokemon:", error);
  } 
};


