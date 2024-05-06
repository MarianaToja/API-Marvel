const main = document.getElementById("container");
let currentCharacterId = 1010791; 
 
function fetchAndCreateCards(characterId) {
    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=bd08c319339f4d2fcadb42e20a2aa50f&hash=3e442d29eb25bba4951611844395f564`;
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
    img.alt = character.name;
 
    const names = document.createElement("div");
    names.className = "names";
    names.innerHTML = `<h3>${character.name} </h3>`;
 
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
 
function changeCard(direction) {
    currentCharacterId += direction;
    fetchAndCreateCards(currentCharacterId);
}
 
fetchAndCreateCards(currentCharacterId);