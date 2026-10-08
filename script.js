const API_KEY = "3c88713950c53a7784b125ca";
const Country_URL = `https://flagdex.net/flags/in.svg`;
const selects = document.querySelectorAll(".select-container select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");
const showRateBtn = document.querySelector(".exchange-rate")
const fromImage = document.querySelector(".fromImage");
const toImage = document.querySelector(".toImage");
const inputBox = document.querySelector("#inputBox");

async function fetchUrl() {
    try {
        const from = fromCurr.value;
        const to = toCurr.value;
        const URL = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        displayData(data)
    } catch (error) {

    }

}





Object.entries(countryList).forEach(([code, country]) => {
    selects.forEach(select => {

        const option = document.createElement("option");

        option.value = code;
        option.innerHTML = country;
        select.appendChild(option);
    });

});





function displayData(data) {
    const from = fromCurr.value;
    const to = toCurr.value;
    fromImage.src = ""
    toImage.src = ""
    const svg = from.slice(0, 2).toLowerCase();
    const toSvg = to.slice(0, 2).toLowerCase();
    fromImage.src = `https://flagdex.net/flags/${svg}.svg`
    toImage.src = `https://flagdex.net/flags/${toSvg}.svg`

    if (data.base == data.quote) {
        message.innerHTML = "";

        message.innerHTML = "Country name should be different"
        return;
    }
    value = inputBox.value;
    const result = Math.round(value * data.rate);
    message.innerHTML = "";
    message.textContent = `${value} ${data.base} = ${result} ${data.quote}`



}


showRateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetchUrl();

})


