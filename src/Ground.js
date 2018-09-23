const GameObject = require('./GameObject')
const _ = require('lodash')

module.exports = class Ground extends GameObject {
  constructor(args) {
    super(args)

    const geometry = new THREE.PlaneGeometry( 1000, 1000, 1000 );
    const material = new THREE.MeshBasicMaterial( {color: 'brown', side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    scene.add( plane );

  }
  update() {

  }
  render() {

  }
}