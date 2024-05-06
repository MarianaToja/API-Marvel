const main = document.getElementById("container");
let currentComicIndex = 0; 

function fetchAndCreateCards(comicId) {
    const url = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=1&apikey=bd08c319339f4d2fcadb42e20a2aa50f&hash=3e442d29eb25bba4951611844395f564`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => createCards(data.data.results))
        .catch(error => console.error('Erro ao obter dados da API:', error));
}

function createCards(characters) {
    const character = characters[0]; 

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    img.alt = character.title;

    const names = document.createElement("div");
    names.className = "names";
    names.innerHTML = `<h3>${character.title} </h3>`;

    const carousel = document.createElement("div");
    carousel.className = "carousel";

    const leftArrow = document.createElement("div");
    leftArrow.className = "arrow left";
    leftArrow.innerHTML = "&#10094;";
    leftArrow.addEventListener("click", () => changeCard(-1));

    const rightArrow = document.createElement("div");
    rightArrow.className = "arrow right";
    rightArrow.innerHTML = "&#10095;";
    rightArrow.addEventListener("click", () => changeCard(1));

    carousel.appendChild(leftArrow);
    carousel.appendChild(rightArrow);

    card.appendChild(img);
    card.appendChild(names);
    card.appendChild(carousel);

    main.innerHTML = ''; 
    main.appendChild(card);
}

function updateCard() {
    fetchAndCreateCards(currentComicIndex + 1); 
}

function changeCard(direction) {
    currentComicIndex += direction;
    if (currentComicIndex < 0) currentComicIndex = 0; 
    updateCard();
}

fetchAndCreateCards(2); 