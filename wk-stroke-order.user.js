// ==UserScript==
// @name         WaniKani Unobtrusive Kanji Stroke Order
// @namespace    org.atzkey
// @version      1.2.0
// @description  An unobtrusive Kanji Stroke Order display for WaniKani
// @author       atzkey
// @match        https://www.wanikani.com/kanji/*
// @match        https://www.wanikani.com/vocabulary/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ksoFont = 'KanjiStrokeOrders';
    const ksoStyle = document.createElement('style');
    ksoStyle.innerHTML = `
      .kanji-icon.enlarge-hover, .vocabulary-icon.enlarge-hover {
        font-family: "${ksoFont}";
        font-weight: normal;
      }
    `;

    function wkAlert(text) {
        const search = document.getElementById('search');
        const anchor = search.parentNode;

        let alert = document.createElement('div');
        alert.className = 'alert alert-error fade in';
        alert.innerHTML = `
          <a class="close" data-dismiss="alert" href="#">x</a>
          <i class="icon-exclamation-sign"></i>
          ${text}
        `;

        anchor.insertBefore(alert, search);
    }

    function isFontAvailable(fontName) {
        let canvas = document.createElement("canvas");
        canvas.width = 1000;

        let context = canvas.getContext("2d");

        // the text whose final pixel size I want to measure
        let text = "Font availability detection, 0123456789!?.";

        let checks = ['monospace', 'sans-serif', 'serif'].map((fontFamily) => {
            // specifying the baseline font
            context.font = "72px " + fontFamily;

            // checking the size of the baseline text
            let baselineSize = context.measureText(text).width;

            // specifying the font whose existence we want to check
            context.font = "72px '" + fontName + "', " + fontFamily;

            // checking the size of the font we want to check
            let newSize = context.measureText(text).width;

            return newSize !== baselineSize;
        });

        return checks.find((x) => x);
    }

    if (isFontAvailable(ksoFont)) {
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(ksoStyle);
    } else {
        wkAlert(`Download and install <a href="http://www.nihilist.org.uk/">Kanji Stroke Order font</a>.`);
    }
})();
