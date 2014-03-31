#pragma strict

public var anchor : Transform;
public var gunObject : GameObject;
public var holster : Transform;
public var isHolstered = false;

protected var gun : BaseGun;
protected var hasEquipped = false;

function Start () {
	gun = gunObject.GetComponent.<BaseGun>();
	if(gun) {
		hasEquipped = true;
		gun.Equip(true);
	}
}

function Update () {
	transform.position = anchor.position;
	//if(Input.GetKeyDown(KeyCode.G)) Unequip();
	
	if( hasEquipped ) {
		if ( !isHolstered ) {
			gunObject.transform.position = transform.position;
			gunObject.transform.rotation = transform.rotation;
			
			if(Input.GetKeyDown(KeyCode.Mouse0)) 	StartShoot();
			if(Input.GetKey(KeyCode.Mouse0)) 		Shoot();
			if(Input.GetKeyUp(KeyCode.Mouse0)) 		StopShoot();
			if(Input.GetKey(KeyCode.R)) 			Reload();
			
		} else {
			gunObject.transform.position = holster.position;
			gunObject.transform.rotation = holster.rotation;
		}
		if(Input.GetKeyDown(KeyCode.H)) Holster();
	}
}

function Equip(a : GameObject) {
	Unequip();
	
	gunObject = a;
	gun = gunObject.GetComponent.<BaseGun>();
	gun.Equip(true);
	
	hasEquipped = true;
}

function Unequip() {
	gun.Equip(false);
	hasEquipped = false;
	
	gunObject = null;
	gun = null;
}

function Holster() {
	if (gun.Holster(isHolstered))
		isHolstered = !isHolstered;
}

function StartShoot() {
	gun.StartShoot();
}
function Shoot() {
	gun.Shoot();
}
function StopShoot() {
	gun.StopShoot();
}
function Reload() {
	gun.Reload();
}