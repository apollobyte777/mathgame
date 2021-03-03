// index.js

$(document).ready(function(){

var currentQuestion;
var timeLeft = 10;
var interval;
var score = 0;
var highscore = 0;
$("#myRange").val("10");
var question = {};
var selections = [];





var randomNumberGenerator = function(size){
	return Math.ceil(Math.random()*size);
}

var questionGenerator = function(){

    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
	var selection = []
	for(var i=0; i<checkboxes.length;i++){
		if(checkboxes[i].checked){
		selection.push(checkboxes[i].id);
		}
	}


	question = {};
    

	var myRange = document.getElementById("myRange");

	var num1 = randomNumberGenerator(myRange.value);
	var num2 = randomNumberGenerator(myRange.value);

	

	var subtract = document.getElementById("subtract");
	var add = document.getElementById("add");
	var multiply = document.getElementById("multiply");
	var divide = document.getElementById("divide");

	

    if(selection.length == 0 || selection.length==1){
	     if(add.checked == true){
	      	addnumber(num1, num2);
	      }else if (subtract.checked == true){
			subtractnumber(num1, num2);

		} else if (multiply.checked == true){
			multiplynumber(num1, num2);

		}else if(divide.checked == true){
			dividenumber(num1, num2);

		} else {
			question.answer = num1 + num2;
		    question.equation = String(num1) + " + " + String(num2);
		}
    	
    }

    if (selection.length >= 2){
    	multiplechoice(num1, num2, selection);
    }



   

	

	return question;
}




var addnumber = function(number1, number2){
	var num1 = number1;
	var num2 = number2;
	question.answer = num1 + num2;
	question.equation = String(num1) + " + " + String(num2);
}

var subtractnumber = function(number1, number2){
	var num1 = number1;
	var num2 = number2;
	if(num1 > num2){
			question.answer = num1 - num2;
			question.equation = String(num1) + " - " + String(num2);		
		} else {
		   question.answer = num2 - num1;
		   question.equation = String(num2)   + " - " + String(num1);
	       
	     }

}

var multiplynumber = function(number1, number2){
	var num1 = number1;
	var num2 = number2;
	question.answer = num1 * num2;
	question.equation = String(num1) + " * " + String(num2);
}

var dividenumber = function(number1, number2){
	var num1 = number1;
	var num2 = number2;
	var num3 = num1 * num2;
	question.answer = num3 / num1;
	question.equation = String(num3) + " / " + String(num1);
}

var multiplechoice = function(number1, number2, selection){
	var num1 = number1;
	var num2 = number2;
	var selection = selection;
	var randomchoice = Math.floor(Math.random()*(selection.length));
    var operation = selection[randomchoice];
 
    if(operation == "add"){
    	addnumber(num1, num2);
    } else if (operation == "subtract"){
    	subtractnumber(num1, num2);
    } else if(operation == "multiply"){
       multiplynumber(num1, num2);
    } else if(operation == "divide"){
    	dividenumber(num1, num2);
    }
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


