// Dropdown menu for small screens
let navbarDropdown
function dropdown(delay=0) {
    if (!navbarDropdown) {
        navbarDropdown = document.getElementsByClassName('dropdown-items')[0]
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
