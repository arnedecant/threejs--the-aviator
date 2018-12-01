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

		// init
		this.init()

	}

	init() {

		// skip if there's no THREE
		if (!THREE) return

		// set up scene, camera and renderer
		this.createScene()

		// update width and height on resize
		window.addEventListener('resize', this.resize.bind(this), false);

		// add lights
		this.createLights()

		// add objects
		this.createPlane()
		this.createSea()
		this.createSky()

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

	createPlane() {

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

	}

	resize() {

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

		// add self to the requestAnimationFrame
		window.requestAnimationFrame(this.render.bind(this))

		// render
  		this.renderer.render(this.scene, this.camera);

	}

}