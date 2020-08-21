const button = document.getElementById('button');
const audioElement = document.getElementById('auidio');





// Disable enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}


//  Passing joke to VoiceRSS API

function tellMe(joke) {


    VoiceRSS.speech({
        key: 'c6d8fb4f110140dc92093651a6f2496f',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


//Get jokes from joke api

async function getJokes() {


    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';

    try {

        const responce = await fetch(apiUrl);
        const data = await responce.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`
        } else {
            joke = data.joke;
        }

        //Text to speech
        tellMe(joke);

// Disable button
        toggleButton()

    } catch (error) {
        console.log(error);
    }

}

// getJokes();

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
