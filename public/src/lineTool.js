const lineTool = {
	init: e => {
		selectTool(e);
		canvas.addEventListener('touchstart', lineTool.createLine);
		canvas.addEventListener('mousedown', lineTool.createLine);
	},

	dispose: () => {
		canvas.removeEventListener('touchstart', lineTool.createLine);
		canvas.removeEventListener('mousedown', lineTool.createLine);
	},

	createLine: e => {
		const rect = e.target.getBoundingClientRect();
		const x = getXY(e).x - rect.left;
		const y = getXY(e).y - rect.top;

		context.beginPath();
		context.moveTo(x, y);

		if (e.type.slice(0, 5) === 'touch') {
			canvas.addEventListener('touchmove', lineTool.draw);
			canvas.addEventListener('touchend', lineTool.cleanup);
			canvas.addEventListener('touchcancel', lineTool.cleanup);
		} else {
			canvas.addEventListener('mousemove', lineTool.draw);
			canvas.addEventListener('mouseup', lineTool.cleanup);
			canvas.addEventListener('mouseout', lineTool.cleanup);
		}

		context.fillStyle = state.fillStyle;
		context.lineWidth = state.lineWidth;
		context.lineCap = state.lineCap;
		context.strokeStyle = state.color;

		lineTool.draw(e); // to draw a dot
	},

	draw: e => {
		const rect = e.target.getBoundingClientRect();
		const x = getXY(e).x - rect.left;
		const y = getXY(e).y - rect.top;
		context.lineTo(x, y);
		context.stroke();
	},

	cleanup: e => {
		if (e.type.slice(0, 5) === 'touch') {
			canvas.removeEventListener('touchmove', lineTool.draw);
			canvas.removeEventListener('touchend', lineTool.cleanup);
			canvas.removeEventListener('touchcancel', lineTool.cleanup);
		} else {
			canvas.removeEventListener('mousemove', lineTool.draw);
			canvas.removeEventListener('mouseup', lineTool.cleanup);
			canvas.removeEventListener('mouseout', lineTool.cleanup);
		}
		context.closePath();
	}
};
