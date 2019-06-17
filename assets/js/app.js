$(document).ready(() => {
    function scrollToPage() {
        $("#page").addClass('visible')
        $("#intro-container").addClass('min')
        console.log('scrolltopage')
    }
    function scrollToStart() {
        $("#page").removeClass('visible')
        $("#intro-container").removeClass('min')
        console.log('scrolltohome')

    }

    let startPage = true // BOoléen indiquant si on est sur la page de déart (= on n'a pas scrollé)
    window.addEventListener("wheel", ev => {
        if (ev.deltaY > 0 && startPage) { // Si scrollé vers le bas
            scrollToPage()
            startPage = false
        } else if (ev.deltaY < 0 && !startPage && $('#page').scrollTop() === 0) {
            scrollToStart()
            startPage = true
        }
    })
})