var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 5, 1500);

camera.position.x = 20;
camera.position.z = 50;
camera.position.y = 50;

var renderer = new THREE.WebGLRenderer({ antialiasing: true, autoSize: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl').appendChild(renderer.domElement);
    
var objectLoader = new THREE.ObjectLoader();
    objectLoader.load("scene.json", function ( obj ) {
    console.log(obj);
    update(renderer, obj, camera);
});

controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); 
// call this only in static scenes (i.e., if there is no animation loop)
controls.enableDamping = true; 
// an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 200;
controls.maxDistance = 200;
controls.maxPolarAngle = Math.PI / 2.2;
controls.minAzimuthAngle = -Math.PI / 40;
controls.maxAzimuthAngle = Math.PI / 2;

var zoomset = false;

camera.rotation.y = Math.PI / 2;

function update(renderer, scene, camera) {
    renderer.render(scene, camera);
    controls.update();

    if (!zoomset) controls.minDistance = 100;

    requestAnimationFrame(function() {
        update(renderer, scene, camera);
    });
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
}