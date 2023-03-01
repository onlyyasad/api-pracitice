const getData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if(data.title === "No Definitions Found"){
            alert("Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.")
        }
        else{
            displayData(data[0])
        }
    }
    catch (error) {
        console.log(error)
    }
}

const displayData = (data) => {

    const { word, meanings, phonetics, sourceUrls } = data;
    console.log(phonetics)
    document.getElementById("phonetic").innerText = "";
    document.getElementById("audio").setAttribute("src", "");
    document.getElementById("word").innerText = word;
    document.getElementById("source").innerText = sourceUrls;
    document.getElementById("source").setAttribute("href", `${sourceUrls}`);
    if (phonetics.length > 0) {
        getAudio(phonetics);
    }
    displayMeanings(meanings);
}

const getAudio = (phonetics) => {
    phonetics.forEach(phonetic => {
        console.log(phonetic)
        if (phonetic.text !== "undefined" && phonetic.audio !== "") {
            document.getElementById("phonetic").innerText = phonetic.text;
            document.getElementById("audio").setAttribute("src", `${phonetic.audio}`);
        }
    })
}

const displayMeanings = (meanings) => {
    document.getElementById("details").classList.remove("hidden");
    const parentDiv = document.getElementById("parent");
    parentDiv.innerHTML = "";
    meanings.forEach(meaning => {

        const { partOfSpeech, definitions, synonyms } = meaning;
        // console.log(meaning);
        const newDiv = document.createElement("div");
        newDiv.classList.add("flex", "flex-col", "gap-4");
        newDiv.innerHTML = `
            <div class="flex justify-between items-center gap-2">
                <p class="font-semibold font-serif">${partOfSpeech}</p>
                <div class="bg-emerald-400 h-[2px] mt-1 w-full"></div>
            </div>
            <div class="flex flex-col gap-4">
                <p class="font-semibold">Meaning</p>
                <ul id="${partOfSpeech}-li-container" class="flex flex-col gap-2 list-disc pl-8">
                
                </ul>
            </div>
            <div class="flex gap-2">
                <p class="font-semibold">Synonyms</p>
                <p>${synonyms.join(", ")}</p>
            </div>
        `
        parentDiv.appendChild(newDiv);

        const liContainer = document.getElementById(`${partOfSpeech}-li-container`);

        definitions.forEach(definition => {
            // console.log(definition);
            const li = document.createElement("li");
            li.innerHTML = `
                <p>${definition.definition}</p>
                <p class="font-serif text-emerald-600"><i>${definition.example ? definition.example : ""}</i></p>
            `
            liContainer.appendChild(li);
        })
    })
}

const playAudio = () => {
    const audio = document.getElementById("audio");
    audio.play()
}

const getInput = () => {
    const inputText = document.getElementById("input-word").value;
    if(inputText === ""){
        document.getElementById("details").classList.add("hidden");
        alert("Please type a word in the search box")
    }
    else{
        findWord(inputText);
        document.getElementById("input-word").value = "";
    }
}

const findWord = (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    getData(url);
}
