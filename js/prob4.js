const getData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.ok === false) {
            alert("Please Put a valid link.")
        }
        else {
            displayData(data.result)
        }
    }
    catch (error) {
        console.log(error)
    }
}

const displayData = (data) => {
    const { short_link, short_link2, short_link3 } = data;
    document.getElementById("short-link").innerText = `${short_link}`
    document.getElementById("more-btn").addEventListener("click", function () {
        document.getElementById("short-link2").innerText = `${short_link2}`
        document.getElementById("short-link3").innerText = `${short_link3}`
    })
}

document.getElementById("copy-short-link").addEventListener("click", function(){
    const copyText = document.getElementById("short-link").innerText;
    copyToClipboard(copyText);
})
document.getElementById("copy-short-link2").addEventListener("click", function(){
    const copyText = document.getElementById("short-link2").innerText;
    copyToClipboard(copyText);
})
document.getElementById("copy-short-link3").addEventListener("click", function(){
    const copyText = document.getElementById("short-link3").innerText;
    copyToClipboard(copyText);
})

const copyToClipboard = (copyText) => {
    navigator.clipboard.writeText(copyText)
    alert("Copied the text: " + copyText);
}

const getInput = () => {
    const inputValue = document.getElementById("input-field").value;
    const url = `https://api.shrtco.de/v2/shorten?url=${inputValue}`
    getData(url);
}