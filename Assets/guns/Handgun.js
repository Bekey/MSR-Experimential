#pragma strict

public class Handgun extends BaseGun {
	/*####################*/
	/*## BURST MODIFIER ##*/
	/*## 				##*/
	private var burstMod = false;
	private var numBurst : int = 3;
	private var burstROF : float = 0.05;
	private var pauseROF : float = 1.0;
	private var isBursting = false;
	private var burstCount : int = 0;
	
	function BurstShot() {
		if(numBullets <= 0) {
			Reload();
			ResetBurst();
		} else {
			ShootBullet();
			burstCount++;
			isBursting = true;
			nextShoot = Time.time + burstROF;
			CheckBurst();
		}
	}
	
	function CheckBurst() {
		if(burstCount >= numBurst) {
			ResetBurst(); 
		}
	}

	function ResetBurst() {
		nextShoot = Time.time + pauseROF;
		burstCount = 0;
		isBursting = false;
	}
	/*## 				##*/
	/*## BURST MODIFIER ##*/
	/*####################*/
	
	
	/*####################*/
	/*## FAUTO MODIFIER ##*/
	/*## 				##*/
	private var fullautoMod = false;
	private var autoROF : float = 0.1;
	/*## 				##*/
	/*## FAUTO MODIFIER ##*/
	/*####################*/
	
	/*####################*/
	/*## SPREAD REDUCER ##*/
	/*## 				##*/
	private var reduceSpreadMod = false;
	private var reducedScatter : float = 0.04;
	/*## 				##*/
	/*## SPREAD REDUCER ##*/
	/*####################*/
	
	/*####################*/
	/*## SPREADINCREASE ##*/
	/*## 				##*/
	private var increaseSpreadMod = false;
	private var increasedScatter : float = 0.1;
	/*## 				##*/
	/*## SPREADINCREASE ##*/
	/*####################*/
	
	function CheckUpgrades() {
			//BURSTMODIFIER
			burstMod = GunUpgrades.HandgunBurst;
			//FULLAUTOMODIFIER
			fullautoMod = GunUpgrades.HandgunFullAuto;
			if(fullautoMod) rateOfFire = autoROF;
			
			//SPREADREDUCERMODIFIER
			reduceSpreadMod = GunUpgrades.HandgunSpreadReducer;
			if(reduceSpreadMod) scatter = reducedScatter;

			//SPREADINCREASEMODIFIER
			increaseSpreadMod = GunUpgrades.HandgunSpreadIncreaser;
			if(increaseSpreadMod) scatter = increasedScatter;
	}
	
	function Start () {
		CheckUpgrades();
	}

	function Update () {
		//BURSTMODIFIER
		if(isBursting && isEquipped && Time.time > nextShoot) {
			BurstShot();
		}
	}
	
	function Shoot() {
		if( !isReloading && Time.time > nextShoot ) {
			//BURSTMODIFIER
			if(burstMod)BurstShot(); else {

				RegularShot();
			}
		}
	}

	function Reload() {
		if(!isReloading) {
			//BURSTMODIFIER
			if(burstMod) ResetBurst();
			
			isReloading = true;
			Invoke("RefillMag", reloadSpeed);
		}
	}
	
	function Holster(state : boolean) : boolean {
		//BURSTMODIFIER
		if(burstMod) {
			if(isBursting)
				return false;
			ResetBurst();
		}
		
		isHolstered = state;
		return true;
	}
}