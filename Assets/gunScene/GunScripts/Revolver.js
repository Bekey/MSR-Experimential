#pragma strict

public class Revolver extends BaseGun {
	/*####################*/
	/*## DRUM  MODIFIER ##*/
	/*## 				##*/
	private var drumMod = false;
	private var drumSize = 14;
	/*## 				##*/
	/*## DRUM  MODIFIER ##*/
	/*####################*/
	
	
	/*####################*/
	/*## HEAVY MODIFIER ##*/
	/*## 				##*/
	private var heavyMod = false;
	/*## 				##*/
	/*## HEAVY MODIFIER ##*/
	/*####################*/
	
	/*####################*/
	/*## SCOPE MODIFIER ##*/
	/*## 				##*/
	private var ScopeMod = false;
	/*## 				##*/
	/*## SCOPE MODIFIER ##*/
	/*####################*/
	
	/*####################*/
	/*## DOUBLEMODIFIER ##*/
	/*## 				##*/
	private var doubleBarrelMod = false;
	/*## 				##*/
	/*## DOUBLEMODIFIER ##*/
	/*####################*/
	
	/*####################*/
	/*## SEALERMODIFIER ##*/
	/*## 				##*/
	private var gasSealerMod = false;
	/*## 				##*/
	/*## SEALERMODIFIER ##*/
	/*####################*/
	
	/*####################*/
	/*## FLAME MODIFIER ##*/
	/*## 				##*/
	private var flameMod = false;
	/*## 				##*/
	/*## FLAME MODIFIER ##*/
	/*####################*/
	
	function CheckUpgrades() {
			//DRUMMODIFIER
			drumMod = GunUpgrades.RevolverRoundDrumUpgrade;
			if(drumMod) {
				magSize = drumSize;
				if(numBullets > drumSize) numBullets = drumSize;
			}
			
			//HEAVYCARTRIDGEMODIFIER
			heavyMod = GunUpgrades.RevolverHeavyCartridge;
			
			//SCOPEMODIFIER
			ScopeMod = GunUpgrades.RevolverScopeLongBarrel;

			//DOUBLEBARRELMODIFIER
			doubleBarrelMod = GunUpgrades.RevolverSnubNoseDoubleAction;
			
			//GASSEALERMODIFIER
			gasSealerMod = GunUpgrades.RevolverGasSealer;
			
			//GASSEALERMODIFIER
			flameMod = GunUpgrades.RevolverPoweredFlameEscape;
	}
	
	function Start () {
		CheckUpgrades();
	}

	function Update () {
	}
	
	function Shoot() {
		if( !isReloading && Time.time > nextShoot ) {
			RegularShot();
		}
	}
	
}