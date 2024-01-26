const startLives = 3;
const startScore = 30;
const addAfterLandedShot = 10;
const addAfterMissedShot = -3;
const speedRange = [1, 2, 3, 4, 5];
const sizeRange = [0.5, 1];
const zombieHeight = 200;
const spaceForZombies = $("#zombie-container").height();
const defaultZombieSpeed = 5;
const sound = new Audio("sound/pew.mp3");
let mousePos = { x: undefined, y: undefined };


// Helper functions
function getRandomFloat(range, decimals) {
    const str = (Math.random() * (range[1] - range[0]) + range[0]).toFixed(
      decimals,
    );
  
    return parseFloat(str);
}

function getRandomInRange(max) {
    return Math.floor(Math.random() * max);
}

const inBetween = (a, b, c) => {
    return (a <= b && b <= c);
}

function formatScore(num, totalLength) {
    if (num < 0) {
      const withoutMinus = String(num).slice(1);
      return '-' + withoutMinus.padStart(totalLength, '0');
    }
  
    return String(num).padStart(totalLength, '0');
}

const getPosition = el => {
    let rect = el.getBoundingClientRect();
    x = rect.x + window.scrollX;
    y = rect.y + window.scrollY;
    return {x, y};
}
// End of helper functions


// Handler functions
const refillHearts = () => {
    $("#heart-container").children().each(function() {
        $(this).attr('src','images/full_heart.png');
    })
}

const removeHeart = () => {
    $($("#heart-container").children().get().reverse()).each(function() {
        if($(this).attr('src') == 'images/full_heart.png') {
            $(this).attr('src','images/empty_heart.png');
            return false;
        }
    })
}

const decreaseHealth = () => {
    $('#heart-loss-audio')[0].currentTime = 0;
    $('#heart-loss-audio')[0].play();
    totalLives-=1;
    removeHeart();
    if(totalLives <= 0) {
        stopGame();
    }
}

const updateScore = (delta) => {
    totalScore += delta;
    $("#score").text(formatScore(totalScore, 5));
}

const displayScore = () => {
    const scoreInfo = $("#score-summary");
    scoreInfo.text(String(totalScore));
    $("#lose-container").removeClass("hidden");
    $("#inner-container").removeClass("hidden");
}

addMouseMoveListener = () => {
    $(document).mousemove(function(e){
        mousePos = { x: e.clientX, y: e.clientY };
        $('#custom-cursor').css('left',e.pageX+"px");
        $('#custom-cursor').css('top',e.pageY+"px");
    });
}

const setCrosshair = () => {
    $('body').css( 'cursor', 'url(images/aim.png), auto' );
    $('#custom-cursor').css('left',mousePos.x+"px");
    $('#custom-cursor').css('top',mousePos.y+"px");
    addMouseMoveListener();
    $('#custom-cursor').removeClass('hidden');
    $('body').css('cursor', 'none');
}

const hideCrosshair = () => {
    $('body').css('cursor', 'default');
    $("#custom-cursor").addClass('hidden');
}

const playBgMusic = () => {
    $('#you-died-audio')[0].pause()
    $('#bg-audio')[0].currentTime = 0;
    $('#bg-audio')[0].play()
}

const stopBgMusic = () => {
    $('#bg-audio')[0].pause()
    $('#you-died-audio')[0].currentTime = 0;
    $('#you-died-audio')[0].play()
}

const playShotSound = () => {
    var click=sound.cloneNode();
    click.play();
}

// End of handlers

// Zombie logic
const spawnZombie = (heightInt, sizeFloat, durationInt) => {
    let height = heightInt-((1-sizeFloat)*200);
    let newZombie = `<div style="
        bottom: ${height}px;
        transform:scale(${sizeFloat});
        animation: characterSteps 1s steps(10) infinite, movement linear ${durationInt}s;
        " class="zombie"></div>`
    $("#zombie-container").append(newZombie);
}

const zombieSpawner = () => {
    let speedMult = speedRange[getRandomInRange(speedRange.length)];
    spawnZombie(
        getRandomInRange(spaceForZombies),
        getRandomFloat(sizeRange, 2),
        speedMult*defaultZombieSpeed
    );
}

const despawnAllZombies = () => {
    $("#zombie-container").children().each(function () {
        this.remove()
    });
}

const zombiePassed = () => {
    $("#zombie-container").children().each(function () {
        if ( getPosition(this).x < -150) {
            decreaseHealth();
            this.remove()
        }
    }); 
}
// End of zombie logic


const shot = () => {
    if(totalScore < 0) {
        return;
    }
    playShotSound(1);
    const mousePosition = mousePos;
    let didLand = false;
    $("#zombie-container").children().each(function () {
        upperLeft = getPosition(this);
        if(inBetween(0, mousePosition.x - upperLeft.x, 200)&&
            inBetween(0, mousePosition.y - upperLeft.y, 312)) {
                didLand = true;
                this.remove();
                updateScore(addAfterLandedShot);
                return false;
            };
    });
    if(!didLand) {updateScore(addAfterMissedShot)}
}

// Game state
const startWithDelay = () => {
    $("#start-container").addClass("hidden");
    $("#inner-container").addClass("hidden");
    setTimeout(startGame, 100)
}

const startGame = () => {
    window.totalScore = startScore;
    window.totalLives = startLives;
    updateScore(0);
    refillHearts();
    $(document).on('click', shot);
    $("#lose-container").addClass("hidden");
    window.zombieChecker = setInterval(zombiePassed, 50);
    window.zombieSpawner = setInterval(zombieSpawner, 1000);
    playBgMusic();
    setCrosshair();
}

const stopGame = () => {
    despawnAllZombies();
    clearInterval(window.zombieChecker);
    clearInterval(window.zombieSpawner);
    displayScore();
    $(document).off('click', shot);
    stopBgMusic();
    hideCrosshair();
}
// End game state


$("#start-button").on('click', startWithDelay);
$("#replay-button").on('click', startWithDelay);