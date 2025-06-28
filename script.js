document.addEventListener("DOMContentLoaded",function(){
 const searchButton = document.getElementById("search-button");
 const usernameInput = document.getElementById("user-input");
 const statsContainer = document.querySelector(".stats-container")
 const easyProgressCircle = document.querySelector(".easy-progress")
 const mediumProgressCircle = document.querySelector(".medium-progress")
 const hardProgressCircle = document.querySelector(".hard-progress")
 const easyLabel = document.getElementById("easy-level")
 const mediumLabel = document.getElementById("medium-level")
 const hardLabel = document.getElementById("hard-level")
 const cardStatsContainer = document.querySelector(".stats-cards");   


function validateUsername(username){
    if(username.trim() === ""){
        alert("Username should not be empty");
    }

    const regex = /^[a-zA-Z0-9_-]{1,15}$/ ;
    const isMatching = regex.test(username);
    if(!isMatching){
        alert("Invalid Username");
    }
    return isMatching;
}




async function fetchUserDetails(username){
    const url = `https://leetcode-stats-api.herokuapp.com/${username}` ;
    try{

        searchButton.textContent = "Searching";
        searchButton.disabled = true;
          const response =  await fetch(url);
        if(!response.ok){
           
           throw new Error("Unable to fetch the user details");
       
        }
       
         const parseddata = await response.json();
        console.log("Logging data: ", parseddata);
       

        dispalyUserData(parseddata);
      
    }
    catch(error){
         statsContainer.innerHTML = `<p>No data Found</p>`;
    }
    finally{
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}

function updateProgress(solved, total, label, circle){
   const progressDegree = (solved/total)*100;
   console.log(progressDegree);
   circle.style.setProperty("--progress-degree", `${progressDegree}%`);
   // console.log(progressDegree);
  label.textContent = `${solved}/${total}`;
  
}



function dispalyUserData(parseddata){
const totalQues = parseddata.totalQuestions;
const totalEasyQues = parseddata.totalEasy;
const totalMediumQues = parseddata.totalMedium;
const totalHardQues = parseddata.totalHard;
const totalSolveQues = parseddata.totalSolved;
const totalEasySolvedQues = parseddata.easySolved;
const totalMediumSolvedQues = parseddata.mediumSolved;
const totalHardSolvedQues = parseddata.hardSolved;

updateProgress(totalEasySolvedQues,totalEasyQues,easyLabel,easyProgressCircle);
updateProgress(totalMediumSolvedQues,totalMediumQues,mediumLabel,mediumProgressCircle);
updateProgress(totalHardSolvedQues,totalHardQues,hardLabel,hardProgressCircle);


const cardsData =[
    {
        label: "Acceptance Rate", value:parseddata.acceptanceRate
    },
    {
        label: "Ranking", value:parseddata.ranking
    },
    {
        label: "Contribution Points", value:parseddata.contributionPoints
    },
    {
        label: "Total Question", value:parseddata.totalQuestions
    }
];

cardStatsContainer.innerHTML = cardsData.map(
    data =>{
        return `
        <div class = "card">
        <h4>${data.label}</h4>
        <p>${data.value}<p>
        </div>
        `
    } 
).join("");
}


searchButton.addEventListener('click',function(){
    const username = usernameInput.value;
   console.log("username:" , username);
   if(validateUsername(username)){
    fetchUserDetails(username);
   }
})


})

