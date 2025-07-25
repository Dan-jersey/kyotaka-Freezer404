(() => {
  const overlay = document.getElementById('overlay');
  const countdown = document.getElementById('countdown');
  const exitBtn = document.getElementById('exit');
  let unlock = false;
  let timeLeft = 60 * 60;
  let escapeCount = 0;

  function updateCountdown(){
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    countdown.textContent = `\nRestart in ${m.toString().padStart(2,'0')}m:${s.toString().padStart(2,'0')}s`;
    if(timeLeft > 0) {
      timeLeft--;
      setTimeout(updateCountdown, 1000);
    } else {
      unlockScreen();
    }
  }

  function blockEvent(e){
    if(!unlock) e.preventDefault();
  }

  function unlockScreen(){
    unlock = true;
    overlay.style.display = 'none';
    countdown.textContent = "\nSystem restarted. You can leave.";
    document.removeEventListener('keydown', blockEvent, true);
    document.removeEventListener('wheel', blockEvent, true);
    document.removeEventListener('touchmove', blockEvent, true);
  }

  let keySequence = [];
  const konami = [38,38,40,40,37,39,37,39,66,65];

  document.addEventListener('keydown', e => {
    if(unlock) return;
    keySequence.push(e.keyCode);
    if(keySequence.length > konami.length) keySequence.shift();
    if(konami.every((v,i) => v === keySequence[i])) unlockScreen();
    if (e.key === "Escape") {
      escapeCount++;
      if (escapeCount >= 3) window.location.href = "https://google.com";
    }
    blockEvent(e);
  }, true);

  document.addEventListener('wheel', blockEvent, {passive:false});
  document.addEventListener('touchmove', blockEvent, {passive:false});

  if(exitBtn){
    exitBtn.onclick = () => {
      if(unlock) window.location.href = "https://google.com";
    };
  }

  let now = 0;
  function lagLoop() {
    for (let i = 0; i < 1e7; i++) {
      now += Math.sqrt(i);
    }
    requestAnimationFrame(lagLoop);
  }

  lagLoop();
  updateCountdown();
})();