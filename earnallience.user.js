// ==UserScript==
// @name         earnallience
// @version      0.14
// @author       IvanAgafonov
// @match        https://www.playfull.com/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/earnallience.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/earnallience.user.js
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

  var up = Array.from(document.querySelectorAll("path[d='M4.568 15.833a.426.426 0 0 1-.281-.1.297.297 0 0 1-.12-.233.34.34 0 0 1 .08-.217L8.837 9.9l-4.37-5.183a.34.34 0 0 1-.08-.217c0-.089.04-.167.12-.233.08-.067.174-.1.281-.1h1.143c.187 0 .36.094.52.283l3.59 4.217 3.547-4.217a.612.612 0 0 1 .521-.283h1.063c.107 0 .2.033.28.1.08.066.12.144.12.233a.34.34 0 0 1-.08.217l-4.33 5.2 4.591 5.366c.054.067.08.14.08.217 0 .089-.046.167-.14.233a.426.426 0 0 1-.28.1H14.27c-.2 0-.374-.088-.521-.266l-3.79-4.4-3.768 4.4c-.147.178-.32.266-.52.266H4.567Z']"));
  if (up.length != 0){
    triggerEvents(up[0].parentElement.parentElement);
    up[0].parentElement.parentElement.click()
    await sleep(getRandomDelay(2000, 4000));
  }

  up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Sign in"));
  if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(5000, 7000));

      up = Array.from(document.querySelectorAll("input[type=email]"))
      if (up.length != 0){
        up[0].click()

        const lastValue = up[0].value;
        up[0].value = email;
        const event = new Event("input", { bubbles: true });
        const tracker = up[0]._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        up[0].dispatchEvent(event);
        await sleep(getRandomDelay(2200, 2300));
      }

      up = Array.from(document.querySelectorAll("input[type=password]"))
      if (up.length != 0){
        up[0].click()

        const lastValue = up[0].value;
        up[0].value = "playfull132456#S";
        const event = new Event("input", { bubbles: true });
        const tracker = up[0]._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        up[0].dispatchEvent(event);
        await sleep(getRandomDelay(2200, 2300));
      }

      up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Log in"));
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(6000, 7000));
      }
  }


  var up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("LOG IN"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 3100));
    up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("LOG IN WITH METAMASK"));
    console.log(up);
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(15000, 17000));
    }
    up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Rabby Wallet" );
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(13000, 14000));
    }
  }

  up = Array.from(document.querySelectorAll("input[value='ally-to-pie-conversion-opt-out'] + span"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
    up = Array.from(document.querySelectorAll("path[d='M4.568 15.833a.426.426 0 0 1-.281-.1.297.297 0 0 1-.12-.233.34.34 0 0 1 .08-.217L8.837 9.9l-4.37-5.183a.34.34 0 0 1-.08-.217c0-.089.04-.167.12-.233.08-.067.174-.1.281-.1h1.143c.187 0 .36.094.52.283l3.59 4.217 3.547-4.217a.612.612 0 0 1 .521-.283h1.063c.107 0 .2.033.28.1.08.066.12.144.12.233a.34.34 0 0 1-.08.217l-4.33 5.2 4.591 5.366c.054.067.08.14.08.217 0 .089-.046.167-.14.233a.426.426 0 0 1-.28.1H14.27c-.2 0-.374-.088-.521-.266l-3.79-4.4-3.768 4.4c-.147.178-.32.266-.52.266H4.567Z']"));
    if (up.length != 0){
      triggerEvents(up[0].parentElement.parentElement);
      up[0].parentElement.parentElement.click()
      await sleep(getRandomDelay(2000, 4000));
    }
  }

//   up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Claim" );
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(5000, 5100));
//   }

//   up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Claim Badge" );
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(3000, 4000));
//   }

  // up = Array.from(document.querySelectorAll("img[src='https://abs.xyz/imagetransform/width=500,quality=100/https%3A%2F%2Fabstract-assets.abs.xyz%2Fbadges%2Fbadge-dinero.png']"));
  // if (up.length != 1){
  //    const response = fetch("http://127.0.0.1:5000/abstract?address=" + rabby.selectedAddress);
  //   await sleep(getRandomDelay(3000, 4000));
  // }


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

    setTimeout(autoBuy, getRandomDelay(17000, 17050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
