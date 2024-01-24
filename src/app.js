//import '../styles/styles.scss';

//import * as bootstrap from 'bootstrap'

console.log('Init project');
/*(function app () {

})()*/
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('header__menu-btn');
    const menuMobile = document.getElementById('sidebar_wrap');
    menuBtn.addEventListener('click', () => {
        menuMobile.classList.toggle('active');
        menuBtn.classList.toggle('active');
        /*if (menuMobile.classList.contains('active')){
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }*/
    })

})

