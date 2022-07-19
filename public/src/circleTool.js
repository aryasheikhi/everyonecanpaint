const circleTool = {
	startLocation: [0, 0],
	currentLocation: [0, 0],
	
	init: e => {
		selectTool(e);
		canvas.addEventListener('mousedown', circleTool.create);
		canvas.addEventListener('touchstart', circleTool.create);
	},
	
	dispose: () => {
		canvas.removeEventListener('mousedown', circleTool.create);
		canvas.removeEventListener('touchstart', circleTool.create);
	},
	
	create: e => {		
		circleTool.startLocation = [getXY(e).x, getXY(e).y];
		
		const circle = document.createElement('div');
		circle.id = 'temporaryCircle';
		circle.className = 'temporary-shape';
		circle.style.left = circleTool.startLocation[0];
		circle.style.top = circleTool.startLocation[1];
		circle.style.border = '1px solid red';
		
		const paintingArea = document.getElementById('paintingArea');
		paintingArea.appendChild(circle);
		
		if (e.type.slice(0, 5) === 'touch') {
			canvas.addEventListener('touchmove', circleTool.draw);
			canvas.addEventListener('touchend', circleTool.stabilize);
			circle.addEventListener('touchmove', circleTool.draw);
			circle.addEventListener('touchend', circleTool.stabilize);
		} else {
			canvas.addEventListener('mousemove', circleTool.draw);
			canvas.addEventListener('mouseup', circleTool.stabilize);
			circle.addEventListener('mousemove', circleTool.draw);
			circle.addEventListener('mouseup', circleTool.stabilize);
		}
	},
	
	draw: e => {
		circleTool.currentLocation = [getXY(e).x, getXY(e).y];
		
		const circle = document.getElementById('temporaryCircle');
		circle.style.borderRadius = '50%';
		
		if (circleTool.currentLocation[0] < circleTool.startLocation[0]) {
			circle.style.width = circleTool.startLocation[0] - circleTool.currentLocation[0];
			circle.style.left = circleTool.currentLocation[0];
		} else circle.style.width = circleTool.currentLocation[0] - circleTool.startLocation[0];

		if (circleTool.currentLocation[1] < circleTool.startLocation[1]) {
			circle.style.height = circleTool.startLocation[1] - circleTool.currentLocation[1];
			circle.style.top = circleTool.currentLocation[1];
		} else circle.style.height = circleTool.currentLocation[1] - circleTool.startLocation[1];
	},
	
	stabilize: e => {
		const circle = document.getElementById('temporaryCircle');
		const circleRect = circle.getBoundingClientRect();
			
		if (e.type.slice(0, 5) === 'touch') {
			canvas.removeEventListener('touchmove', circleTool.draw);
			canvas.removeEventListener('touchend', circleTool.stabilize);
			circle.removeEventListener('touchmove', circleTool.draw);
			circle.removeEventListener('touchend', circleTool.stabilize);
		} else {
			canvas.removeEventListener('mousemove', circleTool.draw);
			canvas.removeEventListener('mouseup', circleTool.stabilize);
			circle.removeEventListener('mousemove', circleTool.draw);
			circle.removeEventListener('mouseup', circleTool.stabilize);
		}
		context.strokeStyle = state.color;
		context.beginPath();
		context.ellipse(circleRect.left + circleRect.width / 2 - canvas.getBoundingClientRect().left, circleRect.top + circleRect.height / 2 - canvas.getBoundingClientRect().top, circleRect.width / 2, circleRect.height / 2, 0, 0, 2 * Math.PI);
		context.stroke();
		circle.remove();
		circleTool.cleanup(e);
	},
	
	cleanup: e => context.closePath()
};
