let boxes = document.querySelectorAll(".btn");
let star = document.querySelectorAll(".st");
let bh = document.querySelectorAll(".bh");
let turn_o = true;
let reset = document.querySelector("#rst");
let newbtn = document.querySelector("#newBtn");
let msg_con = document.querySelector(".msgContainer");
let msg =document.querySelector("#Msg");
let mtBoxes=[], mtBoxes1=[], mtBoxes2 = [];
let gotRand = false;
let j=0, i=0, k=0;
let clicks = 0;
let nowin = false;
const win_pattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8,],[0,4,8],[2,4,6]];


//check for win possibility and if there is one put bh there
const checkTwoboxesOwn = () => {
    for(let pattern of win_pattern){
        let posSt1 = !(boxes[pattern[0]].children[1].classList.contains("hide2")  );
        let posSt2 = !(boxes[pattern[1]].children[1].classList.contains("hide2")  );
        let posSt3 = !(boxes[pattern[2]].children[1].classList.contains("hide2")  );

        let posBh1 = !(boxes[pattern[0]].children[0].classList.contains("hide1")  );
        let posBh2 = !(boxes[pattern[1]].children[0].classList.contains("hide1")  );
        let posBh3 = !(boxes[pattern[2]].children[0].classList.contains("hide1")  );
       
        if(posBh1 === true && posBh2 === true && posSt3 == false && posBh3 == false) {
            setTimeout(() => {
                fnX(pattern[2]);
            },500);
            return true;
        } else if(posBh1 === true && posBh3 === true && posSt2 == false && posBh2 !== true){
            setTimeout(() => {
                fnX(pattern[1]);
            },500);
            return true;
        } else if(posBh2 === true && posBh3 === true && posSt1 == false && posBh1 !== true){
            setTimeout(() => {
                fnX(pattern[0]);
            },500);
            return true;
        }
    }
    return false;
};


//check for win possibility of opp and stop if there is one
const checkTwoboxesOpp = () => {
    for(let pattern of win_pattern){
        let posSt1 = !(boxes[pattern[0]].children[1].classList.contains("hide2")  );
        let posSt2 = !(boxes[pattern[1]].children[1].classList.contains("hide2")  );
        let posSt3 = !(boxes[pattern[2]].children[1].classList.contains("hide2")  );

        let posBh1 = !(boxes[pattern[0]].children[0].classList.contains("hide1")  );
        let posBh2 = !(boxes[pattern[1]].children[0].classList.contains("hide1")  );
        let posBh3 = !(boxes[pattern[2]].children[0].classList.contains("hide1")  );
       
        if(posSt1 === true && posSt2 === true && posSt3 == false && posBh3 == false) {
            setTimeout(() => {
                fnX(pattern[2]);
            },500);
            return true;
        } else if(posSt1 === true && posSt3 === true && posSt2 == false && posBh2 !== true){
            setTimeout(() => {
                fnX(pattern[1]);
            },500);
            return true;
        } else if(posSt2 === true && posSt3 === true && posSt1 == false && posBh1 !== true){
            setTimeout(() => {
                fnX(pattern[0]);
            },500);
            return true;
        }
    }
    return false;
};


//put X in the box
const fnX = (ranIdx) => {
    bh[ranIdx].classList.remove("hide1");
    turn_o = true;
    boxes[ranIdx].classList.add("disabled");
    clicks++;
};


//Get intersection of mt1 and mt2
function getIntersection(arr1, arr2) {
    return arr1.filter(element => arr2.includes(element));
}


//count empty boxes
const empBoxes = () => {
    boxes.forEach((box) => {
        if(box.children[1].classList.contains("hide2")){
            mtBoxes1[j] = i;
            j++;
        }
        i++;
    });
    i=0;
    boxes.forEach((box) => {
        if(box.children[0].classList.contains("hide1")){
            mtBoxes2[k] = i;
            k++;
        }
        i++;
    });
    i=0;
    mtBoxes = getIntersection(mtBoxes1, mtBoxes2);
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
        box.classList.add("disabled");
    }
};

//draw
const draw = () => {
    if(!nowin){
        msg.innerText = `The Blackhole and the star are in a binary system and it is stable`;
        msg_con.classList.remove("hide");
        reset.disabled = true; 
        disableBox();
    }    
};


//box logic
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        let checkWinOppPos = false;
        let checkWinOwnPos = false;
        gotRand = false;
        mtBoxes.length = 0,mtBoxes1.length = 0, mtBoxes2.length = 0;
        if(turn_o){
            box.children[1].classList.remove("hide2");
            turn_o = false;
            box.classList.add("disabled");
            clicks++;
        } 
        checkWinner();
        checkWinOwnPos = checkTwoboxesOwn();
        if(checkWinOwnPos === false){
            checkWinPos = checkTwoboxesOpp();
            if(checkWinPos === false){
                setTimeout( () => {
                genComp();
                checkWinner();
                }, 500);
            }
        }
        setTimeout( () => {
            checkWinner();
        },600);
        if(clicks === 9){
            draw();
        }
        empBoxes();
    });
});



//check winner
const checkWinner = () => {
    for(let pattern of win_pattern){
        let posSt1 = !(boxes[pattern[0]].children[1].classList.contains("hide2")  );
        let posSt2 = !(boxes[pattern[1]].children[1].classList.contains("hide2")  );
        let posSt3 = !(boxes[pattern[2]].children[1].classList.contains("hide2")  );

       if(posSt1 != "" && posSt2 != "" && posSt3 != ""){
            if(posSt1 === posSt2 && posSt2 === posSt3){
                console.log(`winner is star`);
                nowin = true;
                disableBox();
                showWinner("Star");
            }  
       }

        let posBh1 = !(boxes[pattern[0]].children[0].classList.contains("hide1")  );
        let posBh2 = !(boxes[pattern[1]].children[0].classList.contains("hide1")  );
        let posBh3 = !(boxes[pattern[2]].children[0].classList.contains("hide1")  );
       
        if(posBh1 != "" && posBh2 != "" && posBh3 != ""){
            if(posBh1 === posBh2 && posBh2 === posBh3){
                console.log(`winner is bh`);
                nowin = true;
                disableBox();
                showWinner("Bh");
            }
        }
    }
};


//Show winner
const showWinner = (winner) => {
    if (winner === "Bh"){
        msg.innerText = `The Star came too close the Blackhole, the Blackhole consumed the Star `;
        msg_con.classList.remove("hide");
        reset.disabled = true; 
    } else if (winner === "Star"){
        msg.innerText = `The Star had a velocity which was enough to escape from the Blackhole's orbit`;
        msg_con.classList.remove("hide");
        reset.disabled = true; 
    }
    
};

//enable box when new or reset
const enableBox = () => {
    for(let box of boxes){
        box.classList.remove("disabled");
        box.children[0].classList.add("hide1");
        box.children[1].classList.add("hide2")
    }
};

//reset 
const resetGame = () => {
    turn_o = true;
    enableBox();
    msg_con.classList.add("hide");
    reset.disabled = false;
    mtBoxes = [],mtBoxes1 = [], mtBoxes2 = [];
    clicks = 0;
    nowin = false;
};
 
newbtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
