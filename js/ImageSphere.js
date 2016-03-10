THREE.ImageSphere = (function() {
	var sphere = new THREE.DodecahedronGeometry(1, 1);
	var loader = new THREE.TextureLoader();
	
	return function ImageSphere (url, size, width, height, zPosMin, zPosMax) {
			var self = this;
			THREE.Object3D.call(this);
			
			this.random = Math.random();
			this.sphereSize = size;
			this.zPosMin = zPosMin;
			this.zPosMax = zPosMax;
			
			// 球体の作成
			var geometry = new THREE.BufferGeometry();
			geometry.fromGeometry(sphere);
			var material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				wireframe: Math.random() < 0.5
			});
			self.sphere = new THREE.Mesh(geometry, material);
			self.sphere.scale.set(size, size, size);
			
			// テクスチャのよみこみ
			loader.load(url, function(texture) {
				material.map = texture;
				material.needsUpdate = true;
				
				self.position.set(-width/2 + Math.random() * width, -height/2 + Math.random() * height, zPosMin - size);
				self.add(self.sphere);
			});
	};
}());

THREE.ImageSphere.prototype = Object.create(THREE.Object3D.prototype);
THREE.ImageSphere.prototype.constructor = THREE.ImageSphere;

THREE.ImageSphere.prototype.update = function () {
	this.sphere.position.z += this.random * 10;
	
	if (this.sphere.position.z > this.zPosMax) {
		this.sphere.position.z = this.zPosMin - this.sphereSize;
	}
	this.sphere.rotation.y += -0.05 + this.random /10;
};