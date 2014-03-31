#pragma strict
import System.Collections.Generic;

public class SortedRaycast {
	public var distance : List.<RaycastHit>;

	function SortedRaycast() {
		distance = new List.<RaycastHit>();
	}

	function SortDistance(raycastHits : RaycastHit[]) : List.<RaycastHit> {
		for(hit in raycastHits)
			distance.Add(hit);
		distance.Sort(ByDistance);
		
		return distance;
	}

	function ByDistance(x : RaycastHit, y : RaycastHit) : int {
		if (x.distance > y.distance)
			return 1;
		else if (x.distance < y.distance)
			return -1;
		else
			return 0;
	}
}