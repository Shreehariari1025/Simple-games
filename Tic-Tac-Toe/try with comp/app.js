let boxes = document.querySelectorAll(".btn");
let turn_o = true;
let reset = document.querySelector("#rst");
let newbtn = document.querySelector("#newBtn");
let msg_con = document.querySelector(".msgContainer");
let msg =document.querySelector("#Msg");
let mtBoxes = [];
let gotRand = false;
let j=0, i=0;
const win_pattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8,],[0,4,8],[2,4,6]];

//check for win possibility and stop if there is one
const checkTwoboxes = () => {
    for(let pattern of win_pattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        console.log(pos1,pos2,pos3);
       
        if(pos1 === "O" && pos2 === "O" && pos3 !== "X") {
            console.log (pattern[2]);
            fnX(pattern[2]);
            return true;
        } else if(pos1 === "O" && pos3 === "O" && pos2 !== "X"){
            console.log (pattern[1]);
            fnX(pattern[1]);
            return true;
        } else if(pos2 === "O" && pos3 === "O" && pos1 !== "X"){
            console.log (pattern[0]);
            fnX(pattern[0]);
            return true;
        }
    }
    return false;
};


//put X in the box
const fnX = (ranIdx) => {
    boxes[ranIdx].innerText = "X";
    turn_o = true;
    boxes[ranIdx].classList.add("col");
    boxes[ranIdx].disabled = true;
};


//count empty boxes
const empBoxes = () => {
    boxes.forEach((box) => {
        if(box.innerText === ""){
            mtBoxes[j] = i;
            j++;
        }
        i++;
    });
    i=0;
};    


//generate random 
const genComp = () => {
    if (mtBoxes.length !== 0){
        while(true){
            const ranIdx = Math.floor(Math.random()*9);
            for(let idx = 0; idx < mtBoxes.length; idx++){  //checking whether the generated ranIdx is in mtBoxes
                if(mtBoxes[idx] === ranIdx){
                    gotRand = true;
                    fnX(ranIdx);
                    break;
                }
            }
            if(gotRand){
                break;
            }
        }
    }
};


//disable box after win
const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

//draw
const draw = () => {
    let count_nowin = 0;
    for(let pattern of win_pattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
       
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 !== pos2 || pos2 !== pos3){
                count_nowin++;
            }
        }
    }
    if(count_nowin === 8){
        msg.innerText = `This match is a draw`;
        msg_con.classList.remove("hide");
        reset.disabled = true; 
        disableBox();
    }    
};

//box logic
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        let checkWinPos = false;
        gotRand = false;
        mtBoxes.length = 0;
        if(turn_o){
            box.innerText = "O";
            turn_o = false;
            box.classList.remove("col");
            box.disabled = true;
        } 
        console.log("clicked");
        checkWinner();
        checkWinPos = checkTwoboxes();
        if(checkWinPos === false){
            setTimeout( () => {
                genComp();
            }, 500);
        }
        checkWinner();
        draw();
        empBoxes();
    });
});



//check winner
const checkWinner = () => {
    for(let pattern of win_pattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
       
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log(`winner is ${pos1}`);
                disableBox();
                showWinner(pos1);
            }
        }
    }
};

//Show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg_con.classList.remove("hide");
    reset.disabled = true; 
};

//enable box when new or reset
const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

//reset 
const resetGame = () => {
    turn_o = true;
    enableBox();
    msg_con.classList.add("hide");
    reset.disabled = false;
    mtBoxes = [];
};
 
newbtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
