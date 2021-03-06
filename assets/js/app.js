$(document).ready(() => {
    // variables "globales"
    let menuOpened = false;
    let startPage = true // BOoléen indiquant si on est sur la page de déart (= on n'a pas scrollé)
    let externalPageOpened = false;

    // On prépare la page
    $('#page').addClass('loaded')


    function scrollToPage() {
        $("#page").addClass('visible').focus()
        $("#intro-container").addClass('min')
        $('.st0').addClass('hidden')
        closeVideo()
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
        startPage = true
        if (!incited) {
            incite()
        }
    }

    window.addEventListener("wheel", ev => {
        if (!menuOpened) {
            if (ev.deltaY > 0 && startPage) { // Si scrollé vers le bas
                scrollToPage()
            } else if (ev.deltaY < 0 && !startPage && $('#page').scrollTop() === 0) {
                scrollToStart()
            }
        }
    })
    window.addEventListener('keyup', function(ev) {
        if (ev.key === "ArrowDown" && startPage) {
            scrollToPage()
        }
    })
    $('#arrow-scroll').click(scrollToPage)


    let appearObserver = new IntersectionObserver(function (observables) {
        // observables est un tableau contenant des IntersectionObserverEntry
        observables.forEach(observable => {
            if (observable.intersectionRatio > 0.5) {
                observable.target.classList.remove('not-visible')
                appearObserver.unobserve(observable.target)
            }
        })
    }, {
        root: $('#page').get(0),
        threshold: [0.6]
    })


    document.querySelectorAll('.scroll-appear').forEach(el => {
        el.classList.add('not-visible')
        appearObserver.observe(el)
    })

    let countObserver = new IntersectionObserver(function (observables) {
        // observables est un tableau contenant des IntersectionObserverEntry
        observables.forEach(observable => {
            if (observable.intersectionRatio > 0.5) {
                let val = parseInt(observable.target.innerHTML)
                countTo(observable.target, val, parseInt(observable.target.dataset.spacing), parseInt(observable.target.dataset.offset))
                countObserver.unobserve(observable.target)
            }
        })
    }, {
        root: $('#page').get(0),
        threshold: [0.6]
    })

    document.querySelectorAll('.count-increase').forEach(item => {
        countObserver.observe(item)
    })

    document.querySelectorAll('.scroll-appear').forEach(el => {
        el.classList.add('not-visible')
        appearObserver.observe(el)
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
    function updateRect() {
        let val = ($('#rect-lancement').get(0).getBoundingClientRect().top)/4 - $(window).height()/10
        $('#rect-lancement').css('transform', 'translate3d(0, '+ (-val) +'px, 0)')
    }
    $('#page').scroll(updateRect)


    //Gestion du menu

    function toggleMenu() {
        $('#menubutton').toggleClass('open')
        $('#menu').toggleClass('open')
        $('#viewport').toggleClass('menuopen')
        menuOpened = !menuOpened
    }
    function closeMenu() {
        $('#menubutton').removeClass('open')
        $('#menu').removeClass('open')
        $('#viewport').removeClass('menuopen')
        menuOpened = false
    }
    $('#menubutton').click(toggleMenu)

    function goTo(selector) {
        window.location.hash = "";
        if (startPage && selector == "#") {
            closeMenu()
        } else {
            $('#transi-cache-menu').addClass('cacher')
            window.setTimeout(function() {
                if(selector === "#") {
                    $('#concept').get(0).scrollIntoView()
                    $('#page').addClass('no-transition')
                    $('#intro-container').addClass('no-transition')
                    scrollToStart()
                    window.setTimeout(function() {
                        $('#page').removeClass('no-transition')
                        $('#intro-container').removeClass('no-transition')
                    }, 10)
                } else {
                    if (startPage) {
                        $('#page').addClass('no-transition')
                        scrollToPage()
                        $('#page').removeClass('no-transition')
                    }
                    document.querySelector(selector).scrollIntoView()
                }
                $('#transi-cache-menu').removeClass('cacher')
                setTimeout(closeMenu, 300)
            }, 500)
        }
    }
    $('#menulist a, .lien-menu').click(function (ev) {
        ev.preventDefault()
        goTo($(this).attr('href'))
    })



    let extObserver = new IntersectionObserver(function (observables) {
        // observables est un tableau contenant des IntersectionObserverEntry
        observables.forEach(observable => {
            if (observable.intersectionRatio > 0.5) {
                observable.target.classList.remove('not-visible')
                extObserver.unobserve(observable.target)
            }
        })
    }, {
        root: $('#extpage').get(0),
        threshold: [0.6]
    })

    // Gestion des pages extérieures
    function showExternalPage() {
        $('#viewport').addClass('extpage')
        $('#extpage').scrollTop(0)
        externalPageOpened = true;
    }
    function hideExternalPage() {
        $('#viewport').removeClass('extpage')
        externalPageOpened = false;
    }

    function loadPage(page) {
        // history.pushState(false, false, '#'+page)
        function load() {
            window.location.hash = '#' + page
            $('#extpage-content').load(page+'.html #content', function() {
                showExternalPage()
                if(page === "pages/resa") {
                    activerValidateur()
                }
                $('#extpage').get(0).querySelectorAll('.scroll-appear').forEach(item => {
                    item.classList.add('not-visible')
                    extObserver.observe(item)
                })
            })
        }
        if (externalPageOpened) {
            $('#extpage').addClass('dark')
            setTimeout(function() {
                load()
                $('#extpage').removeClass('dark')
            }, 500)
        } else {
            load()
        }
    }

    let autoPage = function () {
        let hash = document.location.hash
        if (!hash) {
            hideExternalPage()
        } else {
            let path = hash.substring(1)
            loadPage(path)
        }
    }

    window.addEventListener('popstate', ev => {
        ev.preventDefault()
        autoPage()
    })

    autoPage()




    //Leaflet footer
   let maCarte = L.map('leaflet').setView([45.198975, 5.7252], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGVvYm95ZXJieCIsImEiOiJjand1aDBrbXUwcDNoM3ltdXNvaWFpYnVyIn0.SypxeXY3LMKkKQA5kQZAug', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibGVvYm95ZXJieCIsImEiOiJjand1aDBrbXUwcDNoM3ltdXNvaWFpYnVyIn0.SypxeXY3LMKkKQA5kQZAug'
    }).addTo(maCarte);

    let marker = L.marker([45.198975, 5.7252]).addTo(maCarte);

})