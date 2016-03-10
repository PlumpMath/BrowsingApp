'use strict';

const electron = require('electron');
				
// デバッグモニタ
var stats = new Stats();
stats.domElement.style.zIndex = 100;
stats.domElement.style.position = "fixed";
document.body.appendChild(stats.domElement);

var areaWidth = 600,
	areaHeight = 600,
	cameraFov = 60,
	cameraZpos = areaHeight / 2 * Math.sqrt(3);

// レンダラ
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(areaWidth, areaHeight);
renderer.setClearColor(0x000000, 0.2);
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
document.body.appendChild(renderer.domElement);

// シーン
var scene = new THREE.Scene();

// カメラ
var camera = new THREE.PerspectiveCamera(cameraFov, areaWidth / areaHeight, 0.1, cameraZpos);
// 100, 252, 800, 600
camera.position.z = cameraZpos;

// ライト
var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 400, 0);
lights[1].position.set(200, 400, 200);
lights[2].position.set(-200, -400, -200);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

var ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// 画像をテクスチャにした球体
var spheres = [];

function render() {
	requestAnimationFrame(render);
	
	spheres.forEach((sphere) => {
		sphere.update();
	});
	renderer.render(scene, camera);

	stats.update();
};

render();

// ブラウザ側
var wv = document.getElementById('wv');
wv.addEventListener('did-get-response-details', (e) => {
	// console.log('did-get-response-details', e.newURL, e.headers["content-type"]);
	// e.headers["content-type"]: [] 中身が、image始まりであれば、テクスチャ化
	var isImage = false;
	e.headers["content-type"].forEach((type) => {
		if (type.search("image") === 0) {
			isImage = true;
		}
	});
	if (isImage) {
		let sphere = new THREE.ImageSphere(e.newURL, 10 + Math.random() * 100, areaWidth, areaHeight, -20, cameraZpos);
		scene.add(sphere);
		spheres.push(sphere);
		// console.log(e);
	}
});
