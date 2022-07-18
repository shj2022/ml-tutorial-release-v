# tutorial_activity level tracker

# Lesson 3: Activity Level

## Step 1

In this tutorial, we will use the activity recognition program to code a program that detects your activity level.
On the screen are the control statements in which you will put code blocks. 
The program sets ``||variables: activityLevel||`` to 0 when it starts.

```template
let activity_level = 0
input.onButtonPressed(Button.A, function () {
})
input.onButtonPressed(Button.B, function () {
})
input.onButtonPressed(Button.AB, function () {
})
basic.forever(function () {
if (""== "s") {
        activity_level += 0
    }
    if (""== "w") {
        activity_level += 0
    }
    if (""== "r") {
        activity_level += 0
    }
})
```

## Step 2
In the ``||activityRecognition:activityRecognition||`` tab, you will see the ``||activityRecognition:find_activity||`` block. 
The program continuously predicts the current activity and stores it in that block for you: s for standing, w for walking, and r for running.

## Step 3
We want the ``||variables: activityLevel||`` to increase by different values depending on what the current activity is.
Drag and drop the ``||activityRecognition:find_activity||`` blocks in the appropriate places to code the segment in the ``||basic:forever||`` block that increases activity level by 0.1 when standing, 0.2 when walking, and 0.3 when running.

```blocks
basic.forever(function () {
    if (activityRecognition.findActivity() == "s") {
        activity_level += 0.1
    }
    if (activityRecognition.findActivity() == "w") {
        activity_level += 0.2
    }
    if (activityRecognition.findActivity() == "r") {
        activity_level += 0.3
    }
})
```

## Step 4
Now you will code the buttons to control the tool.
Code a segment that shows the current activity type when you press A.

```blocks
input.onButtonPressed(Button.A, function () {
    activityRecognition.show(activityRecognition.findActivity())
})
```

## Step 5
Code a segment that shows the current activity level when you press B.
```blocks
input.onButtonPressed(Button.B, function () {
    basic.showNumber(activity_level)
})
```

## Step 6
Finally, code a segment that resets the activity level to 0 when you press A and B together.
```blocks
input.onButtonPressed(Button.AB, function () {
    activity_level = 0
})
```

## Step 7
Now download your code onto the microbit and experiment with different activities, checking what your activity level is!
