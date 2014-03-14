#pragma strict

public var health : int = 10;
public var amount : int = 10;
public var gib : GameObject;

function Start () {

}

function Update () {
	if(health <= 0) {
		health = 0;
		for(var i = 0; i < amount; i++) {
			var gib : GameObject = Instantiate(gib, transform.position+Random.insideUnitSphere*3, Random.rotation);
			Destroy(gib,20.0);
			
		}
		Destroy(transform.gameObject);
	}

}

function ApplyDamage(damage : int) {
	health -= damage;
}