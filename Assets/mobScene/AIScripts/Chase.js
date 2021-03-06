﻿#pragma strict

public var chaseSpeed : float = 20.0;
public var viewRange : float = 20.0;
public var attackRange : float = 5.0;

private var viewRangeSqr : float = viewRange * viewRange;
private var attackRangeSqr : float = attackRange * attackRange;
private var target : Vector3;

private var master : BaseMobAI;
private var agent : NavMeshAgent;
private var player : Transform;

private var isChasing = false;

function Awake() {
	master = GetComponent(BaseMobAI);
	agent = GetComponent(NavMeshAgent);
}

function Start () {
	player = GameObject.FindGameObjectWithTag("Player").transform;
}

function Update () {
	if(PlayerInSight()) {
		StartChase();
	}
}

function StartChase() {
	if(isChasing) return;
	master.state = master.state.Chasing;
}

function Chase(range : float) {
	if(agent.pathPending) return;
	SetViewRange(range);
	
	if(InRange(attackRangeSqr)) {
		Attack();
		return;
	}
	
	agent.speed = chaseSpeed;
	agent.destination = player.position;
}

function StopChase() {
}

function Attack() {
	agent.Stop();
	transform.LookAt(Vector3(player.position.x, transform.position.y, player.position.z));
	var gun = GetComponentInChildren(GunController);
	gun.Shoot();
}

function PlayerInSight() : boolean {
	if(InRange(viewRangeSqr)) {
		var delta : Vector3 = (player.position - transform.position);
		if(Vector3.Dot(delta.normalized, transform.forward) > 0) {
			if(!isObstructed(player))
				return true;
		}
	}
	return false;
}

function InRange(range : float) : boolean {
	var delta : Vector3 = (player.position - transform.position);
	if(delta.sqrMagnitude < range) {
		return true;
	}
	return false;
}

function isObstructed(other : Transform) : boolean {
	var hit : RaycastHit;
	Debug.DrawLine(transform.position + Vector3.up * 1.5f, other.position + Vector3.up * 1.5f);
	if(Physics.Linecast(transform.position + Vector3.up * 1.5f, other.position  + Vector3.up * 1.5f, hit)) {
		if(hit.transform == other) {
			return false;
		}
	}
	return true;
}

function SetViewRange(range : float) {
	if(viewRange != range) {
		viewRange = range;
		viewRangeSqr = range * range;
	}
}