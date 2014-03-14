#pragma strict
import System.Collections.Generic;

private var ff : Component[];

function Start () {
	//ff = new List.<Renderer>();
}

function Update () {

}

function Register(ren : Component[]) {
	ff = ren;
}


function OnTriggerEnter(other : Collider) { 
	if(other.gameObject.CompareTag("Player")) {
		for(r in ff) 
			r.renderer.enabled = false;
	}
}

function OnTriggerExit(other : Collider) {
	if(other.gameObject.CompareTag("Player")) {
		for(r in ff) 
			r.renderer.enabled = true;
	}
}