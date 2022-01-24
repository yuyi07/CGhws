import { TeapotGeometry } from "https://threejs.org/examples/jsm/geometries/TeapotGeometry.js";
import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from "./main-5-1.js";


export class Pot {
    constructor (x,y,z) {
        this.pos = new THREE.Vector3(x,y,z);
        let meshMaterial = new THREE.ShaderMaterial({
            uniforms: {
                lightpos: {type: 'v3', value: new THREE.Vector3()}
            },
            vertexShader: document.getElementById('myVertexShader').textContent,
            fragmentShader: document.getElementById('myFragmentShader').textContent
        });
        this.mesh = new THREE.Mesh(new TeapotGeometry (5), meshMaterial);
        scene.add(this.mesh);
        this.mesh.position.copy(this.pos);

    }
    update(angle,p){
        this.mesh.material.uniforms.lightpos.value.copy (p);

        this.mesh.rotation.y = 1.3*angle;
    }
}