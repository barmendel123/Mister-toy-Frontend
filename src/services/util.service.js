
export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomLables,
    dateToString
}
function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}
function getRandomLables(size = 3) {
    var options = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
    var labels = [];
    while (size > 0) {
        size--;
        labels.push(options[Math.floor(Math.random() * options.length)])
    }
    return labels;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
function dateToString(date) {
    return Intl.DateTimeFormat('en-us', { dateStyle: 'short', timeStyle: 'short', hour12: false }).format(new Date(date))
}