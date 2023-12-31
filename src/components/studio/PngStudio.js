import React, { Fragment, useState } from 'react';

const PngStudio = () => {
  const [pngUrl, setPngUrl] = useState('');
  const [newPngUrl, setNewPngUrl] = useState('');
  const [warpAmount, setWarpAmount] = useState(1.25);
  const [swirlAmount, setSwirlAmount] = useState(0.02);
  const [repeatFactor, setRepeatFactor] = useState(0.02);
  const [repeatIters, setRepeatIters] = useState(0);
  const [shiftAmountX, setShiftAmountX] = useState(20);
  const [shiftAmountY, setShiftAmountY] = useState(10);
  const handlePngUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      e.preventDefault();
      const png = new Image();
      png.src = e.target.result;
      setPngUrl(e.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  const handleCreateNewPng = () => {
    if (pngUrl) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = pngUrl;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        imageData = fuzzyAlgorithm(imageData, warpAmount, canvas.width, canvas.height);
        imageData = swirlAlgorithm(imageData, swirlAmount, canvas.width, canvas.height);
        imageData = repeatAlgorithm(imageData, repeatFactor, repeatIters, canvas.width, canvas.height);
        imageData = shiftAlgorithm(imageData, shiftAmountX, shiftAmountY, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
        setNewPngUrl(canvas.toDataURL('image/png'));
      }
    }
  }
  return (
    <Fragment>
      <div className='canvas-container'>
        <h3 className='text-center mt-5 page-header-main'>.png Studio</h3>
        &nbsp;
        <input type='file' accept='.png' onChange={e => handlePngUpload(e)}/>
        &nbsp;
        {pngUrl && <img className='png-preview' src={pngUrl} alt='your .png here' />}
        &nbsp;
        {pngUrl &&
        <Fragment>
          <h3 className='image-effects-header'>Image Processing Algorithms</h3>
          <p className='image-effects-explain'>[Set amount slider to 0 to de-activate that algorithm]</p>
          <div className='algorithm-input-container'>
            <h4 className='algorithm-input-header'>Fuzz</h4>
            <input
              type="range"
              value={warpAmount}
              onChange={e => setWarpAmount(e.target.value)}
              min="0" max="2.5" step="0.025"
            />
            <p className='algorithm-input-view'>Warp Amount: {warpAmount}</p>
          </div>
          &nbsp;
          <div className='algorithm-input-container'>
            <h4 className='algorithm-input-header'>Swirls</h4>
            <input
              type="range"
              value={swirlAmount}
              onChange={e => setSwirlAmount(e.target.value)}
              min="0" max="2" step="0.0125"
            />
            <p className='algorithm-input-view'>Swirl Amount: {swirlAmount}</p>
          </div>
          <div className='algorithm-input-container'>
            <h4 className='algorithm-input-header'>Repeats</h4>
            <input
              type='range'
              value={repeatFactor}
              onChange={e => setRepeatFactor(e.target.value)}
              min='0' max='7.5' step='.01' 
            />
            <p className='algorithm-input-view'>Repeat Factor: {repeatFactor}</p>
            <input
              type='range'
              value={repeatIters}
              onChange={e => setRepeatIters(e.target.value)}
              min='0' max='10' step='1'
            />
            <p className='algorithm-input-view'>Repeat Iterations: {repeatIters}</p>
          </div>
          <div className='algorithm-input-container'>
            <h4 className='algorithm-input-header'>Shift</h4>
            <input
              type='range'
              value={shiftAmountX}
              onChange={e => setShiftAmountX(e.target.value)}
              min='0' max='50' step='1'
            />
            <p className='algorithm-input-view'>X Shift Amount: {shiftAmountX}</p>
            <input
              type='range'
              value={shiftAmountY}
              onChange={e => setShiftAmountY(e.target.value)}
              min='0' max='50' step='1'
            />
            <p className='algorithm-input-view'>Y Shift Amount: {shiftAmountY}</p>
          </div>
        </Fragment>
        }
        &nbsp;
        <button className='generate-btn' onClick={handleCreateNewPng}>Generate New .png</button>
        &nbsp;
        {newPngUrl && <img className='new-png-preview' src={newPngUrl} alt='new .png here' />}
      </div>
    </Fragment>
  );
}

function fuzzyAlgorithm(imageData, warpAmount, width, height) {
  const data = imageData.data.slice();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const originalIndex = (y * width + x) * 4;
      const warpX = Math.sin(y / warpAmount) * warpAmount;
      const warpY = Math.cos(x / warpAmount) * warpAmount;
      const warpedX = Math.floor(x + warpX);
      const warpedY = Math.floor(y + warpY);
      if (warpedX >= 0 && warpedX < width && warpedY >= 0 && warpedY < height) {
        const warpedIndex = (warpedY * width + warpedX) * 4;
        data[originalIndex] = imageData.data[warpedIndex];         // r
        data[originalIndex + 1] = imageData.data[warpedIndex + 1]; // g
        data[originalIndex + 2] = imageData.data[warpedIndex + 2]; // b
      }
    }
  }
  for (let i = 0; i < data.length; i++) {
    imageData.data[i] = data[i];
  }
  return imageData;
}

function swirlAlgorithm(imageData, swirlAmount, width, height) {
  const data = imageData.data.slice();
  const centerX = width / 2;
  const centerY = height / 2;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offsetX = x - centerX;
      const offsetY = y - centerY;
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      const angle = Math.atan2(offsetY, offsetX);
      const newAngle = angle + distance * swirlAmount;
      const newX = centerX + Math.cos(newAngle) * distance;
      const newY = centerY + Math.sin(newAngle) * distance;
      const originalIndex = (y * width + x) * 4;
      const newIndex = (Math.floor(newY) * width + Math.floor(newX)) * 4;
      if (newIndex >= 0 && newIndex < data.length) {
        data[originalIndex] = imageData.data[newIndex];         // r
        data[originalIndex + 1] = imageData.data[newIndex + 1]; // g
        data[originalIndex + 2] = imageData.data[newIndex + 2]; // b
      }
    }
  }
  for (let i = 0; i < data.length; i++) {
    imageData.data[i] = data[i];
  }
  return imageData;
}

function repeatAlgorithm(imageData, repeatFactor, iterations, width, height) {
  const data = imageData.data.slice();
  for (let iter = 0; iter < iterations; iter++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const offsetX = (x - width / 2) * repeatFactor;
        const offsetY = (y - height / 2) * repeatFactor;
        const sourceX = Math.floor(x + offsetX);
        const sourceY = Math.floor(y + offsetY);
        if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
          const sourceIndex = (sourceY * width + sourceX) * 4;
          const targetIndex = (y * width + x) * 4;
          data[targetIndex] = imageData.data[sourceIndex];         // r
          data[targetIndex + 1] = imageData.data[sourceIndex + 1]; // g
          data[targetIndex + 2] = imageData.data[sourceIndex + 2]; // b
        }
      }
    }
    for (let i = 0; i < data.length; i++) { // copy data each iteration
      imageData.data[i] = data[i];
    }
  }
  return imageData;
}

function shiftAlgorithm(imageData, shiftAmountX, shiftAmountY, width, height) {
  const data = imageData.data.slice();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sourceX = x + Math.round(Math.sin(y / shiftAmountY) * shiftAmountX);
      const sourceY = y + Math.round(Math.sin(x / shiftAmountX) * shiftAmountY);
      if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
        const sourceIndex = (sourceY * width + sourceX) * 4;
        const targetIndex = (y * width + x) * 4;
        data[targetIndex] = imageData.data[sourceIndex];         // r
        data[targetIndex + 1] = imageData.data[sourceIndex + 1]; // g
        data[targetIndex + 2] = imageData.data[sourceIndex + 2]; // b
      }
    }
  }
  for (let i = 0; i < data.length; i++) {
    imageData.data[i] = data[i];
  }
  return imageData;
}

export default PngStudio;