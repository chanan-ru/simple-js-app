// IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';


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
    let button = document.createElement('li');
    let moDal = document.querySelector('.modal');
    let moDalBody = document.querySelector('.modal-body');
    button.classList.add('list-group-item', 'list-group-item-primary');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-current', 'true');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#exampleModal');
    button.setAttribute('data-bs-name', pokemon.name);
    button.innerText = pokemon.name;

    //AppendChild to its element
    listOfPokemon.appendChild(button);

    // Event Listener
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    moDal.addEventListener('hidden.bs.modal', function() {
      moDalBody.innerHTML = '';
    });
  }


  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      let pokemonName = item.name;
      let pokemonHeight = item.height;
      let pokemonImg = item.imgUrl;
      showModal(pokemonName, pokemonHeight, pokemonImg);
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
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url).then(function(response) {
      showLoadingMessage();
      return response.json();

    }).then(function(details) {
      hideLoadingMessage();
      item.imgUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;

    }).catch(function(e) {
      console.error(e);
    })
  }

  // Show modal function
  function showModal(title, text, imagePokemon) {

    //Modal Content
    let titleElement = document.querySelector('#exampleModalLabel');
    titleElement.innerText = title;

    let contentSection = document.querySelector('.modal-body');
    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height : ' + text;

    let contentImg = document.createElement('img');
    contentImg.src = imagePokemon;

    contentSection.appendChild(contentElement);
    contentSection.appendChild(contentImg);

  }


  function showLoadingMessage(){
    let contentSection = document.querySelector('.modal-body');
    let loading = document.createElement('div');
    loading.classList.add('loader');

    contentSection.appendChild(loading);
  }

  function hideLoadingMessage(){
    let reMoveloader = document.querySelector('.loader');
    reMoveloader.classList.remove('loader');
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
