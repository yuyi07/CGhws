import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {Pot} from "./teapot-5.1.js";
var camera, scene, renderer;
var pointLight;
var angle = 0;
var pots = [];


export function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set (0,200,200)

    pointLight = new THREE.PointLight(0xffffff);
    scene.add (pointLight);
    scene.add (new THREE.PointLightHelper(pointLight, 5));

    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x888888);

    let controls = new OrbitControls(camera, renderer.domElement);

    document.body.appendChild(renderer.domElement);
    ///////////////////////////////////////////////////////////

    for(var i=-90;i<=90;i+=20)
        for(var j=-90;j<=90;j+=20)
            pots.push (new Pot(i, 5, j));
	
    

}

export function animate() {
    angle += 0.01;
    pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));
    pots.forEach (function(b) { b.update(angle,pointLight.position);});

    requestAnimationFrame(animate);
    render();
}

function render() {
  renderer.render(scene, camera);
}

export { scene}