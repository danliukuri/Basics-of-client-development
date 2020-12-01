createPlayButton('#data-cell4');
createAnimationWorkspace();
createAnimationControls();
createAnimationArea();
document.querySelector("#play-button").addEventListener('click',function(event)
    {
        document.querySelector("#animation-work-container").style.display="flex"; 
    });

function createPlayButton(blockName)
{
    let play = document.createElement("button");
    play.id = "play-button";
    play.textContent = "Play Animation";
    play.style = "font-size: 15px;";

    document.querySelector(blockName).append(play);
}
function createAnimationWorkspace()
{
    let workContiner = document.createElement("div");
    workContiner.id = "animation-work-container";
    workContiner.style = 
        "position:absolute;  width: 100%; height: 100%;"+
        "display: none; align-items: center; justify-content: center;";

    let workspace = document.createElement("div");
    workspace.id = "animation-work";
    workspace.style = "width: calc(40% + 10px); height: calc(80% + 50px);" +
        "display: flex; flex-direction: column; box-sizing: border-box;"+
        "align-items: flex-end; justify-content: center;";

    workContiner.append(workspace);
    document.querySelector("body").append(workContiner);
}
function createAnimationArea()
{
    let animAreaCanvas = document.createElement("canvas");
    animAreaCanvas.id = "animation-area-canvas";
    animAreaCanvas.style = "width: calc(100% - 10px); height: calc(100% - 50px);" +
        "border: 5px solid blue; box-sizing: content-box;" +
        "background: black";
    animAreaCanvas.style.display = "none";

    let animAreaDiv = document.createElement("div");
    animAreaDiv.id = "animation-area-div";
    animAreaDiv.style = "width: calc(100% - 10px); height: calc(100% - 50px);" +
        "border: 5px solid blue; box-sizing: content-box; position: relative;";
    animAreaDiv.style.display = "flex";

    let tex1 = document.createElement("div");
    tex1.style = "width: 100%; height: 50%; position: absolute; background: url('img/1-texture.png');";
    let tex2 = document.createElement("div");
    tex2.style = "width: 100%; height: 50%; position: absolute; top: 50%; background: url('img/2-texture.png');";
    animAreaDiv.append(tex1);
    animAreaDiv.append(tex2);

    document.querySelector("#animation-work").append(animAreaCanvas);
    document.querySelector("#animation-work").append(animAreaDiv);
}
function createAnimationControls()
{
    let controls = document.createElement("div");
    controls.id="animation-controls";
    controls.style = "width: 100%; height: 40px;" +
        "display: flex; border: 5px solid blue; border-bottom: 0px;" +
        "align-items: center;" +
        "background: white";
        
    let close = document.createElement("button");
    close.id = "close-button";
    close.textContent = "Close";
    close.style.fontSize = "15px";

    let start = document.createElement("button");
    start.id = "start-button";
    start.textContent = "Start";
    start.style.fontSize = "15px";

    let reload = document.createElement("button");
    reload.id = "reload-button";
    reload.textContent = "Reload";
    reload.style.fontSize = "15px";
    reload.style.display = "none";

    let eventText = document.createElement("p");
    eventText.id = "event-text";
    eventText.style.fontSize = "15px";
    eventText.style.display = "none";
    
    let changeAnim = document.createElement("button");
    changeAnim.id = "change-animation-area";
    changeAnim.textContent = "Change animation area";
    changeAnim.style.fontSize = "15px";
    
    controls.append(close);
    controls.append(start);
    controls.append(reload);
    controls.append(changeAnim);
    controls.append(eventText);
    
    document.querySelector("#animation-work").append(controls);
}
