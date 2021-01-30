

if (sessionStorage.getItem('login')=='failed') {
	setTimeout(function(){document.location.href = "login.html"});
}

function logout()
{
	sessionStorage.setItem('login' , 'failed');
	location.reload();
}



let index = 0;
let questions = quiz.sort(function(){
	return 0.5 - Math.random();
});
let totalq = questions.length;
let attempt = 0; 
let score = 0;
let wrong = 0;



$(function() {

//start timer code

let totaltime = 60;
let min = 0;
let sec = 0;
let counter = 0;

let timer = setInterval(function(){
	counter++;
	min = Math.floor((totaltime - counter ) / 60); //calculating min
	sec = totaltime - (min * 60) - counter;
	$(".timerbox span").text(min+ ":" +sec);

	if (counter==totaltime) {

		alert("Time's Up !!! . ");
		result();
		clearInterval(timer);
	}


}, 1000);//timer set for 1 sec

// end

// print question
printquestion(index); 


});

// function to print question
function printquestion(i){

	$(".questionbox").text(questions[i].question);
	$(".optionbox span").eq(0).text(questions[i].option[0]);
	$(".optionbox span").eq(1).text(questions[i].option[1]);
	$(".optionbox span").eq(2).text(questions[i].option[2]);
	$(".optionbox span").eq(3).text(questions[i].option[3]);

}
// end

// check answer
function checkanswer(option){
	attempt++;

	let optionclick = $(option).data("opt");
	if (optionclick==questions[index].answer) {
		$(option).addClass("right");
		score++;
	}
	else{
		$(option).addClass("wrong");
		wrong++;	
	}
	$(".scorebox span").text(score);

	$(".optionbox span").attr("onclick","");

}
// end


// next question
function shownext(){
	if (index >= (questions.length - 1) )
	{
		showresult(0);
		return;
	}

	index++;

	$(".optionbox span").removeClass();

	$(".optionbox span").attr("onclick","checkanswer(this)");

	printquestion(index);
}
// end

// show result 
function showresult(j){

	if (j==1 && index < questions.length - 1 && !confirm("Quiz has not finished yet. Press ok to finished quiz")) 
	{
		return;
	}

	result();

}
// end

// result showing
function result()
{
	$("#questionscreen").hide();
	$("#resultscreen").show();

	$("#totalqueston").text(totalq);
	$("#attemptqueston").text(attempt);
	$("#correctanswer").text(score);
	$("#wronganswer").text(wrong);

	if (sore < (totalq * 50/100) ) {
		$("#output").text("You have to improve yourself !!");
	}
	else if (sore <= (totalq * 80/100)  && sore >= (totalq * 50/100) ) {
		$("#output").text("You scored Good !!");
	}
	else if (sore == (totalq * 90/100) ) {
		$("#output").text("You scored Excellent!!");
	}

	else if (sore == totalq) {
		$("#output").text("You are superb !!");
	}
	else{

		$("#output").text("try again please !!");

	}
}
// end