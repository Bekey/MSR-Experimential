#pragma strict
@script RequireComponent(CharacterController)

public var walkSpeed : float = 3f;
public var runSpeed : float = 5.5f;
public var jumpHeight = 0.5f;
public var gravity : Vector3 = Physics.gravity;

private var anim : Animator;
private var hash : HashIDs;
private var controller : CharacterController;

private var isJumping : boolean = false;
private var hasJumped : boolean = false;
private var jumpTimer : float = 0.0f;
private var bunnyHopTimeout : float = 0.15f;
private var verticalSpeed : float = 0.0f;

private var speed : float = walkSpeed;

function Awake() {
	anim = GetComponentInChildren(Animator);
	hash = GameObject.FindGameObjectWithTag("GameController").GetComponent(HashIDs);
	controller = GetComponent(CharacterController);
}


function FixedUpdate() {
	var h : float = Input.GetAxis("Horizontal");
	var v : float = Input.GetAxis("Vertical");
	var j : boolean = Input.GetButton("Jump");
	MovementManagement(h, v, j);

	if(!controller.isGrounded)
		ApplyGravity();
}


function Update(){
	if(controller.isGrounded) {
		hasJumped = false;
		if(isJumping && !hasJumped) {
			if(Time.time < jumpTimer) {
				hasJumped = true;
				verticalSpeed = Mathf.Sqrt(jumpHeight * 400);
			} else {
				isJumping = false;
			}
		} else {
			verticalSpeed = 0.0f;
		}
	} else {
		verticalSpeed += gravity.y * Time.deltaTime;
	}
}

function ApplyGravity() {
	controller.Move(gravity*Time.fixedDeltaTime);
}

function MovementManagement(horizontal : float, vertical : float, jump : boolean) {
	if(hasJumped) {
		controller.Move(Vector3.up * verticalSpeed * Time.fixedDeltaTime);
	}
	
	if(horizontal != 0f || vertical != 0f) {
		if(Input.GetButton("Sprint")) 
			speed = runSpeed;
		else
			speed = walkSpeed;
		Move(horizontal, vertical);
		anim.SetFloat(hash.speedFloat, speed);
	} else {
		anim.SetFloat(hash.speedFloat, 0.0f);
	}
	
	if(jump) {
		isJumping = true;
		jumpTimer = Time.time + bunnyHopTimeout;
	}
}


function Move(horizontal : float, vertical : float) {
	var forward = Camera.main.transform.TransformDirection(Vector3.forward);
	forward.y = 0;
	forward = forward.normalized;
	var right = Vector3(forward.z, 0, -forward.x);

	var targetDirection : Vector3 = horizontal * right + vertical * forward;

	controller.SimpleMove(targetDirection.normalized * speed);
}