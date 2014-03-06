#pragma strict

@CustomEditor (NodeScript)
public class NodeScriptEditor extends Editor 
{
    function OnInspectorGUI()
    {
        DrawDefaultInspector();
     	
     	var myScript : NodeScript = target as NodeScript;
        if(GUILayout.Button("Create a node"))
        {
            Selection.activeGameObject = myScript.BuildNode();
        }
        if(GUILayout.Button("Find Ground"))
        {
            myScript.FindGround();
        }
        if(GUILayout.Button("Create Grid"))
        {
            myScript.CreateGrid();
        }
    }
}