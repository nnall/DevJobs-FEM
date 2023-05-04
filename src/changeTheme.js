const body = document.querySelector('body');
const toggleInput = document.getElementById('checkbox');




// DARK THEME
const changeTheme = function(){

    // Accessibility settings
    // if the 'checked' attribute of the checkbox (toggleInput) is "true", then so is the 'aria-checked' attribute, and vice versa
    toggleInput.setAttribute("aria-checked", toggleInput.checked);
    // console.log(toggleInput.checked);
 
    // Styles settings
    body.classList.toggle('dark');

    console.log('you clicked the checkbox')
}

toggleInput.addEventListener('change', changeTheme);