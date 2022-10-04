// IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      document.write('pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let listOfPokemon = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-default');

    //AppendChild to its element
    listItem.appendChild(button);
    listOfPokemon.appendChild(listItem);

    // Event Listener
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });

  }


  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json2) {
      json2.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item){
    let url = item.detailsUrl;

    return fetch(url).then(function(response){

      return response.json();

    }).then(function (details){

    item.imgUrl = details.sprites.back_default;
    item.height = details.height;

    }).catch(function (e){
      console.error(e);
    })
  }

  function showLoadingMessage(){
    
  }

  function hideLoadingMessage(){

  }



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
