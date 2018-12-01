'use strict'

class Sea {

	constructor(color) {

		// set properties
		this.color = color

		// init
		this.init()

	}

	init() {

		// create the shape
		this.geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10)

		// create the matrix to rotate the shape on the x-axis
		this.matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2)

		// apply the matrix to the shape
		this.geometry.applyMatrix(this.matrix)

		// create the material
		this.material = new THREE.MeshPhongMaterial({
			color: this.color,
			transparent: true,
			opacity: 0.6,
			shading: THREE.FlatShading,
		})

		// createthe mesh
		this.mesh = new THREE.Mesh(this.geometry, this.material)

		// allow shadows
		this.mesh.receiveShadows = true

	}

}