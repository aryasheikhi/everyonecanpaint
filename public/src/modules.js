const calculateSizes = () => {
	const paintingArea = document.getElementById('paintingArea');
	const paintingAreaRect = paintingArea.getBoundingClientRect();
	canvas.width = paintingAreaRect.width - parseFloat(getComputedStyle(paintingArea).paddingRight);
	canvas.height = paintingAreaRect.height;
};

const getXY = e => e.type.slice(0, 5) === 'touch' ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };

const clearCanvas = () => {
	const fileInput = document.getElementById('uploadPicture');
	fileInput.value = '';
	canvas.style.background = 'none';
	context.clearRect(0, 0, canvas.width, canvas.height);
};

const stopPropagation = e => e.stopPropagation();

const toolCleanup = tool => tool.dispose();

const stopEvent = e => e.preventDefault();

const changeColor = e => state.color = e.target.value;
