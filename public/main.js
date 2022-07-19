const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const canvasRect = canvas.getBoundingClientRect();

const state = {
	currentTool: undefined,
	strokeStyle: 'red',
	color: '#ff0000',
	lineCap: 'round',
	lineWidth: 3,
	fontWeight: 'normal',
	fontSize: '16px',
	fontFamily: 'Yekan',
};

const selectTool = e => {
	canvas.style.cursor = 'crosshair';

	if (e.target.parentElement.id === 'text') canvas.style.cursor = 'text';

	Array.from(e.target.parentElement.parentElement.children).forEach(tool =>
		tool.classList.remove('tool-selected')
	);

	e.target.parentElement.classList.add('tool-selected');

	!!state.currentTool && toolCleanup(state.currentTool);

	switch (e.target.parentElement.id) {
		case 'text':
			state.currentTool = textTool;
			break;
		case 'line':
			state.currentTool = lineTool;
			break;
		case 'circle':
			state.currentTool = circleTool;
			break;
		case 'spray':
			state.currentTool = sprayTool;
			break;
		case 'square':
			state.currentTool = squareTool;
			break;
	}
};

document.addEventListener('DOMContentLoaded', calculateSizes);
window.addEventListener('resize', calculateSizes);
