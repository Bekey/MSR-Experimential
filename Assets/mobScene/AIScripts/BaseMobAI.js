#pragma strict

private enum State { Idle, Patrolling, Chasing, Fleeing }; 
private enum Awareness { None, Stir, Suspicious, Visual, Engage }; 

public var state : State = State.Idle;
public var aware : Awareness = Awareness.None;

//References
private var controller : CharacterController;
private var nav : NavMeshAgent;
private var gravity : Vector3 = Physics.gravity;
private var patrol : Patrol;
private var chase : Chase;

function Awake() {
	controller = GetComponent(CharacterController);
	nav = GetComponent(NavMeshAgent);
	patrol = GetComponent(Patrol);
	chase = GetComponent(Chase);
}

function Start () {
	if(state == State.Patrolling) {
		patrol.StartPatrol();
	}
}

function FixedUpdate () {
	if(!controller.isGrounded)
		ApplyGravity();
	
	if(controller.isGrounded) {
		if(state == State.Patrolling) {
			patrol.Patrol();
		} else if(state == state.Chasing) {
			chase.Chase(50);
		}
	}
	
}
/*
function AwayFrom(from : Vector3) : float {
	return Vector3.Distance(transform.position, from);
}

function MoveTo(to : Vector3, speed : float) { 
	transform.rotation = RotateTo(to, speed);
	controller.Move(transform.forward * speed * Time.fixedDeltaTime);
}

function RotateTo(vec : Vector3, speed : float) : Quaternion {
	var newRotation = Quaternion.LookRotation(vec - transform.position).eulerAngles;
	newRotation.x = 0;
	newRotation.z = 0;
	return Quaternion.Lerp(transform.rotation, Quaternion.Euler(newRotation), Time.fixedDeltaTime * speed);
}*/

function ApplyGravity() {
	controller.Move(gravity * Time.fixedDeltaTime);
}