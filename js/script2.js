
const ease1 = "sine.inOut";


// nav close button
const navCloseButtonMobile = document.querySelector('.nav-close-mobile');

// Main menu links
const menuLinksMobile = document.querySelectorAll('.nav-menu-link-mobile');

// submenus
const subMenusMobile = document.querySelectorAll('.nav-menu-sublist-mobile');

// back mobile
const menuBackMobile = document.querySelectorAll('.nav-menu-back-mobile');

function openNavMobile() {
    gsap.fromTo('.full-nav-mobile', { opacity: 0, left: '-100%' }, { opacity: 1, left: '0%', duration: time, ease: ease1 })
}

function closeNavMobile() {
    gsap.to('.full-nav-mobile', { opacity: 0, left: '-100%', duration: time, ease: ease1, onComplete: resetNav });
}

function mainMenuClickMobile(e) {
    e.preventDefault();
    gsap.fromTo('.nav-menu-sublist-mobile', { opacity: "0" }, { opacity: "1", duration: 0, ease: ease1 })
    gsap.fromTo('.nav-menu-mobile', { x: "0" }, { x: "-100vw", duration: time, ease: ease1 })


    let currentItem = this.dataset.image;
    console.log(currentItem)

    // show submenu
    subMenusMobile.forEach(submenumobile => {
        // hide all submenus first
        submenumobile.style.visibility = "hidden";
        submenumobile.style.opacity = 0;
        console.log(submenumobile)
        // show only that of active item
        if (submenumobile.dataset.subMenuMobile == currentItem) {
            submenumobile.style.visibility = "visible";
            submenumobile.style.opacity = 1;
        }
    });
}

function goBack() {
    gsap.fromTo('.nav-menu-mobile', { x: "-100vw" }, { x: "0vw", duration: time, ease: ease1 })
}

menuLinksMobile.forEach(link => {
    link.addEventListener('click', mainMenuClickMobile)
})

menuBackMobile.forEach(backLink => {
    backLink.addEventListener('click', goBack)
})

navCloseButtonMobile.addEventListener('click', closeNavMobile);