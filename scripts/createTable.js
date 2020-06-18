/*THIS CODE MAKES THE REQUEST*/
let request = new XMLHttpRequest();

function getCharacterName() {
  let fullPath = window.location.pathname;
  let slicedPath = fullPath.slice(1, fullPath.length - 5);
  return slicedPath;
}

let characterName = getCharacterName();

request.open(
  "GET",
  `http://192.168.1.25:3000/character/${characterName}`,
  true
);

request.onload = function () {
  let data = JSON.parse(this.response);

  let moveListUnsorted = data.map((moveList) => moveList);

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

  const HEADERS = [
    "Command",
    "Hit Range",
    "Startup",
    "On Hit",
    "On Block",
    "On CH",
    "Notes",
  ];

  // //FUNCTION TO CREATE TABLE HEAD
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  // //FUNCTION TO CREATE THE TABLE ELEMENTS
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

  // //GRAB THE PARENT CONTAINER TO INSERT TABLE CHILDREN
  let table = document.querySelector("table");

  // //RUN THE FUNCTIONS
  generateTableHead(table, HEADERS);
  generateTable(table, moveList);
};
//Send Request
request.send();
