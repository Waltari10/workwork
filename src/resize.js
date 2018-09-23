
module.exports = (function () {
    console.log('run me')
    function resize() {
        const element = document.getElementById("canvas")
        element.width = window.innerWidth
        element.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)
})()

