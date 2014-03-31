#pragma strict
import System.Collections.Generic;

private var listRenderers : List.<Renderer>;

function Awake() {
	listRenderers = new List.<Renderer>();
}

function Update () {

}

function Register(ren : Renderer) {
	listRenderers.Add(ren as Renderer);
}

function Register(ren : Component[]) {
	for(r in ren)
		listRenderers.Add(r as Renderer);
}

function OnTriggerStay(other : Collider) { 
	if(other.gameObject.CompareTag("Player")) {
		for(ren in listRenderers) 
			ren.renderer.enabled = false;
	}
}

function OnTriggerExit(other : Collider) {
	if(other.gameObject.CompareTag("Player")) {
		for(ren in listRenderers) 
			ren.renderer.enabled = true;
	}
}