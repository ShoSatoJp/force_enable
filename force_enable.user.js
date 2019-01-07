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
    const TYPE_LIST = ['copy', 'cut', 'paste', 'selectstart', 'keydown', 'contextmenu'];
    //before loading
    //event handlers
    const Element_addEventListener_ = Element.prototype.addEventListener;
    const Window_addEventListener_ = window.addEventListener;

    function check(type, fn) {
        if (~TYPE_LIST.indexOf(type)) {
            console.log(type);
        } else {
            fn && fn();
        }
    }

    Element.prototype.addEventListener = function (type, listener, ev) {
        check(type, (() => Element_addEventListener_.bind(this, type, listener, ev)()).bind(this));
    };
    window.addEventListener = function (type, listener, ev) {
        check(type, (() => Window_addEventListener_.bind(window, type, listener, ev)()).bind(this));
    }

    //after loading
    Window_addEventListener_('load', function () {
        //attributes
        const MAX_DEPTH = 1000;
        const START = Date.now();
        const RESULT_ELEMENT = document.createElement('p');
        let DEPTH = 0;
        let COUNT = 0;
        let PROCESSED = 0;
        let TIME = 0;
        document.body.appendChild(RESULT_ELEMENT);

        function remove_attribute(e, fn) {
            TYPE_LIST.forEach(x => {
                const name = 'on' + x;
                if (e.hasAttribute(name)) {
                    e.removeAttribute(name);
                    fn && fn();
                }
                if (e[name]) {
                    e[name] = null;
                }
            });
        }
        (function f(e, d = 0) {
            remove_attribute(e, () => PROCESSED++);
            d++ >= DEPTH && (DEPTH = d);
            if (d >= MAX_DEPTH) return;
            Array.from(e.children).forEach(x => f(x, d));
            COUNT++;
        })(document.body);

        TIME = Date.now() - START;
        console.log(TIME + 'ms');
    });
})();