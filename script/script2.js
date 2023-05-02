let questionNumbers = prompt("how many questions you want to answer ?")
// Fetch quiz data from API
const serverResponse = await fetch(`https://opentdb.com/api.php?amount=${questionNumbers}`);
const data = await serverResponse.json();
const dataFetched = data.results;

// Selecting base elements
const questionH3 = document.querySelector(".question > h3");
const optionParent = document.querySelector(".options");
const questionBox = document.querySelector(".question");
const circlesParent = document.querySelector(".question-curves");

let myIndex = 0;
let options = [];
console.log(dataFetched);

// Add curves to the quiz
for (let index = 0; index < dataFetched.length; index++) {
  circlesParent.innerHTML += "<div class='curve'></div>";
}

// Read and display each question
function read() {
  // Create a new option parent for each question
  const newOptionParent = document.createElement("div");
  newOptionParent.classList.add("options");
  newOptionParent.id = "options";
  questionBox.append(newOptionParent);

  // Get question data and options
  const incorrectAnswers = dataFetched[myIndex].incorrect_answers;
  options.push(dataFetched[myIndex].correct_answer);
  questionH3.innerHTML = dataFetched[myIndex].question;

  incorrectAnswers.forEach(function (incorrectAnswer) {
    options.push(incorrectAnswer);
  });

  // Display options
  options = options.sort();
  options.forEach((op, i) => newOptionParent.innerHTML += `<div class='option'>${op}</div>`);

  // Add event listeners for each option
  const optionChildren = document.querySelectorAll(".option");
  optionChildren.forEach((op) => op.addEventListener("click", function (el) {
    // Change the color of the circle and remove options
    if (this.innerHTML == dataFetched[myIndex].correct_answer) {
      buttonChange("green");
    } else {
      buttonChange("red");
    }
  }));

  // Remove current question and options and move to the next question
  function buttonChange(color) {
    const selectedCircle = document.querySelector(`.question-curves :nth-child(${myIndex + 1})`);
    selectedCircle.style.backgroundColor = color;
    options.splice(0, options.length);
    newOptionParent.remove();
    questionH3.innerHTML = "";
    myIndex += 1;
    read();
  }
}

// Start the quiz by displaying the first question
read();
