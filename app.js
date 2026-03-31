let data = {};

async function loadData() {
    let res = await fetch("data.json");
    data = await res.json();

    document.getElementById("weekTitle").innerText = data.title;
}

loadData();
function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN"; // Chinese
    speechSynthesis.speak(utterance);
}
