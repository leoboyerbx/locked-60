$(document).ready(() => {
    // On prépare la page
    $('#page').addClass('loaded')


    let startPage = true // BOoléen indiquant si on est sur la page de déart (= on n'a pas scrollé)
    function scrollToPage() {
        $("#page").addClass('visible').focus()
        $("#intro-container").addClass('min')
        $('.st0').addClass('hidden')
        closeVideo()
        console.log('scrolltopage')
        startPage = false
    }
    let incited = false
    function incite() {
        incited = true
        window.setTimeout(function() {
            $('#play-button').addClass('open')
            window.setTimeout(function () {
                $("#play-button").removeClass('open')
            }, 1500)
        }, 800)
    }
    function scrollToStart() {
        $("#page").removeClass('visible')
        $("#intro-container").removeClass('min')
        $('.st0').removeClass('hidden')
        console.log('scrolltohome')
        startPage = true
        if (!incited) {
            incite()
        }
    }

    window.addEventListener("wheel", ev => {
        if (ev.deltaY > 0 && startPage) { // Si scrollé vers le bas
            scrollToPage()
        } else if (ev.deltaY < 0 && !startPage && $('#page').scrollTop() === 0) {
            scrollToStart()
        }
    })
    window.addEventListener('keyup', function(ev) {
        if (ev.key === "ArrowDown" && startPage) {
            scrollToPage()
        }
    })
    $('#arrow-scroll').click(scrollToPage)


    let observer = new IntersectionObserver(function (observables) {
        // observables est un tableau contenant des IntersectionObserverEntry
        console.log(observables)
        observables.forEach(observable => {
            if (observable.intersectionRatio > 0.5) {
                console.log("hey")
                observable.target.classList.remove('not-visible')
                observer.unobserve(observable.target)
            }
        })
    }, {
        root: $('#page').get(0),
        threshold: [0.5]
    })
    document.querySelectorAll('.scroll-appear').forEach(el => {
        el.classList.add('not-visible')
        observer.observe(el)
    })



    // décompte au chargement
    function countTo(element, value, spacing = 50, offset = 1) {
        let count = 0;
        function increaseCount() {
            if (count <= value) {
                element.innerHTML = count
                count+= offset
                setTimeout(increaseCount, (spacing*count/value))
            }
        }
        increaseCount()
    }

    countTo($('#count').get(0), 60, 100)


    // Bouton play
    let newStyle = document.createElement('style')
    let widthVal = $('#play-text span').width() + 20
    newStyle.innerText = `#play-button:hover #play-text, #play-button.open #play-text  {width: ${widthVal}px}`
    document.head.appendChild(newStyle)

    // Autoplay de la vidéo
    let bgVid = document.querySelector('#bgvid')
    // bgVid.load()
    $('#play-button').mouseenter(function() {
        if (!incited) incited = true
        bgVid.play().then(_ => {
            bgVid.classList.add('visible')
        }).catch(error => {
            console.error(error)
        })
    })
        .mouseleave(function() {
        $('#bgvid').removeClass('visible').get(0).pause()
    })
    .click(function() {
        $('#fgvid').addClass('visible').find('video').get(0).play()
    })

    function closeVideo() {
        $('#fgvid').removeClass('visible').find('video').get(0).pause()
    }
    $('#fgvid').click(function (ev) {
        if (ev.target === this) {
            closeVideo()
        }
    })

    function updateCounter() {
        let timespan = countdown(null, new Date(2019, 8, 1), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS)
            let indexes = ['days', 'hours', 'minutes', 'seconds']
            indexes.forEach(index => {
                if(timespan[index] < 10) {
                    timespan[index] = "0"+timespan[index]
                }
        })
        $('#count-jours').html(timespan.days)
        $('#count-heures').html(timespan.hours)
        $('#count-minutes').html(timespan.minutes)
        $('#count-secondes').html(timespan.seconds)
    }
    let decompte = window.setInterval(updateCounter, 1000)


    // rectangle parrallax
    let initTop = $('#avant-lancement-wrapper').position().top
    console.log(initTop)
    $('#page').scroll(function(ev) {
        let val = ($('#rect-lancement').get(0).getBoundingClientRect().top)/5 - $(window).height()/10
        $('#rect-lancement').css('transform', 'translate3d(0, '+ (-val) +'px, 0)')
    })

})