global.timeDelta = 16

function loop() {
  this.timePassedMS = 0
  this.lastTime = 0
  this.startedAt = null

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement).id = 'canvas'

  // light.shadowMapWidth = 512

  // light.shadowMapHeight = 512


  function updateGameObjects() {
    Object.values(gameObjects).forEach((go) => {
      if (go.update) {
        go.update()
      }
    })
  }

  function step(timestamp) {
    if (!this.startedAt) this.startedAt = timestamp

    if (this.lastTime) {
      global.timeDelta = timestamp - this.lastTime
    }

    updateGameObjects()

    this.timePassedMS = global.timeDelta + this.timePassedMS

    this.lastTime = timestamp

    window.requestAnimationFrame(step)
    renderer.render(global.scene, global.camera)
  }

  step()
}

module.exports = {
  initLoop: loop,
}
