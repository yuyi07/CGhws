import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {buildCar,car,rect,Obstacle} from './buildThing.js';
import {update,makeRect,Check_Intersect,pos,angle} from './moveCar.js';

var camera, scene, renderer;
var clock; 
var cameraHUD1; 

var state;

export function init() {
    
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    
    cameraHUD1 = new THREE.OrthographicCamera(-150,150,150,-150,-350,350);
    cameraHUD1.position.set (0,30,0)
    cameraHUD1.up.set (0,0,-1)   // for top view
    cameraHUD1.lookAt (new THREE.Vector3())
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x888888);
   
    
    document.body.appendChild(renderer.domElement);

 
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set (0,200,250);
    let controls = new OrbitControls(camera, renderer.domElement);
    

    var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);
    ///////////////////////////////////////////////////////
    //power = 5.0;
    //angle = 0.0; 
    ///////////////////////////////////////////////////////
    scene.obstacles = [];
    scene.obstacles.push(
        new Obstacle(new THREE.Vector3(50, 0, 70), 15)
    );
    scene.obstacles.push(
        new Obstacle(new THREE.Vector3(70, 0, -40), 15)
    );
    scene.obstacles.push(
        new Obstacle(new THREE.Vector3(-50, 0, 0), 15)
    );
   
	var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 75, 0);
    pointLight.castShadow = true;
	scene.add(pointLight);

	buildCar();
}

export function animate() {

    var dt = clock.getDelta();
    update(dt);
    
    car.position.copy(pos);
    car.rotation.y = angle;
    
    requestAnimationFrame(animate);
    render();
    
    let Rect = makeRect(rect);
    for(var i = 0;i < scene.obstacles.length;i++){
        
        if (Check_Intersect (Rect, scene.obstacles[i].mesh, 15)) {
            scene.obstacles[i].mesh.material.color = new THREE.Color ('red');
            state = 1;
        } else {
            scene.obstacles[i].mesh.material.color = new THREE.Color ('cyan');  
            state = 0;
        }
    }
    
}

function render() {
    var ww = window.innerWidth;
    var hh = window.innerHeight;
    renderer.setScissorTest( true );

    renderer.setViewport(0, 0, ww, hh);
    renderer.setScissor(0, 0, ww, hh);
    renderer.clear();

    renderer.setViewport(0, 0, ww/2, hh);
    renderer.setScissor(0, 0, ww/2, hh);
    renderer.render(scene, camera);
    renderer.setViewport(ww/2, 0, ww/2,hh);
    renderer.setScissor(ww/2, 0, ww/2, hh);
    renderer.render(scene, cameraHUD1);

    renderer.setScissorTest( false );
}

export {scene, car,cameraHUD1,state};