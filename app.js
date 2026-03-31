let current = 0;
let score = 0;

function showVocab() {
    let html = "<h2>Vocabulary</h2>";

    data.vocabulary.forEach(v => {
        html += `<p><b>${v.word}</b><br>${v.meaning}</p>`;
    });

    document.getElementById("content").innerHTML = html;
}

function startQuiz() {
    current = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    let q = data.quiz[current];

    let html = `<h2>${q.question}</h2>`;

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
