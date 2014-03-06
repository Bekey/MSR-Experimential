#pragma strict

function Start () {

}

function Update () {
	var gunHolder : GunHolder = GameObject.FindGameObjectWithTag("Player").GetComponentInChildren(GunHolder);
	var gun : BaseGun = gunHolder.gunObject.GetComponent(BaseGun);
	guiText.text = "Diagnostics\nRate Of Fire: "+gun.rateOfFire+"\nDamage: "+gun.damage+"\nSpread: "+gun.scatter+"\nBullets: "+gun.numBullets+"/"+gun.magSize;
}