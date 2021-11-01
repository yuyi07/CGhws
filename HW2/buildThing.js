import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from './init.js';

var rect;
var car;
export class Obstacle {
    constructor(center, size) {
        this.center = center.clone();
        this.mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(size, size, 10, 20),
            new THREE.MeshPhongMaterial({color:0x00ffff})
        );
        this.mesh.position.copy(center);
        this.mesh.position.y = 5;
        this.size = size;
        scene.add(this.mesh);
    }
}

export function buildCar(){
    var material = new THREE.MeshPhongMaterial();
    var geometry = new THREE.BoxGeometry(20,10,10);//車身
    var box = new THREE.Mesh(geometry,material);
    box.position.set(-5,7,0);
    var geometry2 = new THREE.CylinderGeometry(3,3,15,64);
    var cylinder = new THREE.Mesh(geometry2,material);//後輪
    cylinder.position.set(-10,3,0);
    cylinder.rotation.x = Math.PI/2;
    var cylinder2 = new THREE.Mesh(geometry2,material);//前輪
    cylinder2.position.set(10,3,0);
    cylinder2.rotation.x = Math.PI/2;
    
    var shape = new THREE.Shape();//車頭
	shape.moveTo( 0,0 );
	shape.lineTo( 0, 8 );
	shape.lineTo( 10, 8 );
	shape.lineTo( 10, 5 );
	shape.lineTo( 14, 5 );
	shape.lineTo( 15, 3 );
	shape.lineTo( 15, 0 );
	shape.lineTo( 0, 0 );
	var extrudeSettings = {
		steps: 2,
		depth: 10,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1
	};
    var geometry3 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var mesh = new THREE.Mesh( geometry3, material ) ;
    mesh.position.set(6,3,-5);

    rect = new THREE.Mesh (new THREE.PlaneGeometry (30,15), new THREE.MeshBasicMaterial({side: THREE.DoubleSide}));
    
    
    car = new THREE.Group();
    car.add(box,cylinder,cylinder2,mesh);
    car.rotation.y = -Math.PI/2;
    scene.add(car);
    
}


export {car,rect};