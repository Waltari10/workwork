global.timeDelta = 16

function loop() {
  this.timePassedMS = 0
  this.lastTime = 0
  startedAt = null

  renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement).id = 'canvas';
  step()


  function updateGameObjects() {
    for (const key in gameObjects) {
      gameObjects[key].update()
    }
  }

  function step(timestamp) {
    if (!startedAt) startedAt = timestamp

    if (lastTime) {
      global.timeDelta = timestamp - lastTime
    }

    updateGameObjects()

    timePassedMS = global.timeDelta + timePassedMS

    lastTime = timestamp

    window.requestAnimationFrame(step)
    renderer.render(global.scene, global.camera)
  }

}

module.exports = {
  initLoop: loop
}