const loadAdvice = async (url) => {
    try {
        const res = await fetch(url);
        const advice = await res.json();
        displayAdvice(advice);
        
    }
    catch(error){
        console.log(error)
    }
}

const displayAdvice = advice =>{
    console.log(advice.slip)
    document.getElementById("advice-id").innerText = advice.slip.id;
    document.getElementById("advice").innerText = advice.slip.advice;
}
const url = "https://api.adviceslip.com/advice";
loadAdvice(url)