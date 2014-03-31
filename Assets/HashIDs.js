#pragma strict

// Here we store the hash tags for various strings used in our animators.
static var locomotionState : int;
static var walkingState : int;
static var walkEndState : int;
static var idleState : int;
static var speedFloat : int;


function Awake ()
{
    idleState = Animator.StringToHash("Base Layer.Idle");
    walkingState = Animator.StringToHash("Base Layer.Walking");
    walkEndState = Animator.StringToHash("Base Layer.WalkEndTrans");
    locomotionState = Animator.StringToHash("Base Layer.Locomotion");
    speedFloat = Animator.StringToHash("Speed");
}