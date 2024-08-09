// Fetch
//
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/';

// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
};

const createPokemonCard = (pokemon) =>{
        const card = document.createElement("div");
        card.className = "pokemon-card";
        
        const abilities = pokemon.abilities.map(ability =>ability.ability.name).join(',');
        
        const image = document.createElement("img");
        image.src = pokemon.sprites.front_default;
        image.alt = `${pokemon.name} image`;
        image.onerror = () => {
            image.src = "path/to/placeholder.png";
        };

        card.innerHTML = `
        <h2>${pokemon.name}</h2>
        ${image}
        
        <p>Abilities: ${abilities}</p>
        <p>Height: ${pokemon.height} decimeters</p>        
        <p>Weight: ${pokemon.weight} grams</p>
        `;

        return card;
    }

// Obtener pokemon
document.getElementById("get-btn")
    .addEventListener('click', async () => {
        const pokemonName =document.getElementById("pokemon-name").value.toLowerCase();
        const pokemon = await fetchPokemon(pokemonName);
        if (pokemon) {
        localStorage.setItem('currentPokemonId', pokemon.id);
        const card = createPokemonCard(pokemon);
        document.body.appendChild(card);
        console.log(`Pokemon: ${pokemon.name}`);
    }
});    

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokemonId');
    const initialId = storedId ? parseInt(storedId) : 1;
    
    const pokemon = await fetchPokemon(initialId);
    if (pokemon) {
        const card = createPokemonCard(pokemon);
        document.body.appendChild(card);
        console.log(`Loaded pokemon from localStorage: ${pokemon.name}`);
        }
});

// obtener el anterior
//
//
// obtener el siguiente

document.getElementById("prev-btn").addEventListener("click", async () => {
        const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
        const newId = Math.max(currentPokemonId -1, 1);
        const pokemon = await fetchPokemon(newId);
        if (pokemon) {
            localStorage.setItem('currentPokemonId', newId);
            const card = createPokemonCard(pokemon);
            const existingCard = document.querySelector('.pokemon-card');
            if (existingCard) {
                existingCard.replaceWith(card);
            } else {
                document.getElementById('pokemon-container').appendChild(card);
            }        
            console.log(`Previous pokemon: ${pokemon.name}`);
        }    
});

            
                   
                       
document.getElementById('next-btn')
    .addEventListener("click", async () => {
        const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
        const newId = currentPokemonId;
        const pokemon = await fetchPokemon(currentPokemonId);
        if (pokemon) {
            const card = createPokemonCard(pokemon);
            const existingCard = document.querySelector('.pokemon-card');
        }else {
            document.body.appendChild(card);
        }
        console.log(`Next pokemon:${pokemon.name}`);
    });



////////////////// POST
//

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))