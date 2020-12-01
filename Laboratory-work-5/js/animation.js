const canvas = document.querySelector('#animation-area-canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = 0.4 * window.innerWidth;
const height = canvas.height = 0.8 * window.innerHeight;
const radius = 10;

var areImagesUploaded = false;
var imagesToLoad = {
    top: 'img/1-texture.png',
    bottom: 'img/2-texture.png',
    };
loadImages(imagesToLoad,
    function(imagesLoaded)
    {
        patternTop = ctx.createPattern(imagesLoaded.top, 'repeat');
        patternBottom = ctx.createPattern(imagesLoaded.bottom, 'repeat');
    }); 

function loadImages(imagesToBeLoaded, drawCallback)
{
    var imagesLoaded = {};
    var loadedImages = 0;
    var numberOfImagesToLoad = 0;
    for(var name in imagesToBeLoaded)
    {
        numberOfImagesToLoad++;
    }
        
    for(var name in imagesToBeLoaded)
    {
        imagesLoaded[name] = new Image();
        imagesLoaded[name].onload = function()
        {
            if(++loadedImages >= numberOfImagesToLoad)
            {
                drawCallback(imagesLoaded);
            } 
            areImagesUploaded = true;
        }; 
        imagesLoaded[name].src = imagesToBeLoaded[name];
        //document.querySelector("#data-cell5").append(imagesLoaded[name]);
    } 
} 
function drawTexture()
{     
    ctx.fillStyle = patternTop;
    ctx.fillRect(0, 0, width, height/2);

    ctx.fillStyle = patternBottom;
    ctx.fillRect(0, height/2, width, height);
}

function random(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; } 
function createBalls()
{
    let velX = (Math.random() < 0.5 ? -1 : 1)*random(3, 7);
    let velY = (Math.random() < 0.5 ? -1 : 1)*random(3, 7);
    let ball1 = new Ball
    (
        random(0 + radius, width - radius),
        radius + 1,
        velX,
        velY,
        "blue",
        radius
    );
    let newVelX = 0;
    let newVelY = 0;
    while(Math.abs(velX)+Math.abs(velY) != Math.abs(newVelX)+Math.abs(newVelY))
    {
        newVelX = (Math.random() < 0.5 ? -1 : 1)*random(3, 7);
        newVelY = (Math.random() < 0.5 ? -1 : 1)*random(3, 7);
    }
    let ball2 = new Ball
    (
        random(0 + radius, width - radius),
        height - radius - 1,
        newVelX,
        newVelY,
        "orange",
        radius
    );
    
    balls.push(ball1);
    balls.push(ball2);
}
function clearRectAndCreateNewBalls()
{
    drawTexture();
    balls = [];
    createBalls();
    for(let i = 0; i < balls.length; i++)
    {
        balls[i].draw();
    }
}
function animateBalls()
{
  drawTexture();
  for(let i = 0; i < balls.length; i++)
  {
    balls[i].update();
    balls[i].collisionDetect();
    balls[i].draw();
  }
  if(!isBallOnTopOrBottom()) { animationFrameid = requestAnimationFrame(animateBalls); }
}
function isBallOnTopOrBottom()
{
    let isBallOnTop = true;
    let isBallOnBottom = true;
    balls.forEach(ball => 
        {
            if(!(ball.y - ball.size >= height/2)) {isBallOnBottom = false;}
            if(!(ball.y + ball.size <= height/2)) {isBallOnTop = false;} 
        });
    if(isBallOnTop) {displayMessage("balls on top");}
    if(isBallOnBottom) {displayMessage("balls on bottom");}
    if(isBallOnTop || isBallOnBottom)
    {
        document.querySelector("#start-button").style.display = "none";
        document.querySelector("#reload-button").style.display = "block";
        return true;
    }
}
function displayMessage(message, displayMode = "block")
{
    let eventText = document.querySelector("#event-text");
    eventText.textContent = "Event: " + message;
    eventText.style.display = displayMode;
    eventText.style.color = "red";
    setTimeout(()=>{eventText.style.color = "black";},500);

    var today = new Date();
    var dateTime = ('0' + today.getDate()).slice(-2) + "/" + ('0' + (today.getMonth()+1)).slice(-2) +
        "/" + today.getFullYear() + " | " +
        ('0' + today.getHours()).slice(-2)   + ":" + ('0' + today.getMinutes()).slice(-2) + ":" +
        ('0' + today.getSeconds()).slice(-2) + ":" + ('00' + today.getMilliseconds()).slice(-3);

    let messages = localStorage.getItem("animation-events-message")?
        (localStorage.getItem("animation-events-message") + ";" + message): message;
    let dates = localStorage.getItem("animation-events-data-time")?
        (localStorage.getItem("animation-events-data-time") + ";" + dateTime): dateTime;
    localStorage.setItem("animation-events-message", messages);
    localStorage.setItem("animation-events-data-time", dates);
}
function writeAnimationEventsInfo(blockName)
{
    let animationEvents = document.createElement("div");
    animationEvents.id = "animation-events";
    animationEvents.style.width = "100%";
    animationEvents.style.display = "flex";
    animationEvents.style.justifyContent = "center";
    animationEvents.style.flexDirection = "row";
    animationEvents.style.overflow = "auto";

    let messages = document.createElement("ul");
    let dates = document.createElement("ul");

    let message = localStorage.getItem("animation-events-message").split(';');
    let dateTime = localStorage.getItem("animation-events-data-time").split(';');

    for (let index = 0; index < message.length; index++)
    {
        let m = document.createElement("li");
        let d = document.createElement("li");
        m.textContent = "Event: " + message[index];
        d.textContent = "Date: " + dateTime[index];
        messages.append(m);
        dates.append(d);
    }

    animationEvents.append(messages);
    animationEvents.append(dates);

    let oldAnimationEvents = document.querySelector("#animation-events");
    if(oldAnimationEvents) {oldAnimationEvents.outerHTML = '';}
    document.querySelector(blockName).append(animationEvents);
}

var balls = [];
var animationFrameid;
createAnimationAreaDivElements();

document.querySelector("#close-button").addEventListener('click',function(event)
    {
        document.querySelector("#animation-work-container").style.display="none";
        cancelAnimationFrameAndCreateNewBalls();
        document.querySelector("#reload-button").style.display = "none";
        let start = document.querySelector("#start-button");
        start.style.display = "block";
        start.disabled = false;
        displayMessage("close", "none");
        writeAnimationEventsInfo("#data-cell4");
    });
document.querySelector("#start-button").addEventListener('click',function(event)
    {
        if(document.querySelector("#animation-area-div").style.display == "flex")
        {
           animationFrameid = requestAnimationFrame(animateDomBalls);
        }
        else
        {
            animationFrameid = requestAnimationFrame(animateBalls);
        }
        this.disabled = true;
        displayMessage("start");   
    });
document.querySelector("#reload-button").addEventListener('click',function(event)
    { 
        cancelAnimationFrameAndCreateNewBalls();
        document.querySelector("#reload-button").style.display = "none";
        let start = document.querySelector("#start-button");
        start.style.display = "block";
        start.disabled = false;
        displayMessage("reload");
    });
document.querySelector("#change-animation-area").addEventListener('click',function(event)
    {
        if(document.querySelector("#animation-area-div").style.display == "flex")
        {
            drawTexture();  
            clearRectAndCreateNewBalls();
            document.querySelector("#animation-area-div").style.display = "none"; 
            document.querySelector("#animation-area-canvas").style.display = "flex";
        }
        else
        {
            balls = [];
            createBalls();
            drawDomBalls("#ball1", balls[0]);
            drawDomBalls("#ball2", balls[1]);
            document.querySelector("#animation-area-canvas").style.display = "none";
            document.querySelector("#animation-area-div").style.display = "flex"; 
        }
    });


function cancelAnimationFrameAndCreateNewBalls()
{
    cancelAnimationFrame(animationFrameid);
    if(document.querySelector("#animation-area-div").style.display == "flex")
    {
        balls = [];
        createBalls();
        drawDomBalls("#ball1", balls[0]);
        drawDomBalls("#ball2", balls[1]);
    }
    else
    {
        clearRectAndCreateNewBalls();
    }
}
function createAnimationAreaDivElements()
{
    let animationArea = document.querySelector("#animation-area-div");
    let ball1 = document.createElement("div");
    ball1.id = "ball1";
    ball1.style = "width: "+ (2*radius) +"px; height: "+ (2*radius) +"px;"+
        "border-radius: 50%; position: absolute; background-color: blue;"+
        "top:-"+ radius +"px; left:-"+ radius +"px;";

    let ball2 = document.createElement("div");
    ball2.id = "ball2";
    ball2.style = "width: "+ (2*radius) +"px; height: "+ (2*radius) +"px;"+
        "border-radius: 50%; position: absolute; background-color: orange;"+
        "top:-"+ radius +"px; left:-"+ radius +"px;";
    
    animationArea.append(ball1);
    animationArea.append(ball2);

    createBalls();
    drawDomBalls("#ball1", balls[0]);
    drawDomBalls("#ball2", balls[1]);
}
function animateDomBalls()
{
  ballNames = ["#ball1","#ball2"];
  for(let i = 0; i < balls.length; i++)
  {
    balls[i].update();
    balls[i].collisionDetect();
    drawDomBalls(ballNames[i], balls[i]);
  }
  if(!isBallOnTopOrBottom()) { animationFrameid = requestAnimationFrame(animateDomBalls); }
}
function drawDomBalls(ballName, ball)
{
    document.querySelector(ballName).style.transform =  "translate(" + ball.x + "px," + ball.y + "px)";
}