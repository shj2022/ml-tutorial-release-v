# tutorial_activity level tracker

# Lesson 3: Activity Level

## Step 1

In this tutorial, we will use the activity recognition program to code a program that detects your activity level.
On the screen are the control statements in which you will put code blocks. 

```template
input.onButtonPressed(Button.A, function () {
})
input.onButtonPressed(Button.B, function () {
})
input.onButtonPressed(Button.AB, function () {
})
basic.forever(function () {
})
```

## Step 2
In the ``||activityRecognition:activityRecognition||`` tab, you will see the ``||activityRecognition:find_activity||`` block. 
The program continuously predicts the current activity and stores it in that block for you: s for standing, w for walking, and r for running.

## Step 3
We want the ``||variables: step||`` count to increase by 1 every time you take a step. To accurately do that, we will use the ``||moveSMART:acceleration_strength||`` value in the moveSMART tab.

Use ``||logic: > ||`` to code a block that returns ``||logic: true||`` when ``||moveSMART:acceleration_strength||`` is bigger than 1.5.
Hint: Here we have chosen the value 1.5 for you as a starting point. You will have a chance to change it later!
```blocks
if (moveSMART.acceleration_strength() > 1.5) {}
```

## Step 4
Now use the blocks ``||logic: if true then||`` and ``||variables: step||`` so that the step count increases whenever the acceleration strength is bigger than 1.5.

## Step 5
To complete the step counter, put the code in the mouth of the ``||logic: if counting then||`` block.

## Step 6
Now download your code onto the microbit and experiment whether the threshold value is good! Try walking around thirty steps and check the accuracy. Adjust the threshold value from 1.5 and download the program again as necessary.
