#pragma strict
#pragma downcast 

public var index : int = 0;
public var distance : float = 10.0;
public var gridX : int = 10;
public var gridY : int = 10;

function Start () {
}

function Update () {
	
}


function OnDrawGizmos() {
	Gizmos.color = Color.yellow;
	Gizmos.DrawCube(transform.position, Vector3 (1,0.5,1));
}

function BuildNode() {
	var next : NodeScript;
	next = Instantiate(this, transform.position+transform.right,Quaternion.identity);
	
	next.transform.parent = transform.parent;
	next.setIndex(index + 1);
	next.name = String.Format("node{0:000}", next.getIndex());
	return next.gameObject;
}
function getIndex() : int { return index; }
function setIndex(i : int) { index = i; }

function FindGround() {
	if(transform.childCount > 0) {
		for(var child : Transform in transform) {
			var child2 : NodeScript = child.gameObject.GetComponent(NodeScript);
			child2.FindGround();
		}
	} else {
		var hit : RaycastHit;
		if (Physics.Raycast (transform.position, -Vector3.up, hit)) {
			transform.position = hit.point;
		}
	}
}

function CreateGrid() {
	var previous : NodeScript = this;
	for(var i = 0; i < gridX; i++) {
		for(var j = 1; j <= gridY; j++) {
			var next : NodeScript;
			next = Instantiate(this, transform.position+transform.TransformDirection(transform.right)*i*distance+transform.TransformDirection(transform.forward)*j*distance,Quaternion.identity);
			next.transform.parent = transform.parent;
			next.setIndex(previous.getIndex() + 1);
			next.name = String.Format("node{0:000}", next.getIndex());
	
			previous = next;
		}
	}
}