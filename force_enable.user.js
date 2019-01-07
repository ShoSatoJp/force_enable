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

    const addEventListener_ = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function (type, listener, ev) {
        console.log(type);
        addEventListener_(type, listener, ev);
    };
    
})();