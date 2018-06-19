var canvas;
var canvasContext;   
var ballX=400;
var ballY=300;

var ballSpeedX=-10;
var ballSpeedY=10;
const WINNING_Score = 10;

var showWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
var veloP2 = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var player1Score = 0;
var player2Score = 0;

function calculateMousePos(evt) 
{
	var rect=canvas.getBoundingClientRect();
	var root=document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.left -root.scrollLeft;
	return    { x:mouseX,y:mouseY};
}

function handleMouseClick(evt) {
	if(showWinScreen) {
		player1Score=0;
		player2Score=0;
		showWinScreen = false;
	}
}
function easy(){
	veloP2 = 10;
	ballSpeedX=10;
}
function norm(){
	veloP2 = 13;
	ballSpeedX=15;
}
function dif(){
	veloP2 = 15;
	ballSpeedX=-20;
}

function emp() 
{
	
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext ('2d');

	var framesPerSecond = 30;
	setInterval(function() 
			{                        			
		moveEverything();
		drawEverything();
			}, 1000/framesPerSecond);

	canvas.addEventListener('mousedown',handleMouseClick);
		
	canvas.addEventListener('mousemove', 
		function(evt) {
			var mousePos =calculateMousePos(evt);
			paddle1Y = mousePos.y -(PADDLE_HEIGHT*1.5);// no entiendo, esto se tendria que estar dividiendo por 2 i se tiene que multiplicar por 1.5[meme de negro con interrogantes]
		});

}


	function ballReset(){
		if(player1Score >= WINNING_Score || player2Score >= WINNING_Score){

		showWinScreen = true;

		} 		

		ballX=canvas.width/2;
		ballY=canvas.height/2;
		
				}
	function computerMovement() {

		var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
		if(paddle2YCenter < ballY-35) {
			paddle2Y += veloP2;
		}
		else if(paddle2YCenter > ballY+35){
			paddle2Y -= veloP2;
		}
}

	function moveEverything(){
		if(showWinScreen){
			return;
		}
		computerMovement();

		ballX+= ballSpeedX;
		ballY+= ballSpeedY;
	
		if(ballX > canvas.width){
			ballSpeedX=-ballSpeedX;
			if (ballY>paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
					ballSpeedX= ballSpeedX;

					var deltaY = ballY
					-(paddle2Y+PADDLE_HEIGHT/2);
				ballSpeedY =deltaY * 0.35;
			}
			else{
				player1Score += 1;
				ballReset();

				}
					}
		if(ballX < 0)		{
			if (ballY>paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
				ballSpeedX= -ballSpeedX;

				var deltaY = ballY
					-(paddle1Y+PADDLE_HEIGHT/2);
				ballSpeedY =deltaY * 0.35;
			}
			else{
			player2Score++;
			ballReset();

				}
					}
		
		if(ballY < 0){
			ballSpeedY = -ballSpeedY;
		}
		if(ballY > canvas.height){
			ballSpeedY = -ballSpeedY;
		}
	
							}
function drawNet(){
	for(var i=0;i<canvas.height;i+=40){
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function drawEverything(){
	//siguiente linea hace el fondo
	colorRect(0,0,canvas.width,canvas.height,'black');
	
	if(showWinScreen){
canvasContext.fillStyle = 'white';
			if(player1Score >= WINNING_Score){
				canvasContext.fillText("Left player won!", 350,150);
			}
			else if(player2Score >= WINNING_Score){
				canvasContext.fillText("right player won!", 350,150);
			}
			canvasContext.fillText("click to contiune", 350,490);
			return;
		}

	//esta hace el rectangulo[left]
	colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
	drawNet();
	//esta hace el rectangulo[rigth] este sera el ordenador
	colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,10,PADDLE_HEIGHT,'white');


	//aixo es per la bola
	colorCircle(ballX,ballY,10,'white');
	
	canvasContext.fillText(player1Score, 100,100);
	canvasContext.fillText(player2Score, canvas.width-100,100);
	}
	

		//esta funcion sirve para la bola pero no la entengo xd.
	function colorCircle(centerX, centerY, radius,drawColor){
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath();
		canvasContext.arc(centerX,centerY,radius,0,Math.PI*2, true);
		canvasContext.fill();
	}
	

		//la siguiente funcion es la que nos permite reducir el espacio de las lineas de programacion, seria muy util saber usar asi de bien las 'functions'
	function colorRect(leftX,topY, width, height, drawColor)
	{
		canvasContext.fillStyle = drawColor;
		canvasContext.fillRect(leftX,topY,width,height);
	}