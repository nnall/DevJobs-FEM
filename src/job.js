
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

