let randomNum = parseInt(Math.random() * 10 + 1);

const input=document.querySelector('#userInput');
const submit = document.querySelector('#but');
const resultPara = document.querySelector('.resultPara');
const lowHigh = document.querySelector('.lowHigh');
const prvGuess = document.querySelector('.guessList'); 
const remaining = document.querySelector('.remaingGuess');

const p = document.createElement('p');

let gamPlay = true;
let chances = 1;
let arrGuess = [];
let colorchange=0;
let count = 0;

let temp=0;

const sound = new Audio('./clicksound.mp3');
const win = new Audio('./win.mp3');

if(gamPlay){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        let guess = parseInt(input.value);
        console.log(guess);
        validateGuess(guess); 
        // count++; 
        sound.play();
    })
}

const res = window.matchMedia("(max-width: 600px)");
    if(res.matches){
        temp = 1;
        console.log(temp);

        const mob = document.querySelector('#star');
        mob.remove();
    }
    else{
        temp=0;
        console.log(temp);
    }    

function validateGuess(guess){
    if(guess > 10){
        alert('plz enter a number less then 10');
    }
    else if(guess < 1){
        alert('plz enter a number more then 1');
    }
    else if(isNaN(guess)){
        alert('plz enter a valid number ');
    }
    else{
        count++;
        arrGuess.push(guess);
        
        if(chances >= 5){
            displayGuess(guess);
            displaymsg(`GAME OVER `);
            document.querySelector('.lowHigh').style.color = 'red';
            endGame();
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function displayGuess(guess){
    input.value= '';
    prvGuess.innerHTML += `${guess} `;
    remaining.innerHTML = `${5 - chances}`;
    chances++; 
    // count++;
}

function checkGuess(guess){
    
    if(guess === randomNum){
        if(count===1){
            displaymsg(`*YOU WIN IN ${count} ATTEMPT*`);
        }
        else{
            displaymsg(`*YOU WIN IN ${count} ATTEMPTS*`);
        }
        
        win.play();
        

        if(temp === 1){
            responsive1();
        }
        else{
            responsive2();
        }           
        endGame();
    }
    else if(guess > randomNum){
        displaymsg(`TOOO HIEGH !`);
    }
    else if(guess < randomNum){
        displaymsg(`TOOO LOW !`);
    }
}

function displaymsg(msg){
    lowHigh.innerHTML = `<h1 id="lowHigh"><center>${msg}</center></h1>`;
}


function responsive1(){
     
    const randomColor= function () {
        let hex = '123456789ABCDEF';
        let color='#';
        for(let i=0 ; i<6 ; i++){
        color+= hex[Math.floor(Math.random() * 16 + 1)]; 
        console.log(color);
        }

        return color;
    }
        
    colorchange = 1;
   
    setInterval(()=>{
        if(colorchange === 1){
            document.querySelector('.main').style.color = randomColor();
            document.querySelector('.lowHigh').style.color = randomColor();
        }
    },200);   
}

function responsive2(){
     
    const randomColor= function () {
        let hex = '123456789ABCDEF';
        let color='#';
        for(let i=0 ; i<6 ; i++){
        color+= hex[Math.floor(Math.random() * 16 + 1)]; 
        }

        return color;
    }
        
    colorchange = 1;
   
    setInterval(()=>{
        if(colorchange === 1){
            document.querySelector('.main').style.color = randomColor();
            document.querySelector('.lowHigh').style.color = randomColor();
         }
    },200);   
}

function endGame(){
    input.value = '';
    input.setAttribute('disabled', '');
    submit.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML = `<button id="NewGamebut">START NEW GAME</button>`; 
    resultPara.appendChild(p);
    gamPlay=false;

    newGame();
}

function newGame(){
    randomNum = parseInt(Math.random() * 10 + 1);
    const New =  document.querySelector('#NewGamebut');

    New.addEventListener('click' , function(e){
        chances = 1;
        arrGuess = [];
        input.value='';
        input.removeAttribute('disabled');
        submit.removeAttribute('disabled');
        remaining.innerHTML = `${10}`;
        resultPara.removeChild(p);
        prvGuess.innerHTML = '';
        lowHigh.innerHTML = '';
        colorchange = 0;
        document.body.style.backgroundColor = '#212121';
        document.querySelector('.lowHigh').style.color = 'black';
        document.querySelector('.main').style.color = '#212121';
        win.pause();
        win.currentTime = 0;

        gamPlay = true;
        count = 0;
        sound.play();
    })
}
