/**
 * 레벨업 구현
 */

 class Leveling {
	 
	 constructor() {
		 
	 }
	 
	 characterStat() {
		 if (character.stat.currentExp >= 100){
			 character.stat.currentExp -= 100;
			 character.stat.lv += 1;
			 character.stat.maxHp += 10;
			 character.stat.maxExp += 50;
			 character.stat.currentHp = character.stat.maxHp;
			 character.stat.atk += 3;
		 }
	 }
	 
	 enemyStat(){
		 if (character.stat.currentExp >= 100) {
		      for (let i = 0; i < enemy.enemies.length; i++) {
		          enemy.enemies[i].hp += 3;
		          enemy.enemies[i].atk += 2;
		          enemy.enemies[i].exp += 5;
		      }		 
		 }
	 }
	 
	 levelUpLogic() {
		 this.characterStat();
		 this.enemyStat();
	 }
 }