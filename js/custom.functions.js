// JavaScript Document


	 
	
$(document).on("ready", init)
var basics=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var cards=['A1', 'A2', 'B1', 'B2' , 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G1', 'G2', 'H1', 'H2', 'I1', 'I2', 'J1', 'J2' ];
var cardsWon=['M'];
var wins=0;
var randomArray={}; 
var pairSelected=['', '']
var score=cards.length/2;
var time=0;
var firstAttempt=0;
$(document).on("ready", function()
{
	
 	
	
	})

$(document).on("click", ".card", function(){
	
	// $(this).toggleClass("flipped")
} );

$(document).on("click", ".board div a.visible img", function(event){
	 
	$("#message-2").html("Already taken!");
} );

$(document).on("click", ".board div a.hidden img", function(event){
	 
	 
	selectCard($(this).parent().parent().attr("id"));
	 validateTurn($(this).parent().parent().attr("id"));
	 
	$(this).parent().parent().addClass('flipped').delay(1000).mouseleave(function(){
	$(this).removeClass('flipped');
	});
	//event.preventDefault();
	 // return false;
	
} );


$(document).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend',".board div a", function() {
    // your event handler
	// console.log('termino')
});

/* --- PREVENTS BLUE DOTTED LINE ON CLICK --- */		
$(document).on("focus", ".card a", function(){
//console.log('entro')
	 if(this.blur)this.blur()
} );	
 
 
/* --- INIT FUNCTIONS --- */
function init ()
{
	loadArray()
	
	updateClock(); 
	setInterval('updateClock()', 1000 );

$("#loadCards").on ("click",
	function ()
	{
		loadArray()
		removeCards()
		drawCards()
		
	}
)

$("#startGame").on ("click",
	function ()
	{
		$("#score").html(score)
		loadArray()
		removeCards()
		drawCards()
	}
)
	
}



 
	
	 
 /* --- SORT FUNCTIONS --- */
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
		$("#message").html("Congratulations! Score: " + score);
		$("#message-2").html("Match");
		$("#score").html(score)
		
		validateCards(firstCard)
		}
		else
		{
		//console.log(':(')
		pairSelected[0]='';
		pairSelected[1]='';
		$("#score").html(score)
		$("#message-2").html("No match");
			if (firstAttempt==0)
			{
			firstAttempt=1;
			}
			else
			{
				score--;
			}
		}
		
		// console.log(pairSelected[0] + "/" + pairSelected[1])
		
		// console.log(firstCard + " / " + secondCard) 
 	
}
	
	
	
	
	
	//var firstCard, secondCard;
	
	
	
	
}

function flipCards(firstCard, secondCard)
{
	console.log('Valores: ' + firstCard + " / " + secondCard);
	 $("#" + firstCard).addClass("flip").removeClass("hidden").addClass("visible")
	$("#" + secondCard).addClass("flip").removeClass("hidden").addClass("visible")
	/*$('.board a').each(function() {
		var isFound = $(this).text().search(firstCard);
		if(!isFound)
		{
		$(this).addClass("flip")
		}
		console.log('Win ' + firstCard)
		
		// console.log(isFound)
	});
	$('.board a').each(function() {
		var isFound = $(this).text().search(secondCard);
		if(!isFound)
		{
		$(this).addClass("flip")
		}
		console.log('Win ' + secondCard)
		// console.log(isFound)
	});*/
	
	
	
	
}

function selectCard(card)
{
	// console.log("#" + card)
	
	$("#" + card).addClass("selected")
	setTimeout(function() {
	
	$("#" + card).removeClass("selected");
	}, 2000)
	 

}

function updateClock()
{
	 
	
	 
	$("#time").html(time);
	if(time==5)
	{
	$("#message").html('Time is out!')
	}
	else
	{
		time++;
	}
  
	
}


function validateCards(firstCard)
{
	console.log('This the card: ' + firstCard);
	$.each(basics, function(index, value) {
		 //console.log(this);
		 if (firstCard==value)
			{
				//console.log('first card: ' + firstCard + ' and value '+ value)
				//console.log('Lenght: ' + cardsWon.lenght)
				if(cardsWon[0]=='M')
				{
					cardsWon[wins]=firstCard;
					console.log(cardsWon[0])
				}
				else
				{
					console.log('Algo ' + cardsWon[wins] + ' wins ' + wins)
					cardsWon[wins]=firstCard;
					wins++;
					
				}
			}
			// console.log(basics);
			
		});
}





	
	