const body = document.querySelector('body');
const toggleInput = document.getElementById('checkbox');


window.addEventListener('pageshow', function(){
    if(localStorage.getItem('darkMode') == "true"){
        toggleInput.checked = true;
        body.classList.add('dark');
    } else{
        toggleInput.checked = false;
        body.classList.remove('dark');
    }
})



// DARK THEME
const changeTheme = function(){

    // Accessibility settings
    toggleInput.setAttribute("aria-checked", toggleInput.checked);
    
    if (toggleInput.checked){
        // console.log('dark mode is active')
        body.classList.add('dark');
        localStorage.setItem('darkMode', "true")
    } else{
        body.classList.remove('dark');
        localStorage.setItem('darkMode', "false")
    }


}

toggleInput.addEventListener('change', changeTheme);