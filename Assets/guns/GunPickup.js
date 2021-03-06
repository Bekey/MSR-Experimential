﻿#pragma strict

public var promptedGun : GameObject;
private var oldGun : GameObject;
private var gunHolder : GunHolder;
private var spotLight : Light;

function Start () {
	gunHolder = GameObject.FindGameObjectWithTag("Player").GetComponentInChildren(GunHolder);
	spotLight = GetComponentInChildren(Light);
}

function Update () {
	if(promptedGun && Input.GetKeyDown(KeyCode.G)) {
		oldGun = gunHolder.gunObject;
		gunHolder.Equip(promptedGun);
		promptedGun = null;
	}
}

function PromptPickup(gun : GameObject) {
	if(!promptedGun) {
		//Debug.Log("Wanna pickup?");
		if(gun != oldGun){
			spotLight.transform.position.x = gun.transform.position.x;
			spotLight.transform.position.z = gun.transform.position.z;
			promptedGun = gun;
		} else {
			oldGun = null;
		}
	}
}

function UnPromptPickup(gun : GameObject) {
	//Debug.Log("Too late");
	spotLight.transform.position.x = 999;
	spotLight.transform.position.z = 999;
	promptedGun = null;
}