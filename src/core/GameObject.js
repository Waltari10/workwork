module.exports = class GameObject {
  constructor({
    position = new THREE.Vector3(),
    tags = [],
    mesh,
    HP = 1,
  } = {}) {
    this.position = position
    this.tags = tags
    this.mesh = mesh
    this.HP = HP
  }

  update() {}
}
