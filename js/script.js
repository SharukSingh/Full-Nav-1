//Nav container
const menuContainer = document.querySelector('.full-nav');

// Main menu list
const menu = document.querySelector('.nav-menu');

// Blocker for image reveal
const blocker = document.querySelector('.blocker');

// Main menu links
const menuLinks = document.querySelectorAll('.nav-menu-link');

// Nav image container
const navImageContainer = document.querySelector('.nav-image-container');

// Nav images
const navImages = document.querySelectorAll('.nav-image-item');

// Menu title
const menuTitle = document.querySelector('.nav-content h3');

// submenus
const subMenus = document.querySelectorAll('.nav-menu-sublist');

// submenu links
const subMenuLinks = document.querySelectorAll('.nav-menu-sublist a');

// nav close button
const navCloseButton = document.querySelector('.nav-close');

const time = 0.4;
const time2 = 0.5;
const time3 = 0.75;
const testtime = 2;

function changeImage() {
    let imageTag = this.dataset.image;
    // gsap.killTweensOf(blocker)
    gsap.fromTo(blocker, { clipPath: 'inset(0% 0% 0% 0%)', webkitClipPath: 'inset(0% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 100%)', webkitClipPath: 'inset(0% 0% 0% 100%)', duration: 0.75, ease: "sine.inOut" })
    navImages.forEach(function (image) {
        image.style.display = 'none';
        if (image.dataset.image == imageTag) {
            image.style.display = 'block'
        }
    })
}

function hoverMenuEnter(e) {
    this.classList.add('hovered');
}

function hoverMenuLeave(e) {
    this.classList.remove('hovered');
}

function mainMenuClick(e) {
    e.preventDefault();
    //move all menu to left, title to left
    gsap.to(menu, { x: -40, duration: time, ease: "sine.inOut" });
    gsap.to(menuTitle, { x: -40, duration: time, ease: "sine.inOut" });
    gsap.to(navImageContainer, { width: "34%", duration: time, ease: "sine.inOut" });
    menu.classList.add('active');

    //reset link position
    menuLinks.forEach(link => {
        gsap.to(link, { x: 0, duration: time, ease: "sine.inOut" });
        link.classList.remove('active');
        const activeBullet = link.querySelector('svg');
        gsap.to(activeBullet, { opacity: 0, scale: 0.5, duration: time, ease: "sine.inOut" });
    })

    //move clicked link to right and animate bullet
    menuLinks.forEach(link => {
        if (this == link) {
            gsap.to(link, { x: 40, duration: time, ease: "sine.inOut" });
            link.classList.add('active');
            const activeBullet = link.querySelector('svg');
            gsap.to(activeBullet, { opacity: 1, scale: 1, duration: time, ease: "sine.inOut" });
        }
    })

    let currentItem = this.dataset.image

    // show submenu
    subMenus.forEach(submenu => {
        // hide all submenus first
        submenu.classList.remove('active');
        // show only that of active item
        if (submenu.dataset.subMenu == currentItem) {
            submenu.classList.add('active');
            let activeSubMenu = submenu.querySelectorAll('a');
            gsap.fromTo(activeSubMenu, { x: 20 }, { x: 0, duration: 0.3, ease: "sine.inOut", stagger: 0.1 });
            submenu.addEventListener('mouseover', hoverMenuEnter);
            submenu.addEventListener('mouseleave', hoverMenuLeave);
        }
    });
}

function resetNav() {
    menuContainer.style.opacity = 1;
    menuContainer.style.transform = "scaleX(0)";
    navImages.forEach(image => image.style.display = "none");
    //hide submenu
    subMenus.forEach(submenu => submenu.classList.remove('active'));
    //main menu reset
    gsap.to(menu, { x: 0, duration: 0, ease: "sine.inOut" });
    menu.classList.remove('active');

    menuLinks.forEach(link => {
        gsap.to(link, { x: 0, duration: time, ease: "sine.inOut" });
        link.classList.remove('active');
        const activeBullet = link.querySelector('svg');
        gsap.to(activeBullet, { opacity: 0, scale: 0.5, duration: time, ease: "sine.inOut" });

        // 
        link.style.opacity = 0;
        link.style.visibility = "hidden";
        link.style.transfrom = "translateX(0)";
    })

}

function openNav() {
    let t1 = gsap.timeline();
    t1.fromTo(menuContainer, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "sine.inOut" })
    t1.to(blocker, { opacity: 1, duration: 0, ease: "sine.inOut" })
    t1.fromTo(blocker, { clipPath: 'inset(0% 100% 0% 0%)', webkitClipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', webkitClipPath: 'inset(0% 0% 0% 0%)', duration: time3, ease: "sine.inOut" })
    t1.fromTo(menuLinks, { x: 50, y: 0, opacity: 0 }, { x: 0, y: 0, opacity: 1, visibility: 'visible', duration: time2, ease: "sine.inOut", stagger: 0.2 })
    t1.fromTo(menuTitle, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: time2, ease: "sine.inOut" }, "<");
    t1.fromTo(navCloseButton, { opacity: 0 }, { opacity: 1, duration: time, ease: "sine.inOut" });
}

function closeNav() {
    gsap.to(menuContainer, { opacity: 0, duration: time, ease: "sine: inOut", onComplete: resetNav });
}

menu.addEventListener('mouseover', hoverMenuEnter);
menu.addEventListener('mouseleave', hoverMenuLeave);

menuLinks.forEach(link => {
    link.addEventListener('mouseover', changeImage)
})

menuLinks.forEach(link => {
    link.addEventListener('click', mainMenuClick)
})

navCloseButton.addEventListener('click', closeNav);

