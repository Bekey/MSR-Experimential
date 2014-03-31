#pragma strict

private var agent : NavMeshAgent;
private var anim : Animator;
private var hash : HashIDs;

function Awake() {
	anim = GetComponentInChildren(Animator);
	hash = GameObject.FindGameObjectWithTag("GameController").GetComponent(HashIDs);
	agent = GetComponent(NavMeshAgent);
}

function Update() {
	anim.SetFloat(hash.speedFloat, agent.velocity.magnitude);
}