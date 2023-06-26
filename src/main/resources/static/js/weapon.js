/**
 * 
 */
class Weapon {
	weapons;
	weaponSlotImages;
	nyangnyangPunchInfo;
	colliding;
	nyangnyangPunchAttack;
	nyangnyangPunchOn;
	nyangnyangPunchRange;
	nyangnyangPunchDirection;
	nyangnyangPunchImg;
	
	constructor() {
		this.weapons = ["nyangnyang"];
		this.weaponSlotImages = this.loadWeaponSlotImg();
		this.colliding = new Colliding();
		this.nyangnyangPunchOn = false;
		this.nyangnyangPunchInfo = this.nyangnyangPunchInfoSet();
		this.nyangnyangPunchImg = this.loadNyangnyangPunchImg();
	}		 
	
	 loadWeaponSlotImg() {
		const imgExtension = ".png";
		this.weaponSlotImages = {};
 		this.weapons.forEach(w => {
			this.weaponSlotImages[w] = [];
			const imgPath = '/img/weapon/slot/'+w+imgExtension;
			let img = new Image();
			img.src = imgPath;
			this.weaponSlotImages[w].push(img);
		});	
		return this.weaponSlotImages;
	 }
	 	
	loadNyangnyangPunchImg() {			// 방향과 프레임에 따라 이미지를 불러와서 images 배열에 저장
		let directions = ['up','down','left','right'];
		const imgExtension = '.png';
		
		this.nyangnyangPunchImg = {};
		
		directions.forEach(direction => {
			this.nyangnyangPunchImg[direction] = [];
			const imgPath = '/img/weapon/attack/nyangnyang_'+direction+imgExtension;
			let img = new Image();
			img.src = imgPath;
			this.nyangnyangPunchImg[direction].push(img);
		});
		
		return this.nyangnyangPunchImg;
	}
	
	nyangnyangPunchInfoSet() {
		this.nyangnyangPunchInfo = {
			"atk" : 20,
			"interval" : 2000,
			x : 0,
			y : 0,
			"direction" : '',
			"width" : 0,
			"height" : 0,
		};
		this.nyangnyangPunchOn = true;
		if(character.images['left'].includes(character.currentImg)) {
			this.nyangnyangPunchInfo.x = character.position.x - 100;
			this.nyangnyangPunchInfo.y = character.position.y;
			this.nyangnyangPunchInfo.direction = 'left';
			this.nyangnyangPunchInfo.width = 100;
			this.nyangnyangPunchInfo.height = 150;
		} else if (character.images['right'].includes(character.currentImg)) {
			this.nyangnyangPunchInfo.x = character.position.x + 100;
			this.nyangnyangPunchInfo.y = character.position.y;
			this.nyangnyangPunchInfo.direction = 'right';			
			this.nyangnyangPunchInfo.width = 100;
			this.nyangnyangPunchInfo.height = 150;
		} else if (character.images['up'].includes(character.currentImg)) {
			this.nyangnyangPunchInfo.x = character.position.x - 25;
			this.nyangnyangPunchInfo.y = character.position.y - 70;
			this.nyangnyangPunchInfo.direction = 'up';			
			this.nyangnyangPunchInfo.width = 150;
			this.nyangnyangPunchInfo.height = 100;
		} else if (character.images['down'].includes(character.currentImg)) {
			this.nyangnyangPunchInfo.x = character.position.x - 25;
			this.nyangnyangPunchInfo.y = character.position.y + 130;
			this.nyangnyangPunchInfo.direction = 'down';			
			this.nyangnyangPunchInfo.width = 150;
			this.nyangnyangPunchInfo.height = 100;
		}
		return this.nyangnyangPunchInfo;
	}
	
	nyangnyangPunch() {
		weapon.nyangnyangPunchInfoSet();
		for (let i=0; i<enemy.enemies.length; i++) {
			if (colliding.isCollidingRect(enemy.enemies[i], weapon.nyangnyangPunchInfo)) {
				enemy.enemies[i].hp -= character.stat.atk + weapon.nyangnyangPunchInfo.atk;
				if (enemy.enemies[i].hp<=0) {
					character.stat.currentExp = character.stat.currentExp + enemy.enemies[i].exp;
					enemy.enemies.splice(i,1);
				}
			}
		}
	}
		
	
	drawNyangnyangPunch(x, y, direction) {
		ctx.drawImage(weapon.nyangnyangPunchImg[direction][0], x, y);
	}
	
	removeNyangnyangPunch() {
		weapon.nyangnyangPunchOn = false;
	}
	
	weaponAttack() {
        if (weapon.weapons.includes('nyangnyang')){
  	        setInterval(weapon.nyangnyangPunch, weapon.nyangnyangPunchInfo.interval);
        }
	}
	
	drawWeaponAttack() {
		if (weapon.nyangnyangPunchOn==true) {
			weapon.drawNyangnyangPunch(weapon.nyangnyangPunchInfo.x, weapon.nyangnyangPunchInfo.y, weapon.nyangnyangPunchInfo.direction)
			setTimeout(weapon.removeNyangnyangPunch, 100);
		}
	}
}