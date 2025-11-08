const playfield = document.querySelector('.playfield');
const player = document.getElementById('player');

const state = {
  x: playfield.clientWidth / 2 - player.clientWidth / 2,
  speed: 220, // pixels per second
  keys: new Set(),
  lastTime: performance.now(),
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function update(time) {
  const delta = (time - state.lastTime) / 1000;
  state.lastTime = time;

  const maxX = playfield.clientWidth - player.clientWidth;
  let direction = 0;
  if (state.keys.has('ArrowLeft')) direction -= 1;
  if (state.keys.has('ArrowRight')) direction += 1;

  state.x += direction * state.speed * delta;
  state.x = clamp(state.x, 0, maxX);
  player.style.transform = `translateX(${state.x}px)`;

  requestAnimationFrame(update);
}

function handleKey(event, isDown) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    if (isDown) {
      state.keys.add(event.key);
    } else {
      state.keys.delete(event.key);
    }
  }
}

document.addEventListener('keydown', (event) => handleKey(event, true));
document.addEventListener('keyup', (event) => handleKey(event, false));

// Initialize position on resize to keep player grounded
function handleResize() {
  state.x = clamp(state.x, 0, playfield.clientWidth - player.clientWidth);
  player.style.transform = `translateX(${state.x}px)`;
}

window.addEventListener('resize', handleResize);

player.style.transform = `translateX(${state.x}px)`;
requestAnimationFrame(update);
