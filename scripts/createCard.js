/*THIS CODE MAKES THE REQUEST*/
let request = new XMLHttpRequest();

request.open("GET", "http://192.168.1.25:3000/character", true);

request.onload = function () {
  let data = JSON.parse(this.response);

  let names = data.map((character) => character.name);

  characterNames = names.sort();

  // names = characterNames.sort();

  //GRAB PARENT ELEMENT
  const characterSelect = document.getElementById("character-select");

  //FOREACH LOOP TO CREATE A CARD FOR EACH CHARACTER
  characterNames.forEach((name) => {
    //CREATE DIV FOR CARD
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", name);

    //CREATE IMAGE FOR CARD
    const thumbnail = document.createElement("img");
    thumbnail.setAttribute("src", "images/card/" + name + ".jpg");

    //CREATE DIV FOR NAME
    const characterName = document.createElement("div");
    characterName.setAttribute("class", "card-name");
    characterName.textContent = name.split("-").join(" ");

    //STRUCTURE ELEMENTS FOR CARD
    characterSelect.appendChild(card);
    card.appendChild(thumbnail);
    card.appendChild(characterName);

    //CLICKING CHARACTER GOES TO THE RIGHT PAGE
    document.getElementById(name).onclick = function () {
      location.href = `${name}.html`.toLowerCase();
    };
  });
};
//SENDS REQUEST
request.send();
