const scoreSpan = document.getElementById('score');
const guessedWordDiv = document.getElementById('word');
const alphabetDiv = document.getElementById('alphabet');

const alphabet = 'abdefghijklmnoprsšzžtuvõäöü';
let guessedLetters = [];

let score = 10;
scoreSpan.innerText = score;

let word = 'Kuressaare Ametikool!';
let guessedWord = '';

for (let char of word) {
    if (char.toUpperCase() !== char.toLowerCase()) {
        guessedWord += '_';
    } else {
        guessedWord += char;
    }
}

guessedWordDiv.innerText = guessedWord;

for (let letter of alphabet) {
    const letterSpan = document.createElement('span');
    letterSpan.id = letter;
    letterSpan.innerText = letter.toUpperCase();

    letterSpan.addEventListener('click', () => {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);

            if (word.toLowerCase().includes(letter)) {
                letterSpan.classList.add('correct');
                let newWord = '';
                for (let i = 0; i < word.length; i++) {
                    if (guessedLetters.includes(word[i].toLowerCase()) || word[i] === ' ') {
                        newWord += word[i];
                    } else {
                        newWord += '_';
                    }
                }
                guessedWordDiv.innerText = newWord;
            } else {
                score--;
                scoreSpan.innerText = score;
                letterSpan.classList.add('incorrect');
            }

            if (score === 0) {
                alert('Kaotasid Mängu!');
                alphabetDiv.innerHTML = '';
            }
        }
    });

    alphabetDiv.appendChild(letterSpan);
}

