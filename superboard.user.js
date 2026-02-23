// ==UserScript==
// @name         superboard
// @version      0.19
// @author       IvanAgafonov
// @match        https://superboard.xyz/*
// @match        https://www.superboard.xyz/quests
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/superboard.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/superboard.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
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

function querySelectorAllShadows(selector, el = document.body) {
  // recurse on childShadows
  const childShadows = Array.from(el.querySelectorAll('*')).
    map(el => el.shadowRoot).filter(Boolean);

  // console.log('[querySelectorAllShadows]', selector, el, `(${childShadows.length} shadowRoots)`);

  const childResults = childShadows.map(child => querySelectorAllShadows(selector, child));

  // fuse all results into singular, flat array
  const result = Array.from(el.querySelectorAll(selector));
  return result.concat(childResults).flat();
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

async function autoBuy() {


  var up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Sign In" );
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4100));
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Rabby" );
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(17000, 17100));
    }
  }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Feed now" );
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(2000, 3100));
  }

  up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Restore Life" );
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 3100));
  }

  up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Buy 9 Lives" );
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 3100));
  }

  up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Start Over" );
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 3100));
  }

  up = Array.from(document.querySelectorAll("div span span")).filter(el => el.textContent == "TREAT" );
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 3100));
  }

  while (true) {
    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Start Quest" );
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(3000, 4100));
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Skip" );
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(3000, 4100));
    } else {
      up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Continue" );
      if (up.length != 0){
        triggerEvents(up[0]);
        // up[0].click();
        await sleep(getRandomDelay(3000, 4100));
      }
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Watch" );
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(3000, 4100));
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Verify" );
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(3000, 4100));
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Claim Rewards" );
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(3000, 4100));
    }

    up = Array.from(document.querySelectorAll("path[d='M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z']"));
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(3000, 4100));
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Completed" || el.textContent == "Claimed");
    if (up.length != 0){
      fetch("http://127.0.0.1:5000/superform?address=" + evm_addr + "&page=" + document.URL);
      await sleep(getRandomDelay(15000, 19100));
    }


    await sleep(getRandomDelay(1000, 1100));
  }


  // up = querySelectorAllShadows('button').filter(el => el.textContent.includes("Abstract")); // all `td`s in body
  // console.log(up)
  // if (up.length > 1){
  //   // triggerEvents(up[1]);
  //   up[1].click();
  //   await sleep(getRandomDelay(4000, 4100));
  // }

}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(14000, 14050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
