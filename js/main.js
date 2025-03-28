const instrumentsImg = document.querySelectorAll('img'),
    instrumentBoard = document.querySelector('#instruments'),
    dropZones = document.querySelectorAll('.dropZone'),
    playButton = document.querySelector('#playButton'),
    pauseButton = document.querySelector('#pauseButton'),
    resetButton = document.querySelector('#resetButton'),
    muteButton = document.querySelector('#muteButton');

let instruments = {}; // created an empty obejct to later store key value pairs of instruments to play them at the same time

let draggedPiece;

function startedDragging() {
    console.log("dragStart called");
    draggedPiece = this;
}


function draggedOver(e) {
    console.log("dragOver called");
    e.preventDefault();
}

function dropped(e) {
    console.log("drop called")
    e.preventDefault();
    this.appendChild(draggedPiece);

    createAudio(draggedPiece.id, this);
}

function resetInstruments() {
    dropZones.forEach(zone => {
        //removing all children in one go
        while (zone.firstChild) {
            instrumentBoard.appendChild(zone.firstChild);
        }
        
    });

    // stoping and reseting all audio elements
    Object.values(instruments).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    instruments = {}; // Clearing stored audio elements

}

function createAudio(selectedInstrument, selectedDropZone) {
    let instrumentAudio = document.createElement('audio');
    console.log(instruments);
    instrumentAudio.src =  `../audio/${selectedInstrument}.m4a`;
    instrumentAudio.load();
    instrumentAudio.loop = true;
  
    selectedDropZone.appendChild(instrumentAudio);

    // creating key value pairs to put the audio in the object
    instruments[selectedInstrument] = instrumentAudio;
}

function playAudio() {
    console.log("playAudio called")
    dropZones.forEach(zone => {

        //object.values lets me access an array of the values of the object in this case the stored instruments
        Object.values(instruments).forEach(audio => {
            audio.play();
        });
        
    })
}

function pauseAudio() {
    console.log("pauseAudio called")
    dropZones.forEach(zone => {
        Object.values(instruments).forEach(audio => {
            audio.pause();
        });
        
    })
}

function toggleMute() {
    console.log("toggleMute called")
    // if the audio.muted is false it will be set to true and vice versa
    Object.values(instruments).forEach(audio => {
        audio.muted = !audio.muted;
    });
}


instrumentsImg.forEach(instrument => {instrument.addEventListener('dragstart', startedDragging);});

dropZones.forEach(dropZone => {dropZone.addEventListener('dragover', draggedOver);});
dropZones.forEach(dropZone => {dropZone.addEventListener('drop', dropped);});

resetButton.addEventListener('click', resetInstruments);
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
muteButton.addEventListener('click', toggleMute);
