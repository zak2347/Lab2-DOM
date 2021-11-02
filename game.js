function Bear() {
    this.dBear = 100; //variable to store number of steps made by bear in pixels
    this.htmlElement = document.getElementById("bear"); //variable called html element to hold bear image
    this.id = this.htmlElement.id; //variable called id that holds id of bear image
    this.x = this.htmlElement.offsetLeft; //variable to move the bear along x axis when incremented
    this.y = this.htmlElement.offsetTop;//variable to move the bear along the y-axis when incremented
    

    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
    };

    

    

    this.move = function(xDir, yDir) { //function to move bear
        this.x += this.dBear * xDir; // x variable is incremented to move bear along x axis depending on parameters passed to move function
        this.y += this.dBear * yDir; // y variable is incremented to move bear along y axis depending on parameters passed to move function
        this.fitBounds(); // function to check if bears next movement fits the bounds set, the green box, if not either x or y is set to zero depending on which one is out of bounds.
        this.display(); //display function called to display bears new position
    };

    this.display = function() { //display function to display bears position
        this.htmlElement.style.left = this.x + "px";//changes css of bear image by variable x's value in pixels between left and right or x axis
        this.htmlElement.style.top = this.y + "px"; //changes css of bear image by variable y's value in pixels between top and botom or y axis
        this.htmlElement.style.display = "block"; //changes display of bear image to block so that bear image starts on a new line, and takes up the whole width
    };

   }

class Bee {
    constructor(beeNumber) {
        //the HTML element corresponding to the IMG of the bee
        this.htmlElement = createBeeImg(beeNumber);
        //iits HTML ID
        this.id = this.htmlElement.id;
        //the left position (x)
        this.x = this.htmlElement.offsetLeft;
        //the top position (y)
        this.y = this.htmlElement.offsetTop;

        this.move = function(dx, dy) {
            //move the bees by dx, dy
            this.x += dx;
            this.y += dy;
            this.display();
        };

        this.display = function() {
            //adjust position of bee and display it
            this.fitBounds();//add this to adjust to bounds
            this.htmlElement.style.left = this.x + "px";
            this.htmlElement.style.top = this.y + "px";
            this.htmlElement.style.display = "block";
        };
        this.fitBounds = function() {
            //check and make sure the bees stays in the board space
            let parent = this.htmlElement.parentElement;
            let iw = this.htmlElement.offsetWidth;
            let ih = this.htmlElement.offsetHeight;
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;
            if (this.x < 0)
            this.x = 0;
            if (this.x > w - iw)
            this.x = w - iw;
            if (this.y < 0)
            this.y = 0;
            if (this.y > h - ih)
            this.y = h - ih;
        };
    }

}
   

   
    function setSpeed() {

        var Speed = Number(document.getElementById("speedBear").value);

        if(isNaN(Speed)) { 

            window.alert("please put real number"); 

        } else {

            bear.dBear = Speed; 

        }
    

    }
    
   

    function start() {
        //create bear
        bear = new Bear();
        
        //changing speed of bear when input speedBear is changed and calling function setSpeed to update bear with new speed.
        document.getElementById("speedBear").addEventListener("change", setSpeed, false);

        //create new array for bees
        bees = new Array();
        //create bees
        
        updateBees();
        makeBees();

        let beeNumber = 2;

        document.getElementById("addBees").addEventListener("click", function addBee() {

            //console.log("clicked!");
            makeBees();

            document.getElementById("nbBees").value = beeNumber;

            beeNumber += 1;
        
        }, false);

        


        
        document.addEventListener("keydown", function lastST()  {

            //take start time
            lastStingTime = new Date();

            if (isNaN(Number(duration.innerHTML))) {

                duration.innerHTML = 0;

            }

        }, false);
    
    }

    function getRandomInt(max) {

        random = Math.floor(Math.random() * (max + 1));

        return random;
    }

    function createBeeImg(wNum) {
        //get dimension and position of board div
        let boardDiv = document.getElementById("board");
        let boardDivW = boardDiv.offsetWidth;
        let boardDivH = boardDiv.offsetHeight;
        let boardDivX = boardDiv.offsetLeft;
        let boardDivY = boardDiv.offsetTop;
        //create the IMG element
        let img = document.createElement("img");
        img.setAttribute("src", "images/bee.gif");
        img.setAttribute("width", "100");
        img.setAttribute("alt", "A bee!");
        img.setAttribute("id", "bee" + wNum);
        img.setAttribute("class", "bee"); //set class of html tag img
        //add the IMG element to the DOM as a child of the board div
        img.style.position = "absolute";
        boardDiv.appendChild(img);
        //set initial position 
        let x = getRandomInt(boardDivW);
        let y = getRandomInt(boardDivH);
        img.style.left = (boardDivX + x) + "px";
        img.style.top = (y) + "px"; 
        //return the img object
        return img;

}

function makeBees() {
    //get number of bees specified by the user
    let nbBees = 1;
    nbBees = Number(nbBees); //try converting the content of the input to a number 

    if (isNaN(nbBees)) { //check that the input field contains a valid number
        window.alert("Invalid number of bees");
        return;
    }

    
    //console.log(nbBees);
    //create bees 
    let i = 1;

    while (i <= nbBees) {
        var num = i;
        var bee = new Bee(num); //create object and its IMG element
        bee.display(); //display the bee
        bees.push(bee); //add the bee object to the bees array
        i++;
    }
}



function moveBees() {
    //get speed input field value
    let speed = document.getElementById("speedBees").value;
    //move each bee to a random location
    for (let i = 0; i < bees.length; i++) {
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx, dy);
        isHit(bees[i], bear); //we add this to count stings
    }
}



function updateBees() { // update loop for game
    let hits = Number(document.getElementById("hits").textContent); //comment and find out why you use let


    if (hits >= 1000) {

        //console.log("Game Over!");
        gameOver.innerHTML = "Game Over!";
        updateTimer = clearTimeout();

    } else {

        //move the bees randomly
        moveBees();

        let period_Timer = Number(document.getElementById("periodTimer").value);//comment and find out why you use let

        
        //use a fixed update period
        let period = period_Timer;//modify this to control refresh period

        //onchange update period to value in periodTimer input
        document.getElementById("periodTimer").addEventListener("change", function updatPeriod() { //comment

            period = period_Timer; //comment

            
        }, false);

        //update the timer for the next move
        updateTimer = setTimeout('updateBees()', period);
    }
}

// Handle keyboad events
// to move the bear
function moveBear(e) {
    //codes of the four keys
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;

    if (e.keyCode == KEYRIGHT) {
        bear.move(1, 0)
    } // right key

    if (e.keyCode == KEYLEFT) {
        bear.move(-1, 0)
    } // left key

    if (e.keyCode == KEYUP) {
        bear.move(0, -1)
    } // up key

    if (e.keyCode == KEYDOWN) {
        bear.move(0, 1)
    } // down key

}

   

   

function isHit(defender, offender) {
    if (overlap(defender, offender)) { //check if the two image overlap
        let score = hits.innerHTML;
        score = Number(score) + 1; //increment the score
        hits.innerHTML = score; //display the new score

        //calculate longest duration

        let newStingTime = new Date();
        let thisDuration = newStingTime - lastStingTime;
        lastStingTime = newStingTime;
        let longestDuration = Number(duration.innerHTML);
        



        if (longestDuration === 0) {

            longestDuration = thisDuration;

        } else {

            if (longestDuration < thisDuration) longestDuration = thisDuration;

        }

        
        //console.log("last: " + lastStingTime);
        //console.log("this: " + thisDuration);
        //console.log("long: " + longestDuration);
        //console.log("new: " + newStingTime);

        if (isNaN(Number(duration.innerHTML))) {

             duration.innerHTML = "?";
 
        } else {

            document.getElementById("duration").innerHTML = longestDuration;
        }
        
    
    }
}

function overlap(element1, element2) {
    //consider the two rectangles wrapping the two elements
    //rectangle of the first element
    left1 = element1.htmlElement.offsetLeft; 
    top1 = element1.htmlElement.offsetTop; 
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth; 
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight; 
    //rectangle of the second element
    left2 = element2.htmlElement.offsetLeft; //e2x
    top2 = element2.htmlElement.offsetTop; //e2y
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight; 
    //calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
    intersectArea = x_intersect * y_intersect;

    //if intersection is nil no hit
    if (intersectArea == 0 || isNaN(intersectArea)) {
        return false;
    }

    return true;
}
   
