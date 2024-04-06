let boxes = document.querySelectorAll(".btn");
let turn_o = true;
let reset = document.querySelector("#rst");
let newbtn = document.querySelector("#newBtn");
let msg_con = document.querySelector(".msgContainer");
let msg =document.querySelector("#Msg");
const win_pattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8,],[0,4,8],[2,4,6]];

console.log(boxes);
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
}

//box logic
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turn_o){
            box.innerText = "O";
            turn_o = false;
            box.classList.remove("col");
        }
        else{
            box.innerText = "X";
            turn_o = true;
            box.classList.add("col");
        }
        box.disabled = true;
        checkWinner();
        draw();
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
};
 
newbtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
