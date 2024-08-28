let easyLvlWords = [
  "Python",
  "CSS",
  "HTML",
  "PHP",
  "Runner",
  "Roles",
  "Task",
  "Object",
  "Repo",
  "Branch",
  "API",
  "Promise",
  "Wait",
  "Server",
  "Client",
  "JSON",
  "Coding",
  "Code",
  "OOP",
  "Github",
  "Testing",
  "Twitter",
  "Stack",
  "Queue",
  "LIFO",
  "FIFO",
  "List",
  "Array",
  "Tree",
  "Graph",
];

let normalLvlWords = [
  "BackEnd",
  "FrontEnd",
  "Programming",
  "JavaScript",
  "Template",
  "LinkedIn",
  "Bootstrap",
  "Internet",
  "Working",
  "Youtube",
  "Website",
  "Property",
  "LinkedList",
  "Pentester",
  "Attacker",
];
let hardLvlWords = [
  "Documentation",
  "LocalStorage",
  "SessionStorage",
  "Inheritance",
  "Polymorphism",
  "Encapsulation",
  "Abstraction",
  "Constructor",
  "Functions",
  "Prototype",
  "CyberSecurity",
  "Destructuring",
  "Conditions",
  "Variables",
  "Generators",
];

let words = [];

let levels = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

let optionsDiv = document.querySelector(".level-options");
let selectBox = document.querySelector("select");
let levelSpan = document.querySelector(".message .level");
let seconds = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let currWord = document.querySelector(".word");
let input = document.querySelector(".input");
let wordsBox = document.querySelector(".upcoming-words");
let secondsLeft = document.querySelector(".time .seconds");
let scored = document.querySelector(".score .got");
let total = document.querySelector(".score .total");
let finish = document.querySelector(".finish");

setAllData();

// Prevent Paste Event
input.onpaste = () => false;

selectBox.onchange = setAllData;

startBtn.onclick = function () {
  this.remove();
  optionsDiv.remove();
  input.focus();
  wordsBox.classList.add("show");
  generateWords();
};

function setAllData() {
  levelSpan.innerHTML = selectBox.value;
  seconds.innerHTML = levels[selectBox.value];
  secondsLeft.innerHTML = levels[selectBox.value];

  // Specify The Words For Each Level
  words =
    levelSpan.innerHTML === "Easy"
      ? easyLvlWords
      : levelSpan.innerHTML === "Normal"
      ? normalLvlWords
      : hardLvlWords;

  total.innerHTML = words.length;
}

function generateWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  currWord.innerHTML = randomWord;
  wordsBox.innerHTML = "";
  words.splice(words.indexOf(randomWord), 1);

  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(words[i]));
    wordsBox.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  secondsLeft.innerHTML =
    scored.innerHTML === "0"
      ? levels[selectBox.value] * 2
      : levels[selectBox.value];

  let start = setInterval(() => {
    secondsLeft.innerHTML--;
    if (secondsLeft.innerHTML === "0") {
      clearInterval(start);
      if (currWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scored.innerHTML++;
        if (words.length) {
          generateWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          span.appendChild(document.createTextNode("Amazing"));
          finish.appendChild(span);
          wordsBox.remove();
          input.blur();

          setDataToLocalStorage();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        span.appendChild(document.createTextNode("Game Over"));
        finish.appendChild(span);
        input.blur();

        setDataToLocalStorage();
      }
    }
  }, 1000);
}

function setDataToLocalStorage() {
  let info = {
    level: selectBox.value,
    score: scored.innerHTML,
    total: total.innerHTML,
    date: new Date(),
  };
  localStorage.setItem(JSON.stringify(info), "Scored");
}
