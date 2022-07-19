const mimick = () => document.getElementById('uploadPicture').click();

const uploadPicture = e => {
	const picture = e.target.files[0];
	const fr = new FileReader();
	fr.onloadend = () => {
		const img = new Image();
		img.src = fr.result;
		img.onload = () => {
			const canvas = document.getElementById('canvas');
			const context = canvas.getContext('2d');
			const dpX = (canvas.width / 2) - ((img.width / (img.height / canvas.height)) / 2) - 2;
			const dpY = (canvas.height / 2) - ((img.height / (img.width / canvas.width) - 2) / 2) - 2;
			
			if (img.width >= img.height) {
				context.drawImage(img, 1, dpY, canvas.width - 2, img.height / (img.width / canvas.width) - 2);
			} else context.drawImage(img, dpX, 1, img.width / (img.height / canvas.height) - 2, canvas.height - 2);
		};
	};
	if (picture) fr.readAsDataURL(picture);
};

const save = e => {
	e.preventDefault();
	const saveForm = document.getElementById('saveForm');
	const fileType = saveForm.elements.fileType.value;
	canvas.toBlob(blob => {
		const blobURL = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = blobURL;
		a.download = 'your-canvas';
		a.click();
	}, fileType, 1);
};
