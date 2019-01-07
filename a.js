$(function () {
    if (typeof window.R18 != 'undefined') {
        if (window.R18 == 1) {
            (function () {
                var black = $('<div></div>').css({
                    'width': '100%',
                    'height': '100%',
                    'top': '0px',
                    'left': '0px',
                    'position': 'fixed',
                    'z-index': '99998',
                    'background-color': '#000000',
                    'opacity': '0.7'
                });
                var view = $('<div></div>').css({
                    'width': '260px',
                    'height': '340px',
                    'margin-top': '-170px',
                    'margin-left': '-130px',
                    'top': '50%',
                    'left': '50%',
                    'position': 'fixed',
                    'z-index': '99999',
                    'background-color': '#FFFFFF',
                    'border-radius': '8px 8px 4px 4px'
                });
                var innerTitle = $('<div></div>').css({
                    'background-color': '#FF8080',
                    'color': '#FFFFFF',
                    'height': '40px',
                    'line-height': '40px',
                    'border-radius': '8px 8px 0px 0px',
                    'text-align': 'center'
                }).html('本網頁包含成人內容,未滿18歲者請勿瀏覽');
                var innerBody = $('<div></div>').css({
                    'background-color': '#FFFFFF',
                    'padding-bottom': '50px',
                    'text-align': 'center'
                }).append($('<img>').attr('src', '/media/image/r18.jpg').css({
                    'vertical-align': 'middle'
                }));
                var innerBottom = $('<div></div>').css({
                    'background-color': '#FFFFFF',
                    'position': 'absolute',
                    'bottom': '0px',
                    'left': '0px',
                    'height': '50px',
                    'border-radius': '0px 0px 4px 4px',
                    'width': '100%'
                });
                innerBottom.append($('<div></div>').css({
                    'position': 'absolute',
                    'top': '5px',
                    'left': '20px',
                    'width': '100px',
                    'text-align': 'center',
                    'color': '#FFFFFF',
                    'border-radius': '8px',
                    'height': '40px',
                    'line-height': '40px',
                    'background-color': '#008000',
                }).click(function () {
                    black.hide();
                    view.hide();
                }).html('我已満18歲')).append($('<div></div>').css({
                    'position': 'absolute',
                    'top': '5px',
                    'right': '20px',
                    'width': '100px',
                    'text-align': 'center',
                    'color': '#FFFFFF',
                    'border-radius': '8px',
                    'height': '40px',
                    'line-height': '40px',
                    'background-color': '#FF8080',
                }).click(function () {
                    location.href = '/';
                }).html('我未滿18歲'));
                view.append(innerTitle).append(innerBody).append(innerBottom);
                $('BODY').append(black).append(view);
                black.show();
                view.show();
            })();
        }
    }
    var content = $('#mainContent');
    var cHtml = content.html();
    var width = content.width();
    var iframe = $('<iframe></iframe>').css({
        'width': width + 'px',
        'border': '0px'
    }).attr({
        'src': 'about:blank',
        'frameborder': '0',
        'border': '0',
        'cellspacing': '0'
    });
    iframe.load(function () {
        var iframeDocument = iframe[0].contentWindow.document;
        iframeDocument.oncontextmenu = function () {
            return false;
        };
        $(iframeDocument).mousedown(function (e) {
            if (e.button == 2) {
                return false;
            }
            return true;
        });
        iframeDocument.onselectstart = function () {
            return false;
        };
        iframeDocument.onselect = function () {
            return false;
        };
        var iframeBody = iframe.contents().find('BODY');
        var style = document.createElement('style');
        style.type = 'text/css';
        styleStr = 'body{font-family: Verdana,Arial,Helvetica,sans-serif;font-size: 16px;}h1{display: block;font-size: 2em;-webkit-margin-before: 0.67em;-webkit-margin-after: 0.67em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;font-weight: bold;}h2{display: block;font-size: 1.5em;-webkit-margin-before: 0.83em;-webkit-margin-after: 0.83em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;font-weight: bold;}h3{display: block;font-size: 1.17em;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;font-weight: bold;}h4{display: block;-webkit-margin-before: 1.33em;-webkit-margin-after: 1.33em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;font-weight: bold;}h5{display: block;font-size: 0.83em;-webkit-margin-before: 1.67em;-webkit-margin-after: 1.67em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;font-weight: bold;}h6{display: block;font-size: 0.67em;-webkit-margin-before: 2.33em;-webkit-margin-after: 2.33em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;font-weight: bold;}p{display: block;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;line-height: 1.8;}img[data-id^="embed_"] { display: none; }';
        try {
            style.styleSheet.cssText = styleStr;
        } catch (e) {
            style.appendChild(document.createTextNode(styleStr));
        }
        iframe.contents().find('head')[0].appendChild(style);
        iframeBody.css({
            'width': width + 'px',
            'overflow': 'hidden',
            'margin': '0px',
            'padding': '0px',
            'margin-top': '10px',
            'margin-bottom': '10px'
        });
        var virtualDiv = $('<div></div>').css({
            'width': 'auto',
            'overflow': 'hidden',
            'margin': '0px',
            'padding': '0px'
        });
        virtualDiv.html(cHtml);
        virtualDiv.find('img').css('max-width', '600px').load(function () {
            iframe.css('height', iframe.contents().height() + 'px');
            adShowHide();
        });
        var hasTwitter = false;
        virtualDiv.find('img[data-id^="embed_"]').each(function () {
            var videoParent = $(this).parent().css({
                'text-align': 'center'
            });
            var embedId = $(this).attr('data-id').match(/embed_([0-9]+.*?)/);
            if (embedId !== null) {
                if (typeof embedId[1] === "string") {
                    if (isNaN(embedId[1]) === false) {
                        if (window.embedVideos[embedId[1]] !== null) {
                            if (typeof window.embedVideos[embedId[1]] === "object") {
                                var embedHtml = window.embedVideos[embedId[1]].html;
                                var filterEmbedKey = embedHtml.match(/facebook|yimg|coture|twitter/);
                                if (filterEmbedKey !== null) {
                                    if (filterEmbedKey[0] === "facebook") {
                                        var tmpMatchEmbed = embedHtml.match(/data-href=\"(.*?)\"/);
                                        if (tmpMatchEmbed !== null) {
                                            if (typeof tmpMatchEmbed[1] === "string") {
                                                var fbVideoId = tmpMatchEmbed[1].match(/[http|https]:\/\/www.facebook.com\/[0-9a-zA-Z\-\_\.]+\/videos\/([0-9]+)\//);
                                                var tmpId = 'fbEmbed_' + fbVideoId[1];
                                                embedHtml = $('<iframe></iframe>').attr({
                                                    id: tmpId,
                                                    width: '600',
                                                    scrolling: 'no',
                                                    frameborder: 0,
                                                    src: '/media/embed/fb.html?url=' + tmpMatchEmbed[1] + '&id=' + tmpId + '&vId=' + fbVideoId[1]
                                                });
                                            }
                                        }
                                    }
                                    if (filterEmbedKey[0] === "yimg") {
                                        var tmpId = 'yahooEmbed_' + embedId[1];
                                        embedHtml = $('<iframe></iframe>').attr({
                                            id: tmpId,
                                            width: '600',
                                            scrolling: 'no',
                                            frameborder: 0,
                                            src: '/media/embed/yahoo.html?id=' + tmpId + '&vId=' + embedId[1]
                                        });
                                    }
                                    if (filterEmbedKey[0] === "coture") {
                                        var tmpId = 'cotureEmbed_' + embedId[1];
                                        embedHtml = $('<iframe></iframe>').attr({
                                            id: tmpId,
                                            width: '600',
                                            scrolling: 'no',
                                            frameborder: 0,
                                            src: '/media/embed/coture.html?id=' + tmpId + '&vId=' + embedId[1]
                                        });
                                    }
                                    if (filterEmbedKey[0] === "twitter") {
                                        if (hasTwitter === false) {
                                            hasTwitter = true;
                                        }
                                        embedHtml = embedHtml.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, '');
                                    }
                                }
                                var tmp = $('<div></div>').addClass('test_' + embedId[1]).html(embedHtml);
                                tmp.children().each(function () {
                                    var insertElement = document.createElement(this.tagName);
                                    insertElement.innerHTML = this.innerHTML;
                                    for (var i = 0; i < this.attributes.length; i++) {
                                        insertElement.setAttribute(this.attributes[i].name, this.attributes[i].value);
                                    }
                                    if (this.tagName === "SCRIPT") {
                                        iframe.contents().find('head')[0].appendChild(insertElement);
                                    } else {
                                        var newRow = document.createElement('P');
                                        newRow.style.textAlign = "center";
                                        newRow.appendChild(insertElement);
                                        videoParent[0].parentNode.insertBefore(newRow, videoParent[0].nextSibling);
                                        if (typeof window.embedVideos[embedId[1]].provider_name != 'undefined') {
                                            if (window.embedVideos[embedId[1]].provider_name == 'Instagram') {
                                                var copy1 = newRow.insertBefore;
                                                var copy2 = newRow.appendChild;
                                                var findIframe = function () {
                                                    $(newRow).find('iframe').each(function () {
                                                        $(this).load(function () {
                                                            iframe.css('height', iframe.contents().height() + 'px');
                                                        });
                                                        iframe.css('height', iframe.contents().height() + 'px');
                                                    });
                                                };
                                                newRow.insertBefore = function () {
                                                    copy1.apply(this, arguments);
                                                    findIframe();
                                                };
                                                newRow.appendChild = function () {
                                                    copy2.apply(this, arguments);
                                                    findIframe();
                                                };
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
            $(this).remove();
        });
        var hasVoo = false;
        virtualDiv.find('img[data-embed="vooim"]').each(function () {
            var videoParent = $(this).parent();
            var videoId = $(this).attr('data-v');
            if (videoId) {
                var div = $('<div></div>').attr({
                    'class': 'vimoo-embed-video',
                    'data-v': videoId,
                    'data-width': width,
                    'data-height': Math.floor((width / 16) * 9),
                    'data-domain': 'video.life.tw'
                });
                videoParent.after(div);
                videoParent.remove();
                hasVoo = true;
            }
        });
        var iframeResize = function () {
            virtualDiv.find('iframe').each(function () {
                var src = $(this).attr('src');
                if (typeof src != 'undefined') {
                    if (src.match(/youtube|v\.oo\.im|gamedb|player|vine|vimeo|instagram|shareba|facebook|life|youku|revision3|collegehumor|portfolium|slideshare|\/media\/embed|imdb|yahoo|ted|coture|xuite|dailymail|twitter/)) {
                        $(this).load(function () {
                            iframe.css('height', iframe.contents().height() + 'px');
                            $(this).css('border', '0px');
                            adShowHide();
                        });
                    } else {
                        $(this).remove();
                    }
                } else {
                    $(this).remove();
                }
            });
        };
        if (hasVoo) {
            iframe[0].contentWindow.vooimSdkRended = function () {
                iframeResize();
            };
            (function (d, i, a) {
                var s = d.createElement('script');
                var p = d.getElementsByTagName('head')[0];
                s.src = 'https://v.oo.im/media/js/embedSdk.js';
                p.appendChild(s);
            })(iframe[0].contentWindow.document, 'vooim');
        } else {
            iframeResize();
        }
        if (hasTwitter === true) {
            iframe[0].contentWindow.twttr = (function (d, i, a) {
                var s = d.createElement('script');
                var p = d.getElementsByTagName('head')[0];
                s.src = 'https://platform.twitter.com/widgets.js';
                p.appendChild(s);
                var t = window.twttr || {};
                t._e = [];
                t.ready = function (f) {
                    t._e.push(f);
                };
                return t;
            })(iframe[0].contentWindow.document, 'twitter-wjs');
            iframe[0].contentWindow.twttr.ready(function (twttr) {
                twttr.events.bind('rendered', function (event) {
                    iframe.css('height', iframe.contents().height() + 'px');
                });
            });
        }
        virtualDiv.find('a').attr('target', '_blank');
        iframeBody.append(virtualDiv);
        iframe.css('height', iframe.contents().height() + 'px');
        adShowHide();
    });
    content.html('').append(iframe);
});
var adShowHide = function () {
    var contentHeight = $("#mainContent").height();
    if (contentHeight < 2000) {
        $(".leftADBlock_1").hide();
        $(".leftADBlock_2").hide();
        $(".leftADBlock_3").hide();
        $(".leftADBlock_4").hide();
        $(".leftADBlock_5").hide();
        $(".leftADBlock_6").hide();
        $(".contentBottomTwoADBlock").show();
    }
    if (contentHeight > 2000 && contentHeight < 3000) {
        $(".leftADBlock_1").hide();
        $(".leftADBlock_2").hide();
        $(".leftADBlock_3").hide();
        $(".leftADBlock_4").hide();
        $(".leftADBlock_5").hide();
        $(".contentBottomTwoADBlock").show();
    } else if (contentHeight > 3000 && contentHeight < 4000) {
        $(".leftADBlock_1").hide();
        $(".leftADBlock_2").hide();
        $(".leftADBlock_3").hide();
        $(".leftADBlock_4").hide();
        $(".contentBottomTwoADBlock").show();
    } else if (contentHeight > 4000 && contentHeight < 6000) {
        $(".leftADBlock_2").hide();
        $(".leftADBlock_3").hide();
        $(".contentBottomTwoADBlock").show();
    } else {
        $(".contentBottomTwoADBlock").show();
    }
};