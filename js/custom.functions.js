// JavaScript Document


	 
	
$(document).on("ready", init)
var basics=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
var cards=['A1', 'A2', 'B1', 'B2' , 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G1', 'G2', 'H1', 'H2', 'I1', 'I2' ];
var cardsWon=['M'];
var wins=0;
var randomArray={}; 
var pairSelected=['', '']
var score=cards.length/2;
var time=0;


$(document).on("click", ".board div a img", function(){
	
	
	selectCard($(this).parent().attr("id"));
	console.log(this)
	 validateTurn($(this).parent().attr("id"));
	
	
	// console.log('Valor' + $(this).text());
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
		
		
	var b = i%2; 
	if (b==0) { 
		 $(".board").append("<div><a href='javascript:void(0)' id='" + n +"'><img src='test/" + n.substr(0,1) + ".png'></a></div>")
	}else{ 
		 $(".board").append("<div><a href='javascript:void(0)' id='" + n +"'><img src='test/" + n.substr(0,1) + ".png'></a></div>")
	}  
	
	
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
		console.log(':)')
		//cardsWon[0]=firstCard;
		console.log(firstCard)
		flipCards(pairSelected[0], pairSelected[1])
		pairSelected[0]='';
		pairSelected[1]='';
		console.log("Congratulations! Score: " + score)
		$("#score").html(score)
		 validateCards(firstCard)
		}
		else
		{
		console.log(':(')
		pairSelected[0]='';
		pairSelected[1]='';
		console.log("Score: " + score)
		
		}
		
		// console.log(pairSelected[0] + "/" + pairSelected[1])
		
		// console.log(firstCard + " / " + secondCard) 
	}
	
	var firstCard, secondCard;
	
	
	
	
}

function flipCards(firstCard, secondCard)
{
	 
	
	$('.board a').each(function() {
		var isFound = $(this).text().search(firstCard);
		if(!isFound)
		{
		$(this).addClass("flip")
		}
		
		// console.log(isFound)
	});
	$('.board a').each(function() {
		var isFound = $(this).text().search(secondCard);
		if(!isFound)
		{
		$(this).addClass("flip")
		}
		// console.log(isFound)
	});
	
	
	
	console.log('Valores: ' + firstCard + " / " + secondCard);
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
				
				/*$.each(cardsWon, function(index, value) {
					
					console.log(index + ' / ' + value)
					console.log('card choosen' + cardsWon[wins])
					if (cardsWon[wins]==value)
					{
					console.log('You already win this pair')	
					}
					 else
					{
					cardsWon[wins]=value;
					// console.log(cardsWon[wins])
					wins++;
					score--;
					console.log('You got this pair')	
					} 
					
				})*/
			}
			// console.log(basics);
			
		});
}





	
	