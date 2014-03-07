#pragma strict

function Start () {

}

function Update () {
	var gunController : GunController = GameObject.FindGameObjectWithTag("Player").GetComponentInChildren(GunController);
	var gun : BaseGun = gunController.gunObject.GetComponent(BaseGun);
	guiText.text = "Diagnostics\nRate Of Fire: "+gun.rateOfFire+"\nDamage: "+gun.damage+"\nSpread: "+gun.scatter+"\nBullets: "+gun.numBullets+"/"+gun.magSize;
}