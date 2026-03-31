const data = {
    vocabulary: [
        { word: "wǒ", meaning: "I" },
        { word: "nǐ", meaning: "you" },
        { word: "tā", meaning: "he/she" }
    ],
    quiz: [
        {
            question: "wǒ",
            options: ["I", "You", "He", "We"],
            answer: 0
        },
        {
            question: "nǐ",
            options: ["I", "You", "He", "They"],
            answer: 1
        }
    ]
};

function showVocab() {
    let html = "<h2>Vocabulary</h2>";
    data.vocabulary.forEach(v => {
        html += `<p>${v.word} = ${v.meaning}</p>`;
    });

    document.getElementById("content").innerHTML = html;
}

let current = 0;
let score = 0;

function startQuiz() {
    current = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    let q = data.quiz[current];

    let html = `<h2>${q.question}</h2>`;

    q.options.forEach((opt, index) => {
        html += `<button onclick="checkAnswer(${index})">${opt}</button>`;
    });

    document.getElementById("content").innerHTML = html;
}

function checkAnswer(index) {
    let q = data.quiz[current];

    if (index === q.answer) {
        score++;
        alert("Correct!");
    } else {
        alert("Wrong!");
    }

    current++;

    if (current < data.quiz.length) {
        showQuestion();
    } else {
        document.getElementById("content").innerHTML =
            `<h2>Score: ${score}</h2>`;
    }
}