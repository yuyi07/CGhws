import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {Pot} from "./teapot-5.2.js";
var scene, renderer, camera;
var pointLight;
var angle = 0;
var sceneRTT, renderTarget;
var quad;
var pots = [];

export function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set (0, 50, 250);

    let controls = new OrbitControls(camera, renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    window.addEventListener('resize', onWindowResize, false);

    /////////////////////////////////////////////////////////

    sceneRTT = new THREE.Scene();
    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 300, 200);
    sceneRTT.add(pointLight);

    renderTarget = new THREE.WebGLRenderTarget(
        1024, 1024, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat
        }
    );

    for(var i=-90;i<=90;i+=20)
        for(var j=-90;j<=90;j+=20)
            pots.push (new Pot(i, 5, j));
    

    let plane = new THREE.PlaneBufferGeometry(300, 300);

    let rttmaterial = new THREE.ShaderMaterial({
        uniforms: {
            mytex: {
                type: "t",
                value: renderTarget.texture
            }
        },
        vertexShader: document.getElementById('myVertexShader-2').textContent,
        fragmentShader: document.getElementById('myFragmentShader-2').textContent
    });


    quad = new THREE.Mesh(plane,rttmaterial);

    scene.add(quad);
	
    

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
    requestAnimationFrame(animate);
    angle += 0.005;
    pots.forEach (function(b) { b.update(angle,pointLight.position);});

    // render torusKnot to texture
    renderer.setRenderTarget (renderTarget);
    renderer.setClearColor(0x888888);
    renderer.render(sceneRTT, camera);

    // render texture to quad
    renderer.setRenderTarget(null);
    renderer.setClearColor(0x888888);
    renderer.render(scene, camera);
    quad.lookAt (camera.position);
}

function render() {
    renderer.render(scene, camera);
}
export { scene,sceneRTT}