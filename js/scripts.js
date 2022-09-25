// IIFE
let pokemonRepository = (function() {
  let pokemonList = [{
      name: 'Charmander',
      height: 0.6,
      types: ['Fire']
    },

    {
      name: 'Growlithe',
      height: 0.7,
      types: ['Fire']
    },

    {
      name: 'Lapras',
      height: 2.5,
      types: ['Ice', 'Water']
    }
  ];

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      if (typeof pokemon.name === 'string' && typeof pokemon.height === 'number' && typeof pokemon.types === 'object') {
        pokemonList.push(pokemon);
      }
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let listOfPokemon = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-default');

    //AppendChild to its element
    listItem.appendChild(button);
    listOfPokemon.appendChild(listItem);

    // Event Listener
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });

  }

  function showDetails(pokemon){
    //console.log('Just clicked!');
    console.log(pokemon.name + ' has been clicked!');
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };

})();

pokemonRepository.add({
  name: 'Bulbasaur',
  height: 0.7,
  types: ['Grass', 'Poison']
});


pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
