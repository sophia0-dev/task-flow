console.log("Script loaded!");
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Send a request to the server to authenticate the user
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'User logged in successfully') {
        // Redirect the user to the dashboard
        window.location.href = '#dashboard';
      } else {
        alert('Invalid username or password');
      }
    })
    .catch((error) => console.error(error));
});
const dashboard = document.getElementById('dashboard');

if (window.location.hash === '#dashboard') {
  dashboard.style.display = 'block';
  document.getElementById('login').style.display = 'none';
}

document.getElementById('todo-btn').addEventListener('click', () => {
  // Redirect to To-Do List page
});

document.getElementById('cgpa-btn').addEventListener('click', () => {
  // Redirect to CGPA Calculator page
});

document.getElementById('quiz-btn').addEventListener('click', () => {
  // Redirect to Quiz page
});





const todoListSection = document.getElementById('todo-list');
const cgpaCalculatorSection = document.getElementById('cgpa-calculator');
const quizSection = document.getElementById('quiz');
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoListItems = document.getElementById('todo-list-items');



document.getElementById('todo-btn').addEventListener('click', () => {
  dashboard.style.display = 'none';
  todoListSection.style.display = 'block';
  cgpaCalculatorSection.style.display = 'none';
  quizSection.style.display = 'none';
  loginForm.style.display = 'none';
    fetch('/auth/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      task
    })
  })
    .then((response) => response.json())
    .then((data) => {
      const todoItem = document.createElement('li');
      todoItem.textContent = data.task;
      todoListItems.appendChild(todoItem);
      todoInput.value ='';
    })
    .catch((error) => console.error(error));
});
addTodoBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task !== '') {
    const li = document.createElement('li');
    li.textContent = task;
    todoListItems.appendChild(li);
    todoInput.value = '';
  }
});

todoListItems.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed');
  }
});
// delete tasks
todoListItems.addEventListener('dblclick', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.remove();
  }
});
//to edit tasks
todoListItems.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (e.target.tagName === 'LI') {
    const newTask = prompt('Enter new task:', e.target.textContent);
    if (newTask !== null) {
      e.target.textContent = newTask;
    }
  }
});
function saveTasks() {
  const tasks = [];
  todoListItems.childNodes.forEach((li) => {
    tasks.push(li.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTodoBtn.addEventListener('click', saveTasks);
todoListItems.addEventListener('dblclick', saveTasks);
todoListItems.addEventListener('contextmenu', saveTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks !== null) {
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task;
      todoListItems.appendChild(li);
    });
  }
}

loadTasks();

//timer
const timerInput = document.getElementById('timer-input');
const startTimerBtn = document.getElementById('start-timer-btn');
const timerDisplay = document.getElementById('timer-display');

let timerInterval ='';
let timeLeft ='';

// startTimerBtn.addEventListener('click', () => {
//   timeLeft = parseInt(timerInput.value) * 60;
//   timerInterval = setInterval(() => {
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//     timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     timeLeft--;
//     if (timeLeft < 0) {
//       clearInterval(timerInterval);
//       alert('Time\'s up!');
//     }
//   }, 1000);
// });
//task timer

addTodoBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task !== '') {
    const li = document.createElement('li');
    li.textContent = task;
    const timerInput = document.createElement('input');
    timerInput.type = 'number';
    timerInput.placeholder = 'Enter time in minutes';
    const startTimerBtn = document.createElement('button');
    startTimerBtn.textContent = 'Start Timer';
    li.appendChild(timerInput);
    li.appendChild(startTimerBtn);
    todoListItems.appendChild(li);
    todoInput.value = '';
  }
});

function updateTaskCount() {
  const tasks = todoListItems.children.length;
  const completedTasks = document.querySelectorAll('.completed').length;
  document.getElementById('task-count').textContent = `Total Tasks: ${tasks}`;
  document.getElementById('completed-task-count').textContent =`Tasks: ${completedTasks}`;
}

addTodoBtn.addEventListener('click', updateTaskCount);
todoListItems.addEventListener('click', updateTaskCount);
todoListItems.addEventListener('dblclick', updateTaskCount);



document.getElementById('cgpa-btn').addEventListener('click', () => {
  dashboard.style.display = 'none';
  todoListSection.style.display = 'none';
  cgpaCalculatorSection.style.display = 'block';
  quizSection.style.display = 'none';
});
const calculateCgpaBtn = document.getElementById('calculate-cgpa-btn');
const cgpaResult = document.getElementById('cgpa-result');
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
  for (let i = 1; i <= 10; i++) {
    document.querySelector(input[name="course-name-${i}"]).value = '';
    document.querySelector(select[name="course-grade-${i}"]).value = 'A';
    document.querySelector(input[name="course-credit-${i}"]).value = '';
  }
  cgpaResult.textContent = '';
});


calculateCgpaBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let totalGradePoints = 0;
  let totalCredits = 0;
  for (let i = 1; i <= 10; i++) {
    const courseName = document.querySelector(input[name="course-name-${i}"]).value;
    const courseGrade = document.querySelector(select[name="course-grade-${i}"]).value;
    const courseCredit = parseInt(document.querySelector(input[name="course-credit-${i}"]).value);
    if (courseName !== '' && courseCredit !== '') {
      const gradePoints = getGradePoints(courseGrade);
      totalGradePoints += gradePoints * courseCredit;
      totalCredits += courseCredit;
    }
  }
  if (totalCredits > 0) {
    const cgpa = totalGradePoints / totalCredits;
    cgpaResult.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
  } else {
    cgpaResult.textContent = 'Please enter valid course information';
  }
});

function getGradePoints(grade) {
  switch (grade) {
    case 'A':
      return 5;
    case 'B':
      return 4;
    case 'C':
      return 3;
    case 'D':
      return 2;
    case 'F':
      return 0;
    default:
      return 0;
  }
}



document.getElementById('quiz-btn').addEventListener('click', () => {
  dashboard.style.display = 'none';
  todoListSection.style.display = 'none';
  cgpaCalculatorSection.style.display = 'none';
  quizSection.style.display = 'block';
});

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');

let currentQuestion = 0;
let score = 0;
const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 0
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
    answer: 2
  },
  // Add more questions here
];

function loadQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'option';
    radioInput.value = index;
    const label = document.createElement('label');
    label.textContent = option;
    optionElement.appendChild(radioInput);
    optionElement.appendChild(label);
    optionsContainer.appendChild(optionElement);
  });
}

submitBtn.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    const selectedAnswer = parseInt(selectedOption.value);
    if (selectedAnswer === questions[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      resultElement.textContent = `Quiz finished! Your score is ${score} out of ${questions.length}`;
      submitBtn.disabled = true;
    } else {
      loadQuestion();
    }
  }
});
  fetch('/api/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resultElement }),
  })
    .then((response) => response.json())
    .then((data) => {
   resultElement.textContent = 'You have completed the quiz ';
    })
    .catch((error) => console.error(error));

loadQuestion();


