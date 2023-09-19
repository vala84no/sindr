// ==UserScript==
// @name         Emoji Kitchen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Export different sizes of emoji kitchen stickers.
// @author       Vala
// @match        https://emoji.supply/kitchen/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=emoji.supply
// @grant        none
// ==/UserScript==


(function() {
  'use strict';
  async function waitForFocus() {
    while (!document.hasFocus()) {
      await new Promise(res => setTimeout(res, 300));
    }
  }

  async function resizeToClipboard(img, width = 100, height = 100) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve));

    await waitForFocus();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
  };

  window.addEventListener('load', function() {
    const sourceImage = document.querySelector('#pc');
    sourceImage.crossOrigin = 'anonymous';
    const resizePreviewImage = new Image();
    resizePreviewImage.src = sourceImage.src;

    resizePreviewImage.addEventListener('click', () => resizeToClipboard(sourceImage, size, size));
    const resizePreview = document.createElement('div');
    resizePreview.className = 'preview';
    resizePreview.append(resizePreviewImage);

    let size = 50;
    const setSize = newSize => {
      size = newSize;
      resizePreview.style.cssText = `
        width: ${size}px;
        height: ${size}px;
      `;
    }
    setSize(size);

    const container = document.querySelector('#preview-container');

    new MutationObserver(() => {
      resizePreviewImage.src = document.querySelector('#pc').src;
    }).observe(sourceImage, { attributes: true });

    const sizeControl = document.createElement('div');
    const increaseSize = document.createElement('button');
    const decreaseSize = document.createElement('button');
    sizeControl.style.cssText = `
      display: flex;
      flex-direction: column;
      width: 2rem;
      height: 2rem;
    `
    increaseSize.textContent = '+';
    decreaseSize.textContent = '-';
    increaseSize.addEventListener('click', () => setSize(size + 20));
    decreaseSize.addEventListener('click', () => setSize(size - 20));
    sizeControl.append(increaseSize);
    sizeControl.append(decreaseSize);

    container.append(sizeControl);
    container.append(resizePreview);
  }, false);
})();
