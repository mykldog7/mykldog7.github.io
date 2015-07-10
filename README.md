# jsNeuralNet
Uses a Neural Net to identify handwritten digits.

#Implements a NeuralNet in order to do classification work. 

#Perform some basic stretching and processing of the input images. 

#Features 
-perform training on client side. 
-save the neuralnet (off load JSON object).
- must force the user to proceed sequentially by unlocking and locking elements that can no longer be interacted with. 
-    ie. the image dimensions can't be messed with after the images are loaded. they get greyed out unless the reset button is clicked.
- if a network is applied to an image that has the wrong size.. throw nice message.  
 
-upload an image containing handwritten digits to identify. 
-select an image from the dataset

//What kind of features are we going to use...?
/*
It should be subject to change. 
How about this.. 
Randomly select 5 pixels which are all reasonably close. (within 3-4 pixels)
For each of these 5 pixels. randomly select whether or not is it should be black(255) or white(0). 
Add up the error of all these inputs. 
This is the difference between their value and their target(255 or 0)
put the difference sum through a linear transform to map the value to between 0 and 1. 
zero error should make the feature really fire off.
maximum error should make the feature silent.

This type of features will be able to be vertical or horizontal or diagonal edge detectors. 
It should also be possible for them to match line ends. 
It could also specify that an area should be largely black or largely white..
I think it has lots of options of working well and identifying interesting features. 

for all the intermediate layers... 
sum incoming weights. (with bias)
put sum through transfer function (sigmoid) this gives a value between 0 and 1. 
Which forms the output of the node.

For the final output layer... 
The classification of the digit corresponds to the output node with the highest output. 

*/

//Random-ness distribution tested with:
var featureMaxRadius = 5;
var a = 0;
var pC = 0;
var nC = 0;
for(var i=0;i<100000;i++){
 a = Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius
 if( a > 0 ) {pC++}
 else {nC++}
}
console.log("p:"+ pC + " n: " + nC + " (p)/(n): " + pC/nC);