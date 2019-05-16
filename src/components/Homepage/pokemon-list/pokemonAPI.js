import axios from 'axios';

const apiEndPoint = 'https://pokeapi.co/api/v2';

const PokemonAPI = {
    getDetail: (name) => axios.get(`${apiEndPoint}/pokemon/${name}`),
    getLimit: (numOffset, numLimit) => axios.get(`${apiEndPoint}/pokemon?offset=${numOffset}&limit=${numLimit}`),
    getAll: () => axios.get(`${apiEndPoint}/pokemon?offset=0&limit=964`),
}

export default PokemonAPI;