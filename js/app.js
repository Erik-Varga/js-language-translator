// Variables
const fromText = document.querySelector('.from-text');
const fromSpeak = document.getElementById('from-speak');
const toText = document.querySelector('.to-text');
const selectTag = document.querySelectorAll('select');
const exchangeIcon = document.querySelector('.exchange');
const translateBtn = document.querySelector('button');
const icons = document.querySelectorAll('.row i');
const fromSoundBtn = document.getElementById('from-speak');
const toSoundBtn = document.getElementById('to-speak');
const fromCopyIcon = document.getElementById('from-copy');
const toCopyIcon = document.getElementById('to-copy');
const resetIcon = document.getElementById('reset');

// Functions
function resetTag(){
	selectTag.forEach((tag, id) => {
		for (const country_code in countries) {
			// console.log(country_code);
			let selected;
	
			if (id == 0 && country_code == "en-GB") {
				selected = "selected";
			} else if (id == 1 && country_code =="es-ES")
			{
				selected = "selected";
			}
	
			let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
			tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
		}
	})
}

// Event Listeners
exchangeIcon.addEventListener('click', ()=> {
	// exchanges textarea and select tag values
	let tempText = fromText.value;
	tempLang = selectTag[0].value;
	fromText.value = toText.value;
	selectTag[0].value = selectTag[1].value;
	toText.value = tempText;
	selectTag[1].value = tempLang;
})

translateBtn.addEventListener('click', ()=> {
	let text = fromText.value,
	translateFrom = selectTag[0].value, // gets value fromSelect
	translateTo = selectTag[1].value; // gets value toSelect
	if (!text) return;
	toText.setAttribute("placeholder", "Translating...");
	let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
	// fetch api response, parse into js obj, recieve obj
	fetch(apiUrl).then(res => res.json()).then(data => {
		toText.value = data.responseData.translatedText;
		toText.setAttribute("placeholder", "Translation");
	});
})

// SpeechSynthesisUtterance API method
fromSoundBtn.addEventListener("click",  ()=>{
    let utterance = new SpeechSynthesisUtterance(`${fromText.value}`);
    speechSynthesis.speak(utterance);
});

toSoundBtn.addEventListener("click",  ()=>{
    let utterance = new SpeechSynthesisUtterance(`${toText.value}`);
    speechSynthesis.speak(utterance);
});

// Copy Text Buttons
fromCopyIcon.addEventListener('click', ()=> {
	navigator.clipboard.writeText(fromText.value);
})

toCopyIcon.addEventListener('click', ()=> {
	navigator.clipboard.writeText(toText.value);
})

resetIcon.addEventListener('click', ()=> {
	fromText.value = '';
	toText.value = '';
	resetTag();
})

// On Load
resetTag();

