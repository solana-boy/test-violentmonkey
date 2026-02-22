// ==UserScript==
// @name         linea ignition
// @version      0.11
// @author       IvanAgafonov
// @match        https://linea-ignition.brevis.network/
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/linea_ignition.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/linea_ignition.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// @grant        GM_xmlhttpRequest

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


// Триггеры событий
function triggerEvents(element) {
  try{
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
  } catch (error) {console.log(error);}
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

async function autoBuy() {


  var up = Array.from(document.querySelectorAll("div div div div div div div div")).filter(el => el.textContent == "Connect Wallet")
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "Rabby")
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(13000, 14000));
  }

  if (getRandomDelay(1, 1100) < 100) {
    up = Array.from(document.querySelectorAll("div div div div div div div div div div")).filter(el => el.textContent == "Claim")
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(16000, 17000));
    }

    up = Array.from(document.querySelectorAll("div div div div div div div div div div")).filter(el => el.textContent == "Claim")
    if (up.length != 1){
      triggerEvents(up[1]);
      await sleep(getRandomDelay(13000, 14000));
    }
  }

  up = Array.from(document.querySelectorAll("div div div div div div div div div div div span")).filter(el => el.textContent == "0 LINEA")
  if (up.length == 4){
    try{
      GM_xmlhttpRequest( {
         'method' : 'GET',
         'url' : "http://127.0.0.1:5000/linea_ignition?profile_number=" + profile_number
        });
    } catch (error) {console.log(error);}
  }

}

function is_reload() {
  var up = Array.from(document.querySelectorAll("h1")).filter(el => el.textContent == "Spin to Win")
  if (up.length == 0){
    location.reload();
  }
}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(10000, 15050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
