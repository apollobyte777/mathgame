// index.js

$(document).ready(function(){

var currentQuestion;
var timeLeft = 10;
var interval;
var score = 0;
var highscore = 0;
$("#myRange").val("10");


var randomNumberGenerator = function(size){
	return Math.ceil(Math.random()*size);
}

var questionGenerator = function(){
	var question = {};
    

	var myRange = document.getElementById("myRange");

	var num1 = randomNumberGenerator(myRange.value);
	var num2 = randomNumberGenerator(myRange.value);

	

	var subtract = document.getElementById("subtract");
	var add = document.getElementById("add");
	var multiply = document.getElementById("multiply");
	var divide = document.getElementById("divide");

	if(add.checked==true){
		question.answer = num1 + num2;
	    question.equation = String(num1) + " + " + String(num2);

	} else if (subtract.checked == true){
		question.answer = num1 - num2;
	    question.equation = String(num1) + " - " + String(num2);
	} else if (multiply.checked == true){
		question.answer = num1 * num2;
	    question.equation = String(num1) + " * " + String(num2);

	}else if(divide.checked == true){
		question.answer = num1 / num2;
	    question.equation = String(num1) + " / " + String(num2);

	} else {
		question.answer = num1 + num2;
	    question.equation = String(num1) + " + " + String(num2);
	}

	return question;
}

currentQuestion = questionGenerator();
$('#equation').text(currentQuestion.equation);

var renderNewQuestion = function(){
	currentQuestion = questionGenerator();
	$('#equation').text(currentQuestion.equation);
}

var checkAnswer = function(userInput, answer){
	if(userInput === answer){
		renderNewQuestion();
		$('#user-input').val('');
		updateTimeLeft(+1);
		updateScore(+1);
	}
}

$('#user-input').on('keyup', function() {
  startGame();
  checkAnswer(Number($(this).val()), currentQuestion.answer);
});

var startGame = function(){


	if(!interval){

		if(timeLeft === 0){
			updateHighScore(score);
			updateTimeLeft(10);
			updateScore(-score);
			
		}
   		interval = setInterval(function() {
			updateTimeLeft(-1);
			if(timeLeft === 0){
				clearInterval(interval);
				interval = undefined;
			}
		}, 1000);
	}
}

var updateTimeLeft = function(amount){
	timeLeft += amount;
	$('#time-left').text(timeLeft);
}

var updateScore = function(amount){
	score += amount;
	$('#score').text(score);
}

var updateHighScore = function(score){
	    if(score > highscore){
         highscore = score;
		$('#highscore').text(highscore);
    }
}

$('#myRange').change(function () {
	$("#number").text(this.value);
  
});



renderNewQuestion();

});


