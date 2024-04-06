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
let j=0, i=0, k=0, ua=1, ub=2, ca=0, cb=1;//default case for star hide[ub=2],children[ua=1]
let clicks = 0;
let win = false;
let contBtn = document.querySelector("#continue");
const win_pattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8,],[0,4,8],[2,4,6]];
let userChoiceGot;
let container = document.querySelector(".container");
let containerHome = document.querySelector(".containerHome");
let containerMsg = document.querySelector(".containerMsg");
const choices = document.querySelectorAll(".choice");
let B1 = document.querySelector("#B1");
let S2 = document.querySelector("#S2");


//too choose a choice
choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        userChoiceGot = choice.getAttribute("id");
        choice.classList.remove("hide3");
        choices.forEach((choice) => {
            choice.classList.add("disabled");
        })
    })
})


//continue button fn
const continuefn = () => {
    console.log(userChoiceGot);
    container.classList.remove("hide");
    B1.remove();
    S2.remove();
    choices.forEach((choice) => {
        choice.remove();
    })
    //containerHome.classList.add("hide");
    containerMsg.classList.add("hide");
    reset.classList.remove("hide");
}


contBtn.addEventListener("click", continuefn);


//check for win possibility and if there is one put bh there
const checkTwoboxesOwn = () => {
    for(let pattern of win_pattern){
        let posUser1 = !(boxes[pattern[0]].children[ua].classList.contains(`hide${ub}`)  );
        let posUser2 = !(boxes[pattern[1]].children[ua].classList.contains(`hide${ub}`)  );
        let posUser3 = !(boxes[pattern[2]].children[ua].classList.contains(`hide${ub}`)  );

        let posComp1 = !(boxes[pattern[0]].children[ca].classList.contains(`hide${cb}`)  );
        let posComp2 = !(boxes[pattern[1]].children[ca].classList.contains(`hide${cb}`)  );
        let posComp3 = !(boxes[pattern[2]].children[ca].classList.contains(`hide${cb}`)  );
       
        if(posComp1 === true && posComp2 === true && posUser3 == false && posComp3 == false) {
            setTimeout(() => {
                fnX(pattern[2]);
            },500);
            return true;
        } else if(posComp1 === true && posComp3 === true && posUser2 == false && posComp2 !== true){
            setTimeout(() => {
                fnX(pattern[1]);
            },500);
            return true;
        } else if(posComp2 === true && posComp3 === true && posUser1 == false && posComp1 !== true){
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
        let posUser1 = !(boxes[pattern[0]].children[ua].classList.contains(`hide${ub}`)  );
        let posUser2 = !(boxes[pattern[1]].children[ua].classList.contains(`hide${ub}`)  );
        let posUser3 = !(boxes[pattern[2]].children[ua].classList.contains(`hide${ub}`)  );

        let posComp1 = !(boxes[pattern[0]].children[ca].classList.contains(`hide${cb}`)  );
        let posComp2 = !(boxes[pattern[1]].children[ca].classList.contains(`hide${cb}`)  );
        let posComp3 = !(boxes[pattern[2]].children[ca].classList.contains(`hide${cb}`)  );
       
        if(posUser1 === true && posUser2 === true && posUser3 == false && posComp3 == false) {
            setTimeout(() => {
                fnX(pattern[2]);
            },500);
            return true;
        } else if(posUser1 === true && posUser3 === true && posUser2 == false && posComp2 !== true){
            setTimeout(() => {
                fnX(pattern[1]);
            },500);
            return true;
        } else if(posUser2 === true && posUser3 === true && posUser1 == false && posComp1 !== true){
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
    boxes[ranIdx].children[ca].classList.remove(`hide${cb}`);
    turn_o = true;
    boxes[ranIdx].classList.add("disabled");
    clicks++;
};


//Get intersection of mt1 and mt2
function getIntersection(arr1, arr2) {
    return arr1.filter(element => arr2.includes(element));
};


//count empty boxes
const empBoxes = () => {
    boxes.forEach((box) => {
        if(box.children[1].classList.contains("hide2")) {
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
    if(!win){
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

        if(userChoiceGot === "Blackhole"){
            ua=0, ca=1;
            ub=1, cb=2;

        }

        if(turn_o){
            box.children[ua].classList.remove(`hide${ub}`);
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
        let posUser1 = !(boxes[pattern[0]].children[ua].classList.contains(`hide${ub}`)  );
        let posUser2 = !(boxes[pattern[1]].children[ua].classList.contains(`hide${ub}`)  );
        let posUser3 = !(boxes[pattern[2]].children[ua].classList.contains(`hide${ub}`)  );

       if(posUser1 != "" && posUser2 != "" && posUser3 != ""){
            if(posUser1 === posUser2 && posUser2 === posUser3){
                
                console.log(`winner is user`);
                win = true;
                disableBox();
                showWinner(ua);
            }  
       }

       let posComp1 = !(boxes[pattern[0]].children[ca].classList.contains(`hide${cb}`)  );
       let posComp2 = !(boxes[pattern[1]].children[ca].classList.contains(`hide${cb}`)  );
       let posComp3 = !(boxes[pattern[2]].children[ca].classList.contains(`hide${cb}`)  );

        if(posComp1 != "" && posComp2 != "" && posComp3 != ""){
            if(posComp1 === posComp2 && posComp2 === posComp3){
                console.log(`winner is Comp`);
                win = true;
                disableBox();
                showWinner(ca);
            }
        }
    }
};


//Show winner
const showWinner = (winner) => {
    if (winner === 0){
        msg.innerText = `The Star came too close the Blackhole, the Blackhole consumed the Star `;
        msg_con.classList.remove("hide");
        reset.disabled = true; 
    } else if (winner === 1){
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


//new game 
const newGame = () => {
    turn_o = true;
    enableBox();
    msg_con.classList.add("hide");
    reset.disabled = false;
    mtBoxes = [],mtBoxes1 = [], mtBoxes2 = [];
    clicks = 0;
    win = false;
    container.classList.add("hide");
    containerHome.appendChild(choices[0]);
    containerHome.appendChild(choices[1]);
    choices[0].appendChild(B1);
    choices[1].appendChild(S2);
    containerMsg.classList.remove("hide");
    reset.classList.add("hide");
    choices.forEach((choice) => {
        choice.classList.add("hide3");
        choice.classList.remove("disabled");
    })
    ca=0, cb=1, ua=1, ub=2;
};

//reset
const resetGame = () => {
    turn_o = true;
    enableBox();
    msg_con.classList.add("hide");
    reset.disabled = false;
    mtBoxes = [],mtBoxes1 = [], mtBoxes2 = [];
    clicks = 0;
    win = false;
}
 
newbtn.addEventListener("click", newGame);
reset.addEventListener("click", resetGame);
