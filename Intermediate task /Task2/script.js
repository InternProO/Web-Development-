const socket = io();

const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const preview = document.getElementById('preview');

htmlEditor.addEventListener('input', () => {
    socket.emit('htmlChange', htmlEditor.value);
});

cssEditor.addEventListener('input', () => {
    socket.emit('cssChange', cssEditor.value);
});

socket.on('htmlChange', (html) => {
    htmlEditor.value = html;
    updatePreview();
});

socket.on('cssChange', (css) => {
    cssEditor.value = css;
    updatePreview();
});

function updatePreview() {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    preview.srcdoc = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>${html}</body>
        </html>
    `;
}
