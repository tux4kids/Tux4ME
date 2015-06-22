# Tux4ME
#### An application with a set of simple games to boost your mental ability by Tux4Kids organization developed under Google summer of Code - 2015

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
