/*THIS CODE MAKES THE REQUEST*/
let request = new XMLHttpsRequest();

function getCharacterName() {
  let fullPath = window.location.pathname;
  console.log(fullPath);
  let slicedPath = fullPath.slice(11, fullPath.length - 5);
  console.log(slicedPath);
  return slicedPath;
}

let characterName = getCharacterName();

request.open(
  "GET",
  `https://tkn-api.herokuapp.com/character/${characterName}`,
  true
);

request.onload = function () {
  let data = JSON.parse(this.response);

  let moveListUnsorted = data.map((moveList) => moveList);

  //CREATES TITLE
  let title = document.getElementById("title");
  title.innerHTML = characterName.toUpperCase().split("-").join(" ");
  // console.log(title);

  //CREATES BANNER IMAGE
  let header = document.getElementById("header");
  header.innerHTML = characterName.split("-").join(" ");
  header.setAttribute(
    "style",
    `background-image: url("../images/banner/${characterName}.jpg")`
  );

  function compare(a, b) {
    // a should come before b in the sorted order
    if (a.command < b.command) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.command > b.command) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  }

  moveList = moveListUnsorted.sort(compare);
  // console.log(moveList);

  const HEADERS = [
    "Command",
    "Hit Range",
    "Damage",
    "Startup",
    "Hit",
    "Block",
    "Counter Hit",
    "Notes",
  ];

  //FUNCTION TO CREATE TABLE HEAD
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      th.setAttribute("id", key.replace(/\s+/g, "-").toLowerCase());
      row.appendChild(th);
    }
  }

  //FUNCTION TO CREATE THE TABLE ELEMENTS
  function generateTable(table, moveList) {
    for (let element of moveList) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }

  //GRAB THE PARENT CONTAINER TO INSERT TABLE CHILDREN
  let table = document.querySelector("table");

  // //RUN THE FUNCTIONS
  generateTableHead(table, HEADERS);
  generateTable(table, moveList);
};
//Send Request
request.send();
