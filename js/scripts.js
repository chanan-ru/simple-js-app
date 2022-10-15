// IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';

  //Variable for Modal
  let modalContainer = document.querySelector('.modal-container');


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




    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal container,
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });



  }

  function showDetails(item) {
    //console.log(item);
    //let itemName = item.name;

    pokemonRepository.loadDetails(item).then(function () {
      let pokemonName = item.name;
      let pokemonHeight = item.height;
      let pokemonImg = item.imgUrl;
      showModal(pokemonName, pokemonHeight, pokemonImg);
      //console.log();
    });

  }

  function loadList() {

    return fetch(apiUrl).then(function(response) {
      //showLoadingMessage();
      return response.json();
    }).then(function(json2) {
      //hideLoadingMessage();
      json2.results.forEach(function(item) {
        //.console.log(item);
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };

        add(pokemon);
        //console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url).then(function(response) {
      //showLoadingMessage();
      return response.json();

    }).then(function(details) {
      //hideLoadingMessage();
      item.imgUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;

    }).catch(function(e) {
      console.error(e);
    })
  }

  // Show modal function
  function showModal(title, text, imagePokemon) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Create modal close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    // Modal will be close when the button is click.
    closeButtonElement.addEventListener('click', hideModal);

    //Modal Content
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height : ' + text;

    let contentImg = document.createElement('img');
    contentImg.src = imagePokemon;

    //Display all Element of Modal
    modalContainer.appendChild(modal);
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(contentImg);

    //Modal will be visible
    modalContainer.classList.add('is-visible');
  }

  // Close modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  function showLoadingMessage() {
    console.log('Loading...');
    //alert("Hello! I am loading!");
}

function hideLoadingMessage() {
  console.log('done!');
  //alert("Hello! I am done!");
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
    //pokemonRepository.loadDetails(pokemon);
  });
});
