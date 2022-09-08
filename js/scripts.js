//This array contains Pokémon data to display in application.
let pokemonList = [
  {
    name : 'Charmander',
    height : 0.6,
    types : ['Fire']
  },

  {
    name : 'Growlithe',
    height : 0.7,
    types : ['Fire']
  },

  {
    name : 'Lapras',
    height : 2.5,
    types : ['Ice', 'Water']
  }
];


document.write(pokemonList[2].name + ' ' + pokemonList[2].types);
