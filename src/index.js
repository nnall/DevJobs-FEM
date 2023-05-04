"use strict"


const body = document.querySelector('body');
const toggleInput = document.getElementById('checkbox');

const searchBarContainer = document.querySelector('.searchbar__container');
const filterBtn = document.querySelector('.filter__btn');
const dialogContainer = document.querySelector('.dialog-container');
const resultsContainer = document.querySelector('.results__container');

const loadMoreBtnWrapper = document.querySelector('#btn-wrapper');
const loadMoreBtn = document.querySelector('.load__more');


const searchInput = document.querySelector('[data-search]');
const locationInput = document.querySelector('[location-search]');
const checkboxInput = document.querySelector('[fulltime-checkbox]');

// ALL SEARCH BUTTONS
const searchBtns = document.querySelectorAll('.search__btn');

// BOTH 'FILTER BY TITLE' INPUTS
const searchMobile = document.querySelector('.search__input-mobile');
const searchDesktop = document.querySelector('.search__input-desktop')

// BOTH 'LOCATIONS' INPUTS
const locationDiag = document.querySelector('.filter__search-dialog');
const locationDesktop = document.querySelector('.filter__search-desktop');

// BOTH 'CHECKBOX' INPUTS
const checkboxDiag = document.querySelector('.filter__checkbox-dialog');
const checkboxDesk = document.querySelector('.filter__checkbox-desktop');

////////////////////////////////////////////////////////////////////////////////////


///////// MATCHING INPUTS' LOCATIONS VALUES /////////////

// MAKING SURE BOTH 'FILTER BY TITLE' INPUTS HAVE SAME INPUT
searchMobile.addEventListener('input', function(){
    searchDesktop.value = searchMobile.value;
})
searchDesktop.addEventListener('input', function(){
    searchMobile.value = searchDesktop.value;
})

//// MAKING SURE BOTH 'LOCATION' INPUTS HAVE SAME INPUT ////

locationDiag.addEventListener('input', function(){
    locationDesktop.value = locationDiag.value
})
locationDesktop.addEventListener('input', function(){
    locationDiag.value = locationDesktop.value;
})

// MAKING SURE BOTH 'CHECKBOX' INPUTS HAVE SAME INPUT
checkboxDiag.addEventListener('change', function(){
    checkboxDesk.checked = checkboxDiag.checked;
})
checkboxDiag.addEventListener('change', function(){
    checkboxDiag.checked = checkboxDesk.checked;
})


//////////////   IMPORTS  ///////////////////////     
 
window.addEventListener('resize', function(){

    if(document.documentElement.clientWidth > 758){
        // Hide modal once 'filter' field appears on regular search bar. 
        dialogContainer.classList.add('hide');
    }  
})

//////////////   SEARCH BUTTON COLOR CHANGE WHEN CLICKED   ///////////////////////

searchBtns.forEach((btn)=>{
    btn.addEventListener('mousedown', function(){
        console.log('click was activated')
        btn.style.backgroundColor = '#939BF4';
    })

    btn.addEventListener('mouseup', function(){
        console.log('click was activated')
        btn.style.backgroundColor = '#6770db';
    })
})


//////////////   CHANGING DARK/LIGHT THEME   ///////////////////////

const changeTheme = function(){

    // Accessibility settings
    // if the 'checked' attribute of the checkbox (toggleInput) is "true", then so is the 'aria-checked' attribute, and vice versa
    toggleInput.setAttribute("aria-checked", toggleInput.checked);
    // console.log(toggleInput.checked);
 
    // Styles settings
    body.classList.toggle('dark');
}

toggleInput.addEventListener('change', changeTheme);

filterBtn.addEventListener('click', function(){
    dialogContainer.classList.remove('hide');
})
/////////////////////////////////////////////////////////////////////

////// FILTERING 'jobs' ARRAY FROM SEARCH, PUTTING INTO 'displayArray' FOR addCards() ///////

let logoContainer;
let cards;


const displayCards = function(){
    
    // ALL CARDS SHOW
    if(jobsNum <= 12){
        // hide 'load more' button container/ i.e show all cards
        loadMoreBtnWrapper.classList.add('hide');   
    } 
    // HIDE EVERYTHING OVER 12 & HAVE 'LOAD MORE' BTN  
      else {
        // hide every card past the 12th card, but not the very last "card" (the 'load more' row)
        // if it contains 'hide' class, the 'load more cont not showing, >12 we want it to show, so remove 'hide' class
        if(loadMoreBtnWrapper.classList.contains('hide')){
            loadMoreBtnWrapper.classList.remove('hide');
        } 
        cards = [...resultsContainer.children];

        // also hide any card over the 12th card 
        for(let i = 0; i < cards.length; i++){
            if(i > 11 && i !== cards.length - 1){
               cards[i].classList.add('hide');
            }
        }
    }
}

// Clicking 'Load More' reveals hidden cards
loadMoreBtn.addEventListener('click', function(){
    cards.forEach((item)=>{
        if(item.classList.contains('hide')){
            item.classList.remove('hide');
        }
    })
    loadMoreBtnWrapper.classList.add('hide'); // 
})

let jobsNum;
let jobIndex;

const noMatchContainer = document.createElement("div");
noMatchContainer.classList.add('noMatch__container');
noMatchContainer.innerHTML = 
`
    <h3 class = "noMatch__message">
        Sorry, it doesn't look like we have that. <br>
        Try adjusting your search terms!
    </h3>
`;


// Remove Children function
const removeChildren = function(parent) {
    if(parent.firstElementChild.classList.contains('noMatch__container')){
        
        // remove 'noMatch__container'
        resultsContainer.removeChild(noMatchContainer);
        // show 'load more' btn container
        loadMoreBtnWrapper.classList.remove('hide');
    }
    else{
        // keeps remving the first child NODE as long as first child ELEMENT is not last child ELEMENT. stops at last child. 
        while(parent.firstElementChild !== parent.lastElementChild){
            // remove NODE child from 'resultsContainer'
            parent.removeChild(parent.firstChild);
        };
    }
}



// feeding this the 'displayArray' array created in displaySearch() 
const addCards = function(jobsArray){
    
    removeChildren(resultsContainer);

    // if 'displayArray' had no matches (was empty)
    if(jobsArray.length == 0){
        
        // insert 'no match' container before now-hidden 'loadMore btn' container
        resultsContainer.insertAdjacentElement("afterbegin", noMatchContainer);
        loadMoreBtnWrapper.classList.add('hide');
    }

    else{

        jobsArray.reverse(); 

        jobsNum = jobsArray.length;
        // console.log(jobsNum);

        jobsArray.forEach((job)=>{

            jobIndex = jobsArray.indexOf(job) + 1;

            // creating blank html and adding classes to it
            const card = document.createElement('a'); 
            card.classList.add('card');
            card.setAttribute('jobid', `${job.id}`);
            card.setAttribute('href', `data/${job.id}/`); // <-- 11ty permalink 
        
            card.innerHTML = 
            `
            <span class="logo__container" style="background-color:${job.logoBackground}">    
                <svg class = "logo__svg">
                    <use xlink href="assets/JS_sprites/logosSprite.svg#${job.company.toLowerCase()}"></use>
                </svg>
            </span>
            <div class="card__subtitles post__time">${job.postedAt}</div>
            <span class = "card__subtitles card__icon">.</span>
            <div class="card__subtitles job__time">${job.contract}</div>
            <h2>${job.position}</h2>
            <div class="card__subtitles company__name">${job.company}</div>
            <div class="card__location">${job.location}</div>
            `;   

            // Insert the Cards into .results__container
            resultsContainer.insertAdjacentElement('afterbegin', card)

            if(jobIndex == jobsNum){
                // code to test total number and decide whether to hide everything past 12
                // don't run displayCards() until all cards have been inserted into 'resultsContainer'
                displayCards() 
            }
        })
    }

}


// INITIAL PAGE LOAD RUN addCards() WITH ALL JOBS in 'jobs' ARRAY
let jobs;
let fullTimeJobs = [];
let displaySearch;

fetch("_data/data.json")
.then(res => res.json())  // convert result to a .json
.then(data => jobs = data) // assign returned .json (data) to 'jobs'
.then(()=>{
    // STORE ALL "FULL TIME" JOBS IN ARRAY (to be checked against in displaySearch() )
    console.log(jobs); 
   
    jobs.forEach((job)=>{
        if(job.contract == "Full Time"){
            fullTimeJobs.push(job);
        }
    })
    // fullTimeJobs = fullTimeJobs.reverse();
})
.then(()=>{
     addCards(jobs) // function to display all jobs initially upon page load 
    })
.then(()=>{
    displaySearch = function(){ //'jobs' argument will be the fetched jobs array from initial page load only

        let title = searchInput;
        let location = locationInput;
        let fulltime = checkboxInput;
        let testTitle = false;
        let testLocation = false;
        let testFullTime = false;
        let displayArray = [];
    
    
        // if field is left blank... then provide results for non-blank field matches
        // if field is NOT blank but has no matches... then do NOT provide matches for the other fields.. indicate there are no matches
    
        // ONlY fields that have information should be tested for a match 
        if(title.value.length > 0){
            testTitle = true;
        }
        if(location.value.length >0) {
            testLocation = true;
            
        }
        if(fulltime.checked ==true){
            testFullTime = true;
        } 
        
        // NONE
        if(!testTitle && !testLocation && !testFullTime){
            displayArray = jobs.reverse();
        }
    
        // SINGLES - JUST ONE FIELD
        else if(!testTitle && !testLocation && testFullTime){
            displayArray = fullTimeJobs;
        }
    
        else if(!testTitle && testLocation && !testFullTime){
            jobs.forEach((job)=>{
                if (job.location.toLowerCase().includes(location.value.toLowerCase())){
                    displayArray.push(job);  
                }
            })
            displayArray.reverse();
        }
    
        else if(testTitle && !testLocation && !testFullTime){
            jobs.forEach((job)=>{
                if (job.position.toLowerCase().includes(title.value.toLowerCase())){
                    displayArray.push(job); 
                }
            })
            displayArray.reverse();
        }
        
        // DOUBLES - 2 FIELDS
        // one reusable function for location +FT/ title + FT
        else if(!testTitle && testLocation && testFullTime){
            jobs.forEach((job)=>{
                if(job.location.toLowerCase().includes(location.value.toLowerCase()) && 
                job.contract =='Full Time'){
                    displayArray.push(job);
                }
            })
            displayArray.reverse();
        }
    
        else if(testTitle && !testLocation && testFullTime){
            jobs.forEach((job)=>{
                if(job.position.toLowerCase().includes(title.value.toLowerCase()) && 
                job.contract =='Full Time'){
                    displayArray.push(job);  
                }
            })
            displayArray.reverse();
        }
    
        else if(testTitle && testLocation && !testFullTime){
            jobs.forEach((job)=>{
                if(job.position.toLowerCase().includes(title.value.toLowerCase()) && 
                job.location.toLowerCase().includes(location.value.toLowerCase())){
                    displayArray.push(job); 
                }
            })
            displayArray.reverse();
        }
    
        // TRIPLE - ALL FIELDS
        else if(testTitle && testLocation && testFullTime){
            jobs.forEach((job)=>{
                if(job.position.toLowerCase().includes(title.value.toLowerCase()) && 
                job.location.toLowerCase().includes(location.value.toLowerCase()) &&
                job.contract =='Full Time'){
                    displayArray.push(job);
                }
            })
            displayArray.reverse();
        }
    
        addCards(displayArray);
    
    }
})
.then(()=>{
    searchBtns.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            displaySearch();  
            dialogContainer.classList.add('hide');
        })
     
    })
})
.then(()=>{
    document.addEventListener('keyup', (e)=>{
        if(e.key === 'Enter'){
           displaySearch(); 
           dialogContainer.classList.add('hide');
        } 
   })
})
