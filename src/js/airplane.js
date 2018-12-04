'use strict'

class Airplane {

	constructor(colors) {

		// set properties
		this.colors = colors
		
		// create an empty container that will hold the different parts of the cloud
		this.mesh = new THREE.Object3D()

		// init	
		this.init()	

	}

	init() {

		this.createCabin()
		this.createEngine()
		this.createTail()
		this.createWing()
		this.createPropeller()

		this.mesh.castShadow = true
		this.mesh.receiveShadow = true

	}

	createCabin() {

		let geometry = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		let cockpit = new THREE.Mesh(geometry, material)

		cockpit.castShadow = true
		cockpit.receiveShadow = true

		this.mesh.add(cockpit)

	}

	createEngine() {

		let geometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.white,
			flatShading: true
		})

		let engine = new THREE.Mesh(geometry, material)

		engine.position.x = 40

		engine.castShadow = true
		engine.receiveShadow = true

		this.mesh.add(engine)

	}

	createTail() {

		let geometry = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		let tail = new THREE.Mesh(geometry, material)

		tail.position.set(-35, 25, 0)

		tail.castShadow = true
		tail.receiveShadow = true

		this.mesh.add(tail)

	}

	createWing() {

		let geometry = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		let wing = new THREE.Mesh(geometry, material)

		wing.castShadow = true
		wing.receiveShadow = true

		this.mesh.add(wing)

	}

	createPropeller() {

		let geometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.brown,
			flatShading: true
		})

		this.propeller = new THREE.Mesh(geometry, material)

		let blade = this.createBlade()
		this.propeller.add(blade)

		this.propeller.position.set(50, 0, 0)

		this.mesh.add(this.propeller)

	}

	createBlade() {

		let geometry = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.black,
			flatShading: true
		})

		let blade = new THREE.Mesh(geometry, material)

		blade.position.set(8, 0, 0)

		blade.castShadow = true
		blade.receiveShadow = true

		return blade

	}

}