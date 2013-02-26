// JavaScript Document


	 
	
$(document).on("ready", init)

var cards=['A1', 'A2', 'B1', 'B2' , 'C1', 'C1', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G1', 'G2', 'H1', 'H2'];
var randomArray={}; 
var pairSelected=['', '']


$(document).on("click", ".board div a", function(){
	
	validateTurn($(this).text());
	// console.log('Valor' + $(this).text());
	} );
 
 
/* --- INIT FUNCTIONS --- */
function init ()
{
loadArray()

$("#loadCards").on ("click",
	function ()
	{
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
	// console.log(shuffle(cards))
}
	
function drawCards()
{
	$.each(cards, function(i, n){
	$(".board").append("<div><a href='javascript:void(0)'>" + n +"</a></div>")
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
		console.log('Correcto')
		flipCards(pairSelected[0], pairSelected[1])
		pairSelected[0]='';
		pairSelected[1]='';
		}
		else
		{
		console.log('Incorrecto')
		pairSelected[0]='';
		pairSelected[1]='';
		}
		
		// console.log(pairSelected[0] + "/" + pairSelected[1])
		
		console.log(firstCard + " / " + secondCard) 
	}
	
	var firstCard, secondCard;
	
	
	
	
}

function flipCards(firstCard, secondCard)
{
	 
	
	$('.board a').each(function() {
		var isFound = $(this).text().search(firstCard);
		//do something based on isFound...
		if(!isFound)
		{
		$(this).addClass("selected")
		}
		
		console.log(isFound)
	});
	$('.board a').each(function() {
		var isFound = $(this).text().search(secondCard);
		//do something based on isFound...
		if(!isFound)
		{
		$(this).addClass("selected")
		}
		console.log(isFound)
	});
	
	
	
	console.log('Valores' + firstCard + " / " + secondCard);
}





	
	