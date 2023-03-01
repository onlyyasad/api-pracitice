const loadData = async (url) => {
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayData(data);
    }
    catch(error){
        console.log(error)
    }
}

const displayData = (countries) =>{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    countries.forEach(country =>{
        
        const languagesObj = country.languages;
        let languagesNameArr = [];
        for (let language in languagesObj){
            languagesNameArr.push(language);
        }
        let languagesArr = [];
        languagesNameArr.forEach(propertyName =>{
            languagesArr.push(languagesObj[propertyName]);
        })
        
        const newDiv = document.createElement("div");
        newDiv.classList.add("card", "w-full", "bg-base-100", "shadow-xl");
        newDiv.innerHTML = `
            <figure class="h-52"><img class="max-h-52 w-auto" src="${country.flags.svg}" alt="Flag" /></figure>
            <div class="card-body">
                <h2 class="card-title text-md">Name: ${country.name.common}</h2>
                <p>Capital: ${country.capital ? country.capital[0]: "No Capital"}</p>
                <p>Language: ${languagesArr.join(", ")}</p>
            </div>
        `;
        cardContainer.appendChild(newDiv);

    })
}

document.getElementById("region-container").addEventListener("click", function(event){
    const region = event.target.innerText;
    const regionUrl = `https://restcountries.com/v3.1/region/${region}`;
    loadData(regionUrl)
})
const initialUrl = "https://restcountries.com/v3.1/all";
loadData(initialUrl)