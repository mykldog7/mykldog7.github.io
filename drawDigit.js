/**
 * Written by Michael Riley. 
 * Code for digit drawing component. 
 *	
 * 2015.
 */
"use strict"; //bug splatterer

// graphics_globals.
var g_paint;
var g_context = {};
var g_clickX = new Array();		//arrays store data that the canvas must render. 
var g_clickY = new Array();
var g_clickDrag = new Array();

//init canvas.. attach methods
function setupCanvasToDraw(canvasElem){
	g_context = canvasElem.getContext("2d");
	canvasElem.onmousedown = function(e){
		var mouseX = e.pageX - cumulativeOffset(canvasElem).left;
		var mouseY = e.pageY - cumulativeOffset(canvasElem).top;
		g_paint = true;
		addClick(e.pageX - cumulativeOffset(canvasElem).left, e.pageY - cumulativeOffset(canvasElem).top);
		redrawCanvas();
	};
	canvasElem.onmousemove = function(e){
		if(g_paint){
			addClick(e.pageX - cumulativeOffset(canvasElem).left, e.pageY - cumulativeOffset(canvasElem).top, true);
			redrawCanvas();
		}
	};
	canvasElem.onmouseup = function(e){
		g_paint = false;
	};
	canvasElem.onmouseleave = function(e){
	  g_paint = false;
	};
}
//when user clicks/drags save coordinates into those global arrays.
function addClick(x, y, dragging)
{
  g_clickX.push(x);
  g_clickY.push(y);
  g_clickDrag.push(dragging);
}

/*Re render the canvas from the content of those arrays.. clear it to black first. */
function redrawCanvas(){
	 console.log("Redrawing..");
	g_context.fillStyle="#000000";
	g_context.fillRect(0, 0, g_context.canvas.width, g_context.canvas.height); // Clears the canvas

	g_context.strokeStyle = "#ffffff";
	g_context.lineJoin = "round";
	g_context.lineWidth = 15;
			
	for(var i=0; i < g_clickX.length; i++) {		
		g_context.beginPath();
		if(g_clickDrag[i] && i){
			g_context.moveTo(g_clickX[i-1], g_clickY[i-1]);
		}else{
			g_context.moveTo(g_clickX[i]-1, g_clickY[i]);
		}
		g_context.lineTo(g_clickX[i], g_clickY[i]);
		g_context.closePath();
		g_context.stroke();
	}
}

function applyNetworkToCanvas(){
	//grab image data .. its 280*280*4. 
	var imgData = g_context.getImageData(0, 0, g_context.canvas.width, g_context.canvas.height);
	var vertSlices = $("#img-dim-height").val();		//default: 28	(rows)			//y
	var horzSlices = $("#img-dim-width").val();			//default: 28	(columns)		//x
	var innerSqrHeight = 10;
	var innerSqrWidth = 10;
	for(var i=0; i < vertSlices; i++){
		for(var j=0; j < horzSlices; j++){
			for(var x=0;x<innerSqrWidth;x++){
				for(var y=0;y<innerSqrHeight;y++){
					var rowLength = innerSqrWidth*vertSlices;
					var currentPixelOffset = i * rowLength + 2											//y*rowlength + x
					red=imgData.data[i+0];
					green=imgData.data[i+1];
					blue=imgData.data[i+2];
					alpha=imgData.data[i+3];
				
				}
			}
		}
	}
}







