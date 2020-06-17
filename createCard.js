/*THIS CODE MAKES THE REQUEST*/
let request = new XMLHttpRequest()

request.open('GET', 'http://192.168.1.25:3000/character', true)

request.onload = async function() {
    
    let data = JSON.parse(this.response)

    let characterLabels = data.map ( character => character.label)
    labels = characterLabels.sort();

    const characterSelect = document.getElementById('character-select');

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

        // document.getElementById(label).addEventListener("click", function(){
        //     window.alert(`Hit ${label}`); 
        // });

        document.getElementById(label).onclick = function () {
            location.href = "character/akuma.html";
        };
        
    });
}
//Send Request
request.send()



