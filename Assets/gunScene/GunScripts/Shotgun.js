#pragma strict

public class Shotgun extends BaseGun {

	public var numPellets : int = 10;


	/*####################*/
	/*## XXXX  MODIFIER ##*/
	/*## 				##*/
	/*## 				##*/
	/*## XXXX  MODIFIER ##*/
	/*####################*/
	
	function CheckUpgrades() {
			//XXXXMODIFIER
			//drumMod = GunUpgrades.RevolverRoundDrumUpgrade;
	}
	
	function Start () {
		CheckUpgrades();
	}

	function Update () {
	}
	
	function Shoot() {
		if( !isReloading && Time.time > nextShoot ) {
			ShotgunShot();
		}
	}
	
	function ShotgunShot() {
		if(numBullets <= 0) {
			Reload();
		} else {
			for(var i = 0; i < numPellets; i++) {
				ShootBullet();
			}
			numBullets--;
			nextShoot = Time.time + rateOfFire;
		}
	}
	
	function ShootBullet() {
		var direction : Vector3 = getDirection();
		var hit : RaycastHit;

		if(Physics.Raycast(transform.position, direction, hit, Mathf.Infinity)) {
			Debug.DrawLine(transform.position, hit.point,Color.green);
			Destroy(Instantiate(a, hit.point, Quaternion.identity), 0.10f);
			
			DamageEnemy(hit.collider);
		}
	}
}