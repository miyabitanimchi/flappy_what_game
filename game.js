const gameContainer = document.getElementById("game-container");
const accelerateBtn = document.getElementById("accelerate-btn");
const gameCanvas = document.getElementById("gamecanvas");
const gameCtx = gameCanvas.getContext("2d");

// Your buddy(img you drew), create a new Image() from the image class
let yourBuddy = new Image();
yourBuddy.src = "flappybird.png";

// Set the initial values to zero (coordinate X Y for bird and score/bestscore)
let birdX = birdDY = score = bestScore = bulletY = 0;

// Set bird size and coordinate Y for tip of upper pipe
let yourBuddySize = topPipeBottomY = 20;

//pipe width 
let pipeWidth = 30;

// set coordinate Y for bird and gap of pipe
let birdY = pipeGap = 200;
let pipeX = canvasSizeX = bulletX = 500;
let canvasSizeY =  400;

// Define the gap between canvas top to bullet Y
let fromBottomToBulletY;

//Get y coordinate for the bottom of the image
let bottomOfImg;

// to see if game is being played
let isPlaying = false;

// Default screen
gameCtx.fillStyle = "lightblue";
gameCtx.fillRect(0, 0, canvasSizeX, canvasSizeY);
gameCtx.fillStyle = "blue";
gameCtx.font = '25px sans-serif';
gameCtx.fillText("Click here to play", 140, 200);

// set up click event
gameCanvas.addEventListener("click", () => {
    if (isPlaying) {
    birdDY = -7;
    console.log("canvas clicked");
    } else {
        gameStarts();
    }
});

// main loop to begin the game!
const gameStarts = () => {
    const gameLoop = setInterval(() => {
        // to let you know that game is being played
        if (!isPlaying) {
            isPlaying = true;
            }
        
        // //Implement img
        // showImgWithTransparentBG("bird.jpeg");

        // Set the background color 
        gameCtx.fillStyle = "white"

        // Draw the canvas 
        gameCtx.fillRect(0, 0, canvasSizeX, canvasSizeY);

        // Draw bird
        gameCtx.drawImage(yourBuddy, birdX, birdY, yourBuddySize * 2, yourBuddySize * 2);

        // Deal with gravity
        birdY += birdDY += 0.4;

        // Prepare pipe
        gameCtx.fillStyle = "blue";
        // gameCtx.fillStyle = "green";
        pipeX -= 8; //Move pipe
        pipeX < -pipeWidth && // Pipe off screen
        ((pipeX = canvasSizeY), (topPipeBottomY = pipeGap * Math.random())); //Reset pipe and randomize gap

        // Prepare bullet
        bulletX -= 15;
        bulletX < -pipeWidth &&
        ((bulletX = canvasSizeY), (bulletY = 400 * Math.random()));

        // get the data of the gap between the top to bullet
        fromBottomToBulletY = canvasSizeY - bulletY;

        //Get y coordinate for the bottom of the image
        bottomOfImg = birdY + (yourBuddySize * 3);

        // create pipes
        gameCtx.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);
        gameCtx.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSizeX);

         // Random color for bullet
        const colorArray = ["red", "blue", "orange", "lightgreen", "pink", "lightgreen", "purple"];
        let getRandomIndex = Math.floor(Math.random() * colorArray.length);
        gameCtx.fillStyle = `${colorArray[getRandomIndex]}`;
    
        // Create bullet
        gameCtx.fillRect(bulletX, bulletY, pipeWidth, 10);
        // start with other elements like score
        gameCtx.fillStyle = "black";
        gameCtx.font = '15px sans-serif';
        gameCtx.fillText(score++, 10, 25); // Increase and draw score

        bestScore = bestScore < score ? score : bestScore; // New best score

        gameCtx.fillText(`Best score : ${bestScore}`, 10, 45);

        // (
        //     ((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) && pipeX < yourBuddySize * 3 // bird hit pipe,
        //     || ((fromBottomToBulletY < birdY <= bulletY + 10) && bulletX < yourBuddySize * 3)) // or, bird hit bullet
        //         || birdY > canvasSizeY //or, bird falls
        // ) 
        // && // If true, if that happened
        // (
        //     // bird dies, reset the values and game 
        //     (birdDY = 0), 
        //     (birdY = 200), 
        //     (pipeX = canvasSizeY), 
        //     (bulletX = canvasSizeY),
        //     (bulletY = 0),
        //     (score = 0), 
        //     (isPlaying = false), 
        //     (clearInterval(gameLoop))
        // );

        // console.log(`This is the gap from top to bulletY: ${fromBottomToBulletY}`);
        // console.log(`bulletY: ${bulletY}`);
        // console.log(`birdY: ${birdY}`);
        // console.log(bottomOfImg);
        

        // Bird hit pipe
        if (((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) && pipeX < yourBuddySize * 3)) {
            birdDY = 0;
            birdY = 200;
            pipeX = canvasSizeY;
            bulletX = canvasSizeY;
            bulletY = 0;
            score = 0;
            isPlaying = false;
            clearInterval(gameLoop);
        }
        // bird hit bullet
        if (((birdY <= bulletY) && (bulletY < bottomOfImg)) && (bulletX < yourBuddySize * 3 / 1.5)) {
            birdDY = 0;
            birdY = 200;
            pipeX = canvasSizeY;
            bulletX = canvasSizeY;
            bulletY = 0;
            score = 0;
            isPlaying = false;
            clearInterval(gameLoop);
        }

        // bird falls
        if (birdY > canvasSizeY) {
            birdDY = 0;
            birdY = 200;
            pipeX = canvasSizeY;
            bulletX = canvasSizeY;
            bulletY = 0;
            score = 0;
            isPlaying = false;
            clearInterval(gameLoop);
        }
        
        // // This works but doesn't detect bullets
        // (
        //     ((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) && pipeX < yourBuddySize * 3 ) // If bird hits pipe,
        //     || birdY > canvasSizeY
        // ) && //or, bird falls
        //     (
        //         // bird dies, reset the values and game 
        //         (birdDY = 0), 
        //         (birdY = 200), 
        //         (pipeX = canvasSizeY), 
        //         (score = 0), 
        //         (isPlaying = false), 
        //         (clearInterval(gameLoop))
        //     ); 
        

        if (!isPlaying) {
            gameCtx.font = '20px sans-serif';
            gameCtx.fillText("Game Over... click here to play again!", 70, 170);
        }
    }, 25);    
}

 

// if (((birdY <= bulletY) && (bulletY < bottomOfImg)) && (pipeX < yourBuddySize * 3)) {