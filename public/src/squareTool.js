const squareTool = {
	startLocation: [0, 0],
	currentLocation: [0, 0],
	
	init: e => {
		selectTool(e);
		canvas.addEventListener('mousedown', squareTool.create);
		canvas.addEventListener('touchstart', squareTool.create);
	},
	
	dispose: () => {
		canvas.removeEventListener('mousedown', squareTool.create);
		canvas.removeEventListener('touchstart', squareTool.create);
	},
	
	create: e => {		
		squareTool.startLocation = [getXY(e).x, getXY(e).y];
		
		const square = document.createElement('div');
		square.id = 'temporarySquare';
		square.classList.add('temporary-shape');
		square.style.left = squareTool.startLocation[0];
		square.style.top = squareTool.startLocation[1];
		square.style.border = `1px solid ${state.color}`;
		
		const paintingArea = document.getElementById('paintingArea');
		paintingArea.appendChild(square);
		
		if (e.type.slice(0, 5) === 'touch') {
			canvas.addEventListener('touchmove', squareTool.draw);
			canvas.addEventListener('touchend', squareTool.stabilize);
			square.addEventListener('touchmove', squareTool.draw);
			square.addEventListener('touchend', squareTool.stabilize);
		} else {
			canvas.addEventListener('mousemove', squareTool.draw);
			canvas.addEventListener('mouseup', squareTool.stabilize);
			square.addEventListener('mousemove', squareTool.draw);
			square.addEventListener('mouseup', squareTool.stabilize);
		}
	},
	
	draw: e => {
		squareTool.currentLocation = [getXY(e).x, getXY(e).y];
		
		const square = document.getElementById('temporarySquare');
		
		if (squareTool.currentLocation[0] < squareTool.startLocation[0]) {
			square.style.width = squareTool.startLocation[0] - squareTool.currentLocation[0];
			square.style.left = squareTool.currentLocation[0];
		} else square.style.width = squareTool.currentLocation[0] - squareTool.startLocation[0];

		if (squareTool.currentLocation[1] < squareTool.startLocation[1]) {
			square.style.height = squareTool.startLocation[1] - squareTool.currentLocation[1];
			square.style.top = squareTool.currentLocation[1];
		} else square.style.height = squareTool.currentLocation[1] - squareTool.startLocation[1];
	},
	
	stabilize: e => {
		const square = document.getElementById('temporarySquare');
		const squareRect = square.getBoundingClientRect();
			
		if (e.type.slice(0, 5) === 'touch') {
			canvas.removeEventListener('touchmove', squareTool.draw);
			canvas.removeEventListener('touchend', squareTool.stabilize);
			square.removeEventListener('touchmove', squareTool.draw);
			square.removeEventListener('touchend', squareTool.stabilize);
		} else {
			canvas.removeEventListener('mousemove', squareTool.draw);
			canvas.removeEventListener('mouseup', squareTool.stabilize);
			square.removeEventListener('mousemove', squareTool.draw);
			square.removeEventListener('mouseup', squareTool.stabilize);
		}
		
		if (square.getBoundingClientRect().height < 4 && square.getBoundingClientRect().width < 4) {
			square.remove();
			squareTool.cleanup(e);
			return;
		}
		
		context.strokeStyle = state.color;
		context.beginPath();
		context.rect(squareRect.left - canvas.getBoundingClientRect().left, squareRect.top - canvas.getBoundingClientRect().top, squareRect.width, squareRect.height);
		context.stroke();
		square.remove();
		squareTool.cleanup(e);
	},
		
	cleanup: e => context.closePath()
};
