$(document).ready(function() 
   {
	
	var i=0;
    var seconds;
    var game="on";
    var wins=0;
    var losses=0;
    var counterDiv = $("<div>");  
    var questionDiv = $("<div class='question'>");  
    var answer4Div = $("<div class='rightAnswer'>");
    var answer3Div = $("<div class='answer'>");
    var answer2Div = $("<div class='answer'>");
    var answer1Div = $("<div class='answer'>");
    var youWrong = $("<div class='displayAnswer'>");
    var youRight = $("<div class='displayAnswer'>");
    var gifEle = $("<img>");    
    var questions={ 
 question:[
 "What Alice in Wonderland character shouted, off with his head?",
 "What school does Harry Potter attend?",
"In which Star Wars fild did the Ewoks first appear?",
"What was the name of the whale in the 1993 movie, Free Willy?",
"What are the four houses at Hogwarts School of Witchcraft and Wizardry?",
"What was the name of the monkey in the Disney movie Aladdin?",
"What color were the slippers in the original Wizard of Oz?",
"Who was the first woman monster to appear in a movie?",
"In the movie Mean Girls, where is Caty originally from?",
"In the Lion King, what was Simba's fathers name?"

],

answer1:[
"Mad Hatter",
 "Gryffindor",
"The Empire Strikes Back",
"Willy",
"Gryffindor, Ravendoor, Hufflepuff, & Slyther",
"The Genie",
"Orange",
"Madusa",
"Canada",
"Mostafa"
],

answer2:[
"The Rabbit", 
"Salazar",
"Attack of the Clones",
"Swimmer",
"Gryffin, Ravenclaw, Huffleduff, & Slytherin",
"Aladdin",
"Purple",
"Joan Crawford",
"Brazil",
"Morris"
],

answer3:[
"Caterpillar", 
"Hufflepuff",
"Revenge of the Sith",
"Jesse",
"Gryffindor, Raven, Hufflepuff, & Slytherin",
"Jasmine",
"Purple",
"Mystique",
"China",
"Monty"
],

rightAnswer:[" Queen of Hearts",
 " Hogwarts",
"Return of the Jedi",
"Keiko",
"Gryffindor, Ravenclaw, Hufflepuff, & Slytherin",
"Abu",
"Red",
"The Bride of Frankenstein",
"Africa",
"Mufasa"
],

image:[
"assets/images/img1.jpg",
"assets/images/img2.jpg",
"assets/images/img3.jpg",
"assets/images/img4.jpg",
"assets/images/img5.jpg",
"assets/images/img6.jpg",
"assets/images/img7.jpg",
"assets/images/img8.jpg",
"assets/images/img9.jpg",
"assets/images/img10.jpg",
] };

var answerArray=
	[	answer1=function(){
			var answer1Object = questions.answer1[i];					
			answer1Div.text(answer1Object)
			$(".qandaDiv").append(answer1Div);
		},
		answer2 = function(){
			var answer2Object = questions.answer2[i];			
			answer2Div.text(answer2Object)
			$(".qandaDiv").append(answer2Div);
		},
		answer3=function(){
			var answer3Object = questions.answer3[i];			
			answer3Div.text(answer3Object)
			$(".qandaDiv").append(answer3Div);
		},

		rightAnswer=function(){
			var answer4Object = questions.rightAnswer[i];			
			answer4Div.text(answer4Object)
		$(".qandaDiv").append(answer4Div);
		}
	];

	


selectDisplayQ=function(){	

	if (i<questions.question.length){
		$(".qandaDiv").empty();
		// questionDiv.text("");
		// answer1Div.text("");
		// youWrong.text("");
		// youWrong.text("");
		game="on";
		countDown(10);
		var questionObject = questions.question[i];			
		var qn = i +1;
		questionDiv.text(qn + ") " + questionObject);
		$(".qandaDiv").append(questionDiv);

		answerArray.sort(function(a, b){return 0.5 - Math.random()});

		answerArray[0]();
		answerArray[1]();
		answerArray[2]();
		answerArray[3]();
	}
} 


		

countDown = function(seconds)
{				
	if (game =="on"){	
		counterDiv.text(" there are " + seconds + " seconds remaining...");	
		$(".countDown").append(counterDiv);
		seconds--;
		var timer = setTimeout('countDown('+seconds+')' ,1000);
  	}

	if (seconds == 0) {
		losses++;
	    clearTimeout(timer);
	    $(".qandaDiv").empty();
		$(".countDown").empty();
		seconds=10;	
		if(i<questions.question.length){
			sorryYouWrong();
			setTimeout(selectDisplayQ,3000);
		}

		if (i==questions.question.length){
			sorryYouWrong();
			setTimeout(displayStatus,3000);
		}
	}
	else if (game == "off"){
		clearTimeout(timer)
		seconds=10;
	}
}


selectDisplayQ();

$(".qandaDiv").on("click", "div", function(){
	game = "off";

	var evalAns = $(this).attr('class');

	console.log(evalAns);

	if (evalAns == "answer"){
	losses ++;
	
		if (i<questions.question.length-1){	
			// seconds=10;	
			sorryYouWrong();
			setTimeout(selectDisplayQ,3000);
		}
		
		else if (i==questions.question.length-1){
			sorryYouWrong();
			setTimeout(displayStatus,3000);
		}
	}

	if (evalAns == "rightAnswer"){
	wins ++;
	
		if (i<questions.question.length-1){	
			// seconds=10;	
			youAreRight();
			setTimeout(selectDisplayQ,3000);
		}
		
		else if (i==questions.question.length-1){	
			youAreRight();
			setTimeout(displayStatus,3000);
		}
	}

});


sorryYouWrong = function(){
	// game = "off";
	$(".qandaDiv").empty();
	$(".countDown").empty();
		// questionDiv.text("");
		// answer1Div.text("");
		// youWrong.text("");
		// youWrong.text("");

	var correctAnswer=questions.rightAnswer[i];
	youWrong.text("Sorry! Correct answer is " + correctAnswer);
	var path = questions.image[i];
	gifEle.attr("src",path)
	$(".qandaDiv").append(youWrong);
	$(".qandaDiv").append(gifEle);
	i++;
	
}

		


youAreRight = function(){
	// game = "off";
	$(".qandaDiv").empty();
	$(".countDown").empty();

	var correctAnswer=questions.rightAnswer[i];
	youWrong.text(" Good Job!! The correct answer is " + correctAnswer + "!");
	var path = questions.image[i];
	gifEle.attr("src",path)
	$(".qandaDiv").append(youWrong);
	$(".qandaDiv").append(gifEle);
	i++;
}

displayStatus = function(){
	$(".qandaDiv").empty();
	$(".countDown").empty();
	var totalQ = wins + losses;

	var totalQuestion = $("<div class= 'status'>");
	var totalWin = $("<div class= 'status'>");
	var totalLoss = $("<div class= 'status'>");
	totalQuestion.text("Total Questions: " + totalQ);
	totalWin.text("Total questions answered correctly: " + wins);
	totalLoss.text("Total questions answered incorrectly: " + losses);
	$(".qandaDiv").append(totalQuestion);
	$(".qandaDiv").append(totalWin);
	$(".qandaDiv").append(totalLoss);

}

// displayStatus();
});
