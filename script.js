const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

const textInput = document.getElementById("text");
const speed = document.getElementById("speakingSpeed");

let currentChar

voiceList = document.querySelector("select");

let synth = speechSynthesis;


playBtn.addEventListener('click', () =>{
    playText(textInput.value)
    console.log(speed.value);
})

pauseBtn.addEventListener('click', pauseText)
stopBtn.addEventListener('click', stopText)
speed.addEventListener('change', () => {
    stopText()
    playText(utterance.text.substring(currentChar))
})


const utterance = new SpeechSynthesisUtterance(text)
    utterance.addEventListener('boundary', e =>{
        currentChar = e.charIndex
    })
    
    
    utterance.addEventListener('end', () => {
        textInput.disabled = false
    })


function voices(){
    for(let voice of synth.getVoices() ){
        
        let selected = voice.name === "Google US English" ? "Selected" : "";
        let option = `<option value="${voice.name}"${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}
synth.addEventListener("voiceschanged", voices);

function playText(text){
    if (speechSynthesis.pause && speechSynthesis.speaking){
        return speechSynthesis.resume()
    }
    for(let voice of synth.getVoices() ){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    utterance.text = text
    utterance.rate = speed.value || 1
    textInput.disabled = true
    speechSynthesis.speak(utterance)
}

function pauseText(){
    if(speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText(){
    speechSynthesis.resume()
    speechSynthesis.cancel()
}