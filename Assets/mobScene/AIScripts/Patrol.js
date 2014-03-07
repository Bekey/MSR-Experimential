#pragma strict

public var patrolSpeed : float = 5.0;
public var patrolWaitTime : float = 2.0;
private var patrolTimer : float = 0.0;

public var patrolRoute : WaypointScript;
private var target : Vector3;

private var master : BaseMobAI;
private var agent : NavMeshAgent;
private var isPatrolling = false;

function Awake() {
	master = GetComponent(BaseMobAI);
	agent = GetComponent(NavMeshAgent);
}

function Start() {
}

function StartPatrol() {
	if(!GetPatrolNode(false)) {
		Debug.Log("Forgot to set a patrol path, maybe?");
		StopPatrol();
	}
	isPatrolling = true;
}

function Patrol() {
	if(!isPatrolling) return;
	if(agent.pathPending) {Debug.Log("Path can't keep up, patrol.");return;}
	
	agent.speed = patrolSpeed;
	if(agent.remainingDistance < agent.stoppingDistance) {
		patrolTimer += Time.fixedDeltaTime;
		if(patrolTimer > patrolWaitTime) {
			patrolTimer = 0;
			if(!GetPatrolNode(true)) {
				StopPatrol();
				return;
			}
		}
	}
	
	//agent.destination = target;
}

function StopPatrol() {Debug.Log("Forgot to set a patrol path, maybe?");
	master.state = master.state.Idle;
	isPatrolling = false;
}

function GetPatrolNode(next : boolean) : boolean {
	if(patrolRoute) {
		if(next) {
			if(!patrolRoute.nextWaypoint) {
				return false;
			}
			patrolRoute = patrolRoute.nextWaypoint;
		}
		target = patrolRoute.GetRandom();
		return agent.SetDestination(target);
	}
	return false;
}