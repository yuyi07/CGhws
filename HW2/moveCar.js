import * as THREE from "https://threejs.org/build/three.module.js";
import {state} from './init.js';
import {car} from './buildThing.js';

var keyboard = new KeyboardState();
var pos = new THREE.Vector3();
var vel = new THREE.Vector3();
var force = new THREE.Vector3();
var power = 5.0,angle = 0.0;
export function update(dt) {

    keyboard.update();

    if (vel.length() > 0) {
        angle = 1.5*Math.PI + Math.atan2(vel.x, vel.z); 
    }

    if (keyboard.pressed("space")) {
        power = 0.1;   
    }
    if (keyboard.pressed("up"))  {
        power *= 1.2;  
    }
    if (keyboard.pressed("down"))  {
        power /= 1.2;  
    }
 	
    power = Math.clamp (power, 0, 80.0); 


    var angle_thrust = angle;
    if (keyboard.pressed("left")){
        angle_thrust += 0.3;
    }
    if (keyboard.pressed("right")){
        angle_thrust -= 0.3;
    }

    // compute force
    var thrust = new THREE.Vector3(1,0,0).multiplyScalar(power).applyAxisAngle (new THREE.Vector3(0,1,0), angle_thrust);
    force.copy (thrust);
    force.add(vel.clone().multiplyScalar(-2))
    

    // eulers
    
    vel.add(force.clone().multiplyScalar(dt));
    
    if(state === 0){
        pos.add(vel.clone().multiplyScalar(dt));
    }
    if(state === 1){
        return;
    }
    
    
}


export function makeRect(rect) {
    let Rect = {};
    Rect.max = car.localToWorld ( new THREE.Vector3(15, 0, 7.5) );
    Rect.min = car.localToWorld ( new THREE.Vector3(-15, 0, -7.5) );
    return Rect;
}	
    
export function objectCopy (src) {
    return JSON.parse (JSON.stringify (src));
}

export 
function Check_Intersect(Rect, C, Rad) {
	const Rad2 = Rad * Rad;
  
	/* Translate coordinates, placing C at the origin. */
	// duplicate R object here for computation ...
	let R;
	R = objectCopy (Rect);
  
	R.max.x -= C.position.x;  R.max.z -= C.position.z;
	R.min.x -= C.position.x;  R.min.z -= C.position.z;


	if (R.max.x < 0) 			/* R to left of circle center */
	if (R.max.z < 0) 		/* R in lower left corner */
			return ((R.max.x * R.max.x + R.max.z * R.max.z) < Rad2);
	else if (R.min.z > 0) 	/* R in upper left corner */
			return ((R.max.x * R.max.x + R.min.z * R.min.z) < Rad2);
	else 					/* R due West of circle */
			return(Math.abs(R.max.x) < Rad);
	else if (R.min.x > 0)  	/* R to right of circle center */
		if (R.max.z < 0) 	/* R in lower right corner */
				return ((R.min.x * R.min.x + R.max.z * R.max.z) < Rad2);
	else if (R.min.z > 0)  	/* R in upper right corner */
			return ((R.min.x * R.min.x + R.min.z * R.min.z) < Rad2);
	else 				/* R due East of circle */
			return (R.min.x < Rad);
	else				/* R on circle vertical centerline */
		if (R.max.z < 0) 	/* R due South of circle */
			return (Math.abs(R.max.z) < Rad);
	else if (R.min.z > 0)  	/* R due North of circle */
			return (R.min.z < Rad);
	else 				/* R contains circle centerpoint */
			return(true);
} 	
export {pos,angle};