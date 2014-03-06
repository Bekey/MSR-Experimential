#pragma strict

public var nextWaypoint : WaypointScript;
public var range : float = 5.0;

public var index : int = 0;

function Start () {
}

function Update () {
	
}

function GetRandom() : Vector3 {
	var rnd : Vector3 = transform.position + Random.insideUnitSphere * range;
	rnd.y = transform.position.y;
	return rnd;
}

function OnDrawGizmos() {
	Gizmos.color = Color.yellow;
	Gizmos.DrawWireSphere(transform.position, range);
	if(nextWaypoint != null) {
		Gizmos.DrawLine (transform.position, nextWaypoint.transform.position);
		Gizmos.color = Color.blue;
		Gizmos.DrawSphere(transform.position, 0.5f);
	} else {
		Gizmos.color = Color.red;
		Gizmos.DrawSphere(transform.position, 0.5f);
	}
}

function BuildWaypoint() {
	var next : WaypointScript;
	next = Instantiate(this, transform.position+transform.right,Quaternion.identity);
	next.transform.parent = transform.parent;
	next.setIndex(index + 1);
	next.nextWaypoint = null;
	
	next.name = String.Format("waypoint{0:000}", next.getIndex());
	
	nextWaypoint = next;
	return next.gameObject;
}
function getIndex() : int { return index; }
function setIndex(i : int) { index = i; }