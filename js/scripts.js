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


  return {
    add: add,
    getAll: getAll
  };

})();

pokemonRepository.add({
  name: 'Bulbasaur',
  height: 0.7,
  types: ['Grass', 'Poison']
});

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('<p>' + pokemon.name + '</p>');
});
