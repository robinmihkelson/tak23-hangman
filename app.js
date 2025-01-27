const scoreSpan = document.getElementById('score');
const guessedWordDiv = document.getElementById('word');
const alphabetDiv = document.getElementById('alphabet');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

let maxMistakes = 10;
let score = maxMistakes; 
scoreSpan.innerText = score;

const alphabet = 'abcdefghijklmnopqrstuvwxyzõäöü';
let guessedLetters = [];
let guessedWord = [];
let word;

fetch('hangman.txt')
    .then(res => res.text())
    .then(words => {
        words = words.split(/\r?\n/);
        const i = Math.floor(Math.random() * words.length);
        word = words[i];

        for (let char of word) {
            guessedWord.push(char.match(/[a-zõäöü]/i) ? '_' : char);
        }

        guessedWordDiv.innerText = guessedWord.join(' ');
    });

function drawHangman(stage) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#333";
    ctx.beginPath();

    switch (stage) {
        case 1:
            ctx.moveTo(10, 240);
            ctx.lineTo(100, 240);
            break;
        case 2:
            ctx.moveTo(40, 240);
            ctx.lineTo(40, 20);
            break;
        case 3:
            ctx.moveTo(40, 20);
            ctx.lineTo(120, 20);
            break;
        case 4:
            ctx.moveTo(120, 20);
            ctx.lineTo(120, 50);
            break;
        case 5:
            ctx.arc(120, 65, 15, 0, Math.PI * 2);
            break;
        case 6:
            ctx.moveTo(120, 80);
            ctx.lineTo(120, 140);
            break;
        case 7:
            ctx.moveTo(120, 100);
            ctx.lineTo(100, 120);
            break;
        case 8:
            ctx.moveTo(120, 100);
            ctx.lineTo(140, 120);
            break;
        case 9:
            ctx.moveTo(120, 140);
            ctx.lineTo(100, 180);
            break;
        case 10:
            ctx.moveTo(120, 140);
            ctx.lineTo(140, 180);
            break;
    }

    ctx.stroke();
}

function updateHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i <= (maxMistakes - score); i++) {
        drawHangman(i);
    }
}

document.addEventListener('keydown', e => {
    const keyName = e.key.toLowerCase();
    if (alphabet.includes(keyName)) checkLetter(keyName);
});

for (let letter of alphabet) {
    const letterSpan = document.createElement('span');
    letterSpan.id = letter;
    letterSpan.innerText = letter.toUpperCase();
    
    letterSpan.addEventListener('click', () => checkLetter(letter));
    
    alphabetDiv.appendChild(letterSpan);
}

function checkLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);

        if (word.toLowerCase().includes(letter)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i].toLowerCase() === letter) {
                    guessedWord[i] = word[i];
                }
            }
            guessedWordDiv.innerText = guessedWord.join(' ');
            document.getElementById(letter).classList.add('correct');
        } else {
            score--;
            scoreSpan.innerText = score;
            updateHangman(); // Redraw the hangman with new mistakes
            document.getElementById(letter).classList.add('incorrect');
        }

        if (score === 0) {
            alert(`Kaotasid mängu! Õige sõna oli: ${word}`);
        } else if (!guessedWord.includes('_')) {
            alert('Võitsid mängu!');
        }
    }
}

restartButton.addEventListener('click', () => {
    location.reload();
});
