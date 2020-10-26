// 1 task
swapHtml('#header > h1','#footer > h1');

// 2 task
document.querySelector('#footer > h1').onclick = function()
{
    let side = Number(prompt("Specify the length of the side of the pentagon whose area you want to calculate :"));
    if(side)
    {
        if(side > 0)
            document.querySelector('#data-cell4 > .text-content > p').textContent +=
                ' S(' + side + ') = ' + Math.floor(areaOfPentago(side) * 1000) / 1000;
        else
            alert('Error !!! You entered the wrong value')
    }
};

// 3 task
document.querySelector('#form-reverse').onsubmit = function(event)
{
    event.preventDefault();
    let reverseInputVal = reverse(document.querySelector('#form-reverse > input[name="to-reverse"]').value);
    document.cookie = 'reverse-num='+ reverseInputVal;
    document.querySelector('#form-reverse').reset();
    alert(reverseInputVal);
}
window.addEventListener('load', function()
{
    if(getCookie('reverse-num'))
    {   
        document.querySelector('.form-bg').style="display:none;";
        setTimeout(() => {
        if(confirm(getCookie('reverse-num') + "\nAfter you click \"OK\" cookies will be deleted !!!"))
        {
            document.cookie = 'reverse-num=' + getCookie('reverse-num') + '; max-age=0';
            alert('Cookies removed !!!');
            location.reload()
        }}, 100);
    } 
})

// 4 task
loadBorderColor('border-color');
document.querySelector('#form-border-color').onsubmit = function(event)
{
    event.preventDefault();
    let borderColor = document.querySelector('#form-border-color > input[name="border-color"]').value;

    localStorage.setItem('border-color',borderColor);
    loadBorderColor('border-color');
}

// 5 task
document.querySelector('#header > h1').onclick = 
    function() {swapHtml('#header > h1','#footer > h1');};

// 6 task
document.querySelectorAll('.text-content').forEach(block => { loadHtml('#' + block.parentNode.id); });
document.querySelectorAll('.form-input-text').forEach(form =>
    {
        form.onsubmit = function(event)
        {event.preventDefault();onsubmitFormInput(form,'text');}
    });
document.querySelectorAll('.form-input-html').forEach(form =>
    {
        form.onsubmit = function(event)
        {event.preventDefault();onsubmitFormInput(form,'html');}
    });
document.querySelectorAll('.btn-reset').forEach(btn =>
    { btn.onclick = function(event){btnClickReset(btn);}});

//func

function swapHtml(blockName1 ,blockName2)
{
    let temp = document.querySelector(blockName1).innerHTML;
    document.querySelector(blockName1).innerHTML = document.querySelector(blockName2).innerHTML;
    document.querySelector(blockName2).innerHTML = temp;
}
function areaOfPentago(side) 
{
    return Math.sqrt(25+10*Math.sqrt(5)) / 4 * Math.pow(side, 2);
}
function reverse(text)
{
    return text.split("").reverse().join("");
}
function getCookie(cname)
{
    let cookies = document.cookie.split(';');
    for(let i = 0;i < cookies.length;i++)
        if(cookies[i].trim().split('=')[0] == cname)
            return cookies[i].trim().split('=')[1];
    return null;
}
function changeBorderColor(block, color, borderWidth = '0.05em')
{
    document.querySelectorAll(block).forEach(div =>
        {div.style.border = ['solid',borderWidth,color].join(' ');});
}
function loadBorderColor(localStorageKey)
{
    if(localStorage.getItem(localStorageKey))
    {
        changeBorderColor('#main', localStorage.getItem(localStorageKey));
        changeBorderColor('.form-bg', localStorage.getItem(localStorageKey),'0.1em');
        changeBorderColor('#main > div', localStorage.getItem(localStorageKey));
        document.querySelector('#form-border-color > input[name="border-color"]').value =
            localStorage.getItem(localStorageKey);
    }
}
function changeVisibilityOnClick(displayMode, path)
{
    document.querySelectorAll(path)
    .forEach(content => {content.style.display = displayMode;});
}

function onsubmitFormInput(form ,formType)
{
    let blockId = form.parentNode.parentNode.id;
    let newHtml = document.querySelector('#' + blockId +
        '> .form-input > .form-input-' + formType + ' > textarea[name="input-' + formType + '"]').value;

    if(!isValidHTML(newHtml))
    {
        formType = "text";
    }
        
    localStorage.setItem('#' + blockId + '-'+ formType, newHtml);
    if (formType == 'text')
        localStorage.removeItem('#' + blockId + '-html', newHtml);
    if (formType == 'html')
        localStorage.removeItem('#' + blockId + '-text', newHtml);

    changeVisibilityOnClick('none','#' + blockId + '> .form-input');
    document.querySelector('#' + blockId + '> .form-input >.form-input-html').reset();
    document.querySelector('#' + blockId + '> .form-input >.form-input-text').reset();
    loadHtml('#' + blockId);
}
function loadHtml(blockName)
{
    if(localStorage.getItem(blockName + '-text') || localStorage.getItem(blockName + '-html'))
    {
        document.querySelectorAll(blockName + '>*:not(.form-input)').forEach(c => c.outerHTML = '');
        document.querySelector(blockName +'> .btn-reset').style.display = 'block';
        document.querySelector(blockName +'> .btn-reset').innerHTML = 'Reset';
        
    }
    if(localStorage.getItem(blockName + '-text'))
    {
        var tc = document.createElement('div');
        tc.className = 'text-content';
        var p = document.createElement('p');
        p.innerText = localStorage.getItem(blockName + '-text');
        tc.appendChild(p)
        document.querySelector(blockName).appendChild(tc);
    }
    if(localStorage.getItem(blockName + '-html'))
    {   
        document.querySelector(blockName).innerHTML +=  localStorage.getItem(blockName + '-html'); 
        document.querySelector(blockName +'>.btn-reset').onclick = function(event){btnClickReset(this);};
        document.querySelector(blockName + '>.form-input > .form-input-text').onsubmit = function(event)
            {event.preventDefault();onsubmitFormInput(this,'text');};
        document.querySelector(blockName + '>.form-input > .form-input-html').onsubmit = function(event)
            { event.preventDefault();onsubmitFormInput(this,'html');};
    } 
    document.querySelector(blockName + '>.text-content').onclick = function ()
        {
            changeVisibilityOnClick('none',blockName + '>.text-content');
            changeVisibilityOnClick('flex',blockName + '>.form-input');
        };
}
function btnClickReset(btn)
{
    if(localStorage.getItem('#' + btn.parentNode.id + '-text'))
        localStorage.removeItem('#' + btn.parentNode.id + '-text');
    if(localStorage.getItem('#' + btn.parentNode.id + '-html'))
        localStorage.removeItem('#' + btn.parentNode.id + '-html');
    location.reload()
}

function isValidHTML(html)
{
    const doc = document.createElement('div');
    doc.innerHTML = html;
    return doc.innerHTML === html;
}