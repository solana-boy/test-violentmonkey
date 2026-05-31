// ==UserScript==
// @name         mira
// @version      0.14
// @author       Solana-boy
// @match        https://app.mira.top/*
// @downloadURL  https://github.com/solana-boy/test-violentmonkey/raw/main/mira.user.js
// @updateURL    https://github.com/solana-boy/test-violentmonkey/raw/main/mira.user.js
// @homepage     https://github.com/solana-boy/test-violentmonkey
// @grant        none

// ==/UserScript==


function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Триггеры событий
function triggerEvents(element) {
  const events = [
      new PointerEvent('pointerdown', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0.5, pointerType: "touch" }),
      new MouseEvent('mousedown', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
      new PointerEvent('pointerup', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new MouseEvent('mouseup', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
      new PointerEvent('click', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new PointerEvent('pointerout', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new PointerEvent('pointerleave', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new MouseEvent('mouseout', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
      new MouseEvent('mouseleave', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 })
  ];

  events.forEach((event, index) => {
      setTimeout(() => element.dispatchEvent(event), index * 100);
  });
}

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWallet(){
  var up2 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "Wallet On" || el.textContent == "Wallet in")
  if (up2.length != 0){
    triggerEvents(up2[0]);
    await sleep(getRandomDelay(3000, 4100));
    up2 = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Open Wallet in Telegram") || el.textContent.includes("Connect Wallet in Telegram on desktop"))
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(10000, 21000));
    }
  }
  await sleep(getRandomDelay(2000, 3100));
}

// M6.447 11.431c-.498 0-.872-.382-.872-.888a.92.92 0 0 1 .282-.656l5.47-5.478a.96.96 0 0 1 .673-.29c.249 0 .49.107.672.29l5.47 5.478c.192.2.283.415.283.656 0 .506-.365.888-.864.888a.94.94 0 0 1-.647-.265l-1.884-1.86-2.192-2.449.067 1.793v10.31c0 .548-.365.921-.905.921-.531 0-.905-.373-.905-.921V8.65l.067-1.8L8.97 9.305l-1.884 1.86a.92.92 0 0 1-.64.265

async function autoBuy() {

  var up = Array.from(document.querySelectorAll('button p')).filter(el => el.textContent.includes("Start"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 3300));
    up = Array.from(document.querySelectorAll('button p')).filter(el => el.textContent.includes("Continue"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 3300));
    }
    up = Array.from(document.querySelectorAll('button p')).filter(el => el.textContent.includes("Skip"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 3300));
    }
    up = Array.from(document.querySelectorAll('button p')).filter(el => el.textContent.includes("Skip"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 3300));
    }
    up = Array.from(document.querySelectorAll('button p')).filter(el => el.textContent.includes("Random name"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 3300));
    }
    up = Array.from(document.querySelectorAll("path[d='M6.447 11.431c-.498 0-.872-.382-.872-.888a.92.92 0 0 1 .282-.656l5.47-5.478a.96.96 0 0 1 .673-.29c.249 0 .49.107.672.29l5.47 5.478c.192.2.283.415.283.656 0 .506-.365.888-.864.888a.94.94 0 0 1-.647-.265l-1.884-1.86-2.192-2.449.067 1.793v10.31c0 .548-.365.921-.905.921-.531 0-.905-.373-.905-.921V8.65l.067-1.8L8.97 9.305l-1.884 1.86a.92.92 0 0 1-.64.265']"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 3300));
    }
    up = Array.from(document.querySelectorAll('button p')).filter(el => el.textContent.includes("Skip"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 3300));
    }
  }

  var up = Array.from(document.querySelectorAll('a[href="/balance"]'));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  var up = Array.from(document.querySelectorAll('div'));
  up[0].scrollTo(0, 1000);
  await sleep(getRandomDelay(900, 990));

  var up = Array.from(Array.from(document.querySelectorAll("div p")).filter(el => el.textContent.includes("Daily Bonus"))[0].parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(23000, 23050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
