const choices = document.querySelectorAll(".choice");

console.log(choices);

const disableBox = () => {
    for(let choice of choices){
        choice.classList.add("disabled");
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userChoiceGot = choice.getAttribute("id");
        choice.classList.remove("hide");
        console.log(userChoiceGot);
        disableBox();
    })
})



