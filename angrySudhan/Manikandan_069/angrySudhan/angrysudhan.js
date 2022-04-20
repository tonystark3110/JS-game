var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var sudhan = new Image();
var bg = new Image();
var fg = new Image();
var sirNorth = new Image();
var sirSouth = new Image();

sudhan.src = "images/sudhan.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
sirNorth.src = "images/sirNorth.png";
sirSouth.src = "images/sirSouth.png";


//  variables

var gap = 120;
var constant;

var bX = 100;
var bY = 150;

var gravity = .75;

var score = 0;

// audio 

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// sir coordinates

var sir = [];

sir[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < sir.length; i++){
        
        constant = sirNorth.height+gap;
        ctx.drawImage(sirNorth,sir[i].x,sir[i].y);
        ctx.drawImage(sirSouth,sir[i].x,sir[i].y+constant);
             
        sir[i].x--;
        
        if( sir[i].x == 125 ){
            sir.push({
                x : cvs.width,
                y : Math.floor(Math.random()*sirNorth.height)-sirNorth.height
            }); 
        }

        // detect collision
        
        if( bX + sudhan.width >= sir[i].x && bX <= sir[i].x + sirNorth.width && (bY <= sir[i].y + sirNorth.height || bY+sudhan.height >= sir[i].y+constant) || bY + sudhan.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(sir[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(sudhan,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























