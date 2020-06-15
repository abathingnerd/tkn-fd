/*THIS CODE MAKES THE REQUEST*/
var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:3000/character', true)

request.onload = function() {
    var data = JSON.parse(this.response)
    let characterLabels = data.map ( character => character.label)

    labels = characterLabels.sort();

    characterLabels.forEach( label => {

        //Create div element for card
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('id', label);

        //Create image element for card
        const thumbnail = document.createElement('img');
        thumbnail.setAttribute('src', 'images/thumbnails/'+label+'.jpg');

        //create div element for name
        const characterName = document.createElement('div');
        characterName.setAttribute('class', 'card-name');
        // characterName.setAttribute('id', 'card-'+name);
        characterName.textContent = (label);

        app.appendChild(card);
        card.appendChild(thumbnail);
        card.appendChild(characterName);
        // console.log(name);

        //create div to show text for testing
        const someText = document.createElement('div');
        someText.textContent = ('text');
        sidebar.appendChild(someText);
    });
}

//Send Request
request.send()