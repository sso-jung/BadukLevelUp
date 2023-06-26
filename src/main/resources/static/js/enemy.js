/**
 *  적 관련
 */
class Enemy {
	canvas;
	ctx;
	enemies;
	ememy1;
	images;
	interval;
	
	constructor() {
		this.canvas = document.getElementById('gameCanvas');
   		this.ctx = this.canvas.getContext('2d');
		this.enemies = [];
		this.enemy1 = {};
		this.images = this.loadImg();
		this.interval = {};
	}
	
	createEnemy1() {
    this.enemy1 = {
		"type" : "enemy1",
		"name" : "dust",
	    "x" : Math.floor(Math.random() * this.canvas.width),
	    "y" : Math.floor(Math.random() * this.canvas.height),
	    "width" : 50,
	    "height" : 50,
	    "speed" : 1,
	 	"hp" : 30,
	    "atx" : 1,
	    "exp" : 10,
	    "interval" : Math.random()*2000 + 1000,
 	   };
 	   this.enemies.push(this.enemy1);
	}
	
	createEnemy() {
		this.createEnemy1();
		setInterval(this.createEnemy1.bind(this), this.enemy1.interval);
	}
	
	moveEnemy() {
		character.updatePosition();
		let characterX = character.position.x;
		let characterY = character.position.y;
		
		 for (let i = 0; i < this.enemies.length; i++) {
			   let dx = (characterX + character.position.width/2) - this.enemies[i].x; // 캐릭터의 정중앙을 중심으로 이동
			   let dy = (characterY + 75) - this.enemies[i].y;
	       let angle = Math.atan2(dy, dx);
	
	       let speed = this.enemies[i].speed;
	       this.enemies[i].vx = Math.cos(angle) * speed;
	       this.enemies[i].vy = Math.sin(angle) * speed;
	
	       this.enemies[i].x += this.enemies[i].vx;
	       this.enemies[i].y += this.enemies[i].vy;
         }
	}
	
	loadImg() {
		const types = ['enemy1'];	// 종류가 늘어나면 추가
		const imgExtension = '.png';
		this.images = {};
		
		types.forEach(() => {
			this.images = [];
			for (let i=1; i<=types.length; i++) {
			const imgPath = '/img/enemy/enemy'+i+imgExtension;
			let img = new Image();
			img.src = imgPath;
			this.images.push(img);
			}
		});
		return this.images;
	}
	
	drawEnemy() {
		this.moveEnemy();
		for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].type == "enemy1") {
                this.ctx.drawImage(this.images[0], this.enemies[i].x, this.enemies[i].y, 50, 50);
            }
        }
	}
	
	enemyAttack() {
		let characterX = character.position.x;
		let characterY = character.position.y;
		for (let i=0; i<this.enemies.length; i++) {
			if (!character.stat.invincible && colliding.isCollidingRect({
				x : characterX,
				y : characterY,
				width : character.position.width,
				height : character.position.height,
			}, {
				x: this.enemies[i].x,
	            y: this.enemies[i].y,
	            width : this.enemies[i].width,
	            height : this.enemies[i].height,
			})) {
				character.stat.currentHp -= this.enemies[i].atx;
				if (character.stat.currentHp<0) {
					character.stat.currentHp = 0;
				}
				character.stat.invincible = true;
	            setTimeout(() => {
	                character.stat.invincible = false;
	            }, character.stat.invincibleCooltime);
			}
		}
	}
}