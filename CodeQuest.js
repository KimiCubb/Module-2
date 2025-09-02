const quizData = [
  {
    question: "What is the fastest land animal?",
    answers: ["Lion", "Cheetah", "Horse", "Greyhound"],
    correct: 1, // Cheetah
  },
  {
    question: "Which mammal is capable of true flight?",
    answers: ["Bat", "Flying Squirrel", "Sugar Glider", "Colugo"],
    correct: 0, // Bat
  },
  {
    question: "What do pandas mainly eat?",
    answers: ["Bamboo", "Fish", "Grass", "Berries"],
    correct: 0, // Bamboo
  },
  {
    question: "What is the largest species of shark?",
    answers: [
      "Great White Shark",
      "Hammerhead Shark",
      "Whale Shark",
      "Tiger Shark",
    ],
    correct: 2, // Whale Shark
  },
  {
    question: "How many legs does a spider have?",
    answers: ["6", "8", "10", "12"],
    correct: 1, // 8
  },
];

let currentQuestion = 0;
let selectedAnswers = Array(quizData.length).fill(null);

const questionSection = document.getElementById("question-section");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const scoreSection = document.getElementById("score-section");
const scoreSummary = document.getElementById("score-summary");
const restartBtn = document.getElementById("restart-btn");
const startSection = document.getElementById("start-section");
const startBtn = document.getElementById("start-btn");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion() {
  // Clear previous
  questionContainer.innerHTML = "";
  answersContainer.innerHTML = "";
  nextBtn.style.display = "none";
  submitBtn.style.display = "none";

  const q = quizData[currentQuestion];
  questionContainer.textContent = `Q${currentQuestion + 1}: ${q.question}`;

  q.answers.forEach((answer, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    if (selectedAnswers[currentQuestion] === idx) {
      btn.classList.add("selected");
    }
    btn.onclick = () => selectAnswer(idx);
    answersContainer.appendChild(btn);
  });

  // Show next or submit button if answered
  if (selectedAnswers[currentQuestion] !== null) {
    if (currentQuestion < quizData.length - 1) {
      nextBtn.style.display = "inline-block";
    } else {
      submitBtn.style.display = "inline-block";
    }
  }
}

function selectAnswer(idx) {
  selectedAnswers[currentQuestion] = idx;
  // Highlight selected
  Array.from(answersContainer.children).forEach((btn, i) => {
    btn.classList.toggle("selected", i === idx);
  });
  // Show next or submit button
  if (currentQuestion < quizData.length - 1) {
    nextBtn.style.display = "inline-block";
  } else {
    submitBtn.style.display = "inline-block";
  }
}

nextBtn.onclick = () => {
  if (selectedAnswers[currentQuestion] !== null) {
    currentQuestion++;
    loadQuestion();
  }
};

submitBtn.onclick = () => {
  if (selectedAnswers[currentQuestion] !== null) {
    showScore();
  }
};

function showScore() {
  questionSection.style.display = "none";
  scoreSection.style.display = "block";

  let correctCount = 0;
  scoreSummary.innerHTML = "";
  quizData.forEach((q, i) => {
    const userAnswer = selectedAnswers[i];
    const isCorrect = userAnswer === q.correct;
    if (isCorrect) correctCount++;

    const qDiv = document.createElement("div");
    qDiv.className = "score-question";

    const qText = document.createElement("div");
    qText.textContent = `Q${i + 1}: ${q.question}`;
    qDiv.appendChild(qText);

    q.answers.forEach((ans, idx) => {
      const ansDiv = document.createElement("div");
      ansDiv.textContent = ans;
      ansDiv.className = "score-answer";
      if (idx === q.correct) ansDiv.classList.add("correct");
      if (userAnswer === idx && userAnswer !== q.correct)
        ansDiv.classList.add("incorrect");
      if (userAnswer === idx) ansDiv.classList.add("user-selected");
      qDiv.appendChild(ansDiv);
    });

    scoreSummary.appendChild(qDiv);
  });

  const percent = Math.round((correctCount / quizData.length) * 100);
  const result = document.createElement("div");
  result.className = "score-percent";
  result.textContent = `Score: ${correctCount} / ${quizData.length} (${percent}%)`;
  scoreSummary.prepend(result);
}

restartBtn.onclick = () => {
  shuffleArray(quizData); // Shuffle questions
  currentQuestion = 0;
  selectedAnswers = Array(quizData.length).fill(null);
  scoreSection.style.display = "none";
  questionSection.style.display = "block";
  loadQuestion();
};

startBtn.onclick = () => {
  startSection.style.display = "none";
  questionSection.style.display = "block";
  loadQuestion();
};

// On page load, only show start section
startSection.style.display = "block";
questionSection.style.display = "none";
scoreSection.style.display = "none";

// Initial load
loadQuestion();
