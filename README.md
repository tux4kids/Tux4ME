# Tux4ME
#### An application with a set of simple games to boost your mental ability by Tux4Kids organization developed under Google summer of Code - 2015

***

## :+1: Passive on
##### Improves your complex reasoning abilities.

***
#### Purpose: 
This test measures how well your brain can reason about the relationships among different letters based on deductions from grammatical statements. The difficulty of each problem depends on the grammatical statement presented; those with simple active sentences (A follows B) are more easily understood than those with passive or negative statements (A does not precede B), which require complex reasoning to solve. 

#### Game: 
Two geometrical shapes will be given one enclosing the other. And an English statement will be stating the structure either in active or passive form. User select True or False.
![Passive on SnapShot](https://raw.githubusercontent.com/Vigneshsekar/Tux4ME/master/assets/images/Screenshots/passiveOn.png)

#### Implementation-Style:
Set A = {Outer Shapes} Set B = {Inner shapes} Set C = {Four possible random statements about the shapes}. Now it is the random function that selects shapes and corresponding statement  from  C.

***

## :+1: Mind math
##### Improves your memory and addition skills.

***
#### Purpose: 
Train your memory by remembering the displayed numbers in ascending order and adding them simultaneously. 

#### Game: 
Click on the displayed numbers in ascending order and add them simultaneously.
![Mind math SnapShot](https://raw.githubusercontent.com/Vigneshsekar/Tux4ME/master/assets/images/Screenshots/mindMath.png)

#### Implementation-Style:
Three random numbers are chosen and displayed. Other calculations are done during the run time.

***

## :+1: Catch the flow
##### Improves your task-switching ability

***
#### Purpose: 
Train your task-switching ability by shifting focus between where the leaves point and how they move. 

#### Game: 
Users can see leaves moving on the screen. If they moving leaves are green, make a note of the point and if the moving leaves are brown, make a note of the direction of movement.
![Catch the flow SnapShot](https://raw.githubusercontent.com/Vigneshsekar/Tux4ME/master/assets/images/Screenshots/catchTheFlow.png)

#### Implementation-Style:
A random functionw will decide the color of the leaves. And then another random function will decide its direction of motion and direction of point based on the color. These random variables are cross-checked to score the user.

***

## :+1: Math operations
##### Improves your cognitive speed and math skills.

***
#### Purpose: 
Train yourself to calculate faster.  

#### Game: 
Find a suitable operator to equate the expression.
![Mind math SnapShot](https://raw.githubusercontent.com/Vigneshsekar/Tux4ME/master/assets/images/Screenshots/mathOperations.png)

#### Implementation-Style:
The operator of the expression is hidden and the users are prompted to find them.


***

## :+1: Migrating Flocks
##### Be attentive and react faster.

***
#### Purpose: 
This game is based on the Odd One Out concept that was developed by Dr Hampshire as a modern variant on classical tests of fluid intelligence such as Raven's Progressive Matrices and the Cattell's Culture Fair Intelligence Test.

#### Game: 
A flock of birds will be displayed with one among them pointing to a different direction from the rest. The user should identify the odd bird out of the picture and swipe the screen in that particular direction to score.
![Migrating Flocks SnapShot](https://raw.githubusercontent.com/Vigneshsekar/Tux4ME/master/assets/images/Screenshots/migratingFlocks.png)

#### Implementation-Style:
From a set of birds only one is made to fly in an odd direction and its index is stored in a variable.In this game the cognitive speed of identifying the bird matters. Not the complexity.

***

## :+1: Flash Back
##### Improves you reaction speed and memory !

***
#### Purpose: 
In the Flashback game, you need to make the right judgments in a very short period of time. It trains your reaction speed. The faster you react, the stronger your ability of accepting new things and adapting to new environment is. Therefore, it is a prerequisite to enhance all your intelligence.

#### Game: 
A design pattern appears in the screen. Following which other design patterns appear. The user should select Yes if the current pattern matches the previous one.
![Flash Back SnapShot](https://c4.staticflickr.com/4/3838/19302934105_49b2a9c0ae_z.jpg)

#### Implementation-Style:
A design pattern appears from the set every time randomly. The user choice is evaluated in the real time.

***

## :+1: High-Click
##### Improves your math ability :)

***
#### Purpose: 
The ability to compare two items and choose the required one is an essential everyday task. But the speed of action in this task will lead to monetary benefits most of time. The neural plasticity that involves here is interesting to study and develop.

#### Game: 
Two numbers will be displayed on the screen either as an integer or by a simple math relation. The user is prompted to choose the greater one. The complexity of Math relation increases with increase in levels.
![High Click SnapShot](https://c1.staticflickr.com/1/492/19047814052_16172e1324_z.jpg)

#### Implementation-Style:
A number is chosen from a set of random numbers and the result of the math relation will be very close to the latter chosen one. It's all with random functions! No controls taken!

***

## :+1: Double-Trouble
##### Play with [Stroop effect](https://en.wikipedia.org/wiki/Stroop_effect) and test your mental ability.

***

#### Purpose:
The Double Trouble task is a take on a widely-discussed phenomenon in the cognitive psychology literature known as the Stroop effect (Stroop, 1935). This effect refers to the increased difficulty one has in naming the print color of a word, when the text of that word refers to an 'incongruent' color.

#### Game: 
Two words will appear on the screen. User should choose yes if the color of the word in the left matches the meaning of the word in the right or vice versa.
![Double-Trouble snapshot](https://c1.staticflickr.com/1/268/18958059076_4d378611db_z.jpg)

#### Implementation-Style:
Everything is chosen using random functions and indexed to yield the answer. Refer function colorName, textColor and boxText [line: 275 - 339 , Commit: Second Game ] for the core implementation part.


***

## :+1: High or Low
##### Improves your memory and reasoning by comparision abilities.

***
#### Purpose: 
Comparing the current value with the stored value happens multiple times in a real day scenario. This game will help to do that better.  

#### Game: 
Compare the current number with the number displayed before it.
![High or Low SnapShot](https://raw.githubusercontent.com/Vigneshsekar/Tux4ME/master/assets/images/Screenshots/highOrLow.png)

#### Implementation-Style:
a random number is chosen everytime to display and the comparision is done during the run time.


***

## :+1: DriftME
###### Drift your mental ability and react faster :)

***

#### Purpose: 
Our ability for flexible thinking and behavior is achieved by a part of the brain that has evolved to control our thoughts and behaviors. When such flexible thinking ability is challenged the brain heats and may develop the ability.

#### Game: 
Two boxes will be present. During the play either of the box will get a set consisting of an Integer number and an English alphabet in it and a question will be displayed either below or above the box. The user will be urged to select Yes or No as per the question.
![Drift ME Snapshot](https://c1.staticflickr.com/1/354/18773457698_00ce5c1c1b_z.jpg)

#### Implementation style:
In the set a random number and a random alphabet is chosen and displayed in a randomly chosen box with a predefined question. The user answer is verified in the run time. He /she is given 3 lifelines per level and infinite no of levels to play with.
