const $ = selector => document.querySelector(selector)

function doScrolling(element, duration) { 
    
    const elementY = element.offsetTop
    const startingY = window.pageYOffset
    const diff = elementY - startingY
    let start

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // Elapsed milliseconds since start of scrolling.
        const time = timestamp - start
        // Get percent of completion in range [0, 1].
        const percent = Math.min(time / duration, 1)

        window.scrollTo(0, startingY + diff * percent)

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    })
}


$('#more').addEventListener('click', _ => doScrolling($('#info'), 400), false)
const bg = $('#background')
let opacity = 1

function zero() {
    return new Promise(function animation(resolve, reject) {
        opacity -= 0.05
        if (opacity <= 0){
            bg.style.opacity = 0
            resolve()
            return true
        }
        bg.style.opacity = opacity
        requestAnimationFrame(() => {
            animation(resolve, reject)
        })
    })
}

function one() {
    return new Promise(function animation(resolve, reject) {
        opacity += 0.05
        if (opacity >= 1){
            bg.style.opacity = 1
            resolve()
            return true
        }
        bg.style.opacity = opacity
        requestAnimationFrame(() => {
            animation(resolve, reject)
        })
    })
}

async function fadeImageTo(name) {
    opacity = 1
    await zero()
    bg.style.backgroundImage = `url('${name}')`

    opacity = 0
    await one()
}
let i = 2
setInterval(() => {
    const name = `bg${i}.jpg`
    
    console.log(`Switched to /assets/images/backgrounds/${name}`)
    fadeImageTo(`/assets/images/backgrounds/${name}`).then(() => {
        if(++i == 7) {
            i = 1
        }
    })

}, 10000)