// JavaScript Document


	 
	
	$(document).on("ready", init)
	
	 
 
	 
	 
	/* --- INIT FUNCTIONS --- */
	function init ()
	{
	loadArray()

	}
	
	var cards=['A', 'B', 'C'];
	var randomArray={}; 
	 
	 /* --- SORT FUNCTIONS --- */
	 function shuffle(o) {
		 for(var j, x, i = o.length;i;
		 j = parseInt(Math.random() * i),
		 x = o[--i], o[i] = o[j], o[j] = x);
		  
		 return o; };
	 
	function loadArray()
	
	{
		
		
		$.each( cards, function(i, n){
		console.log( "Pos: " + i + ", Value: " + n );
		
		var randomNumber = Math.round(Math.random()*cards.length);
		
		 randomArray[randomNumber]=n;
		 console.log('Entro ' + randomNumber)
		
		});
		
		// console.log(randomArray.join(", "))
		
		
		console.log(shuffle(cards))
		
		
		 
		
	}