const textTool = {
	startLocation: [0, 0],
	currentLocation: [0, 0],
	setFontSize: e => { state.fontSize = e.target.value + 'px' },
	writing: false,
	
	init: e => {
		selectTool(e);
		canvas.addEventListener('mousedown', textTool.create);
		canvas.addEventListener('touchstart', textTool.create);
	},
	
	dispose: () => {
		canvas.removeEventListener('mousedown', textTool.create);
		canvas.removeEventListener('touchstart', textTool.create);
	},
	
	create: e => {
		if (textTool.writing) return;
		
		textTool.startLocation = [getXY(e).x, getXY(e).y];
		
		const textbox = document.createElement('div');
		textbox.id = 'temporaryTextbox';
		textbox.className = 'temporary-shape';
		textbox.style.left = textTool.startLocation[0];
		textbox.style.top = textTool.startLocation[1];
		textbox.style.fontSize = state.fontSize;
		textbox.style.color = state.color;
		
		const paintingArea = document.getElementById('paintingArea');
		paintingArea.appendChild(textbox);
		
		if (e.type.slice(0, 5) === 'touch') {
			canvas.addEventListener('touchmove', textTool.draw);
			canvas.addEventListener('touchend', textTool.stabilize);
			textbox.addEventListener('touchmove', textTool.draw);
			textbox.addEventListener('touchend', textTool.stabilize);
		} else {
			canvas.addEventListener('mousemove', textTool.draw);
			canvas.addEventListener('mouseup', textTool.stabilize);
			textbox.addEventListener('mousemove', textTool.draw);
			textbox.addEventListener('mouseup', textTool.stabilize);
		}
	},
	
	draw: e => {
		textTool.currentLocation = [getXY(e).x, getXY(e).y];
		
		const textbox = document.getElementById('temporaryTextbox');
		
		if (textTool.currentLocation[0] < textTool.startLocation[0]) {
			textbox.style.width = (textTool.startLocation[0] - textTool.currentLocation[0]) + 'px';
			textbox.style.left = textTool.currentLocation[0] + 'px';
		} else textbox.style.width = (textTool.currentLocation[0] - textTool.startLocation[0]) + 'px';

		if (textTool.currentLocation[1] < textTool.startLocation[1]) {
			textbox.style.height = (textTool.startLocation[1] - textTool.currentLocation[1]) + 'px';
			textbox.style.top = textTool.currentLocation[1] + 'px';
		} else textbox.style.height = (textTool.currentLocation[1] - textTool.startLocation[1]) + 'px';
	},
	
	stabilize: e => {
		const textbox = document.getElementById('temporaryTextbox');
		
		if (textbox) {
			textTool.writing = true;
			textbox.contentEditable = 'true'
			textbox.focus();
			textbox.addEventListener('focusout', (() => {
				if (e.type.slice(0, 5) === 'touch') {
					canvas.removeEventListener('touchmove', textTool.draw);
					canvas.removeEventListener('touchend', textTool.stabilize);
					textbox.removeEventListener('touchmove', textTool.draw);
					textbox.removeEventListener('touchend', textTool.stabilize);
				} else {
					canvas.removeEventListener('mousemove', textTool.draw);
					canvas.removeEventListener('mouseup', textTool.stabilize);
					textbox.removeEventListener('mousemove', textTool.draw);
					textbox.removeEventListener('mouseup', textTool.stabilize);
				}
				
				return textTool.write;
			})());
		}
	},
	
	write: e => {
		const textbox = document.getElementById('temporaryTextbox');
		const text = textbox.innerText;
		
		context.moveTo(textTool.startLocation[0], textTool.startLocation[1]);
		context.beginPath();
		context.fillStyle = state.color;
		context.font = `${state.fontWeight} ${state.fontSize} ${state.fontFamily}`;
		context.fillText(text, textbox.getBoundingClientRect().left - canvas.getBoundingClientRect().left, textbox.getBoundingClientRect().top - canvas.getBoundingClientRect().top + 8);
		textbox.remove();
		textTool.cleanup(e);
	},
	
	cleanup: e => {		
		context.closePath();
		textTool.writing = false;
	}
};
