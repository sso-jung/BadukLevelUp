<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%-- <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %> --%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="Cache-Control" content="no-store">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/favicon.png">
<link rel="stylesheet" href="/webjars/bootstrap/5.2.3/css/bootstrap.min.css">
<script src="/webjars/bootstrap/5.2.3/js/bootstrap.min.js"></script>
<script src="/webjars/jquery/3.6.4/jquery.min.js"></script>
<script src="/js/character.js"></script>
<script src="/js/gameInterface.js"></script>
<script src="/js/enemy.js"></script>
<script src="/js/colliding.js"></script>
<script src="/js/weapon.js"></script>
<script src="/js/leveling.js"></script>

<title>gameCanvas</title>
<style type="text/css">
@font-face {
    font-family: 'TTWanjudaedunsancheB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/TTWanjudaedunsancheB.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
@font-face {
    font-family: 'LOTTERIACHAB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/LOTTERIACHAB.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
canvas {
	border : 10px solid black;
}
</style>
</head>
<body>
<canvas id="gameCanvas" width="1600" height="900"></canvas>
<script type="text/javascript">
	const canvas = document.querySelector("#gameCanvas");
	const ctx = canvas.getContext('2d');
	const character = new Character();
	const gameInterface = new GameInterface();
	const enemy = new Enemy();
	const colliding = new Colliding();
	const weapon = new Weapon();
	const leveling = new Leveling();
	
	function gameLoop() {

    	ctx.fillStyle = '#FAEBFF';				
   		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// 배경색으로 칠하기 
		
		character.drawCharacter();
		// 캐릭터 그리기
		
		enemy.drawEnemy();
		// 적 그리기
		
		enemy.enemyAttack();
		
		gameInterface.drawInterface();
		// hpBar, expBar, 닉네임 ... 그리기
		
		weapon.drawWeaponAttack();
		
	    leveling.levelUpLogic();
	    
	    requestAnimationFrame(gameLoop);
	    
	}
	
	function startInterval() {
		enemy.createEnemy();
		weapon.weaponAttack();
	}
	
	gameLoop();
	startInterval();
      
</script>
</body>
</html>