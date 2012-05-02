var Metodus = {};


Metodus.courses = {};
Metodus.courses.nacion = {};
Metodus.courses.nacion.html5 = {};




Metodus.courses.nacion.html5.DrawSomething = (function(){


	var _current_color = "#000",
		_current_pencil_size = 20,
		_current_word_element = $("#drawingCurrentWord"),
		_current_history = [],
	
	
	
	
	_init = function()
	{
		_prepareColors();
		_prepareCanvas();
		_preparePencils();
		_prepareEraser();
		_prepareTrash();
		_prepareSave();
		_loadHistory();
	},
	
	
	
	
	_prepareColors = function()
	{	
		$("#drawingColors > LI").each(function(){
			var color = $(this).data("color");
			
			$(this).css("background-color", color).click(function(event){
				event.preventDefault();
				_current_color = color;
				_current_word_element.css("color", _current_color);
				console.log( color );
			});
		});
	},
	
	
	
	
	_prepareCanvas = function()
	{
		var canvas = $("#drawingCanvas"),
			context = canvas[0].getContext("2d"),
			is_drawing = false;
		
		
		canvas.mousemove(function(event){
			if ( !is_drawing )
				return;
		
			var x = event.pageX - canvas.offset().left,
				y = event.pageY - canvas.offset().top;
				
			context.fillStyle = _current_color;
			context.strokeStyle = _current_color; // red
			context.lineWidth = _current_pencil_size;
			context.lineTo(x, y);
			context.stroke();
		});
		
		
		canvas.mousedown(function(event){
			is_drawing = true;
			
			var x = event.pageX - canvas.offset().left,
				y = event.pageY - canvas.offset().top;
			
			context.beginPath();
			context.moveTo(x, y);
		});
		
		
		canvas.mouseup(function(event){
			is_drawing = false;
		});
	},
	
	
	
	
	_preparePencils = function()
	{
		$("[id^='pencil']").click(function(event){
			event.preventDefault();
			_current_pencil_size = $(this).data("size");
		});
	},




	_prepareEraser = function()
	{
		$("#eraser").click(function(event){
			event.preventDefault();
			_current_color = "#fff";
		});
	},
	
	
	
	
	_prepareTrash = function()
	{
		$("#trash").click(function(event){
			var canvas = $("#drawingCanvas");
			
			if ( confirm($("#trash").data("message")) )
				canvas[0].width = canvas[0].width;
		});
	},
	
	
	
	
	_prepareSave = function()
	{
		$("#done").click(function(event){
			var img = $("<img></img>"),
				src = $("#drawingCanvas")[0].toDataURL("image/png");
			
			img.attr("id", Date.now());
			img.attr("src", src);
			
			_current_history.push(src);
			
			$("#drawingHistory").append(img);
			$("#drawingCanvas")[0].width = $("#drawingCanvas")[0].width;
			
			localStorage.setItem("draw_history", $.stringify(_current_history));
		});
	},
	
	
	
	
	_loadHistory = function()
	{
		var data = localStorage.getItem("draw_history"),
			history = $("#drawingHistory");
		
		if ( data != null )
		{
			_current_history = data = $.parseJSON(data);
			
			for(var index in data)
			{
				var img = $("<img></img>").attr("id", Date.now()).attr("src", data[index]);
				history.append(img);
			}
		}
	};




	_init();




	return {
	};


})();



$(document).ready(function(){
});