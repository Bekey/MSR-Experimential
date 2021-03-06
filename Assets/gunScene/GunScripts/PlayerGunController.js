﻿#pragma strict

class PlayerGunController extends GunController {

	function Update() {
		transform.position = anchor.position;
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
}