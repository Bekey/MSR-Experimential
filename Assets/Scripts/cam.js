#pragma strict

private var play : Transform;
function Start () {
	play = GameObject.FindGameObjectWithTag("Player").transform;
}

function Update () {
	transform.position = play.position;
}