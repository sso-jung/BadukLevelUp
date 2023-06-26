/**
 * 충돌판정 함수들
 */

 class Colliding {

 	  collisionRange; // 충돌 범위

	 constructor(){
		this.collisionRange = 1;	 
	 }
	 
	 isCollidingRect(rect1, rect2) {
    	  const rect1Width = rect1.width * this.collisionRange;
    	  const rect1Height = rect1.height * this.collisionRange;
    	  const rect2Width = rect2.width * this.collisionRange;
    	  const rect2Height = rect2.height * this.collisionRange;

    	  return rect1.x + rect1Width > rect2.x &&
    	         rect1.x < rect2.x + rect2Width &&
    	         rect1.y + rect1Height > rect2.y &&
    	         rect1.y < rect2.y + rect2Height;
	 }
	 
	 isCollidingCircle(circle1, circle2) {
		  const dx = circle1.x - circle2.x;
		  const dy = circle1.y - circle2.y;
		  const distance = Math.sqrt(dx * dx + dy * dy);
  
  		  return distance < circle1.radius + circle2.radius;
	}
	 
	 isCollidingEllipse(ellipse1, ellipse2) {
		  const dx = ellipse1.x - ellipse2.x;
		  const dy = ellipse1.y - ellipse2.y;
		  const a = ellipse1.radiusX + ellipse2.radiusX;	
		  const b = ellipse1.radiusY + ellipse2.radiusY;
		
	  		return (dx * dx) / (a * a) + (dy * dy) / (b * b) <= 1;
	}
	
}