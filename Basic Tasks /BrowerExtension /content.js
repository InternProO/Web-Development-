// content.js
const style = document.createElement('style');
style.textContent = `
  #designer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  #designer .draggable {
    position: absolute;
    border: 1px solid #000;
    padding: 10px;
    background: #fff;
    cursor: move;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  #designer .draggable img {
    max-width: 100%;
    height: auto;
  }
`;

document.head.appendChild(style);

const designer = document.createElement('div');
designer.id = 'designer';
designer.innerHTML = `
  <div class="draggable" style="width: 100px; height: 100px;">Text Box</div>
  <div class="draggable" style="width: 200px; height: 150px;"><img src="https://via.placeholder.com/200x150" alt="Placeholder Image"/></div>
`;
document.body.appendChild(designer);

function makeDraggable(el) {
  let offsetX, offsetY, mouseX, mouseY;

  el.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    mouseX = e.clientX - offsetX;
    mouseY = e.clientY - offsetY;
    el.style.left = `${mouseX}px`;
    el.style.top = `${mouseY}px`;
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

document.querySelectorAll('#designer .draggable').forEach(makeDraggable);
