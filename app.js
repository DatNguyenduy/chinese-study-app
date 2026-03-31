let data = {};
async function loadData() {
    try {
        let res = await fetch("data.json");

        if (!res.ok) {
            throw new Error("Cannot load data.json");
        }

        data = await res.json();

        document.getElementById("weekTitle").innerText = data.title;

        // Enable buttons
        document.querySelectorAll("button").forEach(btn => btn.disabled = false);

    } catch (err) {
        console.error(err);
        document.getElementById("content").innerHTML =
            "<p style='color:red;'>❌ Failed to load data</p>";
    }
}

// Disable buttons initially
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnVocab").disabled = true;
    document.getElementById("btnQuiz").disabled = true;

    loadData();
});

function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}
let current = 0;
let score = 0;

function showVocab() {
    let html = "<h2>Vocabulary</h2>";

    data.vocabulary.forEach((v, i) => {
        html += `
        <div class="vocab-item">
            <p class="hanzi">${v.hanzi}</p>
            <p class="pinyin">${v.pinyin}</p>
            <p class="meaning">${v.meaning}</p>

            <button class="sound-btn" onclick="speakWord(${i})">🔊</button>
        </div>
        `;
    });

    document.getElementById("content").innerHTML = html;
}

function speakWord(index) {
    speak(data.vocabulary[index].hanzi); // ✅ correct field
}

function startQuiz() {
    current = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    let q = data.quiz[current];

    let html = `
        <div class="quiz-card">
            <h2 class="question">${q.question}</h2>
            <button class="sound-btn" onclick="speak('${q.question}')">🔊</button>
            <p class="pinyin">${q.pinyin}</p>
        </div>
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
