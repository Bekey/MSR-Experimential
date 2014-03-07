#pragma strict

public var target : Transform;
function Start () {
}

function Update () {
	transform.position = Vector3.Lerp(transform.position, target.position, 0.001);
}