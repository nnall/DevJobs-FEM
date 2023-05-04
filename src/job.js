// const body = document.querySelector('body');
// const toggleInput = document.getElementById('checkbox');


// FOOTER
const footerLabel = document.querySelector('.footer__companyLabel');



if(document.documentElement.clientWidth > 607){
    footerLabel.classList.remove('hide');
} else{
    footerLabel.classList.add('hide');
}

window.addEventListener('resize', function(){
    if(document.documentElement.clientWidth > 607){
        footerLabel.classList.remove('hide');
    } else{
        footerLabel.classList.add('hide');
    }
})


// // DARK THEME
// const changeTheme = function(){

//     // Accessibility settings
//     // if the 'checked' attribute of the checkbox (toggleInput) is "true", then so is the 'aria-checked' attribute, and vice versa
//     toggleInput.setAttribute("aria-checked", toggleInput.checked);
//     // console.log(toggleInput.checked);
 
//     // Styles settings
//     body.classList.toggle('dark');
// }

// toggleInput.addEventListener('change', changeTheme);


// it might be that this function needs to go into it own .js which is linked only to header.njk & headerJob.njk.. or possible those need to be merged.. might need to make header.njk USE headerJob.njk (no search bar) as a layout..

// rename headerJob.njk as just header.njk, and then use it as a layout for headerMain.njk, and add the 'change Theme' javascript to header.njk

// 