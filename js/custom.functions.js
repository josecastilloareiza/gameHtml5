// JavaScript Document


	 
	
$(document).on("ready", init)

/* --- BASIC VARIABLES --- */

var basics=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var cards=['A1', 'A2', 'B1', 'B2' , 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G1', 'G2', 'H1', 'H2', 'I1', 'I2', 'J1', 'J2' ];
var cardsWon=['M'];
var wins=0;
var randomArray={}; 
var pairSelected=['', '']
var score=cards.length/2;
var time=0;
var firstAttempt=0;


/* --- LOAD INTRO --- */
$(document).on("ready", function()
{
 	loadIntro();
	$(".board").hide();
})

/* --- CHECKED CARDS --- */
$(document).on("click", ".board div a.visible img", function(event){
	 
	$("#message-2").html("Already taken!").delay(1000).fadeOut;
} );

/* --- PLAYABLE CARDS --- */
$(document).on("click", ".board div a.hidden img", function(event){
	 
	 
	selectCard($(this).parent().parent().attr("id"));
	 validateTurn($(this).parent().parent().attr("id"));
	 
	$(this).parent().parent().addClass('flipped').delay(1000).mouseleave(function(){
	$(this).removeClass('flipped');
	});
	//event.preventDefault();
	 // return false;
} );


/* --- PREVENTS BLUE DOTTED LINE ON CLICK --- */		
$(document).on("focus", ".card a", function(){
//console.log('entro')
	 if(this.blur)this.blur()
} );	
 
 
/* --- INIT FUNCTIONS --- */
function init ()
{	
	$(".info").hide();
	loadArray()
	removeCards()
	drawCards()

/* --- LOAD CARDS --- */
	$("#loadCards").on ("click",
		function ()
		{
			loadArray()
			removeCards()
			drawCards()
			
		}
	)

/* --- START GAME --- */
	$("#startGame").on ("click",
		function ()
		{
			$(".info").slideDown();
			$(".board").slideDown();
			$(".intro").slideUp();
			$("#score").html(score)
			loadArray()
			removeCards()
			drawCards()
			startGame()
			updateClock(); 
			setInterval('updateClock()', 1000 );
		}
	)
	
/* --- RESET GAME --- */
	$("#resetGame").on ("click",
		function ()
		{
			$("#score").html(score)
			loadArray()
			removeCards()
			drawCards()
			startGame()
			time=180;
			updateClock(); 
		}
	)
	
}

/* --- RESET TIME GAME --- */
function startGame()
{
	time=180
}


/* --- LOAD INTRO --- */
function loadIntro()
{
	$(".img-intro").delay(1000)
		.animate(
		{ top: 0 }, {
		duration: 'slow',
		easing: 'easeOutBack'
		}
	)
	$(".text-intro").delay(1500)
		.animate(
		{ top: 0 }, {
		duration: 'slow',
		easing: 'easeOutBack'
		}
	)	
	$(".button-intro").delay(2000)
		.animate(
		{ bottom: 0 }, {
		duration: 'slow',
		easing: 'easeOutBack'
		}
	)	
}	

/* --- RESET INTRO --- */
function resetIntro()
{
	$(".img-intro").css("top", '-520px');
	$(".text-intro").css("top", '-520px')
	$(".button-intro").css("bottom", '-520px')
}
	 
 /* --- SORT CARDS FUNCTIONS --- */
function shuffle(o) {
	 for(var j, x, i = o.length;i;
	 j = parseInt(Math.random() * i),
	 x = o[--i], o[i] = o[j], o[j] = x);
	  
	 return o; };
 
function loadArray()
{
	$.each( cards, function(i, n){
	// console.log( "Pos: " + i + ", Value: " + n );
	
	var randomNumber = Math.round(Math.random()*cards.length);
	
	 randomArray[randomNumber]=n;
	 // console.log('Entro ' + randomNumber)
	
	});
	// console.log(randomArray.join(", "))
	shuffle(cards)
	// console.log(shuffle(cards))
}
	
function drawCards()
{
	$.each(cards, function(i, n){
		
	var strCard='';
		if(i%5==4)
		{
		
		strCard+='<div class="container last">';
		}
		else
		{
		strCard+='<div class="container">';
		}
		strCard+="<a class='card hidden' href='javascript:void(0)' id='" + n +"'>";
		strCard+='<figure class="front"><img src="test/X.png"></figure>';
		strCard+="<figure class='back'><img src='test/" + n.substr(0,1) + ".png'></figure>";
		strCard+='</a>';
		strCard+='</div>';
		strCard+='</div>';
		$(".board").append(strCard)	
	
	});
	
}
	
function removeCards()
{
	$.each(cards, function(i, n){
	$(".board div").remove()
	});
}

/* --- CHECK SELECTED CARDS --- */
function validateTurn(turn)
{
	if(pairSelected[0]=='')
	{
		pairSelected[0]=turn;
	}
	else
	{
		pairSelected[1]=turn;
		
		firstCard=pairSelected[0].substr(0,1)
		
		secondCard=pairSelected[1].substr(0,1)
		
		if(firstCard==secondCard)
		{
		//console.log(':)')
		//cardsWon[0]=firstCard;
		//console.log(firstCard)
		flipCards(pairSelected[0], pairSelected[1])
		pairSelected[0]='';
		pairSelected[1]='';
		// $("#message").html("");
		// $("#message-2").hide();
		$("#message-2").html("Congratulations!, you have 20 seconds more!").fadeIn().delay(1000).fadeOut();
		$("#score").html(score)
		// console.log('Match')
		time+=20;
		validateCards(firstCard)
		}
		else
		{
		//console.log(':(')
		pairSelected[0]='';
		pairSelected[1]='';
		
		$("#score").html(score)
		//$("#message-2").hide();
		$("#message-2").html("No match").fadeIn().delay(1000).fadeOut();
		 
			if (firstAttempt==0)
			{
			firstAttempt=1;
			}
			else
			{
				// console.log("punto menos")
				if (score==1)
				{
					$("#message").html("Sorry. Game Over!");	
					$("#message").html('Time is out!')
					setTimeout(function() {
					finishGame()
					}, 2000)
				}
				score--;
				$("#score").html(score)
			}
		}
		// console.log(pairSelected[0] + "/" + pairSelected[1])
		// console.log(firstCard + " / " + secondCard) 
	}
}

/* --- FLIP CARDS --- */
function flipCards(firstCard, secondCard)
{
	// console.log('Values: ' + firstCard + " / " + secondCard);
	 $("#" + firstCard).addClass("flip").removeClass("hidden").addClass("visible")
	$("#" + secondCard).addClass("flip").removeClass("hidden").addClass("visible")
}

/* --- ENDS GAME - RESET ALL --- */
function finishGame()
{
	 
	$(".board, .info").hide();
	
	 $(document).delay(500).queue(function()
	 {
		  resetIntro();
		 $(".intro").show();
		 loadIntro();
	})
}

/* --- VISUAL EFFECT SELECTED CARD --- */
function selectCard(card)
{
	// console.log("#" + card)
	$("#" + card).addClass("selected")
	setTimeout(function() {
	
	$("#" + card).removeClass("selected");
	}, 2000)
	 

}

/* --- UPDATE CLOCK --- */
function updateClock()
{
	$("#time").html(time);
	if(time==0)
	{
		$("#message").html('Time is out!')
		setTimeout(function() {
		finishGame()
		}, 2000)
	}
	else
	{
		time--;
	}
}


/* --- CHECK WON CARDS --- */
function validateCards(firstCard)
{
	// console.log('This the card: ' + firstCard);
	$.each(basics, function(index, value) {
		 //console.log(this);
		 if (firstCard==value)
			{
				//console.log('first card: ' + firstCard + ' and value '+ value)
				//console.log('Lenght: ' + cardsWon.lenght)
				if(cardsWon[0]=='M')
				{
					cardsWon[wins]=firstCard;
					// console.log(cardsWon[0])
				}
				else
				{
					// console.log('Wins  ' + cardsWon[wins] + ' wins ' + wins)
					cardsWon[wins]=firstCard;
					wins++;
					
				}
			}
			// console.log(basics);
			
	});
}





	
	