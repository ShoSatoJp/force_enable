// ==UserScript==
// @name         Force Enable
// @namespace    https://github.com/ShoSatoJp
// @version      0.1
// @description  force enable text select, copy, paste, right click and more...
// @author       ShoSato
// @match        *://*/*
// @grant        none
// @updateURL https://raw.githubusercontent.com/ShoSatoJp/force_enable/master/force_enable.user.js
// @downloadURL https://raw.githubusercontent.com/ShoSatoJp/force_enable/master/force_enable.user.js
// ==/UserScript==

(function () {
    'use strict';
    const TYPE_LIST = ['copy', 'cut', 'paste', 'selectstart', 'mousedown', 'keydown', 'contextmenu', 'scroll', 'mousewheel'];
    const TYPE_LIST_WITH_ON = TYPE_LIST.map(x => 'on' + x);
    // const RESULT_ELEMENT = document.createElement('p');
    let PROCESSED = 0;
    let COUNT = 0;
    // document.body.appendChild(RESULT_ELEMENT);

    //before loading
    //event handlers
    const Element_addEventListener_ = Element.prototype.addEventListener;
    const Window_addEventListener_ = window.addEventListener;
    const Document_addEventListener_ = document.addEventListener;

    function check(type, fn) {
        if (~TYPE_LIST.indexOf(type)) {} else {
            fn && fn();
        }
    }

    Element.prototype.addEventListener = function (type, listener, ev) {
        check(type, (() => Element_addEventListener_.bind(this, type, listener, ev)()).bind(this));
    };
    window.addEventListener = function (type, listener, ev) {
        check(type, (() => Window_addEventListener_.bind(window, type, listener, ev)()).bind(this));
    };
    document.addEventListener = function (type, listener, ev) {
        check(type, (() => Document_addEventListener_.bind(window, type, listener, ev)()).bind(this));
    };

    //after loading
    Window_addEventListener_('load', function () {
        const START = Date.now();
        let TIME = 0;

        //attributes & properties
        const MAX_DEPTH = 1000;
        let DEPTH = 0;

        function remove_attribute(e, fn) {
            TYPE_LIST_WITH_ON.forEach(name => {
                if (e.hasAttribute && e.hasAttribute(name)) {
                    e.removeAttribute(name);
                    fn && fn();
                }
                if (e[name]) {
                    e[name] = null;
                    fn && fn();
                }
            });
        }
        (function f(e, d = 0) {
            remove_attribute(e, () => PROCESSED++);
            d++ >= DEPTH && (DEPTH = d);
            if (d >= MAX_DEPTH) return;
            Array.from(e.children).forEach(x => f(x, d));
            COUNT++;
        })(document);

        //transparent background color. disabled selection by css.
        const style = document.createElement('style');
        style.textContent = `::selection {
            background-color: black !important;
            color: white !important;
        }
        * {
            -webkit-touch-callout: auto !important;
              -webkit-user-select: auto !important;
               -khtml-user-select: auto !important;
                 -moz-user-select: auto !important;
                  -ms-user-select: auto !important;
                      user-select: auto !important;
            scroll-behavior: auto !important;
        }`;
        document.body && document.body.appendChild(style);
        // dynamic change
        (new MutationObserver(function (records) {
            console.log(records);
            records.forEach(x => {
            });
        })).observe(document.body, {
            attributes: true,
            childList: true,
            characterData: true,
            attributeFilter: ['style', 'class'],
            subtree: true,
        });
        TIME = Date.now() - START;
        console.log(TIME + 'ms');
    });
})();