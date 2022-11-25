
let brickArray=[];
function initBrick()
{
   const brickContainer=document.createElement('div');
   brickContainer.style.cssText='position:absolute; left:15vw; width:30vw; top:10vw; height:18vw; display:grid; grid-template-columns: auto auto auto auto auto auto auto auto auto auto;';
   brickContainer.id="brick-container";
   for(let i=0;i<90;i++)
     {
      const brick=document.createElement('div');
      brick.classList.add('brick');
      brick.style.cssText="background-color:white; border:1px solid;";
      brickContainer.appendChild(brick);
     }
   Canvas.own.appendChild(brickContainer);

     //console.log(document.getElementById("brick-container").children);
}

function storeBricksIntoArray()
{
  const brickContainer=document.getElementsByClassName('brick');
  let [t,l]=[10,15];
  for(let i=0;i<90;i++)
    {
      brickArray.push({id:i,left:l,right:l+3,top:t,bottom:t+2,own:brickContainer[i]});
      l+=3;
      if(l>=45)  {l=15; t+=2;}
    }
    //console.log(brickArray);
}

//&&elem.right>=Ball.right&&Ball.top<=elem.top&&Ball.bottom>=elem.bottom
function checkCollision()
{
   let i=(Ball.dx>0)?0.1:-0.1;
   let diff=(Ball.dx>0)?0.1:-0.1;
   
  while(Math.abs(i)<=Math.abs(Ball.dx))
  {
   let j=Math.abs(i);
    j=(Ball.dy>0)?j:j*-1; 
  brickArray.map(
   (elem,iter)=>{

    if(((elem.left<Ball.left+i)&&(elem.right>Ball.right+i)&&(Ball.bottom-j<=elem.bottom)&&(Ball.bottom-j-1>elem.bottom-2)))
      {


        
        Ball.dy*=-1;
        elem.own.style.backgroundColor='black';
        
        //Ball.dx*=-1;

         delete brickArray[iter];
         if(Ball.movedYet==false)
        {
           Ball.movedYet=true;
        }
        
      }
   }

  );
  i+=diff;
  }
}





const Canvas={

    score:0,
    initScore:10,
    gameOver:undefined,
    myScore:undefined,
    own:undefined,
    scoreDisplay:undefined,
    init:function(){
     const Canvas=document.createElement('div');
     Canvas.style.cssText='position:absolute; width:60vw; height:40vw; left:20vw; top:calc((100vh - 40vw) / 2); border:1px solid; background-color:black;';
     Canvas.id='canvas';
     document.querySelector('body').appendChild(Canvas);
     this.own=document.getElementById('canvas');
     console.log(document.querySelector("body:not(#canvas)"));
    },
    initScoreBoard:function()
    {
       const scoreboard=document.createElement('div');
       scoreboard.style.cssText="position:relative; float:right; right:2vw; top:1vw; z-index:0;";
       scoreboard.innerHTML="<h2 style='color:red; display:none; font-family: cursive;' id='game-over'>Game Over!</h2><div style='display:flex; font-family: cursive; color:white;'><h2 id='my-score'>Score: </h2><h2 id='score'>0</h2></div>";
       document.getElementById('canvas').appendChild(scoreboard);
       this.gameOver=document.getElementById('game-over');
       this.scoreDisplay=document.getElementById('score');
       this.myScore=document.getElementById('my-score');
       

    },

};


//pad object

const Pad={
    left:1,
    right:9,
    width:8,
    speed:1,
    own:undefined,
    addToCanvas:function()
    {
       const pad=document.createElement('div');
       pad.style.cssText="position:absolute; left:1vw; bottom:1vw; width:8vw; height:1vw; background-color:white; border-radius:4px;"; 
       pad.id='pad';
    
       document.getElementById('canvas').appendChild(pad);
       this.own=document.getElementById('pad');
    },

    moveRight:function()
    {
        
        if(this.right+Pad.speed<59)
        {this.left+=this.speed;
        this.right+=this.speed;
        this.own.style.left=`${this.left}vw`;
        if(Ball.moveWithPad==true)
        {
            Ball.left+=this.speed;
            Ball.right+=this.speed;
            Ball.own.style.left=`${Ball.left}vw`;
        }}
       
    },
    moveLeft:function()
    {
        if(this.left-Pad.speed>1)
        {this.left-=this.speed;
        this.right-=this.speed;
        this.own.style.left=`${this.left}vw`;

        if(Ball.moveWithPad==true)
        {
            Ball.left-=this.speed;
            Ball.right-=this.speed;
            Ball.own.style.left=`${Ball.left}vw`;
        }}
    }


}
let id=null;
//ball object

const Ball={
  moveWithPad:true,
  movedYet:false,
  own:undefined,
  left:4.5,
  right:5.5,
  top:37,
  bottom:38,
  dx:1,  
  dy:1,
  addToCanvas:function()
  { 
    //background-color:red;
    const ball=document.createElement('div');
    ball.style.cssText="position:absolute; left:4.5vw; top:37vw;  width:1vw; height:1vw;  border-radius:50%; z-index:1; background-color:red";
    
    ball.id='ball';
   
    // document.getElementById('canvas').appendChild(ball);
    Canvas.own.appendChild(ball);
    this.own=document.getElementById('ball');
    
  },
  

  

}


//function to move the ball

function moveBall()
{

   // checkCollision();
    if(Ball.right+Ball.dx>=60||Ball.left+Ball.dx<=2)
      {

        if(Ball.movedYet==false)
        {
           Ball.movedYet=true;
        }
       Ball.dx*=-1;


      }
   if(Ball.top-Ball.dy<=2)
      {

        if(Ball.movedYet==false)
        {
           Ball.movedYet=true;
        }

        Ball.dy*=-1;
      }
   if(Ball.top>=36&&Ball.movedYet==true)
   {
    
    if(Ball.left>=Pad.left-2&&Ball.right<=Pad.right+2)
      {
         console.log("Inside condition");
        if((Ball.right<=Pad.left+0.5&&Ball.dx>0)||(Ball.left>=Pad.right-0.5&&Ball.dx<0))
          {
            Ball.dx*=-1;
          }

        Ball.dy*=-1;
        Canvas.score+=Canvas.initScore;
        Canvas.initScore+=1;
        Canvas.scoreDisplay.innerHTML=Canvas.score;
        (Ball.dx>0)?Ball.dx+=0.1:Ball.dx-=0.1;
        (Ball.dy>0)?Ball.dy+=0.1:Ball.dy-=0.1;
        Pad.speed+=0.1;

      }
      else 
     
      { 
        Canvas.gameOver.style.display='block';
        Canvas.myScore.innerHTML="Your Score: ";
        Ball.own.style.display='none';
        
        while(Ball.top<40)
          {
            
            Ball.top-=Ball.dy;
            Ball.left+=Ball.dx;
            Ball.own.style.top=Ball.top;
            Ball.own.style.left=Ball.left;
          }
        clearInterval(id);

        
        }
    
   }
   Ball.left+=Ball.dx*1.0;
   Ball.right+=Ball.dx*1.0;
   Ball.top-=Ball.dy*1.0;
   Ball.bottom-=Ball.dy*1.0;

 
   checkCollision(); 
   Ball.own.style.left=`${Ball.left}vw`;
   Ball.own.style.top=`${Ball.top}vw`;
  
    

 }


Canvas.init();
Canvas.initScoreBoard();


Pad.addToCanvas();
Ball.addToCanvas();

initBrick();

 storeBricksIntoArray();


//make pad moveable

document.addEventListener("keydown",function(e)

{
    if(e.keyCode=='39')
    {

         Pad.moveRight();
    }
    else if(e.keyCode=='37')
    {

         Pad.moveLeft();
    }
    else if(e.keyCode=='32')
     {
       
        
        // console.log('bolod');

        if(Ball.movedYet==false)
        { 

           if(e.keyCode=='37')
             {
              Ball.dx*=-1;
             }

            Ball.moveWithPad=false;
       
         id=setInterval(moveBall,100);}
        

     }
     else if(e.keyCode=='81')
      {
        clearInterval(id);
      }
}

);
