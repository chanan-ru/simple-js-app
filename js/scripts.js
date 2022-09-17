//This array contains Pokémon data to display in application.
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


/* An example of using For loop

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].name != '' && pokemonList[i].height >= 1) {
    document.write('<p>' + pokemonList[i].name + ' (' + pokemonList[i].types + ') is ' + pokemonList[i].height + 'm height. -- Wow!!, that\'s big.</p>');
  } else if (pokemonList[i].name != '' && pokemonList[i].height > 0) {
    document.write('<p>' + pokemonList[i].name + ' (' + pokemonList[i].types + ') is ' + pokemonList[i].height + 'm height. </p>');
  } else {
    document.write('<p>Error!!, Please check your details.</p>');
  }

}

*/

pokemonList.forEach(function(pokemon) {

  document.write('<p>' + pokemon.name + '</p>');
  
});
