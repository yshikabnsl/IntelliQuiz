const questions = [
  {
    question: "Which keyword is used to create an object in java?",
    options: ["class", "new", "create", "object"],
    answer: 1
  },
  {
    question: "Which method is the entry point of a Java program?",
    options: ["start()", "run()", "main()", "execute()"],
    answer: 2
  },
  {
    question: "What is the size of int data type in Java?",
    options: ["2 bytes", "4 bytes", "8 bytes", "depends on system"],
    answer: 1
  },
  {
    question: "Which of these is NOT a primitive data type?",
    options: ["int", "boolean", "String", "char"],
    answer: 2
  },
  {
    question: "Java source code is converted into which file after compilation?",
    options: [".java", ".exe", ".txt", ".class"],
    answer: 3
  },
  {
    question: "Which concept allows same method name with different parameters?",
    options: ["Overriding", "Encapsulation", "Overloading", "Inheritance"],
    answer: 2
  },
  {
    question: "Which keyword prevents a variable from being modified?",
    options: ["static", "final", "const", "private"],
    answer: 1
  },
  {
    question: "Which collection does not allow duplicate values?",
    options: ["HashSet", "ArrayList", "vector", "LinkedList"],
    answer: 0
  },
  {
    question: "Which exception occurs when dividing a number by zero?",
    options: ["NullPointerException", "IOException", "RuntimeException", "ArithmeticException"],
    answer: 3
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let paused = false;

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("question-card").style.display = "block";
  document.getElementById("lifelines").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
  document.getElementById("result").innerText = "";
  document.getElementById("next-btn").disabled = true;
  document.getElementById("lifeline-options").style.display = "none";
  document.getElementById("use-lifeline").style.display = "inline-block";
  resetTimer();
}

function checkAnswer(selected) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const options = document.querySelectorAll("#options button");
  options[q.answer].classList.add("correct");

  if (selected !== q.answer) {
    // Wrong answer → end quiz immediately
    options[selected].classList.add("wrong");
    endQuiz();
  } else {
    // Correct answer → add score and allow next
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("next-btn").disabled = false;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function resetTimer() {
  timeLeft = 30;
  document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";
  clearInterval(timer);
  timer = setInterval(() => {
    if (!paused) {
      timeLeft--;
      document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";
      if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("result").innerText = "Time's up!";
        document.getElementById("next-btn").disabled = false;
      }
    }
  }, 1000);
}

function showLifelines() {
  paused = true; // pause timer
  document.getElementById("use-lifeline").style.display = "none";
  document.getElementById("lifeline-options").style.display = "block";
}

function useFiftyFifty() {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll("#options button");
  let removed = 0;
  for (let i = 0; i < options.length; i++) {
    if (i !== q.answer && removed < 2) {
      options[i].style.display = "none";
      removed++;
    }
  }
  resumeTimer();
}

function useSkip() {
  resumeTimer();
  nextQuestion();
}

function resumeTimer() {
  paused = false;
}

function endQuiz() {
  document.getElementById("question-card").style.display = "none";
  document.getElementById("lifelines").style.display = "none";
  document.getElementById("end-screen").style.display = "flex";
  document.getElementById("final-score").innerText = "Quiz Over! Final Score: " + score;
}

function playAgain() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("score").innerText = "Score: 0";
  document.getElementById("question-card").style.display = "none";
  document.getElementById("lifelines").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
}
