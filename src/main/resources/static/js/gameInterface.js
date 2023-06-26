/**
 * 인터페이스 (Hp바, Exp바, 이름, 레벨...)
 */

 class GameInterface {
 	canvas;
	ctx;
	millieseconds;
	seconds;
	minutes;
	
	 constructor() {
		this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textBaseline = "top";
        this.millieseconds = 0;
        this.seconds = 0;
        this.minutes = 0;
	 }
	 
	 hpBar() {
         this.ctx.font = 'bold 20px TTWanjudaedunsancheB';
		 let hpPercent = character.stat.currentHp/character.stat.maxHp;
		 let hpBarWidth = 150;						// 체력바의 넓이
		 let hpBarHeight = 20; 						// 체력바의 높이
		 let hpBarX = 70;							// 체력바의 위치 X, Y좌표
		 let hpBarY = 70;
		 let textSpace = 40;						// 텍스트가 차지하는 공간
		 
         this.ctx.fillStyle = '#ffffff';				
         this.ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);	// 체력바가 비어있을 땐 흰색		 
         this.ctx.fillStyle = '#ff0000';									// 체력 비율에 따라 체력바의 색깔 칠하기
         this.ctx.fillRect(hpBarX, hpBarY, hpPercent*hpBarWidth, hpBarHeight);	// x좌표, y좌표, 색깔이 들어갈 width, 색깔이 들어갈 height
         this.ctx.fillStyle = '#000';
         this.ctx.fillText('HP', hpBarX-textSpace, hpBarY);
		 		 this.ctx.strokeStyle ='#000000';
         this.ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);		// 위치의 x좌표, y좌표, 테두리의 width, height
	 }
	 
	 expBar() {
	       this.ctx.font = 'bold 20px TTWanjudaedunsancheB';
				 let expPercent = character.stat.currentExp/character.stat.maxExp;
				 let expBarWidth = 150;						
				 let expBarHeight = 20; 					
				 let expBarX = 70;							
				 let expBarY = 100;
				 let textSpace = 50;
		 
		     this.ctx.fillStyle = '#ffffff';				
		     this.ctx.fillRect(expBarX, expBarY, expBarWidth, expBarHeight);
		     this.ctx.fillStyle = '#00ff00';				
		     this.ctx.fillRect(expBarX, expBarY, expPercent*expBarWidth, expBarHeight);
		     this.ctx.fillStyle = '#000';
		     this.ctx.fillText('EXP', expBarX-textSpace, expBarY);
		 		 this.ctx.lineWidth = 2;
		     this.ctx.strokeStyle ='#000000';            
		     this.ctx.strokeRect(expBarX, expBarY, expBarWidth, expBarHeight);		
	 }
	 
	 id_Lv() {
				 this.ctx.font = '36px TTWanjudaedunsancheB'
				 let info = 'LV. ' + character.stat.lv + ' ' + '바둑';
				 let id_LvX = 20;
				 let id_LvY = 20;
				 this.ctx.fillStyle ='#EAEAEA';
				 this.ctx.fillText(info, id_LvX, id_LvY);
		 		 this.ctx.strokeStyle ='#000000';
				 this.ctx.strokeText(info, id_LvX, id_LvY);
	 }
	 	 	 
	 drawWeaponSlot() {
		let weaponSlotX = 20;
		let weaponSlotY = 150;
        for (let i=0; i<weapon.weapons.length; i++) {
			let w = weapon.weapons[i];
        	ctx.strokeRect(weaponSlotX+60*i, weaponSlotY, 50, 50);
        	ctx.fillStyle = '#747474';
        	ctx.fillRect(weaponSlotX+60*i, weaponSlotY, 50, 50);
        	ctx.drawImage(weapon.weaponSlotImages[w][0], weaponSlotX+60*i, weaponSlotY, 50, 50);
        }	
	 }
	 
	 updateTime() {
			 this.millieseconds++;
			 if (this.millieseconds==60) {
			 this.millieseconds = 0;
			 this.seconds++;
			 }
			 if (this.seconds==60) {
				 this.seconds = 0;
				 this.minutes++;
			 }
			 let currentSec = '' + this.seconds;
			 let currentMin = '' + this.minutes;
			 if (currentSec.length == 1) {
				 currentSec = '0' + currentSec;
			 }
			 if (currentMin.length == 1) {
				 currentMin = '0' + currentMin;
			 }
			 
			 let timeContext = currentMin + ' : ' + currentSec;
			 let timeX = this.canvas.width/2 - 100; 	// 시계 표시할 위치
			 let timeY = 30;
			 this.ctx.font = 'bold 48px LOTTERIACHAB';
			 this.ctx.fillStyle ='#EDA0C7';
			 this.ctx.fillText(timeContext, timeX, timeY);
			 this.ctx.lineWidth = 1;
	 		 this.ctx.strokeStyle ='#FFFFFF';
			 this.ctx.strokeText(timeContext, timeX, timeY);
		 
	 }
	 
	 drawInterface() {
			 this.hpBar();
			 this.expBar();
			 this.id_Lv();
			 this.drawWeaponSlot();
			 this.updateTime();
	 }
 }