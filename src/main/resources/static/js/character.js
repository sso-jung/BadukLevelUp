/**
 * 캐릭터 관련 스테이터스, 위치 ...
 */

 class Character {
	position;
	stat;
	canvas;
	ctx;
	images;
	currentImg;
	keyDirection;
	lastDirection;
	
	constructor() {
		this.position = {	// 캐릭터의 초기 위치, 이미지의 크기
			"x" : canvas.width*0.4,
			"y" : canvas.height*0.4,
			"width" : 100,
			"height" : 150,
		};
		this.stat = {		// 캐릭터의 스테이터스 정보
			"maxHp" : 100,
			"maxExp" : 100,
			"currentHp" : 100,
			"currentExp" : 0,
			"lv" : 1,
			"move" : 10,
			"atk" : 10,
			"def" : 0,
			"cri" : 0,
			"dodge" : 0,
			"invincible" : false,
			"invincibleCooltime" : 500,
		};
		this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.images = this.loadImg();
        this.currentImg = this.updateCurrentImg();
        this.keyDirection = {
			"up" : false,
			"down" : false,
			"left" : false,
			"right" : false
		};
		this.lastDirection = 'down';
		this.updateDirectionByKey();
	}
	
	loadImg() {			// 방향과 프레임에 따라 이미지를 불러와서 images 배열에 저장
		const directions = ['up','down','left','right'];
		const frameCount = 4;
		const imgExtension = '.png';
		
		this.images = {};
		
		directions.forEach(direction => {
			this.images[direction] = [];
			for (let i=1; i<=frameCount; i++) {
				const imgPath = '/img/character/'+direction+i+imgExtension;
				let img = new Image();
				img.src = imgPath;
				this.images[direction].push(img);
			}
		});
		
		return this.images;
	}
	
	updateDirectionByKey() {
		let changeDirection = 0;
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
					if (this.keyDirection.up == false) {
						changeDirection++;
						this.currentImg = this.images['up'][changeDirection%4];
					}
					this.keyDirection.up = true;
                    break;
                case 'ArrowDown':
					if (this.keyDirection.down == false) {
						changeDirection++;
						this.currentImg = this.images['down'][changeDirection%4];
					}
					this.keyDirection.down = true;
                    break;
                case 'ArrowLeft':
					if (this.keyDirection.left == false) {
						changeDirection++;
						this.currentImg = this.images['left'][changeDirection%4];
					}
					this.keyDirection.left = true;
                    break;
                case 'ArrowRight':
					if (this.keyDirection.right == false) {
						changeDirection++;
						this.currentImg = this.images['right'][changeDirection%4];
					}
					this.keyDirection.right = true;
                    break;
                default:
                    break;
            }
        });		
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
					this.keyDirection.up = false;
					this.lastDirection = 'up';
                    break;
                case 'ArrowDown':
					this.keyDirection.down = false;
					this.lastDirection = 'down';
                    break;
                case 'ArrowLeft':
					this.keyDirection.left = false;
					this.lastDirection = 'left';
                    break;
                case 'ArrowRight':
					this.keyDirection.right = false;
					this.lastDirection = 'right';
                    break;
                default:
                    break;
            }
        });		
	}
	
	updatePosition() {
		let move = this.stat.move;
		let frameMove = move/10;
		let maxX = this.canvas.width-this.position.width;
		let maxY = this.canvas.height-this.position.height;
		
		if (this.keyDirection.up) {
		    this.position.y = Math.max(this.position.y - frameMove, 0);
		}
		
		if (this.keyDirection.down) {
		    this.position.y = Math.min(this.position.y + frameMove, maxY);
		}
		
		if (this.keyDirection.left) {
		    this.position.x = Math.max(this.position.x - frameMove, 0);
		}
		
		if (this.keyDirection.right) {
		    this.position.x = Math.min(this.position.x + frameMove, maxX);
		}
	}
	
	updateCurrentImg() {	// 입력받은 방향키에 따라 위치 이동, 이미지 업데이트
		this.currentImg = this.images['down'][0];
		let imgIndex = 0;
		let frameCount = 0;	
		let interval = 10;		// 수치를 크게하면 이미지가 천천히 바뀜.
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
					frameCount++;
   				    if (frameCount % interval == 0) {
        			    imgIndex++;
    				    this.currentImg = this.images['up'][imgIndex % 4];
        			}
                    break;
                case 'ArrowDown':
					frameCount++;
   				    if (frameCount % interval == 0) {
        			    imgIndex++;
    				    this.currentImg = this.images['down'][imgIndex % 4];
        			}
                    break;
                case 'ArrowLeft':
					frameCount++;
   				    if (frameCount % interval == 0) {
        			    imgIndex++;
    				    this.currentImg = this.images['left'][imgIndex % 4];
				    }
                    break;
                case 'ArrowRight':
					frameCount++;
   				    if (frameCount % interval == 0) {
        			    imgIndex++;
    				    this.currentImg = this.images['right'][imgIndex % 4];
				    }
                    break;
                default:
                    break;
            }
        });		
        
        return this.currentImg;
	}
	
	drawCharacter() {		// 현재 이미지와 위치를 불러와서 캔버스에 그리기
		this.updatePosition();
		this.ctx.drawImage(this.currentImg, this.position.x, this.position.y);
	};
	
 }