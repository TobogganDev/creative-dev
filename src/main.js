// Get canvas elements
const canvas1 = document.getElementById('canvas-scene');
const canvas2 = document.getElementById('canvas-scene-2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

// Set canvas dimensions
canvas1.width = canvas2.width = window.innerWidth * 0.4;
canvas1.height = canvas2.height = window.innerWidth * 0.6;

// Function to draw a clock
function drawClock(ctx, x, y, radius, drawHour, drawMinute) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = radius * 0.05; // thinner clock
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${radius * 0.1}px Arial`; // smaller font for numbers

  for (let i = 1; i <= 12; i++) {
      const angle = i * Math.PI / 6;
      const xText = x + Math.sin(angle) * (radius * 0.8);
      const yText = y - Math.cos(angle) * (radius * 0.8);
      ctx.fillText(i.toString(), xText, yText);
  }

  // Draw clock hands
  if (drawHour) {
      const hour = 2 * Math.PI * drawHour / 12 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(hour) * (radius * 0.4), y + Math.sin(hour) * (radius * 0.4));
      ctx.strokeStyle = 'white';
      ctx.lineWidth = radius * 0.03; // thinner hour hand
      ctx.lineCap = 'round';
      ctx.stroke();
  }

  if (drawMinute) {
      const minute = 2 * Math.PI * drawMinute / 60 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(minute) * (radius * 0.7), y + Math.sin(minute) * (radius * 0.7));
      ctx.strokeStyle = 'white';
      ctx.lineWidth = radius * 0.02; // thinner minute hand
      ctx.lineCap = 'round';
      ctx.stroke();
  }
}

// Function to get current time
function getCurrentTime() {
  const now = new Date();
  return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
  };
}

// Function to update clocks
function updateClocks() {
  const currentTime = getCurrentTime();
  const hourFraction = currentTime.hours + currentTime.minutes / 60;
  const minuteFraction = currentTime.minutes + currentTime.seconds / 60;

  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  drawClock(ctx1, canvas1.width / 2, canvas1.height / 2, Math.min(canvas1.width, canvas1.height) * 0.4, hourFraction, null);

  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  drawClock(ctx2, canvas2.width / 2, canvas2.height / 2, Math.min(canvas2.width, canvas2.height) * 0.4, null, minuteFraction);

  const formattedHour = currentTime.hours.toString().padStart(2, '0');
  const formattedMinute = currentTime.minutes.toString().padStart(2, '0');
  const formattedTime = `${formattedHour}:${formattedMinute}`;
  document.querySelector('h1').innerText = `Time: ${formattedTime}`;

  requestAnimationFrame(updateClocks);
}



// Initial call to update clocks
updateClocks();
