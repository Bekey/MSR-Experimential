#pragma strict

private var play : Transform;
function Start () {
	play = GameObject.FindGameObjectWithTag("Enemy").transform;
}

function Update () {
	transform.LookAt(play);
}