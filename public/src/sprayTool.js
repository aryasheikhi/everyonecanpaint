const sprayTool = {
	interval: 0,
	mouseDown: false,
	location: [0, 0],

	init: e => {
		selectTool(e)
		canvas.addEventListener('mousedown', sprayTool.start);
		canvas.addEventListener('mouseup', sprayTool.end);
	},

	dispose: e => {
		canvas.removeEventListener('mousedown', sprayTool.start);
		canvas.removeEventListener('mouseup', sprayTool.end);
	},

	start: e => {
		sprayTool.mouseDown = true;
		sprayTool.location = [e.clientX, e.clientY];
		sprayTool.interval = setInterval(sprayTool.draw, 10);
		canvas.addEventListener('mousemove', sprayTool.newLocation);
		sprayTool.draw(e);
	},

	newLocation: e => {
		sprayTool.location = [e.clientX, e.clientY];
	},

	draw: e => {
		if (sprayTool.mouseDown) {
			const canvasRect = canvas.getBoundingClientRect();
			const x = Math.random() * 15;
			const y = Math.random() * 15;
			context.beginPath();
			context.fillStyle = state.color;
			context.fillRect(sprayTool.location[0] + x - canvasRect.left - 10, sprayTool.location[1] + y - canvasRect.top - 10, 1.5, 1.5);
			context.closePath();
			sprayTool.cleanup(e);
		}
	},

	end: e => clearInterval(sprayTool.interval)
};
