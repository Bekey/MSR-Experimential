#pragma strict

public var trigger : Collider;
private var ren : Component[];
private var hid : Hider2;

function Awake() {
	ren = GetComponentsInChildren(Renderer);
}

function Start () {
	hid = trigger.GetComponent(Hider2);
	hid.Register(ren);
}