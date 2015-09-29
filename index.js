var container, camera, scene;

document.addEventListener("DOMContentLoaded", function(event) {

  function init(){
	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 700);
	// camera.position.set(0, 15, 0);
	camera.position.set(100, 300, 300);

	scene = new THREE.Scene();
	scene.add(camera);

	cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshNormalMaterial() );
	cube.position.y = 10;
	cube.position.z = 20;
	cube.position.x = 0;

	scene.add(cube);

	renderer = new THREE.WebGLRenderer();
	element = renderer.domElement;
	document.body.appendChild(element);

	effect = new THREE.StereoEffect(renderer);
	// effect.eyeSeparation = 10;

	// If device does not have device orientation
	controls = new THREE.OrbitControls(camera, element);
	controls.target.set(
		camera.position.x + 0.1,
		camera.position.y,
		camera.position.z
		);
	controls.noPan = true;
	controls.noZoom = true;

	// controls = new THREE.DeviceOrientationControls(camera, true);
 //  	controls.connect();
 //  	controls.update();

	window.addEventListener('deviceorientation', setOrientationControls, true);
	// element.addEventListener('click', fullscreen, false);
	window.removeEventListener('deviceorientation', setOrientationControls, true);

	var light = new THREE.HemisphereLight(0x999999, 2, 100);
	light.position.set(50, 50, 50);
	scene.add(light);

	var lightScene = new THREE.HemisphereLight(0x999999, 2, 100);
	lightScene.position.set(0, 5, 0);
	scene.add(lightScene);

	render();

	}

	function render(){
		cube.rotation.x += 0.02;
		cube.rotation.y += 0.0225;
		cube.rotation.z += 0.0175;

		// renderer.render( scene, camera );
		effect.setSize( window.innerWidth, window.innerHeight );
		effect.render(scene, camera);
	}

	function animate(){
		requestAnimationFrame(animate);
		cube.rotation.x += 0.005;
		cube.rotation.y += 0.01;

		// renderer.render(scene, camera);
		effect.render(scene, camera);
	}

	function setOrientationControls(e){
		if(!e.alpha){
			return;
		}
	}

	init();
	animate();
});


