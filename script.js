// selecting all required element
const selectBox = document.querySelector(".select-box"),
    selectxBtn = selectBox.querySelector(".playerx"),
    selectoBtn = selectBox.querySelector(".playero"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText= resultBox.querySelector(".won-text"),
replaybtn= resultBox.querySelector("button");


window.onload = () => {//once window loaded
    for (let i = 0; i < allBox.length; i++) {// add onclick attribute in all avaiable section's span
        allBox[i].setAttribute("onclick", "ckickedBox(this)");

    }
    selectxBtn.onclick = () => {
        selectBox.classList.add("hide");//hide the select box on playerX button clicked
        playBoard.classList.add('show');//show the playboard section on playerX button clicked 
    }
    selectoBtn.onclick = () => {
        selectBox.classList.add("hide");//hide the select box on player o button clicked
        playBoard.classList.add('show');//show the playboard section on player o button clicked 
        players.setAttribute("class", "players active player");//adding three class names in player
    }
}

let playerXIcon = "fas fa-times"; // class name form fontawesome cross icon
let playerOIcon = "far fa-circle"; // //class name form fontawesome circle icon
let playerSign="X"; //suppose player will be  X 
let runBot=true;

// user click  function
function ckickedBox(element) {
    // console.log(element);
    if (players.classList.contains("player")) {//if players element has contains.player
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding  circle icon tag inside user cliked element
        players.classList.add("active");
        //if player select O then we'll change the playerSign  value to O
        playerSign="O"; 
        element.setAttribute("id",playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding  cross icon tag inside user cliked element
        players.classList.add("active");
        element.setAttribute("id",playerSign);
    }
    selectWinner();//calling  the winner function
    playBoard.style.pointerEvents = "none"
    element.style.pointerEvents = "none"//once user select any one of the box then that box cannot be selected again
    let randomDelayTime=((Math.random()*1000)+200).toFixed();//generating random time delay so bot will delay randomly to select box 
 setTimeout(()=>{
    bot(runBot);// calling  bot function 
 },randomDelayTime);// passing  random  delay time 

   }

// bot click function
function bot(runBot) {
if(runBot){// if runbot is true then run following codes
        // first change the playerSign... So   id user has X value in  id then  bot will have O
        playerSign="O";

        let array = [];//creating empty array... we'lln store unselected box index in this  array
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {// if span  has no any child element 
                array.push(i);//inserting unclicked or unselected boxes inside array means that span ha no childern
    
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];//getting random index from array so bot will select random unselected box
        if (array.length > 0) {
            if (players.classList.contains("player")) {//if players element has contains.player
                allBox[randomBox].innerHTML= `<i class="${playerXIcon}"></i>`; //adding  cross icon tag inside user cliked element
                players.classList.remove("active");
               // if user is O then the box id value will be  X
               playerSign="X"; 
               allBox[randomBox].setAttribute("id",playerSign);
            } else {
                allBox[randomBox].innerHTML= `<i class="${playerOIcon}"></i>`;// adding  circle icon tag inside user cliked element
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id",playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents="none";//once bot select any box then user can't select or click that box 
        playBoard.style.pointerEvents = "auto";
        playerSign="X"; //passing the X value
}
  
}

// let work on select the winner
 function getClass(idname){
    return document.querySelector(".box"+idname).id;//returning id name
 }

 function checkClass(val1,val2,val3,sign){
    if(getClass(val1)==sign && getClass(val2)==sign && getClass(val3)==sign){
        return true;
    }
 }
 function selectWinner(){// one combination of them matched them select the winner
    if(checkClass(1,2,3,playerSign) ||  checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign)  || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) ||checkClass(1,5,9,playerSign) ||checkClass(3,5,7,playerSign)){
        //once match won by someone then stop the bot
        runBot=false;
        bot(runBot);

       
        setTimeout(()=>{// we'll delay to show result box
playBoard.classList.remove("show");
resultBox.classList.add("show");
        },700);//700 ms delay
 //let show the result box with winner sign
 wonText.innerHTML=`Player<p>${playerSign}</P> won the game!`;

    }
    else{
        // if match  has draw
        //first we'll check all id.. if all span has id and no one own the game will draw
        if((getClass(1)!=""&&getClass(2)!="" && getClass(3)!=""&& getClass(4)!=""&& getClass(5)!=""&& getClass(6)!=""&& getClass(7)!=""&& getClass(8)!=""&& getClass(9)!="")){
            setTimeout(()=>{// we'll delay to show result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
                        },700);//700 ms delay
              
                 wonText.textContent=` MAtch has been Draw!`;
        }
    }
 }
 replaybtn.onclick= ()=>{
   window.location.reload();//reload current page
 }