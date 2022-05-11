const startButton = document.getElementById('start-button');
const finishButton = document.getElementById('finish-button');
const directionInput = document.getElementById('direction-input');
const pauseInput = document.getElementById('pause-input');
const timeInput = document.getElementById('time-input');
const grid = document.getElementById('circles');
const instructionCircle = document.getElementById('instruction-circle');
const instructionCircle1 = document.getElementById('instruction-circle-1');
const instructionCircle2 = document.getElementById('instruction-circle-2');
const instructionCircle3 = document.getElementById('instruction-circle-3');

let directions = [];
let times = [];
let pauses = [];
var classic;
var classicTime;
var classicPause;
let circlesAvailable = false;
let getRandomCircles = [];
let angles = [45, 90, 135, 180, 225, 270, 315, 360];

let startFlag = false;
let timeFlag = false;
let pauseFlag = false;
let directionFlag = false;

var beep = new Audio('sounds/beep.mp3');




const allCircles = document.getElementsByClassName('circle');




for (let i = 0; i < 816; i++) {
    allCircles[i].setAttribute('style', `transform: rotate(${angles[Math.floor(Math.random()*angles.length)]}deg);`)
    allCircles[i].setAttribute('data-id', i);
    allCircles[i].setAttribute('id', 'status-' + i);

}

for (let i = 0; i < document.getElementsByClassName('direction-option').length; i++) {
    directions.push(parseFloat(document.getElementsByClassName('direction-option')[i].value));
}

for (let i = 0; i < document.getElementsByClassName('time-option').length; i++) {
    times.push(parseInt(document.getElementsByClassName('time-option')[i].value));
}

for (let i = 0; i < document.getElementsByClassName('pause-option').length; i++) {
    pauses.push(parseInt(document.getElementsByClassName('pause-option')[i].value));
}



for (const element of document.getElementsByName('direction-input')) {
    element.addEventListener('input', e => {
        if (!directions.includes(parseFloat(e.target.value))) {
            directionFlag = false;
        } else {
            directionFlag = true;
            classic = parseFloat(e.target.value) * 30;
            instructionCircle.setAttribute('style', `transform: rotate(${parseFloat(e.target.value)*30}deg);`);
            instructionCircle1.setAttribute('style', `transform: rotate(${parseFloat(e.target.value)*30}deg);`);
            instructionCircle2.setAttribute('style', `transform: rotate(${parseFloat(e.target.value)*60 + 45}deg);`); // >>>>>>
            instructionCircle3.setAttribute('style', `transform: rotate(${parseFloat(e.target.value)*30}deg);`);
        }
    })
}

for (const element of document.getElementsByName('time-input')) {
    element.addEventListener('input', e => {
        if (!times.includes(parseInt(e.target.value))) {
            timeFlag = false;
        } else {
            timeFlag = true;
            classicTime = parseInt((e.target.value).match(/\d+/)[0]);
        }
    })
}

for (const element of document.getElementsByName('pause-input')) {
    element.addEventListener('input', e => {

        if (!pauses.includes(parseInt(e.target.value))) {
            pauseFlag = false;
        } else {
            pauseFlag = true;
            classicPause = parseInt((e.target.value));
        }
    })
}

directionInput.addEventListener('click', () => {
    if (!directionInput.getAttribute('readonly'))
        directionInput.value = '';
})

pauseInput.addEventListener('click', () => {
    if (!pauseInput.getAttribute('readonly'))
        pauseInput.value = '';
})

timeInput.addEventListener('click', () => {
    if (!timeInput.getAttribute('readonly'))
        timeInput.value = '';
})


startButton.addEventListener('click', () => {
    if (directionFlag == true && timeFlag == true && pauseFlag == true) {
        // start(classic, classicPause, classicTime);
        start();
    } else if (directionFlag != true && timeFlag != true && pauseFlag != true) {
        pauseInput.classList.add('error');
        timeInput.classList.add('error');
        directionInput.classList.add('error');
        setTimeout(() => {
            pauseInput.classList.remove('error');
            timeInput.classList.remove('error');
            directionInput.classList.remove('error');
        }, 2000);
    } else if (directionFlag != true && timeFlag == true && pauseFlag == true) {
        directionInput.classList.add('error');
        setTimeout(() => {
            directionInput.classList.remove('error');
        }, 2000);
    } else if (directionFlag == true && timeFlag != true && pauseFlag == true) {
        timeInput.classList.add('error');
        setTimeout(() => {
            timeInput.classList.remove('error');
        }, 2000);
    } else if (directionFlag == true && timeFlag == true && pauseFlag != true) {
        pauseInput.classList.add('error');
        setTimeout(() => {
            pauseInput.classList.remove('error');
        }, 2000);




    } else if (directionFlag != true && timeFlag != true && pauseFlag == true) {
        timeInput.classList.add('error');
        directionInput.classList.add('error');
        setTimeout(() => {
            directionInput.classList.remove('error');
            timeInput.classList.remove('error');
        }, 2000);
    } else if (directionFlag != true && timeFlag == true && pauseFlag != true) {
        pauseInput.classList.add('error');
        directionInput.classList.add('error');
        setTimeout(() => {
            pauseInput.classList.remove('error');
            directionInput.classList.remove('error');
        }, 2000);
    } else if (directionFlag == true && timeFlag != true && pauseFlag != true) {
        pauseInput.classList.add('error');
        timeInput.classList.add('error');
        setTimeout(() => {
            pauseInput.classList.remove('error');
            timeInput.classList.remove('error');
        }, 2000);
    }
})




//--------------------------------------------------------------------

var M = [], N = [], Q = [];
var timestampArray = [];
var startingTime = 60;
let timeDone = 0;

function start() {
    
    circlesAvailable = true;
    startButton.setAttribute('disabled', 'true');
    directionInput.setAttribute('readonly', 'true');
    timeInput.setAttribute('readonly', 'true');
    pauseInput.setAttribute('readonly', 'true');
    finishButton.removeAttribute('disabled');
    startingTime = 60 * classicTime;
    timerDowncount(startingTime);
}
let last = 0;
var isPaused = false;
var idTimeInterval = null;
var lastM = 0;
var lastN = 0;
var lastQ = 0;
var lastI = 0;
var finalI = 0;

function calculate(i) {
    // lastQ == 0 ? lastQ = i - lastI + 1 : lastQ = i + 1 - lastQ;
    console.log('i', i);
    // if ( lastQ == 0 && lastM == 0) {
    //     lastQ = i - lastI + 1; // + 1
    //     console.log('1 var');
    //     Q.push(lastQ);
    // } else {
    //     lastQ = i - lastQ + 1;
    //     console.log('2 var');
    //     Q.push(lastQ);
    //     lastQ = 0;
    // }
            lastI = i;
            finalI = i;
            // lastQ = i + 1 - lastQ;
            

            let Qcounter = 0;
            for(let j = lastQ; j <= i ; j++) { // БЫЛО <
                if ( allCircles[j] ) {
                    Qcounter++;
                }
            }
            // console.log(Mcounter);
            lastQ = i+1;

            Q.push(Qcounter);
            Qcounter = 0;


            let Mcounter = 0;
            for(let j = lastM; j <= i ; j++) { // БЫЛО <
                if (allCircles[j].getAttribute('style') == `transform: rotate(${classic}deg);` ) {
                    Mcounter++;
                }
            }
            console.log(Mcounter);
            lastM = i;

            M.push(Mcounter);
            Mcounter = 0;




            //rgb(158,251,129) green
            //rgb(241,111,101) red
            //rgb(76,99,248) blue
            //rgb(177,177,177) grey
            let Ncounter = 0;
            for(let j = lastN+1; j <= i ; j++) {
                if ((allCircles[j].getAttribute('fill') == 'rgb(177,177,177)' &&
                allCircles[j].getAttribute('style') != `transform: rotate(${classic}deg);`)
                || 
                (allCircles[j].getAttribute('fill') == 'none' &&
                allCircles[j].getAttribute('style') == `transform: rotate(${classic}deg);`)
                ) {
                    Ncounter++;
                }
            }
            // if ( Ncounter > Q[Q.length-1] ) {
                N.push(Ncounter);
            // } else {
            //     N.push(Ncounter+1);
            // }
            Ncounter = 0;

            lastN = i;
            console.log('M', M, 'N', N, 'Q', Q);

}

function gridTwoClick() {
    // let i = this.getAttribute('data-id');
    let i = parseInt(this.getAttribute('data-id'));
    console.log('kk');
    if (i == last) {
        if (circlesAvailable == true && isPaused == true) {
            timestampArray.push(i);
            grid.classList.remove('grid-border');
            isPaused = false;
            for (let i = last; i < allCircles.length; i++) {
                allCircles[i].removeEventListener('dblclick', gridTwoClick);
            }
            calculate(i);
            // console.log(i + 1 - lastQ);
            // lastQ == 0 ? lastQ = i - lastI + 1 : lastQ = i + 1 - lastQ;
            // lastI = i;
            // // lastQ = i + 1 - lastQ;
            // Q.push(lastQ);
            // console.log('Q', Q);


            // let Mcounter = 0;
            // for(let j = lastM; j < i ; j++) {
            //     console.log(allCircles[i].getAttribute('style'));
            //     if (allCircles[j].getAttribute('style') == `transform: rotate(${classic}deg);` ) {
            //         Mcounter++;
            //     }
            // }
            // console.log(Mcounter);
            // lastM = i;

            // M.push(Mcounter);
            // Mcounter = 0;
            // console.log('M', M);



            // //rgb(158,251,129) green
            // //rgb(241,111,101) red
            // //rgb(76,99,248) blue
            // //rgb(177,177,177) grey
            // let Ncounter = 0;
            // for(let j = lastN; j < i ; j++) {
            //     if ((allCircles[j].getAttribute('fill') == 'rgb(177,177,177)' &&
            //     allCircles[j].getAttribute('style') != `transform: rotate(${classic}deg);`)
            //     || 
            //     (allCircles[j].getAttribute('fill') == 'none' &&
            //     allCircles[j].getAttribute('style') == `transform: rotate(${classic}deg);`)
            //     ) {
            //         Ncounter++;
            //     }
            // }
            // N.push(Ncounter+1);
            // Ncounter = 0;
            // console.log(Ncounter);
            // lastN = i;
            // console.log('N', N);

            timeDone += 60 * classicPause;
            timerDowncount(startingTime - timeDone);
        }

    }
}

async function timerDowncount(duration) {

    isPaused = false;

    var timer = duration,
        minutes, seconds;

    idTimeInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (minutes === (duration / (60 * classicPause)) - 1 && seconds === 0) {
            for (let i = last; i < allCircles.length; i++) {
                allCircles[i].addEventListener('dblclick', gridTwoClick);
            }
            grid.classList.add('grid-border');
            beep.play();
            clearInterval(idTimeInterval);
        }

        if (minutes === 0 && seconds === 0) {
            kindaFinish();
            // finish();
        }

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector('#time').textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000)

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 60000 * classicPause)
    });
    isPaused = await promise;
}

var downLimit = 0;
let isFound1 = false;
let isFound2 = false;

function gridOneClick() {
    let i = parseInt(this.getAttribute('data-id'));
    console.log(i);


    if (i > last) {
        if (circlesAvailable == true && isPaused == false) {
            document.getElementById('status-' + i).setAttribute('fill', 'rgb(177,177,177)');
            last = i;

        }
    }
}

for (let i = downLimit; i < allCircles.length; i++) {
    allCircles[i].addEventListener('click', gridOneClick);
}

function colorCircles() {
    for (let i = 0; i < allCircles.length; i++) {
        if (parseInt(allCircles[i].getAttribute('style').match(/\d+/)[0]) == classic &&
            allCircles[i].getAttribute('fill') == 'none') {
            allCircles[i].setAttribute('fill', 'rgb(76,99,248)');
        } else if (parseInt(allCircles[i].getAttribute('style').match(/\d+/)[0]) == classic &&
            allCircles[i].getAttribute('fill') != 'none') {
            allCircles[i].setAttribute('fill', 'rgb(158,251,129)');
        } else if (parseInt(allCircles[i].getAttribute('style').match(/\d+/)[0]) != classic &&
            allCircles[i].getAttribute('fill') != 'none') {
            allCircles[i].setAttribute('fill', 'rgb(241,111,101)');
        }
    }

}


function setCellNumbers() {
    let tmp = 0;
    for (let i = 0; i < timestampArray.length; i++) {
        allCircles[timestampArray[i]].parentElement.innerHTML += `<span class="cell-number">${i+1}</span>`;
        tmp = i+1;
    }
    allCircles[allCircles.length-1].parentElement.innerHTML += `<span class="cell-number">${tmp+1}</span>`;
}

function getGrey () {
    for(let i = 0; i < allCircles.length; i++ ) {
        if ( allCircles[i].getAttribute('fill') == 'none' ) {
            allCircles[i].classList.add('get-grey');
        }
    }
}

function finish() {
    beep.play();
    circlesAvailable = false;
    location.href = "#results";
    clearInterval(idTimeInterval);
    document.querySelector('#time').textContent = '--:--';
    finishButton.setAttribute('disabled', true);
    setTimeout(() => {
        grid.classList.remove('grid-border');
    }, 500);
    document.getElementById('results').classList.remove('hidden');
    colorCircles();
    getGrey();
    setCellNumbers();
    console.log(M, N, Q);
}

function kindaFinish() {
    beep.play();
    circlesAvailable = false;
    clearInterval(idTimeInterval);
    document.querySelector('#time').textContent = '--:--';
    finishButton.setAttribute('disabled', true);
    colorCircles();
    setCellNumbers();
}

function resultMN() {
    let _M=0, _N=0;
    for(let j = allCircles.length-1; j > finalI ; j--) {
        // if (allCircles[j].getAttribute('fill') == 'rgb(177,177,177)') {
        //     break;
        // }
        if (allCircles[j].getAttribute('style') == `transform: rotate(${classic}deg);` 
        ) {
            _M++;
        }
        
    }
    for(let j = allCircles.length-1; j > finalI ; j--) {

        // if (allCircles[j].getAttribute('fill') == 'rgb(177,177,177)') {
        //     break;
        // }
        if ((allCircles[j].getAttribute('fill') == 'rgb(177,177,177)' &&
        allCircles[j].getAttribute('style') != `transform: rotate(${classic}deg);`)
        || 
        (allCircles[j].getAttribute('fill') == 'none' &&
        allCircles[j].getAttribute('style') == `transform: rotate(${classic}deg);`)
        ) {
            _N++;
        }
        
        //
        //
        //
    }
    return [_M, _N];
}


finishButton.addEventListener('click', e => {


        // calculate(finalI);

        M.push(resultMN()[0]);
        N.push(resultMN()[1]);
        Q.push(816 - Q.reduce((sum,a) => sum + a, 0))
        passResults();
        finish();
    
    console.log('final i' , finalI);
    
    
})


function passResults () {
    for (const element of document.getElementsByClassName('result-time')) {
        element.innerHTML = classicTime;
    }
    for(let i = 0; i < M.length; i++) {
        document.getElementById('M').innerHTML += `M${i+1} = ${M[i]} `;
        document.getElementById('N').innerHTML += `N${i+1} = ${N[i]} `;
        document.getElementById('Q').innerHTML += `Q${i+1} = ${Q[i]} `;
    }
    document.getElementById('N').innerHTML += `Nt = ${N.reduce((sum,a) => sum + a, 0)} `;
    document.getElementById('Q').innerHTML += `Qt = ${Q.reduce((sum,a) => sum + a, 0)} `;
}



// var thenum;

// thenum = "foo35bar5".match(/\d+/)[0];

// console.log(thenum);

// console.log(document.getElementById('child').parentElement);


// location.href = "#";

// document.getElementById('#results').scrollIntoView({
//     behavior: 'smooth'
//   });