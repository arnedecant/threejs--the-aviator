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

		this.createPilot()

		// this.mesh.castShadow = true
		// this.mesh.receiveShadow = true

	}

	createCabin() {

		let geometry = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		geometry.vertices[4].y -= 10
		geometry.vertices[4].z += 20
		geometry.vertices[5].y -= 10
		geometry.vertices[5].z -= 20
		geometry.vertices[6].y += 30
		geometry.vertices[6].z += 20
		geometry.vertices[7].y += 30
		geometry.vertices[7].z -= 20

		let cabin = new THREE.Mesh(geometry, material)

		cabin.castShadow = true
		cabin.receiveShadow = true

		this.mesh.add(cabin)

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

	createPilot() {
		
		// create new object
		this.pilot = new Pilot(this.colors)

		// set its position
		this.pilot.mesh.position.set(-10, 27, 0)

		// add the pilot to the mesh
		this.mesh.add(this.pilot.mesh)

	}

}