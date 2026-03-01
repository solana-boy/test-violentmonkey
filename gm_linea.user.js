// ==UserScript==
// @name         gm linea
// @version      0.28
// @author       IvanAgafonov
// @match        https://linea.build/hub/rewards
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/gm_linea.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/gm_linea.user.js
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


  var up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Connect Wallet")
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  var up = Array.from(document.querySelectorAll("input[placeholder='Search through 415 wallets...']"))
  if (up.length != 0){
    up[0].click()

    const lastValue = up[0].value;
    up[0].value = "Rabby";
    const event = new Event("input", { bubbles: true });
    const tracker = up[0]._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    up[0].dispatchEvent(event);
    await sleep(getRandomDelay(1200, 2000));
  }

  up = querySelectorAllShadows('div p').filter(el => el.textContent.includes("Rabby"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5010));
    location.reload();
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => (el.textContent.includes("prizes") || el.textContent.includes("prize")) && el.className.includes("tag"));
  if (up.length != 0){
    if (up[0].textContent != "0 prizes") {
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 4000));
      up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent == "Claim" && el.className.includes("prizes"));
      if (up.length != 0){
        try{
          GM_xmlhttpRequest( {
             'method' : 'GET',
             'url' : "http://127.0.0.1:5000/linea_prize?profile_number=" + profile_number
            });
        } catch (error) {console.log(error);}
      }
    }
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "x0 Spins")
  if (up.length != 0){
        try{
          GM_xmlhttpRequest( {
             'method' : 'GET',
             'url' : "http://127.0.0.1:5000/linea_success_spin?profile_number=" + profile_number
            });
        } catch (error) {console.log(error);}
  }

  up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin the wheel"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin the wheel"));
  if (up.length > 1){
    triggerEvents(up[1]);
    await sleep(getRandomDelay(26000, 26010));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.className.includes("spin-claim") || el.className.includes("spin-lost"));
  if (up.length != 0){
      try{
        GM_xmlhttpRequest( {
           'method' : 'GET',
           'url' : "http://127.0.0.1:5000/linea_success_spin?profile_number=" + profile_number
          });
      } catch (error) {console.log(error);}
  }

  up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin again"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  } else {
    await sleep(getRandomDelay(5000, 9900));
  }

  up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin the wheel"));
  if (up.length > 1){
    triggerEvents(up[1]);
    await sleep(getRandomDelay(26000, 26010));
  }


  up = Array.from(document.querySelectorAll("div p")).filter(el => el.className.includes("spin-claim") || el.className.includes("spin-lost"));
  if (up.length != 0){
      try{
        GM_xmlhttpRequest( {
           'method' : 'GET',
           'url' : "http://127.0.0.1:5000/linea_success_spin?profile_number=" + profile_number
          });
      } catch (error) {console.log(error);}
  }

  up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin again"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  } else {
    await sleep(getRandomDelay(5000, 9900));
  }

  up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin the wheel"));
  if (up.length > 1){
    triggerEvents(up[1]);
    await sleep(getRandomDelay(26000, 26010));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.className.includes("spin-claim") || el.className.includes("spin-lost"));
  if (up.length != 0){
      try{
        GM_xmlhttpRequest( {
           'method' : 'GET',
           'url' : "http://127.0.0.1:5000/linea_success_spin?profile_number=" + profile_number
          });
      } catch (error) {console.log(error);}
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.className.includes("spin-claim") || el.className.includes("spin-lost"));
  if (up.length != 0){
      try{
        GM_xmlhttpRequest( {
           'method' : 'GET',
           'url' : "http://127.0.0.1:5000/linea_success_spin?profile_number=" + profile_number
          });
      } catch (error) {console.log(error);}
  }

  up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin again"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  } else {
    await sleep(getRandomDelay(5000, 9900));
  }

  up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin the wheel"));
  if (up.length > 1){
    triggerEvents(up[1]);
    await sleep(getRandomDelay(26000, 26010));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.className.includes("spin-claim") || el.className.includes("spin-lost"));
  if (up.length != 0){
      try{
        GM_xmlhttpRequest( {
           'method' : 'GET',
           'url' : "http://127.0.0.1:5000/linea_success_spin?profile_number=" + profile_number
          });
      } catch (error) {console.log(error);}
  }

  // up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent.includes("prizes") || el.textContent.includes("prize"));
  // if (up.length != 0){
  //   if (up[0].textContent != "0 prizes") {
  //     try{
  //         await fetch("http://127.0.0.1:5000/linea_prize?profile_number=" + profile_number);
  //       } catch (error) {}
  //   }
  // }

//   up = querySelectorAllShadows('wui-text').filter(el => el.textContent.includes("Rabby Wallet"));
//   console.log(up);
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     up[0].click();
//     await sleep(getRandomDelay(18000, 18100));
//   }

//   var up = Array.from(document.querySelectorAll("path[d=' M43,-20 C43,-20 43,51 43,51 C43,51 -20,51 -20,51 C-20,51 -20,-20 -20,-20 C-20,-20 43,-20 43,-20z']"));
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(3000, 4000));
//   }

}

function is_reload() {
  var up = Array.from(document.querySelectorAll("h1")).filter(el => el.textContent == "Spin to Win")
  if (up.length == 0){
    location.reload();
  }
}


function initializeScript() {

    console.log('START claim  ')

    // setTimeout(is_reload, getRandomDelay(15000, 19990));
    setTimeout(autoBuy, getRandomDelay(30000, 35050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
