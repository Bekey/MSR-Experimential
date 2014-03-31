#pragma strict

public var trigger : HidePropertyController;
private var selfRenderer : Renderer;
private var childRenderers : Component[];

function Awake() {
	selfRenderer = GetComponent(Renderer);
	childRenderers = GetComponentsInChildren(Renderer);
}

function Start() {
	if(selfRenderer) {
		trigger.Register(selfRenderer);
	} else {
		if (childRenderers.Length > 0) {
			trigger.Register(childRenderers);
		}
	}
}