let data = {};

let data = {};

async function loadData() {
    let res = await fetch("data.json");
    data = await res.json();

    document.getElementById("weekTitle").innerText = data.title;

    // Enable buttons after data is ready
    document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}

// Disable buttons initially
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
    loadData();
});

function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;   // slower (better for learning)
    utterance.pitch = 1;

    speechSynthesis.cancel(); // stop previous sound
    speechSynthesis.speak(utterance);
}
let current = 0;
let score = 0;

function showVocab() {
    let html = "<h2>Vocabulary</h2>";

    data.vocabulary.forEach((v, i) => {
        html += `
        <div onclick="speakWord(${i})">
            <p><b>${v.word}</b></p>
            <p>${v.meaning}</p>
            <hr>
        </div>
        `;
    });

    document.getElementById("content").innerHTML = html;
}

function speakWord(index) {
    speak(data.vocabulary[index].word);
}

function startQuiz() {
    current = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    let q = data.quiz[current];

    let html = `
        <h2 onclick="speak('${q.question}')">${q.question} 🔊</h2>
    `;

    q.options.forEach((opt, index) => {
        html += `<button class="option" onclick="checkAnswer(${index})">${opt}</button>`;
    });

    document.getElementById("content").innerHTML = html;
}

function checkAnswer(index) {
    let q = data.quiz[current];

    if (index === q.answer) {
        score++;
    }

    current++;

    if (current < data.quiz.length) {
        showQuestion();
    } else {
        document.getElementById("content").innerHTML =
            `<h2>🎉 Score: ${score}/${data.quiz.length}</h2>`;
    }
}
