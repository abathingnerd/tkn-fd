/*THIS CODE MAKES THE REQUEST*/

const characterSelect = document.getElementById('character-select');
// console.log(app);

// const container = document.createElement('div');
// container.setAttribute('class', 'container');

// const sidebar = document.getElementById('sidebar');

// app.appendChild(container);
var request = new XMLHttpRequest()

request.open('GET', 'http://192.168.1.25:3000/character', true)

request.onload = function() {
    var data = JSON.parse(this.response)
    let characterLabels = data.map ( character => character.label)

    labels = characterLabels.sort();

    //FOREACH LOOP TO CREATE A CARD FOR EACH CHARACTER
    characterLabels.forEach( label => {

        //CREATE DIV FOR CARD
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('id', label);

        //CREATE IMAGE FOR CARD
        const thumbnail = document.createElement('img');    
        thumbnail.setAttribute('src', 'images/thumbnails/'+label+'.jpg');

        //CREATE DIV FOR NAME
        const characterName = document.createElement('div');
        characterName.setAttribute('class', 'card-name');
        characterName.textContent = (label);

        //STRUCTURE ELEMENTS FOR CARD
        characterSelect.appendChild(card);
        card.appendChild(thumbnail);
        card.appendChild(characterName);
        
    });

        //create div to show text for testing

    const someText = document.createElement('div');
    someText.textContent = ('text');
    sidebar.appendChild(someText);
}

//Send Request
request.send()