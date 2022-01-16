// questions for quiz at least 4 to 5 maybe more
const questions = [
    {
        question: "What is HTML?",
        answers: [
        { text: "Hypertext markup language", correct: true },
        { text: "Hey That's My Lunch", correct: false },
        { text: "ehhh I dont know", correct: false },
        { text: "abc", correct: false }
        ]
    },
    {
        question: "Who invented JavaScript?",
        answers: [
        { text: "Brendan Eich", correct: true },
        { text: "Scott Brunswig", correct: false },
        { text: "David Blaine", correct: false },
        { text: "Bobby tarantino", correct: false },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?", 
        answers: [
            { text: "<p>'Hello World'</p>", correct: false },
            { text: "alert('Hello World')" , correct: true },
            { text: "prompt('Hello World')", correct: false },
            { text: "alertBox('Hello World')", correct: false }
        ]
    },
    {
        question: "what is the correct way to link an external css file?", 
        answers: [
            { text: "no need to bro, just have the css in the HTML.", correct: false },
            { text: "<link rel=./assets/css/style.css" , correct: false },
            { text: "using src and destination to file", correct: false },
            { text: "<link href='./assets/css/style.css'>", correct: true }
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?", 
        answers: [
            { text: "function myFunction()", correct: false },
            { text: "function:myFunction()" , correct: false },
            { text: "myFunction()", correct: true },
            { text: "dial function on your phone, DUHHH.", correct: false }
        ]
    }
];
