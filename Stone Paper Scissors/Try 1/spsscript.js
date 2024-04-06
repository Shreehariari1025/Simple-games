let userScore=compScore=0;
const choices = document.querySelectorAll(".choice");
let userHtml = document.querySelector("#userScore");
let compHtml = document.querySelector("#compScore");
let msg = document.querySelector("#msg");


//Genearating computers random choice
const genCompChoice = () => {
    const options = ["Stone","Paper","Scissors"];
    const ranIdx = Math.floor(Math.random()*3);
    return options[ranIdx];
}


//Draw game
const drawGame = () => {
    msg.innerText = "Game was draw";
    document.getElementById("msg").style.backgroundColor = "darkslategray";
}


//Show winner
const ShowWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        userScore++;
        userHtml.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beat ${compChoice}`;
        document.getElementById("msg").style.backgroundColor = "green";
    }
    else{
        compScore++;
        compHtml.innerText = compScore;
        msg.innerText = `You lose. ${compChoice} beat Your ${userChoice}`;
        document.getElementById("msg").style.backgroundColor = "red";
    }
    console.log(userWin,userChoice,compChoice);
}


//Game logic
const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    console.log(compChoice);
    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if (userChoice === "Stone"){
            userWin = compChoice === "Paper"? false : true;
        }
        else if (userChoice === "Paper"){
            userWin = compChoice === "Scissors"? false : true;
        }
        else{
            userWin = compChoice ==="Stone"? false : true;
        }
        ShowWinner(userWin,userChoice,compChoice);
    }
}


//start of check
choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id");
        console.log(userChoice);
        playGame(userChoice);
    });
});