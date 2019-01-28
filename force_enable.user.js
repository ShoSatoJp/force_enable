// ==UserScript==
// @name         Force Enable
// @namespace    https://github.com/ShoSatoJp
// @version      0.2
// @description  force enable text selection, copy, paste and right click and disable smooth scroll.
// @author       ShoSato
// @match        *://*/*
// @exclude /^https?:\/\/(.*\.|)(google|amazon)\.(com|co\.[a-zA-Z]{2})\/.*$/
// @exclude /^https?:\/\/(.*\.|)(twitter|github|microsoftonline|visualstudio|dropbox|live|skype|bing|wunderlist|android|youtube|amazon|facebook|apple|regex101)\.com\/.*$/
// @exclude /^https?:\/\/(.*\.|)(nicovideo)\.jp\/.*$/
// @exclude *://*ac.jp/*
// @grant        none
// @run-at document-start
// @updateURL https://raw.githubusercontent.com/ShoSatoJp/force_enable/master/force_enable.user.js
// @downloadURL https://raw.githubusercontent.com/ShoSatoJp/force_enable/master/force_enable.user.js
// ==/UserScript==

(function force_enable(W, use_load_event = true) {
    if (W['shosato_force_enable']) {
        return;
    } else {
        W['shosato_force_enable'] = true;
    }
    const D = W.document;
    const E = W.Element;

    const Element_addEventListener_ = E.prototype.addEventListener;
    const Window_addEventListener_ = W.addEventListener;
    const Document_addEventListener_ = D.addEventListener;

    const TYPE_LIST = ['copy', 'cut', 'paste', 'selectstart', 'mousedown', 'keydown', 'contextmenu', 'scroll', 'mousewheel','wheel'];
    const TYPE_LIST_WITH_ON = TYPE_LIST.map(x => 'on' + x);
    const RESULT_ELEMENT = D.createElement('p');
    let PROCESSED = 0;
    let COUNT = 0;
    let TIME = 0;
    D.body && D.body.appendChild(RESULT_ELEMENT);

    function show_result() {
        RESULT_ELEMENT.textContent = '';
    }

    //event handlers
    {
        function check(type, fn) {
            if (!~TYPE_LIST.indexOf(type)) fn && fn();
        }

        E.prototype.addEventListener = function (type, listener, option) {
            check(type, (() => Element_addEventListener_.bind(this, type, listener, option)()).bind(this));
        };
        W.addEventListener = function (type, listener, option) {
            check(type, (() => Window_addEventListener_.bind(W, type, listener, option)()).bind(this));
        };
        D.addEventListener = function (type, listener, option) {
            check(type, (() => Document_addEventListener_.bind(D, type, listener, option)()).bind(this));
        };
    }

    function after_loading() {
        const START = Date.now();

        //attributes & properties
        {
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

            function remove_attribute_recurcive(target) {
                (function f(e, d = 0) {
                    remove_attribute(e, () => PROCESSED++);
                    d++ >= DEPTH && (DEPTH = d);
                    if (d >= MAX_DEPTH) return;
                    Array.from(e.children).forEach(x => f(x, d));
                    COUNT++;
                })(target);
            }
            W.remove_attribute_recurcive = remove_attribute_recurcive
            remove_attribute_recurcive(D);
        }

        //transparent background color. disabled selection by css.
        {
            const style = D.createElement('style');
            style.textContent = `::selection {
                background-color: #3390FF !important;
                color: white !important;
            }
            * , body {
                -webkit-touch-callout: auto !important;
                -webkit-user-select: auto !important;
                -khtml-user-select: auto !important;
                    -moz-user-select: auto !important;
                    -ms-user-select: auto !important;
                        user-select: auto !important;
                scroll-behavior: auto !important;
                
            }`;//font-family: auto !important;
            D.body && D.body.appendChild(style);
        }

        // dynamic change
        {
            D.body && (new MutationObserver(function (records) {
                records.forEach(x => {
                    if (x.type === 'childList' && x.addedNodes.length) {
                        x.addedNodes.forEach(n => {
                            if (n instanceof E) remove_attribute_recurcive(n);
                        });
                    } else if (x.type === 'attributes' && ~['style', 'class'].indexOf(x.attributeName)) {
                        remove_attribute_recurcive(x.target);
                    }
                });
            })).observe(D.body, {
                attributes: true,
                childList: true,
                characterData: true,
                attributeFilter: ['style', 'class'],
                subtree: true,
            });
        }

        //iframe
        {
            D.querySelectorAll('iframe').forEach(x => {
                try {
                    force_enable(x.contentWindow, false);
                } catch {}
            });
        }

        TIME = Date.now() - START;
        console.log(TIME + 'ms');
    }
    if (use_load_event) {
        Window_addEventListener_('load', after_loading);
    } else {
        after_loading();
    }
})(window, true);