// ==UserScript==
// @name         WaniKani Unobtrusive Kanji Stroke Order
// @namespace    org.atzkey
// @version      1.0
// @description  An unobtrusive Kanji Stroke Order display for WaniKani
// @author       atzkey
// @match        https://www.wanikani.com/kanji/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ksoFont = 'KanjiStrokeOrders';
    const ksoStyle = `<style>
      .kanji-icon.enlarge-hover {
        font-family: "${ksoFont}";
        font-weight: normal;
      }
    <style>`;

    function wkAlert(text) {
        let $alert = $(`
          <div class="alert alert-error fade in">
            <a class="close" data-dismiss="alert" href="#">x</a>
            <i class="icon-exclamation-sign"></i>
            ${text}
          </div>`);
        $alert.insertBefore('#search');
    }

    function isFontAvailable(fontName) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        // the text whose final pixel size I want to measure
        let text = "Font availability detection, 0123456789!?.";

        let checks = ['monospace', 'sans-serif', 'serif'].map((fontFamily) => {
            // specifying the baseline font
            context.font = "72px monospace";

            // checking the size of the baseline text
            let baselineSize = context.measureText(text).width;

            // specifying the font whose existence we want to check
            context.font = "72px '" + fontName + "', monospace";

            // checking the size of the font we want to check
            let newSize = context.measureText(text).width;

            return newSize !== baselineSize;
        });

        return checks.every((x) => x);
    }

    if (isFontAvailable(ksoFont)) {
        $('head').append(ksoStyle);
    } else {
        wkAlert(`Download and install <a href="http://www.nihilist.org.uk/">Kanji Stroke Order font</a>.`);
    }
})();
