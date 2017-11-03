class Game{
	
	constructor(scoreBoards){
		this.scoreBoards = scoreBoards;
		this.currentPlayer = 0;
		this.turnActive = true;
		this.timer = 300;


		

		//array used to loop through Ids
		this.listOfBonusScores = ['1', '2', '3', '4', '5',
		'6', 'sum', 'bonus', 'onePair', 'twoPair', 'threeOfAKind', 
		'fourOfAKind', 'smallStraight', 'largeStraight', 
		'fullHouse', 'chance', 'yahtzee', 'totalSum'];

		//loop that sets scores the first round since the elements start off being disabled
		//and therefor will not get a value before the first assigning of a value
		for(let i = 0; i < this.scoreBoards.length; i++){
			$('#'+ i + '-sum').append(this.scoreBoards[i].bonusScore);
			$('#'+ i + '-totalSum').append(this.scoreBoards[i].bonusScore);
			//Saves, cuts the playernames to 4 letters and adds it to the right place in the scoreboard
			var shortName = this.scoreBoards[i].playerName;
            if(shortName.length > 2){
            shortName = shortName.substring(0,2);
            }
			$('#'+ 'player' + (i+1) ).html(shortName+'...');
		}

	}

	countNumberOfDiceSideOccurences(){ 
		let numbersOfEachOccurences = []; 
		let amountOfOnes = 0; 
		let amountOfTwos = 0; 
		let amountOfThrees = 0; 
		let amountOfFours = 0; 
		let amountOfFives = 0; 
		let amountOfSixes = 0; 

		for(let dice of this.scoreBoards[this.currentPlayer].dices){ 
			
			switch(dice.currentValue){ 
				case 1: 
				amountOfOnes += 1;
				break;
				case 2:
				amountOfTwos += 1;
				break;
				case 3:
				amountOfThrees += 1;
				break;
				case 4:
				amountOfFours += 1;
				break;
				case 5:
				amountOfFives += 1;
				break;
				case 6:
				amountOfSixes += 1;
				break;
			}
		}

		numbersOfEachOccurences.push(amountOfOnes); 
		numbersOfEachOccurences.push(amountOfTwos);
		numbersOfEachOccurences.push(amountOfThrees);
		numbersOfEachOccurences.push(amountOfFours);
		numbersOfEachOccurences.push(amountOfFives);
		numbersOfEachOccurences.push(amountOfSixes);

		return numbersOfEachOccurences; 
	}		

	filterOnes(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[0] * 1);
	}

	filterTwos(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[1] * 2);
	}

	filterThrees(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[2] * 3);
	}

	filterFours(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[3] * 4);
	}

	filterFives(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[4] * 5);
	}

	filterSixes(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[5] * 6);
	}
	
	filterOnePair(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences(); 
		let points = 0; 

		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] >= 2) {
				points = (i+1) * 2;
			}
		}

		return points;  
	}

	filterTwoPairs(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;
		let pairs = 0; 

		for(let i = 0; i < numbersOfEachOccurences.length; i++){
			if(numbersOfEachOccurences[i] >= 2) {
				points += (i+1) * 2;
				pairs += 1;
			}
		}

		if(pairs > 1){ 
			return points; 
		}else{ 
			return 0;
		}
	}

	filterThreeOfAKind(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences(); 
		let points = 0;	

		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] >= 3) {
				points = (i+1) * 3;
			}
		}

		return points;
	}

	filterFourOfAKind(){
		let  numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;

		for (let i = 0; i < numbersOfEachOccurences.length; i++) {
			if (numbersOfEachOccurences[i] >=4){
				points += (i + 1) * 4;
			}
		}

		return points;
	}

	filterSmallStraight(){
		let points = 0;
		let found1 = false;
		let found2 = false;
		let found3 = false;
		let found4 = false;
		let found5 = false;

		for(let i = 0; i < this.scoreBoards[this.currentPlayer].dices.length; i++){
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 1){
				found1 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 2){
				found2 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 3){
				found3 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 4){
				found4 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 5){
				found5 = true;
			}
		}

		if(found1 && found2 && found3 && found4 && found5){
			points = 15;
		}

		return points;
	}

	filterLargeStraight(){
		let points = 0;
		let found2 = false;
		let found3 = false;
		let found4 = false;
		let found5 = false;
		let found6 = false;

		for(let i = 0; i < this.scoreBoards[this.currentPlayer].dices.length; i++){
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 2){
				found2 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 3){
				found3 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 4){
				found4 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 5){
				found5 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 6){
				found6 = true;
			}
		}

		if(found2 && found3 && found4 && found5 && found6){
			points = 20;
		}

		return points;
	}

	filterFullHouse(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let hasPair = false;
		let hasThreeOfAKind = false;
		let pointsFromPair = 0;
		let pointsFromThreeOfAKind = 0;
		let points = 0;

		//Cant reuse one-pair-filter, need the only side-occurence === 2 not >=2
		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] === 2) {
				pointsFromPair = (i+1) * 2;
			}
		}

		//However three-of-a-kind-filter can be reused because you can only have one three-of-a-kind
		pointsFromThreeOfAKind = this.filterThreeOfAKind();
		
		if (pointsFromPair != 0 && pointsFromThreeOfAKind != 0) {
			points = pointsFromPair + pointsFromThreeOfAKind;
		}

		return points;
	}

	filterChance(){
		let numbers = this.countNumberOfDiceSideOccurences();
		let points = 0;
		for(let i = 0; i < numbers.length; i++){
			points = points + (numbers[i] * (i+1)); 
		}

		return points;
	}


	filterYatzy(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;
		let pairs = 0;

		for(let i = 0; i < numbersOfEachOccurences.length; i++){
			if(numbersOfEachOccurences[i] === 5){
				return 50;
			}

		}

		return 0;
	}

	checkBonus(){
		if(this.scoreBoards[this.currentPlayer].bonusScore >= 63 && 
			this.scoreBoards[this.currentPlayer].bonusUsed === 'false'){
		
			this.scoreBoards[this.currentPlayer].totalScore += 50;	
			this.scoreBoards[this.currentPlayer].bonusUsed = true;

			$('#'+ this.currentPlayer + '-bonus').append(this.scoreBoards[this.currentPlayer].bonus);
		}
	}

	//function empties and reappends the value in order to update the score before
	//the currentPlayer is updated, otherwise the previous score is added to the next player
	calcTotalScore(numToAdd){
		this.scoreBoards[this.currentPlayer].totalScore += numToAdd;
		this.checkBonus();
		$('#'+ this.currentPlayer + '-totalSum').empty();
		$('#'+ this.currentPlayer + '-totalSum').append(this.scoreBoards[this.currentPlayer].totalScore)
	}

	//function empties and reappends the value in order to update the score before
	//the currentPlayer is updated, otherwise the previous score is added to the next player
	calcBonusScore(numToAdd){
		this.scoreBoards[this.currentPlayer].bonusScore += numToAdd;
		this.checkBonus();
		$('#'+ this.currentPlayer + '-sum').empty();
		$('#'+ this.currentPlayer + '-sum').append(this.scoreBoards[this.currentPlayer].bonusScore)
		
	}

	//adds an event for each function that assigns the correct value to the element when clicked
	createEventForElement(){
		for (let i = 0; i < this.listOfBonusScores.length; i++) {			
			
			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);

			//to make activeGame a reference to the current Game object since we need to use the 
			//"this" argument when retrieving info from the element
			let activeGame = this;

			if(!(i===6 || i===this.listOfBonusScores.length-1 || i===7)){
				elementFound.addEventListener("click", function(){

					let splittedId = $(this).attr('id').split('-');
					if(splittedId[0] == activeGame.currentPlayer){
						let currentElement = document.getElementById($(this).attr('id'));

						if(currentElement.getAttribute('disabled') === 'false'){
							currentElement.setAttribute('disabled','true');
							currentElement.style.color = "black";

							//sets totalRolls to 0 since the turn is over after choosing
							//a points option
							activeGame.scoreBoards[activeGame.currentPlayer].totalRolls = 0;

							if (splittedId[1]<7) {
								activeGame.calcBonusScore(parseInt($(this).text()));
							}
							activeGame.calcTotalScore(parseInt($(this).text()));

							//unchecks dices and prepares for the next player
							activeGame.uncheckDices();
							activeGame.endTurn();
						}
					}
				});
			}
		}
	}

	//prints possible outcomes, ignoring the elements that have previously
	//been disabled
	possibleOutcomes(){
		this.emptyScoreBoard();
		this.createEventForElement();
		

		//array of all methods to be applied when calculating a score
		//to be displayed
		let filterMethods = [
		this.filterOnes(), this.filterTwos(), this.filterThrees(),
		this.filterFours(), this.filterFives(), 
		this.filterSixes(), this.scoreBoards[this.currentPlayer].bonusScore, 
		this.scoreBoards[this.currentPlayer].bonus,
		this.filterOnePair(), this.filterTwoPairs(), 
		this.filterThreeOfAKind(), this.filterFourOfAKind(),
		this.filterSmallStraight(), this.filterLargeStraight(),
		this.filterFullHouse(), this.filterChance(), this.filterYatzy(),
		this.scoreBoards[this.currentPlayer].totalScore
		];

		for (let i = 0; i < this.listOfBonusScores.length; i++) {
			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);
			let currentMethod = filterMethods[i];

			//if check that excludes the score boxes
			if(!(i===6 || i===this.listOfBonusScores.length-1 || i ===7)){

				if(elementFound.getAttribute('disabled') === 'false'){
					$('#'+ this.currentPlayer + '-' +  this.listOfBonusScores[i]).append(currentMethod);
					elementFound.style.color="lightgrey";
				}
			}
		}
	}

	emptyScoreBoard(){

		for (let i = 0; i < this.listOfBonusScores.length; i++) {
			for(let j = 0; j < this.scoreBoards.length; j++){
				let elementFound = document.getElementById(j + '-' +  this.listOfBonusScores[i]);

				if(elementFound.getAttribute('disabled') === 'false'){
					$('#'+ j + '-' +  this.listOfBonusScores[i]).empty();
				}
			}
		}
	}
	resetDiceAnimation(){
		for(let dice of this.scoreBoards[this.currentPlayer].dices) {
				
				let element = $("#dice-container-0");
				console.log(element);
				element.removeClass("animateDice");
		}
	}

	testRoll() {
		

		if(this.scoreBoards[this.currentPlayer].totalRolls > 0){
			console.log("You have: ", this.scoreBoards[this.currentPlayer].totalRolls + " rolls");
			this.scoreBoards[this.currentPlayer].totalRolls--;
			this.lockCheckedDices();
			
				
			for(let dice of this.scoreBoards[this.currentPlayer].dices) {

				dice.clearDicesInDOM();
				
				dice.roll();
				
				dice.writeDiceToDOM();


				if(!($('#check-container-' + dice.diceNumber).attr('locked') === 'true')){
					$("#dice-container-" + dice.diceNumber).addClass("animateDice" + dice.diceNumber);
					
				}


				let element = document.getElementById("dice-container-" + dice.diceNumber);
				console.log("for sparta", element);
				element.addEventListener('animationend', function(){
					
					let splittedId = this.id.split('-');
					$(this).removeClass("animateDice" + splittedId[2]);

					
				});
				
				

				

			}
			this.possibleOutcomes();
		}else{
			console.log('Player ' + (this.currentPlayer+1) +', you are out of rolls, choose an option!');
			
		}


		/*$("#dice-container-0>img").effect("shake",50);
		$("#dice-container-1>img").effect("shake",50);
		$("#dice-container-2>img").effect("shake",50);
		$("#dice-container-3>img").effect("shake",50);
		$("#dice-container-4>img").effect("shake",50);*/
	}

	lockCheckedDices() {
		var checkBoxes = $('.check-container');
		for(let checkBox of checkBoxes) {

			var splittedId = checkBox.id.split('-');

			var idToLockOrUnLock = splittedId[2];

			if(checkBox.getAttribute('locked') === 'true') {
	
				this.scoreBoards[this.currentPlayer].dices[idToLockOrUnLock].lockDice();
			} else {
				this.scoreBoards[this.currentPlayer].dices[idToLockOrUnLock].unLockDice();
			}
		}
	}

	uncheckDices(){
		var checkBoxes = $('.check-container');
		for(let checkBox of checkBoxes) {

			let splittedId = checkBox.id.split('-');
			let checkContainer = $('#check-container-'+splittedId[2]);
			
			if(checkBox.getAttribute('locked') === 'true') {
				checkBox.setAttribute('locked', 'false');
				checkContainer.removeClass('AnimateLock');
				$('#check-container-'+ splittedId[2]+ ' img').remove();
				scoreBoards[this.currentPlayer].dices[splittedId[2]].unLockDice();

			}

		}
	}

	parseCheckBoxIdToIndexOfDice(checkBoxId) {
		var idSplits = checkBoxId.split('-');
		var indexOfDice = parseInt(idSplits[1]);
		return indexOfDice;
	}

	endTurn(){
		if(this.scoreBoards[this.currentPlayer].totalRolls === 0){
			this.scoreBoards[this.currentPlayer].totalRolls = 3;

			this.scoreBoards[this.currentPlayer].turnCounter++;
			console.log(this.scoreBoards[this.currentPlayer].turnCounter);
			this.checkIfGameIsOver();

			this.currentPlayer++;
			this.uncheckDices();
			if(this.currentPlayer === this.scoreBoards.length){
				this.currentPlayer = 0;
			}
			this.testRoll();
		}
	}

	checkIfGameIsOver(){
		let noMoreTurns = false;

		for(let scoreBoard of this.scoreBoards){
			if(scoreBoard.turnCounter >= 15){
				noMoreTurns = true;
			} else {
				noMoreTurns = false;
			}
		}

		if(noMoreTurns){
			this.insertPlacementOfMatch();
			$('#gameOverModal').modal('show');
			var dbConnection = new DbConnector();
			dbConnection.writeFinishedMatchToDb(this.scoreBoards);
		}

	}

	insertPlacementOfMatch(){
		$('#placements').append('<ol></ol>');
		this.changeOrderOfScoreBoardsFromMatchPlacement();

		let previousTotalScore = 0;
		for(let scoreBoard of this.scoreBoards){
			if(previousTotalScore != scoreBoard.totalScore) {
				$('#placements>ol').append(`<li><span>${scoreBoard.playerName}</span>: ${scoreBoard.totalScore}</li>`);	
			} else {
				$('#placements>ol>li:last-child>span').append(`, ${scoreBoard.playerName}`);
			}

			previousTotalScore = scoreBoard.totalScore;
		}

	}

	changeOrderOfScoreBoardsFromMatchPlacement(){
		this.scoreBoards.sort(function(a, b){
    		var keyA = a.totalScore;
        	var keyB = b.totalScore;
		    if(keyA > keyB) return -1;
		    if(keyA < keyB) return 1;
		    return 0;
		});
	}

    addname(playerName, numOfPlayers){

		//for (var i = 0; i < numOfPlayers.length; i++) {
			$('#player1').html(playerName);
		//}
		     console.log(playerName);


	}	
	
	//Modal->klicka på Lista av Powerups->respektive Powerup med respektive argument feedas in
	//Vissa kräver target, vissa kräver target powerup osv.
	//	


	//Can be refactored to account for handling logic being outside of the method
	//instead of having it be on the inside of the Method
	
	HouseSwitch(target){ //Assign the numeric id of who your enemy is
		let enemyBox = document.getElementById(target + '-' +  "fullHouse"); //Retrieve value of enemy box
		let yourBox = document.getElementById(this.currentPlayer + '-' + "fullHouse"); //get value of your box
		if(yourBox.text > 0){ //check to see that your box value is greater than 0
			//Do the switch
			let valueOfTargetBox = enemyBox.text; //Get value of enemy box
			let valueOfYourBox = yourBox.text; //Get value of your box

			enemyBox.empty(); //Empty the enemy box
			enemyBox.append(valueOfYourBox); //Fill enemy box with your value
			yourBox.empty(); //Empty your own box
			yourBox.append(valueOfTargetBox); //Fill your own box with enemy box value
			
			for(let e of this.scoreBoards[this.currentPlayer].powerUps){ //Go through the powerups of current player
				if(e.getPower() == 3 && e.getName() == "HouseSwitch" && e.getCharges() > 0){ //Aquire values to qualify if its the powerup we want to remove
					index = this.scoreBoards[this.currentPlayer].powerUps.indexOf(e); //assign the index of the element in the array
					this.scoreBoards[this.currentPlayer].powerUps.splice(index, 1); //Remove at the given index, with a width of 1

					consumePowerup("Switch Score");
					break;
				}
			}

		}
		else{ //You did not have >= 1 point
			console.log("You must have at least 1 point to do a switch!");
		}
	}

	removePowerUp(targetPlayer, powerUpToRemove){ //Remove a powerup
		for (let i = 0; i < this.scoreBoards.length; i++) { //Go through the scoreboard
			if(i === targetPlayer){ //if index of iterating through the scoreBoards is the same as the
				//id of the target player we are targeting against

				player = this.scoreBoards[i]; //Assign who the player is
				for(let e = 0; e < player.powerUps.length ; e++){ //loop through powerups length to access index
					if(player.powerUps[e].getName() === powerUpToRemove){ //Is the name the same as the poweruptoremove?
						player.powerUps.splice(e, 1); //Remove the powerup that is at that given index
						//assuming that it shares name with the one that we wish to remove

						consumePowerup("Remove Target Powerup");
						break;
					}
				} 
			}
		}
	}

	putTargetScoreToZero(targetPlayer, scoreToZero){ //Give target id and name of the box to target
		if((scoreToZero !== "sum") && (scoreToZero !== "bonus") && (scoreToZero !== "yahtzee") && (scoreToZero !== "totalSum")){
			//You can't target yourself
			if(this.currentPlayer !== targetPlayer){

				//empty the enemy box and fill it with a 0
				let enemyBox = document.getElementById(targetPlayer + '-' +  scoreToZero);
				enemyBox.empty();
				enemyBox.append(0);

				consumePowerup("Turn Score to 0");
			}
			else{
				console.log("You can only target enemy players with this power-up!");
			}
		}
		else{
			console.log("You cannot target Total Sum, Bonus, Yahtzee or their Upper Sum!");
		}
	}

	stealTime(targetPlayer){ //targetPlayer is just a id sent in to check against who is being attacked
		let currentPlayer = 0; //For clarity, we assign player to this slot for reference
		let enemyPlayer = 0; //Container for the enemy player

		for (let i = 0; i < this.scoreBoards.length; i++){ //Go through all players
			if(i === this.currentPlayer){ //Access who's current turn it is
				currentPlayer = this.scoreBoards[i]; //assign the player to the slot
			}
			if(i === targetPlayer){ //If we found the enemy
				enemyPlayer = this.scoreBoards[i]; //assign the enemy
				enemyPlayer.timer -= 30; //Subtract from the timer
			}
		}
		console.log(this.scoreBoards[this.currentPlayer].playerName + " stole 30 seconds from " + enemyPlayer.playerName + "!");
		//Give 30 seconds to the player who stole
		currentPlayer.timer += 30;


		consumePowerup("Steal Time");
	}

	duplicatePowerUp(powerUpName){
		let currentPlayer = this.scoreBoards[this.currentPlayer];
		if(currentPlayer.powerUps.length > 0){
			for(let power of currentPlayer.powerUps){
				if(power.getName() === powerUpName && power.getName() !== "Duplicate"){
					let toCopy = power.getPowerUp();
					currentPlayer.powerUps.push(toCopy);

					consumePowerup("Duplicate Powerup");
					break;
				}
				if(power.getName() === "Duplicate"){
					console.log("You cannot Duplicate the Duplicate powerup!");
					break;
				}
			}
		}
	}

	reuseRandomization(randomizeList, higherLimit, lowerLimit){

		//Since higherLimit and lowerLimit are only relative values that do not fluxuate
		//we just pass them in since having set them earlier
		let randomizeFirstIndex = Math.floor(Math.random() * (1 + higherLimit - lowerLimit)) + lowerLimit;
		//the secondHigherLimit is the length of the first randomized arrays length minus 1
		let secondHigherLimit = randomizeList[randomizeFirstIndex].length - 1;

		//the second index derives from running randomization against the secondHigherLimit
		let randomizeSecondIndex = Math.floor(Math.random() *(1 + secondHigherLimit - 0)) + 0;

		//Assign the new power that has been randomized
		let newPower = randomizeList[randomizeFirstIndex][randomizeSecondIndex];

		//Return the new power 
		return newPower;
	}

	randomizePowerUp(targetPlayer, targetPowerUp){
		powerUpToRandomize = 0; //What powerup to randomize
		let toEnableList = new PowerUp("N/A", "N/A", "N/A", "N/A"); //Initiate to access method to get list
		randomizeList = toEnableList.getPossiblePowerups(); //Get the list for all possible powerups

		//Find the player
		for (let i = 0; i < this.scoreBoards.length; i++){
			if(i === targetPlayer){
				player = this.scoreBoards[i];
				for(let power of player.powerUps){ //find the Powerup being randomized
					if(power.getName() === targetPowerUp){
						powerUpToRandomize = power;
					}
				}
			}
		}

		//declare all the indexes and variables that we will need for the randomization part
		let listIndexToRandomize = 0;

		//Since RandomizeList is a multidimensional array, we access the different levels
		//And different parts
		let firstIndex = 0; //First index of randomizeList
		let secondIndex = 0; //second index of randomizeList

		//Flags for two index points, to which if you passed the first one and second one
		//We need these for the purpose of skipping the first point in the index, so that
		//We don't access stuff at index [1] when we actually mean index [0] etc.
		let passedFirst = false;
		let passedSecond = false;

		//To be able to break outer loop after inner loop finishes
		let breakFirstLoop = false;

		if(powerUpToRandomize !== 0){ //Redundant security check, added for clarity of that we have the powerUpToRandomize
			for(let tierListOfPowerups of randomizeList){ //Go through first layer

				for(let powerUp of tierListOfPowerups){ //Go through each powerup in each tierList
					if(powerUp.getName() === powerUpToRandomize.getName()){ //compare names of iterating element
						//versus the one we wish to randomize
						breakFirstLoop = true; //Save as flag for breaking the outer loop
						break;
					}
					if(passedSecond === true){ //Assert that we passed first index, so that we can use
						//manual counter for allocating of index accessing
						secondIndex += 1;
					}
					passedSecond = true; //We passed the first element, assign the flag
				}
				if(breakFirstLoop === true){ //break the outer loop, since the inner finished
					break;
				}
				if(passedFirst === true){ //Same principle for index accessing
					firstIndex += 1; //manual counter for allocating index accessing
				}
				passedFirst = true; //Same principle as before
				passedSecond = false; //Each time we exit the second loop, we reset the fact of that
				//we passed the first index
			}

			//The power being randomized is this one, this assignment is sort of
			//redundant, as we could use Target name of powerup instead,
			//but i choose to save this for comparison purposes.
			//Other than that, we actually need the indexes in terms of comparisons.
			currentPowerBeingRandomized = randomizeList[firstIndex][secondIndex];

			//The lower limit in terms of what we must have "at least", relative to tier level power
			let lowerLimit = 0;

			//The upper limit, in terms of what we must have "at max", relative to tier level power
			let higherLimit = 0;

			//Define limits based on what tier we are talking about
			if(firstIndex == 2){ //It's a tier 3, position 2 in Array
				higherLimit = 2; //Set higher limit
				lowerLimit = 1; //Set lower limit
			}
			if(firstIndex == 1){ //It's a tier 2, position 1 in Array
				//Tier 2 can roll to become 2, 1 or 0, as it can become 2+-1 in tier level (3,2,1)
				higherLimit = Math.floor(Math.random() * (1 + 2 - 0)) + 0; //The upper limit
				if(higherLimit == 2){ //if the higherLimit is a tier 3
					lowerLimit = 1; //lower limit is tier 2
				}
				else{ //if the higherLimit is not a tier 3, then the lowerLimit is tier 1
					lowerLimit = 0; //lower limit is tier 1
				}
			}
			if(firstIndex == 0){ //It's a tier 1, position 0 in array
				higherLimit = 1; //Upper limit is a tier 2 
				lowerLimit = 0; //Lower limit is a tier 1
			}

			//We have to randomize based on the factor of what tier of the powerup we are running against is.
			//Tier 3 goes T3 | T2, T2 goes T3 | T2 | T1, T1 goes T2 | T1
			let randomizeFirstIndex = Math.floor(Math.random() * (1 + higherLimit - lowerLimit)) + lowerLimit;
			
			//The second index is for randomizing the actual value within the array, it can max be 
			//the length of the second list - 1, cause 0 indexing arrays
			let secondHigherLimit = randomizeList[randomizeFirstIndex].length - 1;

			//The index of which we will access the actual list with, running randomization
			//with the higher limit being the length of the list
			let randomizeSecondIndex = Math.floor(Math.random() *(1 + secondHigherLimit - 0)) + 0;
			
			//To roll a new power, we must pass along randomizeList, randomizeFirstIndex,
			//randomizeSecondIndex
			//The new power to allocate is the following
			let newPower = randomizeList[randomizeFirstIndex][randomizeSecondIndex];

			//Have an if for clearer structure in terms of what it is we are doing,
			//the If is actually redundant
			if(newPower === currentPowerBeingRandomized){
				//While the new power randomized is the same as the one being randomized,
				//keep randomizing and re-assignign it
				while(currentPowerBeingRandomized === newPower){
					//Fetch a new power to be randomized by just re-calling the randomization
					//on the array and reasign newPower to be that
					newPower = reuseRandomization(randomizeList, lowerLimit, higherLimit);
				}

			}
			
			//When we get to this point, we have either randomized the value as per 
			//what we needed, or, we already had a different powerup 

			let indexToSplice = 0; //Find the power-up to cut out
			for(let powerUp of this.scoreBoards[this.currentPlayer].powerUps){ //Go through powerups
				if(powerUp.getName() === currentPowerBeingRandomized){ //if the name is the same as the one being randomized
					
					//Splice out the powerup out of the array, removing it
					this.scoreBoards[this.currentPlayer].powerUps.splice(indexToSplice, 1);

					console.log("Randomized your " + currentPowerBeingRandomized + " Power-Up into " + newPower + " Powerup!");
					break;
				} 
				//It was not that one we wish to cut out, keep searching
				indexToSplice += 1;
			}

			//We now have all the info we need! newPower is the powerup name, 
			//randomizeFirstIndex + 1 is tier level,
			//charge is 1, and it belongs to the currentPlayer

			//The constructor for the PowerUp object is: name, power (tier), charges, playerNumber

			let NewPowerToAdd = new PowerUp(newPower, (randomizeFirstIndex + 1), 1, this.currentPlayer);

			//Add the powerUp to the relevant players scoreBoard
			this.scoreBoards[this.currentPlayer].powerUps.push(NewPowerToAdd);
			consumePowerup("Randomize");
		}
	}


	addToUsedPowerupsList(target, powerUp){
		console.log("TRIGGERED POWERUP");
		console.log("You have: ", this.scoreBoards[this.currentPlayer].totalRolls + " rolls");
		let powerUpInstance = 0;
		for(let i = 0; i < this.scoreBoards[this.currentPlayer].powerUps.length; i++){
			if(powerUp === this.scoreBoards[this.currentPlayer].powerUps[i].getName()){
				powerUpInstance = this.scoreBoards[this.currentPlayer].powerUps[i];
				break;
			}
		}
		let AusedPowerup = new usedPowerUp(powerUp, target, powerUpInstance.getIcon(), this.scoreBoards[this.currentPlayer]);

		//Add the powerup
		this.scoreBoards[this.currentPlayer].usedPowerUps.push(AusedPowerup);
	}

	usedPowerupsList(){
		//clear the list

		//make a call to DB to get items from DB on what usedpowerups list is
		//<div class="modal-body" id="UsedPowerupsList">
		//let toEmpty = document.getElementById("UsedPowerupsList");

		$('#UsedPowerupsList').empty();
		

		for(let i = this.scoreBoards.length-1; i > -1; i--){ //Traverse backwards, as we want the latest fired ones to display first
			$('#UsedPowerupsList').append("<div class='image' id='usedPowerUp-"+ i + "'>");
			for(let used of this.scoreBoards[i].usedPowerUps){
				//print stuff by usage of "used.getCastBy + cast + used.getName() + on used.getTarget(). + used.getIcon()" 

				
				$('#usedPowerUp-' + i).append(used.getCastBy() + " ");
				$('#usedPowerUp-' + i).append('<img src=' + used.getIcon() + '>');
				$('#usedPowerUp-' + i).append(" " + used.getTarget());
				
			}
			$('#UsedPowerupsList').append("</div>");
		}

		

	}

	targetModal(powerUp){ //Who to target
		$('#AvailablePowerups').modal('hide'); 
		$('#TargetPlayerList').empty();
		for(let i = 0; i < this.scoreBoards.length; i++){
			$('#TargetPlayerList').append("<div class='image' id='PlayerList-"+ i + "' " + 'data-bind="' + "click: function() { targetModalPowerUp(" + i + "," + powerUp + ")" + '}"' +  ">");
			$('#PlayerList-' + i).append(i + '. ' + this.scoreBoards[i].getPlayerName());
			$('#TargetPlayerList').append("</div>");
		}
		$("#TargetPlayerModal").modal('show');
	}

	targetModalPowerUp(targetPlayer, PowerUpTouse, toCall=false){ //What to shoot them with
		
		if(toCall === false){
			console.log("LOL");
		}
		if(targetPlayer !== 'self' && toCall === true){
			$("#TargetPlayerModal").modal('hide');
			for(let i = 0; i < this.scoreBoards[this.currentPlayer].powerUps.length; i++){
				if(this.scoreBoards[this.currentPlayer].powerUps[i].getName() === PowerUpTouse){
					this.addToUsedPowerupsList(this.scoreBoards[targetPlayer].getName(), PowerUpTouse)
					this.consumePowerup(PowerUpTouse);

					switch(PowerUpTouse){
						case "Steal Time":
							stealTime(targetPlayer); //Done
							break;

						case "Turn Score to 0":
							putTargetScoreToZero(targetPlayer, scoreToZero); //Build targetting system
							break;
						case "Switch Score":
							HouseSwitch(targetPlayer); //Targeting system needed, build with Modal
							break;
						case "Reduce Toss":
							this.scoreBoards[this.targetPlayer].totalRolls -= 1; //Check if value is updated against current actual values in target player
							console.log("You redcued a toss for " + this.scoreBoards[targetPlayer].getName() + "!");
							break;
						case "Remove Dice":
							this.scoreBoards[this.targetPlayer].dices.pop(0); //Check if value is updated against current actual values, set flag in target player
							console.log("You redcued a Dice for " + this.scoreBoards[targetPlayer].getName() + "!");
							break;
					}
				}

			}
		}
		if(targetPlayer === 'self' && toCall === true){
			switch(PowerUpTouse){
				case 'Duplicate Powerup': //Re-run targeting but in another showcase, DONE
					$("#AvailablePowerups").modal('hide');
					$('#AvailablePowerupsList').empty();
					$('#AvailablePowerupsList').append("<div class='image' id='PowerUp-"+ this.currentPlayer + "'>");
					for(let powerup of this.scoreBoards[this.currentPlayer].powerUps){
						if(powerup.getName() !== "Duplicate Powerup"){
							$('#PowerUp-' + this.currentPlayer).append("<div class='image' id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { duplicatePowerUp(" + powerup.getName() + ")"  + '}"' + ">");
							$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
							$('#PowerUp-' + this.currentPlayer).append("</div>");
						}	
					}	
					$('#AvailablePowerupsList').append("</div>");
					$("#AvailablePowerups").modal('show');

					this.addToUsedPowerupsList(this.scoreBoards[this.currentPlayer].getName(), 'Duplicate Powerup')


					this.consumePowerup("Duplicate Powerup");
					break;
				case 'Extra Toss': //targets only self, DONE
					this.scoreBoards[this.currentPlayer].totalRolls += 1;
					this.addToUsedPowerupsList(this.scoreBoards[this.currentPlayer].getPlayerName(), 'Extra Toss')
					this.consumePowerup(PowerUpTouse);
					$("#AvailablePowerups").modal('hide');
					break;
				case "Randomize": //Create selection targeting, NOT DONE
					$('#PowerUp-' + this.currentPlayer).append("<div class=row id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModal(" + powerup.getName() + ")"  + '}"' + ">");
					$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
					$('#PowerUp-' + this.currentPlayer).append("</div>");
					$("#AvailablePowerups").modal('hide');
					break;

				case "Remove Target Powerup": //NOT DONE
					this.removePowerUp(targetPlayer, powerUpToRemove); //Create selection targeting
						
					break;
			}
		}
		

	}

	consumePowerup(powerupName){
		console.log("Consumed: ", powerupName);
		for(let i = 0; i < this.scoreBoards[this.currentPlayer].powerUps.length; i++){
			if(this.scoreBoards[this.currentPlayer].powerUps[i].getName() === powerupName){
				this.scoreBoards[this.currentPlayer].powerUps.splice(i, 1);
				break;
			}
		}
		console.log("This is powerups: ", this.scoreBoards[this.currentPlayer].powerUps);
	}


	renderPowerUps(index)
	{
		
		//clear the list
		$('#AvailablePowerupsList').empty();
		//make a call to DB to get items from DB on what the powerups list is
		

		if(this.scoreBoards[this.currentPlayer].powerUps.length > 0){
			$('#AvailablePowerupsList').append("<div id='PowerUp-"+ this.currentPlayer + "'>");
			for(let powerup of this.scoreBoards[this.currentPlayer].powerUps){
				//append elements to respective box  in html by virtue of powerup.icon
				switch(powerup.getName()){

					case "Steal Time":
						$('#PowerUp-' + this.currentPlayer).append("<div id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModal(" + powerup.getName() + ")"  + '}"' + ">");
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						break;
					
					case "Remove Target Powerup":
						$('#PowerUp-' + this.currentPlayer).append("<div class='image' id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModal(" + powerup.getName() + ")"  + '}"' + ">");
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						
						break;
					case "Turn Score to 0":
						$('#PowerUp-' + this.currentPlayer).append("<div class='image' id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModal(" + powerup.getName() + ")"  + '}"' + ">");
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						break;
					case "Switch Score":
						$('#PowerUp-' + this.currentPlayer).append("<div class='image' id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModal(" + powerup.getName() + ")" + '}"' + ">");
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						break;
					case "Duplicate Powerup":
						$('#PowerUp-' + this.currentPlayer).append("<div class='image' id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModalPowerUp('self', 'Duplicate')"  + '}"' + ">");
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						break;
					case "Randomize":
						$('#PowerUp-' + this.currentPlayer).append("<div class=col-xs-5 id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModal(" + powerup.getName() + ")"  + '}"' + ">");
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						break;
					case "Reduce Toss":
						$('#PowerUp-' + this.currentPlayer).append("<div class='image' id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModal(" + powerup.getName() + ")"  + '}"' + ">");
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						break;
					case "Remove Dice":
						$('#PowerUp-' + this.currentPlayer).append("<div class='image' id='InnerPowerUp-" + this.currentPlayer + "' data-bind=" + '"' + "click: function ()" + " { targetModal(" + powerup.getName() + ")"  + '}"' + ">");
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						break;
					case "Extra Toss":
						$('#PowerUp-' + this.currentPlayer).append("<div class='image' id='InnerPowerUp-" + this.currentPlayer + "' onclick=" + '"' + this.targetModalPowerUp('self', 'Extra Toss', false)  + '"' + ">");
						var me = this;

						//Var allows for passing through scope downwards but not upwards, thus
						//if we declare a var before a event listener, we can use the vars declared value
						//downwards, which means that we can access the this instance in the function
						$("#PowerUp-" + this.currentPlayer).click(function(){
							me.targetModalPowerUp('self', 'Extra Toss', true);
						});
						$('#InnerPowerUp-'+this.currentPlayer).append('<img src=' + powerup.getIcon() + '>');
						$('#PowerUp-' + this.currentPlayer).append("</div>");
						break;
				}		
			}
			$('#AvailablePowerupsList').append("</div>");
			console.log("CALLED TWICE?");
			$("#AvailablePowerups").modal('show');
			}
		}
	}
