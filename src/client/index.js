const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

let rendering = false;
let lastFrame = 0;
let fps = 0;

ctx.fillStyle = '#000';
ctx.font = '12pt sans-serif';

ctx.textAlign = 'left';
ctx.textBaseline = 'top';

require('electron').ipcRenderer.on('frame', (event, frame) => {
    if (rendering) {
        console.warn('Received a frame while still rendering an old one; aborting!');
        return;
    }

    rendering = true;

    ctx.clearRect(0, 0, 160, 144);

    const imageData = ctx.getImageData(0, 0, 160, 144);
    const data = imageData.data;

    for (let i = 0; i < 160 * 144; i++) {
        data[i * 4] = frame[i];
        data[i * 4 + 1] = frame[i];
        data[i * 4 + 2] = frame[i];
        data[i * 4 + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);

    const thisFrame = new Date().getTime();

    const diff = thisFrame - lastFrame;

    fps = 1000 / diff;

    document.title = `Gameboi (FPS: ${Math.round(fps)})`;

    lastFrame = thisFrame;

    rendering = false;
});
