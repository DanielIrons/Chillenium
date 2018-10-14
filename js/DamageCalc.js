//Damage calc
function playerDamageCalc(taker, dealer, weight){
	// 0 for paper, 1 is rock, 2 is scissor, 4 is dodge, 5 for invulnerable
	//double damage for super effective
	//half for ineffective
	//class is 0 for light 1 for heavy
	var usualDam = 0;
	if(form == 0){//paper
		if(weight){
			usualDam = 2;
		}
		else{
			usualDam = 1.5;
		}
		if(enemyForm == 0){
			return usualDam;
		}
		if(enemyForm == 1){
			return (usualDam/2);
		}
		if(enemyForm == 2){
			return (usualDam*2);
		}

	}
	if(form == 1){//rock
		if(weight){
			usualDam = 1;
		}
		else{
			usualDam = 0.5;
		}
		if(enemyForm == 0){
			return (usualDam*2);
		}
		if(enemyForm == 1){
			return usualDam;
		}
		if(enemyForm == 2){
			return (usualDam/2);
		}

	}

	if(form == 2){//scissors
		if(weight){
			usualDam = 1.5;
		}
		else{
			usualDam = 1;
		}
		if(enemyForm == 0){
			return (usualDam/2);
		}
		if(enemyForm == 1){
			return (usualDam*2);
		}
		if(enemyForm == 2){
			return usualDam;
		}

	}

	if(form == 5 || form == 4 || enemyForm == 4){//invulnerable
		return 0;
	}

	if(enemyForm == 5){
		return weight;
	}

}
