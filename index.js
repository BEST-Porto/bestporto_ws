// Dropdown menu for small screens
let navbarDropdown
function dropdown(delay=0) {
    if (!navbarDropdown) {
        navbarDropdown = document.getElementById('dropdown-items')
        navbarDropdown.isOpen = false
    }

    window.setTimeout(() => {
      if (navbarDropdown.isOpen) {
          navbarDropdown.style.display = 'none'
          navbarDropdown.isOpen = false
      } else {
          navbarDropdown.style.display = 'block'
          navbarDropdown.isOpen = true
      }
    }, delay)
}


// Sticky navbar
const navbar = document.getElementById('navbar')
const offset = navbar.offsetTop
window.onscroll = () => {
    if (window.scrollY >= offset) {
        navbar.style.position = 'fixed'
        navbar.style.top = '-3px'
    } else {
        navbar.style.position = 'absolute'
        navbar.style.top = `${offset}px`
    }
    console.log(window.scrollY)
    console.log(offset)
}