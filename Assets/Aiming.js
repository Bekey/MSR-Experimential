#pragma strict
#pragma downcast

public var crossHair : Transform;
public var DEBUG = true; 

private var player : Transform;
private var aimingPlane : Plane;
private var compassPointer : Vector3;
private var target : Vector3;

private var layerFilter = LayerFilters.ignorePlayerLayer;

function Awake() {
	aimingPlane = new Plane(Vector3.up, transform.position.y);
}
function Start() {
	player = GameObject.FindGameObjectWithTag("Player").transform;
}

function Update () {	//TODO: Edge cases
	setCrossHair(Vector3.zero);
	
	//set up mouse ray
	var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hits : List.<RaycastHit> = getRaycastArray(ray);
	if(!(hits.Count > 0)) return;
	
	//check if there's enemies behind any obstacle and transform has LoS on them. (door)
	for (hit in hits) {
		if(hit.collider.CompareTag(Tags.enemy)) {
			var losHitE : RaycastHit;
			var losDirE : Vector3 = hit.point - transform.position;
			if (DEBUG == true) { Debug.DrawRay(transform.position, losDirE, Color.yellow); }
			Physics.Raycast(transform.position, losDirE, losHitE, Mathf.Infinity, layerFilter);
			if(losHitE.collider == hit.collider) {
				target = losHitE.point;
				setCrossHair(target);
				return;
			}
		}
	}
	
	var hit : RaycastHit = hits[0];
	setCrossHair(hit.point);
	
	//set up line of sight raycast variables
	var losHit : RaycastHit;
	var losDir : Vector3 = hit.point - transform.position;
	
	if (DEBUG == true) { Debug.DrawRay(transform.position, losDir, Color.green); }
	Physics.Raycast(transform.position, losDir, losHit, Mathf.Infinity, layerFilter);
	
	//Mouse directly over enemy, takes precedence before all else.
	if (CheckForEnemy(hit, losHit))
		return;
	
	
	//Mouse directly over desired point. Both transform and mouse have clear line of sight
	if(losHit.point == hit.point) {
		target = losHit.point;
	} else {
		//Player unclear line of sight, mouse below obstacle
		if(losHit.point.y > hit.point.y) {
			//aim straight
			if (elevateCrossHair(ray)) {
				return;
			}
		} else {
			//is lineofsight hitting the ceiling?
			if(losHit.normal == Vector3.down) {
				//Try aiming below obstacle
				target = hit.point;
				for ( newHit in hits ) {
					//Hits closer to the transform's Y axis favorable
					if(chooseByDistance(newHit))
						return;
				}
			} else {
				//aim at the side instead
				target = losHit.point;
			}
		}
	}
	
	setCrossHair(target);
}

function CheckForEnemy(hit : RaycastHit, losHit : RaycastHit) : boolean {
	if(hit.collider.CompareTag(Tags.enemy)) {
		if(losHit.collider == hit.collider) {
			target = losHit.point;
			setCrossHair(target);
			return true;
		}
	}
	return false;
}

function chooseByDistance(hit : RaycastHit) : boolean {
	var distance1 = Vector3.Distance(target, transform.position);
	var distance2 = Vector3.Distance(hit.point, transform.position);
	var losHit : RaycastHit;
	var losDir : Vector3 = hit.point - transform.position;
	Physics.Raycast(transform.position, losDir, losHit, Mathf.Infinity, layerFilter);
	if (DEBUG == true) { Debug.DrawRay(transform.position, losDir, Color.yellow); }
	if (CheckForEnemy(hit, losHit)) {
		return true;
	} else if (distance1 > distance2) {
		target = losHit.point;
	}
	return false;
}

function chooseByHeight(hit : RaycastHit) : boolean {
	var distance1 = Mathf.Abs(target.y - transform.position.y);
	var distance2 = Mathf.Abs(hit.point.y - transform.position.y);
	var losHit : RaycastHit;
	var losDir : Vector3 = hit.point - transform.position;
	Physics.Raycast(transform.position, losDir, losHit, Mathf.Infinity, layerFilter);
	if (DEBUG == true) { Debug.DrawRay(transform.position, losDir, Color.yellow); }
	if (CheckForEnemy(hit, losHit)) {
		return true;
	} else if (distance1 > distance2) {
		target = losHit.point;
	}
	return false;
}

function elevateCrossHair(ray : Ray) : boolean {
/*	var newAngle = Vector3.Angle(ray.direction, Vector3.up);var distance = Mathf.Abs(transform.position.y-hit.point.y+2.6f) / Mathf.Cos(newAngle);return ray.GetPoint(hit.distance-distance);*/
	aimingPlane.SetNormalAndPosition(Vector3.up, transform.position);
	var rayDistance: float;
	// If the ray makes contact with the ground plane then
	// position the marker at the distance along the ray where it
	// crosses the plane.
	if (aimingPlane.Raycast(ray, rayDistance)) {
		if (DEBUG == true) { Debug.DrawRay(transform.position, ray.GetPoint(rayDistance)-transform.position, Color.red); }
		setCrossHair(ray.GetPoint(rayDistance));
		return true;
	}
	else return false;
}
function getRaycast(ray : Ray) : RaycastHit {
	var hit : RaycastHit;
	Physics.Raycast(ray, hit, Mathf.Infinity, layerFilter);
	if (DEBUG) {
		var rayOrigin = ray.origin;
		var rayColor = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0), Random.Range(0.0,1.0));
		Debug.DrawLine(rayOrigin, hit.point, rayColor, 0, false);
	}
	return hit;
}

function getRaycastArray(ray : Ray) : List.<RaycastHit> {
	var hits : RaycastHit[];
	hits = Physics.RaycastAll(ray, Mathf.Infinity, layerFilter);
	if (DEBUG) {
		var rayOrigin = ray.origin;
		for(var hit in hits) {
			var rayColor = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0), Random.Range(0.0,1.0));
			Debug.DrawLine(rayOrigin, hit.point, rayColor, 0, false);
			rayOrigin = hit.point;
		}
	}
	var hits2 : List.<RaycastHit> = new SortedRaycast().SortDistance(hits);
	
	return hits2;
}

function setCrossHair(vec : Vector3) {
	compassPointer = vec;
	compassPointer.y = player.position.y;
		
	player.LookAt(compassPointer);
	
	crossHair.position = vec;
}