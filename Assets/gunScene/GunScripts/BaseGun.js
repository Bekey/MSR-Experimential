#pragma strict

public var a : GameObject; 					//Temporary bullethole prefab
public var damage : int = 1;				@Range(0,1)
public var rateOfFire : float = 0.1;		@Range(0,0.1)
public var scatter : float = 0.1;			//Aka Spread
public var magSize : int = 15;				//Stays the same, mostly.
public var numBullets : int = magSize;		@Range(0,1)
public var reloadSpeed : float = 0.5;

protected var isHolstered = false; 				//set to private and make it a function
protected var isEquipped = false; 				//set to private and make it a function

protected var nextShoot : float = 0.0;		//Timer for ROF
protected var isReloading = false;			//Poop

function Start () {
}

function Update () {
}

function StartShoot() {}

function Shoot() {
	//Checks if enough time has passed to shoot another bullet, also if we're reloading or not
	if( !isReloading && Time.time > nextShoot ) {
		RegularShot();
	}
}

function StopShoot() {}

function RegularShot() {
	if(numBullets <= 0) {
		Reload();
	} else {
		ShootBullet();
		nextShoot = Time.time + rateOfFire;
	}
}

function ShootBullet() {
	var direction : Vector3 = getDirection();
	var hit : RaycastHit;

	if(Physics.Raycast(transform.position, direction, hit, Mathf.Infinity)) {
		Debug.DrawLine(transform.position, hit.point,Color.green);
		var clone : GameObject = Instantiate(a, hit.point, Quaternion.identity);
		clone.transform.parent = hit.transform;
		DamageEnemy(hit.collider);
	}
	numBullets--;
}

function DamageEnemy(other : Collider) {
	if(other.CompareTag("Enemy")) {
		//other.SendMessage("ApplyDamage", damage);
	}
}

function Reload() {
	if(!isReloading) {
		isReloading = true;
		Invoke("RefillMag", reloadSpeed);
	}
}

function RefillMag() {
	numBullets = magSize;
	isReloading = false;
}

function getDirection() : Vector3 {
	return transform.forward + Random.insideUnitSphere * scatter;
}

function CheckUpgrades() {
	
}

function OnTriggerStay(other : Collider) {
	if(!isEquipped) { 
		if(other.collider.CompareTag("Player")) {
			var gc : GunPickup = GameObject.FindGameObjectWithTag("GameController").GetComponent(GunPickup);
			gc.PromptPickup(gameObject);
		}
	}
}

function OnTriggerExit(other : Collider) {
	if(!isEquipped) { 
		if(other.collider.CompareTag("Player")) {
			var gc : GunPickup = GameObject.FindGameObjectWithTag("GameController").GetComponent(GunPickup);
			gc.UnPromptPickup(gameObject);
		}
	}
}

function Holster(state : boolean) : boolean {
	isHolstered = state;
	return true;
}
function Equip(state : boolean) {
	isEquipped = state;
}