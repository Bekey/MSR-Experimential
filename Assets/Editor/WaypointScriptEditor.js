#pragma strict

@CustomEditor (WaypointScript)
public class WaypointScriptEditor extends Editor 
{
    function OnInspectorGUI()
    {
        DrawDefaultInspector();
     	
     	var myScript : WaypointScript = target as WaypointScript;
        if(GUILayout.Button("Create next waypoint"))
        {
            Selection.activeGameObject = myScript.BuildWaypoint();
        }
        if(myScript.nextWaypoint && GUILayout.Button("Delete NextWaypoint reference"))
        {
	    	myScript.nextWaypoint = null;
	    }   
    }
}