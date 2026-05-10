document.querySelectorAll('.text-body').forEach(box => {

  const randomDegree = Math.floor(Math.random() * 360);
  

  const randomSpeed = (Math.random() * 3 + 2).toFixed(2);

  box.style.setProperty('--direction', `${randomDegree}deg`);
  box.style.setProperty('--duration', `${randomSpeed}s`);
});