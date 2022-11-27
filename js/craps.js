
let imageCheck=false;
let bankAmount= 100.00;
let point=0;
let pointSet = false;
let betAmount = 0.00;
let allowBet = false;
let bankFormat = Intl.NumberFormat("en-US", {
    style: "currency", 
    currency: "USD",
});

function checkBet()
{
    betAmount = document.getElementById("bet-amount").value;
     
    if(bankAmount>=betAmount && betAmount!= 0.00){
        allowBet = true;
        
    }else{
        allowBet = false;
        document.getElementById("winStatus").innerHTML = "Insufficient Funds!"
    }
}
function calculate_score()
{  
    if(allowBet==true)
    {
        let firstDie = Math.floor(Math.random()*6)+1;
        let secondDie = Math.floor(Math.random()*6)+1;
        let diceSum = firstDie + secondDie;
     
        //adds the new image for second dice
        if(imageCheck!=true){
            let newImage = document.createElement("img");
            newImage.setAttribute('src',"img/dice"+secondDie+".jpg")
            newImage.setAttribute("alt","die showing "+secondDie);
            newImage.setAttribute("id","image2");
                
            const imageLoc = document.getElementById("images");
            imageLoc.appendChild(newImage);
        }
        imageCheck=true;

        //changes the src for the di images based on rolls
        document.getElementById("image1").src ="img/dice"+firstDie+".jpg";
        document.getElementById("image2").src ="img/dice"+secondDie+".jpg";
        document.getElementById("image1").alt ="die showing "+firstDie;
        document.getElementById("image2").alt ="die showing "+secondDie;
        
        //determines if user won, lost, or sets point
        if(pointSet == false){

            switch(diceSum)
            {
                case 7:
                case 11:
                    bankAmount = bankAmount += parseFloat(betAmount);
                    document.getElementById("winStatus").innerHTML = "You Win!"
                    bankFormat.format(bankAmount);
                    document.getElementById("balanceBox").innerHTML =bankFormat.format(bankAmount);
                    break;

                case 2:
                case 3:
                case 12:
                    bankAmount = bankAmount -= parseFloat(betAmount);
                    document.getElementById("winStatus").innerHTML = "You Lose!";
                    document.getElementById("balanceBox").innerHTML = bankFormat.format(bankAmount);
                    break;
                    
                default:
                    point = diceSum;
                    pointSet = true;
                    document.getElementById("winStatus").innerHTML = "Point is "+point;
                    break;
            }  
        }
        else if(pointSet == true && point == diceSum)
        {
            bankAmount = bankAmount += parseFloat(betAmount);
            pointSet = false;
            document.getElementById("winStatus").innerHTML = "You Win!"
            document.getElementById("balanceBox").innerHTML = bankFormat.format(bankAmount);    
        }
        else if (pointSet == true && diceSum == 7)
        {   
            bankAmount = bankAmount -= parseFloat(betAmount);
            document.getElementById("winStatus").innerHTML = "You Lose!"
            document.getElementById("balanceBox").innerHTML = bankFormat.format(bankAmount);
            pointSet = false;
            
        }
        else if (point == true && diceSum != 7)
        {
            document.getElementById("winStatus").innerHTML = "Point is "+point;
        }
    }//end allowbet if statement
}//end calculate_score
