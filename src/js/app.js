'use strict'

class App {

	constructor() {

		// set properties
		this.colors = {
			black: 0x23190f,
			brown: 0x59332e,
			red: 0xf25346,
			orange: 0xF5986E,
			blue: 0x68c3c0,
			white: 0xd8d0d1
		}

		this.mouse = {
			x: 0,
			y: 0
		}

		// init
		this.init()

	}

	init() {

		// skip if there's no THREE
		if (!THREE) return

		// set up scene, camera and renderer
		this.createScene()

		// add lights
		this.createLights()

		// add objects
		this.createAirplane()
		this.createSea()
		this.createSky()

		// add events
		window.addEventListener('resize', this.resize.bind(this), false)
		document.addEventListener('mousemove', this.mousemove.bind(this), false)

		// render
		this.render()

	}

	createScene() {

		// set width & height
		this.height = window.innerHeight
		this.width = window.innerWidth

		// create new scene
		this.scene = new THREE.Scene()

		// add fog to the scene
		this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

		// create the camera
		this.createCamera()

		// create the renderer
		this.createRenderer()

	}

	createCamera() {

		// set values to init the camera
		this.aspectRatio = this.width / this.height
		this.fieldOfView = 60
		this.nearPlane = 1
		this.farPlane = 10000

		// create a new camera
		this.camera = new THREE.PerspectiveCamera(
			this.fieldOfView,
			this.aspectRatio,
			this.nearPlane,
			this.farPlane
		)

		// set camera position
		this.camera.position.x = 0
		this.camera.position.y = 100
		this.camera.position.z = 200

	}

	createRenderer() {

		// create new renderer
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		})

		// set the size
		this.renderer.setSize(this.width, this.height)

		// enable shadowMap
		this.renderer.shadowMap.enabled = true

		// support for HDPI displays
		this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)

		// append to DOM
		this.container = document.querySelector('#world')
		this.container.appendChild(this.renderer.domElement)

	}

	createLights() {

		// create a new hemisphere light (a gradient colored light)
		this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

		// create a new directional light (a light that shines from a specific direction)
		this.shadowLight = new THREE.DirectionalLight(0xffffff, .9)

		// set the direction of the light
		this.shadowLight.position.set(150, 350, 350)

		// allow shadow casting
		this.shadowLight.castShadow = true

		// set visible area of the projected shadow
		this.shadowLight.shadow.camera.left = -400;
		this.shadowLight.shadow.camera.right = 400;
		this.shadowLight.shadow.camera.top = 400;
		this.shadowLight.shadow.camera.bottom = -400;
		this.shadowLight.shadow.camera.near = 1;
		this.shadowLight.shadow.camera.far = 1000;

		// set the resolution fo the shadow
		this.shadowLight.shadow.mapSize.width = 2048
		this.shadowLight.shadow.mapSize.height = 2048

		// add lights to the scene
		this.scene.add(this.hemisphereLight)
		this.scene.add(this.shadowLight)

	}

	createAirplane() {

		// create new object
		this.airplane = new Airplane(this.colors)

		// set position and scale
		this.airplane.mesh.position.y = 100
		this.airplane.mesh.scale.set(0.25, 0.25, 0.25)

		// add the airplane to the scene
		this.scene.add(this.airplane.mesh)

	}

	createSea() {

		// create new object
		this.sea = new Sea(this.colors.blue)

		// push it down
		this.sea.mesh.position.y = -600

		// add the sea to the scene
		this.scene.add(this.sea.mesh)

	}

	createSky() {

		// create new object
		this.sky = new Sky(20)

		// push it down
		this.sky.mesh.position.y = -600

		// add the sky to the scene
		this.scene.add(this.sky.mesh)

	}

	updateAirplane() {

		/*
			allowed positions for the airplane
			x: between -100 and 100
			y: between 25 and 175

			==> depends on mouse position (between -1 and 1)
		*/

		// calculate position based on normalize function (utils.js)
		let targetX = normalize(this.mouse.x, -1, 1, -100, 100)
		let targetY = normalize(this.mouse.y, -1, 1, 25, 175)

		// update airplane position
		this.airplane.mesh.position.x = targetX
		this.airplane.mesh.position.y = targetY

		// rotate propeller
		this.airplane.propeller.rotation.x += 0.3

	}

	mousemove(e) {

		// convert mouse position to a normalized value between -1 and 1
		let tx = -1 + (e.clientX / this.width) * 2		// x-axis
		let ty = 1 - (e.clientY / this.height) * 2		// y-axis

		// apply converted values
		this.mouse = {
			x: tx,
			y: ty
		}

	}

	resize(e) {

		// set canvas dimensions
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		// set renderer dimensions
		this.renderer.setSize(this.width, this.height)

		// set camera
		this.aspectRatio = this.width / this.height
		this.camera.aspect = this.aspectRatio
		this.camera.updateProjectionMatrix()

		// render
		// this.render()

	}

	render() {

		// rotate sea and sky
		this.sea.mesh.rotation.z += 0.005
		this.sky.mesh.rotation.z += 0.01

		// update the airplane
		this.updateAirplane()

		// render
  		this.renderer.render(this.scene, this.camera);

		// add self to the requestAnimationFrame
		window.requestAnimationFrame(this.render.bind(this))

	}

}