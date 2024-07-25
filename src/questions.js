export default [
    {
      id: 'q1',
      text: 'What is the invention of Galileo Galilei?',
      answers: [
        'Thermometer',
        'Telescope',
        'Barometer',
        'Microscope',
      ],
    },
    {
      id: 'q2',
      text: 'What is the fullform of Google?',
      answers: [
        'Global Organization of oriented group language of earth',
        'Global Online Observation and Guidance Learning Entity',
        'General Organization for Online Global Learning and Education',
        'Global Online Organized Guide for Learning and Education',
      ],
    },
    // {
    //   id: 'q3',
    //   text: 'Who is the founder of Apple?',
    //   answers: [
    //     'Steve Jobs',
    //     'Jeff Bezos',
    //     'Larry Page',
    //     'Michael Dell',
    //   ],
    // },
    // {
    //   id: 'q4',
    //   text: 'What is a web browser?',
    //   answers: [
    //     'A software program that allows you to access sites on the world wide web.',
    //     'A kind of software.',
    //     'A computer that stores www files.',
    //     'An online data storing site.',
    //   ],
    // },
    // {
    //   id: 'q5',
    //   text: 'For what purpose is <hr> tag used in HTML?',
    //   answers: [
    //     'TO create a horizontal ruler.',
    //     'To format text as bold.',
    //     'To add a table row.',
    //     'To add a horizontal scrollbar.',
    //   ],
    // },
    // {
    //   id: 'q6',
    //   text: 'By what percentage the coorporate tax has been reduced for foreign companies(According to recent budget update)?',
    //   answers: [
    //     '5%',
    //     '7%',
    //     '2%',
    //     '10%',
    //   ],
    // },
    // {
    //   id: 'q7',
    //   text: 'What is the new tax regime for Rs 10 lakh to 12 Lakh earner?',
    //   answers: [
    //     '15%',
    //     '10%',
    //     '20%',
    //     '25%',
    //   ],
    // },
    // {
    //   id: 'q8',
    //   text: 'How many keywords are there in C language?',
    //   answers: [
    //     '32 Keywords',
    //     '64 Keywords',
    //     '72 Keywords',
    //     '36 keywords',
    //   ],
    // },
    // {
    //   id: 'q9',
    //   text: 'Which of the following is not a programming language?',
    //   answers: [
    //     'HTML',
    //     'SQL',
    //     'JAVA',
    //     'PYTHON',
    //   ],
    // },
    // {
    //   id: 'q10',
    //   text: 'What does DRY stand for in software engineering?',
    //   answers: [
    //     'Dont Repeat Yourself',
    //     'Data Redundancy Yield',
    //     'Design Reusable Yield',
    //     'Dynamic Runtime Yield',
    //   ],
    // },
    // {
    //   id: 'q11',
    //   text: 'What is the purpose of a code review?',
    //   answers: [
    //     'To examine and discuss the code with peers for improvements and error checking',
    //     'To write new code',
    //     'To optimize code performance',
    //     'To find and fix bugs in the code',
    //   ],
    // },
    // {
    //   id: 'q12',
    //   text: 'Which of the following is the correct way to declare a pointer in C++?',
    //   answers: [
    //     'int *ptr;',
    //     'int ptr*;',
    //     'int &ptr;',
    //     'int ptr&;',
    //   ],
    // },
    // {
    //   id: 'q13',
    //   text: 'Which of the following is true about constructors in C++?',
    //   answers: [
    //     'They have the same name as the class.',
    //     'They cannot have parameters.',
    //     'They can return a value.',
    //     'They are called manually by the programmer.',
    //   ],
    // },
    // {
    //   id: 'q14',
    //   text: 'Which of the following is a correct HTML5 doctype declaration?',
    //   answers: [
    //     '<!DOCTYPE html>',
    //     '<!DOCTYPE html5>',
    //     '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
    //     '<!DOCTYPE HTML>',
    //   ],
    // },
    // {
    //   id: 'q15',
    //   text: 'What is the purpose of the <form> tag in HTML?',
    //   answers: [
    //     '',
    //     '',
    //     '',
    //     '',
    //   ],
    // },
   
  ];

  let currentQuestionIndex = 0;
  let currentTeamIndex = 0;
  const scores = [0, 0, 0];
  const teams = ['Team 1', 'Team 2', 'Team 3'];
  
  document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    document.getElementById('skip-button').addEventListener('click', skipQuestion);
  });
  
  function loadQuestion() {
    const question = QUESTIONS[currentQuestionIndex];
    
    if (!question) {
      endQuiz();
      return;
    }
  
    const questionNumberElem = document.getElementById('question-number');
    const totalQuestionsElem = document.getElementById('total-questions');
    const questionTextElem = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers');
    const currentTeamNameElem = document.getElementById('current-team-name');
  
    if (questionNumberElem) {
      questionNumberElem.textContent = currentQuestionIndex + 1;
    }
    if (totalQuestionsElem) {
      totalQuestionsElem.textContent = QUESTIONS.length;
    }
    if (questionTextElem) {
      questionTextElem.textContent = question.text;
    }
  
    if (answersContainer) {
      answersContainer.innerHTML = '';
      question.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.classList.add('answer');
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index));
        li.appendChild(button);
        answersContainer.appendChild(li);
      });
    }
  
    if (currentTeamNameElem) {
      currentTeamNameElem.textContent = teams[currentTeamIndex];
    }
  }
  
  function checkAnswer(selectedIndex) {
    const question = QUESTIONS[currentQuestionIndex];
    
    if (!question) return;
  
    if (question.correct === selectedIndex) {
      scores[currentTeamIndex] += 1;
      document.getElementById(`score-team-${currentTeamIndex + 1}`).textContent = scores[currentTeamIndex];
    }
    
    currentTeamIndex = (currentTeamIndex + 1) % teams.length;
    
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < QUESTIONS.length) {
        loadQuestion();
      } else {
        endQuiz();
      }
    }, 10000); // Delay for 10 seconds
  }
  
  function skipQuestion() {
    currentTeamIndex = (currentTeamIndex + 1) % teams.length;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < QUESTIONS.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    // Handle end of the quiz logic here
  }