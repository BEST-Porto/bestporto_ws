// Scripts for correcting the header in iOS

// Prevent scrolling on the header-cover
let headerCover = document.getElementById('header-cover')
headerCover.addEventListener('touchmove', (event) => {
    event.preventDefault()
}, false)

// Disable parallax in iOS, because background-attachment: fixed isn't supported after iOS 13 :(
let userAgentString = navigator.userAgent

let chromeAgent = userAgentString.indexOf("Chrome") > -1        // Detect Chrome
let safariAgent = userAgentString.indexOf("Safari") > -1        // Detect Safari
  
// Discard Safari since it also matches Chrome
if ((chromeAgent) && (safariAgent)) safariAgent = false

if (safariAgent) {
    let parallax = Array.from(document.getElementsByClassName('js-background-parallax'))

    // Initial y position for parent containers of parallax images

    // Disable parallax
    parallax.forEach((element) => {
        element.style.backgroundAttachment = 'unset'
        element.style.backgroundPosition = 'center'
    })
}


// Dropdown menu for small screens
let navbarDropdown
function dropdown(delay=0, onlyOff=false) {
    // onlyOff says if it will only turn the navbar off, not on

    if (!navbarDropdown) {
        navbarDropdown = document.getElementById('dropdown-items')
        navbarDropdown.isOpen = false
    }

    window.setTimeout(() => {
      if (navbarDropdown.isOpen) {
          navbarDropdown.style.display = 'none'
          navbarDropdown.isOpen = false
      } else if (!onlyOff) {
          navbarDropdown.style.display = 'block'
          navbarDropdown.isOpen = true
      }
    }, delay)
}


// Sticky navbar
const navbar = document.getElementById('navbar')
const offset = navbar.offsetTop
window.addEventListener('scroll', () => {
    if (window.scrollY >= offset) {
        navbar.style.position = 'fixed'
        navbar.style.top = '-3px'
    } else {
        navbar.style.position = 'absolute'
        navbar.style.top = `${offset}px`
    }
})


// Animate numbers going up
const animationDuration = 2000          // Duration of the animation in ms
const animationSteps = 250               // Number of steps in the animation
const animationTargets = [
    [document.getElementById('num-countries'), 32],
    [document.getElementById('num-groups'), 94],
    [document.getElementById('num-students'), 3300]
]

// This is the easing function: https://easings.net/#easeOutQuint
function easingFunction(t) {
    return 1 - (1-t)**6
}

// Check if an element is on the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

// Do the animation
const numberBoxes = document.getElementById('number-boxes')

let animated = false
function animateNumbers() {

    // If the animation has been done, return
    if (animated) return

    // If the object is not visible, return
    let visible = isInViewport(numberBoxes)
    if (!visible) return

    animated = true
    
    let delay = animationDuration / animationSteps

    animationTargets.forEach((thisCounter, index) => {
        const updateNumber = (currentStep = 0) => {
            let htmlObject = thisCounter[0]
            let numTarget = thisCounter[1]

            if (currentStep < animationSteps) {
                let time = currentStep / animationSteps
    
                htmlObject.innerText = Math.ceil(easingFunction(time) * numTarget)
    
                window.setTimeout(updateNumber, delay, currentStep + 1)
            } else {
                htmlObject.innerText = numTarget
            }
        }

        updateNumber()
    })
}

window.addEventListener('scroll', animateNumbers)