"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function graphcomment(gc_params) {
    var generateLiveStorage = function generateLiveStorage() {
        var map = new Map();
        return {
            getItem: function getItem(key) {
                return map.get(key);
            },
            setItem: function setItem(key, value) {
                map.set(key, value);
            },
            removeItem: function removeItem(key) {
                if (!map.has(key)) return true;
                return map["delete"](key);
            }
        };
    };

    var storageProvider = function () {
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object") return null;

        try {
            window.localStorage.getItem("anything");
            return window.localStorage;
        } catch (e) {
            try {
                window.sessionStorage.getItem("anything");
                return window.sessionStorage;
            } catch (subError) {
                return generateLiveStorage();
            }
        }
    }();

    var win = typeof window !== "undefined" && window;
    var doc = win && win.document;
    var gc_params = gc_params || {};
    var extractor = new Extractor(win, doc);
    var amp = win.graphcomment_amp;
    if (win) var query_string = new QueryString();
    var pid = String(Math.round(Math.random() * 10e6)); // disable amp loader

    if (amp) {
        var css = ".i-amphtml-loader { display: none; }";
        var style = document.createElement("style");
        style.type = "text/css";
        style.setAttribute("amp-custom", true);

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        var head = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0];
        head.appendChild(style);
    }

    function lightOrDark(color) {
        var parsed;

        if ("transparent" === color) {
            parsed = {
                red: 0,
                green: 0,
                blue: 0
            };
        } else if ("#" === color.charAt(0)) {
            if (color.length === 4) color = color + color.substr(1);
            parsed = {
                red: parseInt(color.substr(1, 2), 16),
                green: parseInt(color.substr(3, 2), 16),
                blue: parseInt(color.substr(5, 2), 16)
            };
        } else if ("rgba(" === color.slice(0, 5) || "rgb(" === color.slice(0, 4)) {
            var colors = color.match(/\d+/g).map(Number);
            parsed = {
                red: colors[0],
                green: colors[1],
                blue: colors[1]
            };
        }

        var yiq = (parsed.red * 299 + parsed.green * 587 + parsed.blue * 114) / 1000;
        return yiq >= 192 ? "dark" : "light";
    }

    function isMobile() {
        var check = false;

        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);

        return check;
    }

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        var windowWidth = window.innerWidth || document.documentElement.clientWidth;
        var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
        var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
        return vertInView && horInView;
    }

    function isFacebookApp() {
        if (typeof navigator === "undefined") return false;
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        if (!ua) return false;
        return ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
    }

    var ssoAccount = ["LePhoceen"];

    function isInappFacebookSso() {
        if (isFacebookApp() && ssoAccount.includes(gc_params.graphcomment_id)) {
            return false;
        } else if (isFacebookApp()) {
            return true;
        } else {
            return false;
        }
    }

    var requestAnimationFrame = win.requestAnimationFrame || function (callback) {
        return setTimeout(function () {
            callback();
        }, 1000 / 60);
    };

    var url = gc_params.url || extractor.extractUrl();
    var params = {
        url: url,
        target: gc_params.target,
        title: gc_params.page_title || extractor.extractTitle(),
        comment_id: gc_params.comment_id,
        website_id: gc_params.graphcomment_id || win.graphcomment_id,
        fixed_header_height: gc_params.fixed_header_height,
        count_per_page: gc_params.count_per_page,
        uid: gc_params.uid,
        guid: gc_params.guid || gc_params.canonical_url,
        identifier: gc_params.identifier || extractor.extractIdentifier(url),
        category: gc_params.category,
        readonly: gc_params.readonly,
        widget: gc_params.widget || false,
        sort: gc_params.sort || null,
        disable_live_replies: gc_params.disable_live_replies || false,
        disable_ads: gc_params.disable_ads || false,
        inapp: win.graphcomment_inapp || gc_params.inapp || isInappFacebookSso() || false,
        publication_date: gc_params.publication_date,
        lifetime: gc_params.lifetime,
        theme: typeof document !== "undefined" ? gc_params.theme || lightOrDark(getComputedStyle(document.body)["color"]) : "light",
        api_public_key: gc_params.sso_public_key || gc_params.api_public_key,
        facebook_redirect_after_login: gc_params.facebook_redirect_after_login,
        twitter_redirect_after_login: gc_params.twitter_redirect_after_login,
        google_redirect_after_login: gc_params.google_redirect_after_login,
        overlay: gc_params.overlay ? true : false,
        overlay_visible: gc_params.overlay ? typeof gc_params.overlay.visible === "undefined" ? false : gc_params.overlay.visible : null,
        overlay_zindex: gc_params.overlay ? gc_params.overlay.zindex || 99 : null,
        overlay_width: gc_params.overlay ? Math.max(400, gc_params.overlay.width || 600) : null,
        // width is at least 400px
        overlay_background: gc_params.overlay ? typeof gc_params.overlay.background !== "undefined" ? gc_params.overlay.background : true : null,
        overlay_page_width: gc_params.overlay ? gc_params.overlay.page_width || 1200 : null,
        // indicate width of your main content (generally around 1000px)
        overlay_alternate: gc_params.overlay ? typeof gc_params.overlay.alternate === "undefined" ? false : gc_params.overlay.alternate : null,
        overlay_button: gc_params.overlay ? typeof gc_params.overlay.button === "undefined" ? true : !!gc_params.overlay.button : null,
        overlay_button_label: gc_params.overlay && gc_params.overlay.button ? gc_params.overlay.button.label : null,
        overlay_button_background: gc_params.overlay && gc_params.overlay.button && gc_params.overlay.button.background || "#f35b5b",
        overlay_button_color: gc_params.overlay && gc_params.overlay.button && gc_params.overlay.button.color || "#fff",
        overlay_button_width: gc_params.overlay && gc_params.overlay.button && gc_params.overlay.button.width || "560px",
        overlay_button_target: gc_params.overlay && gc_params.overlay.button && gc_params.overlay.button.target,
        overlay_button_link: gc_params.overlay && gc_params.overlay.button && gc_params.overlay.button.link,
        overlay_button_mobile_link: gc_params.overlay && gc_params.overlay.button && gc_params.overlay.button.mobile_link,
        overlay_bubble: gc_params.overlay ? !!gc_params.overlay.bubble : null,
        overlay_bubble_zindex: gc_params.overlay && gc_params.overlay.bubble ? gc_params.overlay.bubble.zindex || 98 : null,
        overlay_bubble_placement: gc_params.overlay && gc_params.overlay.bubble && gc_params.overlay.bubble.placement || {
            bottom: "20px",
            right: "20px"
        },
        overlay_bubble_color: gc_params.overlay && gc_params.overlay.bubble && gc_params.overlay.bubble.color || "#fff",
        overlay_bubble_background: gc_params.overlay && gc_params.overlay.bubble && gc_params.overlay.bubble.background || "#f35b5b"
    };

    if (!params.website_id) {
        throw "Graphcomment id missing";
    }

    var gc_domain = "https://graphcomment.com";
    var front_url = gc_domain + "/front"; // this is intended for GraphComment developpers only
    // do not use this option in production !! (for debugging only)

    if (gc_params.localhost) {
        // if hostname is an IP
        if (typeof window !== "undefined" && window.location && (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(window.location.hostname) || window.location.hostname === "localhost")) {
            // load graphcoment from that IP
            gc_domain = "http://" + window.location.hostname + ":9003";
            front_url = gc_domain;
        }
    }

    if (win.GC_API_URL) {
        front_url = win.GC_API_URL;
    }

    if (typeof window !== "undefined" && doc) {
        var thread = params.target || doc.getElementById("graphcomment");
        if (!thread) return;
        var lang = getBrowserLanguage();

        if (params.overlay) {
            // width of the close icon
            var isOverlayMobileVersion = function isOverlayMobileVersion() {
                return window.innerWidth <= mobileVersionStartingAt;
            };

            var updateOverlayCss = function updateOverlayCss(stylesheet) {
                var overlayCss = "\n          body.gc-noscroll {\n            overflow: hidden !important;\n            position: fixed !important;\n          }\n          .gc-close {\n            display: none; justify-content: center; align-items: center;\n            cursor: pointer; position: absolute; z-index: -1;\n            margin-top: 10px; background: ".concat(params.theme === "light" ? "#fefefe" : "#222", ";\n            border: 1px solid ").concat(params.theme === "light" ? "rgba(188, 188, 188, 0.3)" : "rgba(0, 0, 0, .3)", ";\n            top: 0; left: -35px; border-radius: 5px 0 0 5px; border-right: 0;\n          }\n          .gc-close img{\n            margin:0;\n          }\n          .gc-close-chevron {\n            z-index: ").concat(params.overlay_zindex + 1, ";\n            padding: 8px 12px 8px 10px;\n          }\n          @keyframes gcFadeOverlay {\n            0% { opacity: .5; transform: translate(100%, 0); }\n          }\n          @keyframes gcFadeOverlayBg {\n            0% { opacity: 0; }\n          }\n          .graphcomment-overlay {\n            background: ").concat(params.theme === "light" ? "#fff" : "#222", "; box-sizing: border-box;\n            max-width: ").concat(params.overlay_width, "px; height: 100%; width: 100%; display: none;\n            position: fixed; z-index: ").concat(params.overlay_zindex, ";\n            ").concat(isMobile() ? "overflow: scroll; -webkit-overflow-scrolling: touch;" : "", "\n            border-left: 1px solid ").concat(params.theme === "light" ? "#ddd" : "#222", ";\n            right: 0;\n            animation: gcFadeOverlay ease-in-out 300ms backwards;\n            transition: opacity 50ms ease-in-out 50ms, transform 100ms ease-in-out;\n          }\n          .graphcomment-overlay.fade-out {\n            opacity: 0;\n            transform: translate3d(100%, 0, 0);\n          }\n          .graphcomment-overlay.fade-in iframe,\n          .graphcomment-overlay.fade-out iframe {\n            display: none !important;\n          }\n          .graphcomment-overlay-background {\n            position: fixed; z-index: ").concat(params.overlay_zindex - 1, ";\n            top: 0; left: 0;\n            width: 100%; height: 100%;\n            display: none; background: ").concat(params.overlay_background === true ? "rgba(0, 0, 0, .5)" : params.overlay_background, ";\n            animation: gcFadeOverlayBg ease-in 200ms backwards;\n          }\n          /** large desktop **/\n          @media (min-width: ").concat(params.overlay_width * 2 + params.overlay_page_width, "px) {\n            .graphcomment-overlay {\n              max-width: ").concat(Math.min((window.innerWidth - params.overlay_page_width) / 2, 980), "px;\n            }\n          }\n          /** desktop **/\n          @media (min-width: ").concat(mobileVersionStartingAt + 1, "px) {\n            .graphcomment-overlay .gc-close-cross {\n              display: flex;\n              padding: 12px 14px 12px 12px;\n            }\n            .graphcomment-overlay .gc-close-chevron {\n              display: none !important;\n            }\n            .gc-close:hover {\n              background: #fff;\n            }\n          }\n          /** mobile **/\n          @media (max-width: ").concat(mobileVersionStartingAt, "px) {\n            .gc-close {\n              position: fixed;\n              left: 0; right: initial;\n              background: #444; border: none;\n              margin-top: 0; border-radius: 0 0 5px 0;\n            }\n            .gc-close-cross {\n              display: none;\n            }\n          }\n          .graphcomment-overlay iframe {\n            background: ").concat(params.theme === "light" ? "#fff" : "#222", ";\n            box-shadow: ").concat(params.theme === "light" ? "0 0 10px rgba(188, 188, 188, 0.8)" : "0 0 10px rgba(0, 0, 0, 0.8)", ";\n            ").concat(isMobile() ? "" : "max-height: 100%;", " min-height: 100%;\n          }\n        ");
                stylesheet.innerHTML = overlayCss;
            };

            var resize = function resize() {
                updateOverlayCss(overlayStyle);
                if (typeof oldResize === "function") oldResize();
            };

            var mobileVersionStartingAt = params.overlay_width + 40;
            var overlayStyle = document.createElement("style");
            overlayStyle.type = "text/css";
            document.body.appendChild(overlayStyle);
            updateOverlayCss(overlayStyle); // update css when resizing iframe too

            var oldResize = window.onresize;
            window.onresize = resize; // in case there's no fixed header, put default value

            if (!thread.top) thread.style.top = 0;
            var crossIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAP1JREFUeNqU1DEOgzAMAECDMjD1JexIfQAP6lT4QEFInXkJSF06d4aXdGKsjRJkqsRxLLklDT4ZxTRblgVsVJhPzBvmB3Rx1JRludfkbOOFebXflRI7atZ13Wsy7NBtXNjNX8xa6DRYQx1Ofxtg16FOfZirmQgcAl340BDmYjD40dnFQ0Bru5awBg+mM3ahQSGG0YVhP8ZQiGF8bDjagD5OmA9MQRv2VCJI8cbcBGyz94AGdKNRCGARmtNcObTBOXWvnA9MwYJorsQa4aBOqFFi/DQfArr/OcwJWBfpdCZwTJmzCDoS2GL2SkxCe3xrWncod4bGMB9KGBnwE2AAREpUyw1JGzUAAAAASUVORK5CYII=";
            thread.insertAdjacentHTML("afterbegin", '<div class="gc-close gc-close-cross" onClick="hideGraphComment()">' + '<img src="' + crossIcon + '" style="width: 10px; height: 10px; cursor: pointer;">' + "</div>");
            var chevronIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB2aWV3Qm94PSIwIDAgNTc0LjM3MzI5IDExNTcuMDI0MDM3NSIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg3MS4yNDUsLTE5ODIuMDg3OSkiPjxwYXRoIHN0eWxlPSIiIGQ9Im0gLTE2MzkuOTk3MSwyNjc2LjQ1NjggLTIzMS4yNDc5LC0yMzEuMjUwNCAyMzEuNTU5MiwtMjMxLjU1OTIgMjMxLjU1OTIsLTIzMS41NTkzIDU1LjYyNzUsNTUuNjE2OSBjIDMwLjU5NTEsMzAuNTg5MyA1NS42Mjc0LDU2LjE4MSA1NS42Mjc0LDU2Ljg3MDUgMCwwLjY4OTUgLTc4LjYwODYsNzkuODYzNyAtMTc0LjY4NTgsMTc1Ljk0MjggbCAtMTc0LjY4NTksMTc0LjY4OTEgMTc0LjY4NTksMTc0LjY4OTIgYyA5Ni4wNzcyLDk2LjA3OTEgMTc0LjY4NTgsMTc1LjI1MzMgMTc0LjY4NTgsMTc1Ljk0MjggMCwxLjIyOCAtMTEwLjAzNTEsMTExLjg2OCAtMTExLjI1NjUsMTExLjg2OCAtMC4zNDE2LDAgLTEwNC42ODI2LC0xMDQuMDYyNiAtMjMxLjg2ODksLTIzMS4yNTA0IHoiIGZpbGw9IiNkM2QzZDMiLz48L2c+PC9zdmc+";
            thread.insertAdjacentHTML("afterend", '<div class="gc-close gc-close-chevron" onClick="hideGraphComment()">' + '<img src="' + chevronIcon + '" style="width: 20px; height: 20px; cursor: pointer;">' + "</div>");

            if (params.overlay_button) {
                var buttonCss = "background: " + params.overlay_button_background + "; border: none; padding: 0;" + "border-radius: 3px; color: " + params.overlay_button_color + "; text-transform: uppercase;" + "display: flex; cursor: pointer; margin: 10px auto;" + "max-width: " + params.overlay_button_width + "; width: 100%; text-decoration: none;";
                var buttonLabels = {
                    fr: "Lire et réagir",
                    zh: "阅读并做出反应",
                    cz: "Přečtěte si a reagujte",
                    en: "Read and react",
                    de: "Lesen und Reagieren",
                    he: "לקרוא ולהגיב",
                    it: "Lettura e reazione",
                    fa: "خواندن و واکنش نشان دهید",
                    pt: "Leitura e reação",
                    es: "Lectura y reacción"
                };
                var buttonLabel = buttonLabels[lang] || buttonLabels.en;
                var hasButtonLink = params.overlay_button_link || params.overlay_button_mobile_link;
                var buttonLink = hasButtonLink ? isMobile() ? params.overlay_button_mobile_link : params.overlay_button_link : null;
                var buttonClick = hasButtonLink ? 'href="' + buttonLink + '"' : 'onClick="showGraphCommentOverlay()"';
                var buttonHtml = '<div class="graphcomment-button">' + '<a style="' + buttonCss + '" ' + buttonClick + ">" + '<span style="padding: 8px 12px 8px; background: rgba(0, 0, 0, .1); display: flex; align-items: center; border-radius: 3px 0 0 3px">' + '<svg style="width: 18px; margin-right: 6px; " fill="' + params.overlay_button_color + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25">    <path d="M16.98 8.867a9.5 9.5 0 0 1 1.426.11.261.261 0 0 0 .297-.228c.029-.224.045-.45.047-.675 0-4.164-4.088-7.553-9.115-7.553C4.61.52.521 3.91.521 8.074a6.83 6.83 0 0 0 2.34 5.051L1.09 16.227a.52.52 0 0 0 .645.743l4.62-1.85c.484.155.979.273 1.48.355a.26.26 0 0 0 .296-.195c.885-3.613 4.577-6.413 8.848-6.413z"/> <path d="M16.98 10.43c-4.063 0-7.5 2.975-7.5 6.498a6.5 6.5 0 0 0 3.08 5.397 7.455 7.455 0 0 0 6.92.644l3.734 1.476a.58.58 0 0 0 .704-.774l-.869-3.074a5.39 5.39 0 0 0 1.43-3.669c0-3.523-3.437-6.499-7.5-6.499z"/></svg>' + '<span class="count"></span>' + "</span>" + '<span style="width: 100%; padding: 8px 12px 8px; font-weight: bold; text-align: center; align-self: center;">' + (params.overlay_button_label || buttonLabel) + "</span>" + "</a>" + "</div>"; // append buttons only once

                if (!document.querySelector(".graphcomment-button")) {
                    if (params.overlay_button_target) {
                        if (params.overlay_button_target instanceof NodeList) {
                            [].forEach.call(params.overlay_button_target, function (btn) {
                                btn.insertAdjacentHTML("afterbegin", buttonHtml);
                            });
                        } else {
                            params.overlay_button_target.insertAdjacentHTML("afterbegin", buttonHtml);
                        }
                    } else {
                        thread.insertAdjacentHTML("beforebegin", buttonHtml);
                    }
                }

                graphcomment_comment_count(params, function (count) {
                    var btnsCount = document.querySelectorAll(".graphcomment-button .count");
                    [].forEach.call(btnsCount, function (btnCount) {
                        btnCount.textContent = count;
                    });
                });
            }

            if (params.overlay_bubble && !isMobile()) {
                var bubblePlacement = params.overlay_bubble_placement;
                var bubbleCss = "background: " + params.overlay_bubble_background + "; border: none; padding: 0; color: " + params.overlay_bubble_color + "; text-transform: uppercase;" + "display: flex; align-items: center; justify-content: center; cursor: pointer; position: fixed;" + Object.keys(bubblePlacement).map(function (prop) {
                    return prop + ": " + bubblePlacement[prop] + ";";
                }).join(" ") + "width: 45px; height: 45px; border-radius: 50%; cursor: pointer; z-index: " + params.overlay_bubble_zindex + ";";

                if (!document.querySelector("#graphcomment-bubble")) {
                    document.body.insertAdjacentHTML("beforeend", '<div id="graphcomment-bubble" style="' + bubbleCss + '" onClick="showGraphCommentOverlay()">' + '<svg style="width: 30px; height: 30px" fill="' + params.overlay_bubble_color + '" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px"><title>25</title><path d="M45.878,74.90678A47.693,47.693,0,0,0,59.8786,76.95692a49.4952,49.4952,0,0,0,8.08019-.66006c7.04034,9.64043,18.82088,9.62041,22.211,9.39042a.508.508,0,0,0,.37-.81009c-1.6501-2.21006-6.1802-9.26042-3.60014-16.90064C91.97985,63.68632,95,58.17608,95,52.17581c0-9.08035-6.91021-17.01074-17.22072-21.33088a27.61251,27.61251,0,0,1,2.47008,11.40052C80.24936,58.83614,65.28875,72.60676,45.878,74.90678Z"/><path d="M40.12225,14.25431C20.72474,14.25431,5,26.7883,5,42.24979,5,49.03414,8.02876,55.254,13.06572,60.09944c2.57451,8.63184-1.94772,16.58873-3.59928,19.09348a.58275.58275,0,0,0,.37044.9108c3.38943.25764,15.16954.28407,22.21215-10.61026a43.77036,43.77036,0,0,0,8.07322.7518c19.39745,0,35.12225-12.534,35.12225-27.99547S59.5197,14.25431,40.12225,14.25431Z"/></svg>' + "</div>");
                }
            }

            var closeIconMobile = document.querySelector(".gc-close-chevron");

            if (params.overlay_background) {
                var bgHtml = '<div class="graphcomment-overlay-background"></div>';
                thread.insertAdjacentHTML("beforebegin", bgHtml);
                var overlayBackground = document.querySelector(".graphcomment-overlay-background");
            }

            window.showGraphCommentOverlay = function (width) {
                thread.classList.add("graphcomment-overlay", "fade-in");
                if (overlayBackground) overlayBackground.style.display = "block";

                if (iframeBuilder) {
                    var iframe = iframeBuilder.getIframe();
                    iframe.src = iframe.src.replace("overlay=false", "overlay=true");
                    iframe.src = iframe.src.replace("hidden=true", "hidden=false");
                }

                setTimeout(function () {
                    thread.classList.remove("fade-in");
                    thread.style.display = "block";
                    setTimeout(function () {
                        if (isOverlayMobileVersion()) {
                            closeIconMobile.style.display = "block";
                            document.body.classList.add("gc-noscroll");
                        }
                    }, 1000);
                }, 500);
            };

            window.showGraphComment = function () {
                thread.classList.add("fade-out");

                if (iframeBuilder) {
                    var iframe = iframeBuilder.getIframe();
                    iframe.src = iframe.src.replace("overlay=true", "overlay=false");
                    iframe.src = iframe.src.replace("hidden=true", "hidden=false");
                }

                setTimeout(function () {
                    thread.classList.remove("graphcomment-overlay", "fade-out");
                }, 500);
            };

            window.hideGraphComment = function () {
                closeIconMobile.style.display = "none";
                if (overlayBackground) overlayBackground.style.display = "none";
                document.body.classList.remove("gc-noscroll");

                if (params.overlay_alternate) {
                    window.showGraphComment();
                } else {
                    thread.style.display = "none";
                    params.hidden = true;
                }
            };

            if (params.overlay_visible) {
                if (isMobile()) window.showGraphComment();else window.showGraphCommentOverlay();
            } else if (!params.overlay_alternate) {
                if (query_string.comment_id) {
                    if (buttonLink) {
                        window.location.href = addParamsToUrl(buttonLink, {
                            comment_id: query_string.comment_id
                        });
                    } else {
                        window.showGraphCommentOverlay();
                    }
                } else {
                    window.hideGraphComment();
                }
            } else if (query_string.comment_id) {
                window.showGraphCommentOverlay();
            }
        }

        var iframeBuilder = new IframeBuilder(win, doc, amp);
        var iframe = thread.appendChild(iframeBuilder.getIframe());
        var paramsCopy = JSON.parse(JSON.stringify(params));

        if (amp) {
            iframeBuilder.customAmpIframe(front_url, paramsCopy);
        } else {
            iframeBuilder.customIframe(front_url, paramsCopy);
        }

        iframeBuilder.postCreation();
        var consoleCmds = ["gcSetLang", "gcToggleCommentScores", "gcLightTheme", "gcDarkTheme", "gcDebugAds"];

        for (var i = 0; i < consoleCmds.length; i++) {
            var cmd = consoleCmds[i];

            (function (cmd) {
                window[cmd] = function () {
                    var args = Array.prototype.slice.call(arguments);
                    var iframe = iframeBuilder.getIframe();
                    var iframeWindow = iframe.contentWindow || iframe.contentDocument;
                    iframeWindow.postMessage(JSON.stringify({
                        info: "cmd",
                        cmd: cmd,
                        args: args
                    }), "*");
                };
            })(cmd);
        }
    } else {
        var iframeBuilder = new IframeBuilder(win, doc, amp);
        return iframeBuilder.createIframeUrl(front_url, params);
    }
    /**
     * IdentifierBuilder
     * @constructor
     */


    function IdentifierBuilder() {
        var origin = null;
        var value = null;

        this.init = function (anUrl) {
            origin = anUrl;
            value = origin;
            return this;
        };

        this.sanitize = function () {
            if (!value) return "";
            this.removeEndingSlash().removeProtocol();
            return value;
        };

        this.reset = function () {
            value = origin;
        };

        this.removeEndingSlash = function () {
            value = value.replace(/\/+$/, "");
            return this;
        };

        this.removeProtocol = function () {
            value = value.replace(/^.*?:\/\//, "");
            return this;
        };
    }
    /**
     * Extractor
     * @param eWin The window
     * @constructor
     */


    function Extractor(eWin, eDoc) {
        var identifierBuilder = new IdentifierBuilder();

        this.extractTitle = function () {
            return typeof eDoc !== "undefined" && eDoc.title;
        };

        this.ieCompatibility = function () {
            if (!eWin.location.origin) {
                eWin.location.origin = eWin.location.protocol + "//" + eWin.location.hostname + (eWin.location.port ? ":" + eWin.location.port : "");
            }
        };

        this.extractUrl = function () {
            this.ieCompatibility(); // add p= and page=

            return addParamsToUrl(eWin.location.origin + eWin.location.pathname, {
                p: query_string.p,
                page: query_string.page
            });
        };

        this.extractIdentifier = function (aUrl) {
            return identifierBuilder.init(aUrl).sanitize();
        };
    }

    function getBrowserLanguage() {
        var DEFAULT_LANGUAGE = "en";
        var html = doc.querySelector("html");
        var meta = doc.querySelector("meta[name=language]") || doc.querySelector("meta[http-equiv=content-language]");
        var language = html.getAttribute("lang") || html.getAttribute("xml:lang") || meta && meta.getAttribute("content") || DEFAULT_LANGUAGE;

        if (language.indexOf("-") !== -1 && /^[\w]{2}/.test(language)) {
            return language.slice(0, 2);
        } else if (/^[\w]{2}/.test(language)) {
            return language;
        } else {
            return DEFAULT_LANGUAGE;
        }
    }

    (function () {
        var withDebug = function () {
            if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object") return false;
            var search = window.location && window.location.search;
            return /withDebug/.test(search);
        }();

        var debug = withDebug ? console.log : function () {};

        function sendVisibility(iframe) {
            iframe.postMessage(JSON.stringify({
                info: "gc_visible"
            }), "*");
        }

        function iframeVisibility(iframe) {
            var myImg = document.querySelector('#gc-iframe');
            var observer = new IntersectionObserver(function (entries, observer) {
                var entry = entries[0];

                if (entry.isIntersecting) {
                    sendVisibility(iframe);
                    observer.disconnect();
                }
            });
            observer.observe(myImg);
        }

        ;
        window.visibility = iframeVisibility;
    })();
    /**
     * IframeBuilder
     * @param eWin The Window
     * @param eDoc The Document
     * @param amp
     * @constructor
     */


    function IframeBuilder(eWin, eDoc, amp) {
        var IFRAME_ID = "gc-iframe";
        var iframe = {};

        if (typeof window !== "undefined" && eDoc) {
            var fixedHeaderHeightUpdate = function fixedHeaderHeightUpdate() {
                var height = params.fixed_header_height;
                if (typeof height === "undefined") return;

                if (thread && thread.classList.contains("graphcomment-overlay")) {
                    thread.style.top = thread.top = height + "px";
                    thread.style.height = "calc(100% - " + height + "px)";
                    if (closeIconMobile) closeIconMobile.style.top = height + "px";
                    if (overlayBackground) overlayBackground.style.top = height + "px";
                }

                if (iframeWindow && height !== prevHeaderHeight) {
                    iframeWindow.postMessage(JSON.stringify({
                        info: "fixed-header-height",
                        height: height
                    }), "*");
                }

                prevHeaderHeight = height;
            };

            if (amp === true) {
                iframe = eDoc.createElement("amp-iframe");
            } else {
                iframe = eDoc.createElement("iframe");
            }

            iframe.id = IFRAME_ID;
            var iframeWindow;
            win.addEventListener("message", function (event) {
                try {
                    var event = event.data;
                    if (event.pid && event.pid !== pid) return;

                    if (event.name === "gc-height") {
                        // Iframe auto-resize
                        iframe.height = event.data.height;
                    } else if (event.name === "gc-token") {
                        try {
                            if (event.data.gcToken) {
                                storageProvider.setItem("gc_token", event.data.gcToken);
                            } else {
                                storageProvider.removeItem("gc_token");
                            }
                        } catch (e) {}
                    } else if (event.name === "gc-scroll") {
                        var offset = isMobile() ? 40 : 0;
                        scrollParent(iframe, event.data.scrollTo - offset, event.data.duration);
                    } else if (event.name === "gc-redirect") {
                        window.location.href = event.data.url;
                    } else if (event.name === "gc-getFrameElementTop") {
                        event.source.postMessage(JSON.stringify({
                            info: "frameElementTop",
                            top: frameElementTop
                        }), event.origin);
                    }

                    if (event.name === "gc-new-comment") {
                        if (window.gcOnComment && typeof window.gcOnComment === "function") {
                            window.gcOnComment(event.data);
                        }
                    }

                    if (event.name === "gc-sso-auth") {
                        if (!window.gcSsoAuth || typeof window.gcSsoAuth !== "function") {
                            alert("[graphcomment] Your SSO is enabled but it's not configured yet. You need to define gcSsoAuth() to provide a way to authenticate your user.");
                        }

                        window.gcSsoAuth();
                    }

                    if (event.name === "gc-sso-conflict") {
                        if (!window.gcSsoConflict || typeof window.gcSsoConflict !== "function") {
                            alert("[graphcomment] Your SSO is enabled but it's not configured yey. you need to define gcSsoConflict() to provide a way for your users to change conflicting username.");
                        }

                        window.gcSsoConflict();
                    } else if (event.name === "gc-ready") {
                        if (window.onGcLoaded && typeof window.onGcLoaded === "function") {
                            window.onGcLoaded();
                        }
                    } else if (event.name === "gc-loaded") {
                        // pass sso_data through postMessage instead of GET param, for security
                        if (typeof gc_params.sso_data !== "undefined") {
                            if (gc_params.sso_data && gc_params.sso_data !== "") win.gcSsoLogin(gc_params.sso_data);else win.gcSsoLogout();
                        } // detect if user has scrolled until GC


                        var iframeEl = iframeBuilder.getIframe();
                        if (iframeEl.parentNode && iframeEl.parentNode.style.display === "none") return;
                        var wasInViewPort;
                        var interval = setInterval(function () {
                            var inViewport = isElementInViewport(iframeEl);

                            if (inViewport && wasInViewPort) {
                                clearInterval(interval);
                                iframeWindow.postMessage(JSON.stringify({
                                    info: "in_viewport"
                                }), "*");
                            }

                            wasInViewPort = inViewport;
                        }, 1000); // check for header height every x seconds

                        if (win) {
                            setInterval(fixedHeaderHeightUpdate, 1000);
                            fixedHeaderHeightUpdate();
                        } // on iOS we store the token on the parent page
                        // (because of third party cookie/storage restrictions)


                        var gcToken;

                        try {
                            gcToken = storageProvider.getItem("gc_token");
                        } catch (e) {}

                        if (gcToken) {
                            iframeWindow.postMessage(JSON.stringify({
                                info: "gc_token",
                                token: encodeURIComponent(gcToken)
                            }), "*");
                        }

                        if (gc_params.token) {
                            iframeWindow.postMessage(JSON.stringify({
                                info: "gc_token",
                                token: encodeURIComponent(gc_params.token)
                            }), "*");
                        }

                        visibility(iframeWindow);
                    }
                } catch (e) {
                    console.debug("[gc] failed to decode message: " + event.data, e);
                }
            }, false); // check for all elements in the page to see if there's a fixed header

            var prevHeaderHeight;

            win.gcSsoLogout = function () {
                iframeWindow.postMessage(JSON.stringify({
                    info: "sso-logout"
                }), "*");
                storageProvider.removeItem("gc_token");
            };

            win.gcSsoLogin = function (ssoData) {
                iframeWindow.postMessage(JSON.stringify({
                    info: "sso-login",
                    data: ssoData
                }), "*");
            };
        }

        this.postCreation = function () {
            var iframeFound = eDoc.getElementById(IFRAME_ID);
            iframeWindow = iframeFound.contentWindow || iframeFound.contentDocument;
            window.iframeFound = iframeFound;

            function postMessageParentLoaded() {
                if (amp) return;
                iframeWindow.postMessage(JSON.stringify({
                    info: "parent_loaded"
                }), "*");
            }

            if (eDoc.readyState === "complete") {
                postMessageParentLoaded();
            } else {
                eDoc.addEventListener("DOMContentLoaded", postMessageParentLoaded());
            }

            !amp && win.addEventListener("scroll", debounce(function () {
                var threadPos = {
                    top: thread.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
                    left: thread.getBoundingClientRect().left - document.body.getBoundingClientRect().left
                };
                iframeWindow.postMessage(JSON.stringify({
                    info: "scroll-start",
                    win: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    pos: {
                        top: (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) - threadPos.top,
                        left: (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0) - threadPos.left
                    }
                }), "*");
            }, 500, true), false);
            !amp && win.addEventListener("scroll", debounce(function () {
                var threadPos = {
                    top: thread.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
                    left: thread.getBoundingClientRect().left - document.body.getBoundingClientRect().left
                };
                iframeWindow.postMessage(JSON.stringify({
                    info: "scroll-end",
                    win: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    pos: {
                        top: (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) - threadPos.top,
                        left: (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0) - threadPos.left
                    }
                }), "*");
            }, 500), false);
        };

        this.getIframe = function () {
            return iframe;
        };

        this.customIframe = function (front_url, iframe_params) {
            iframe.src = this.createIframeUrl(front_url, iframe_params);
            iframe.frameBorder = "0";
            iframe.style.cssText = "width:100% !important; border:none !important; max-width: 980px; margin: 0 auto; display: block;";
            iframe.scrolling = "no";
            iframe.horizontalscrolling = "no";
            iframe.verticalscrolling = "no";
            iframe.allowtransparency = "true";

            if (params.widget) {
                iframe.height = "auto";
                iframe.style.marginBottom = "20px";
            } else {
                iframe.height = params.overlay ? "100%" : "400px";
            }
        };

        this.customAmpIframe = function (front_url, iframe_params) {
            iframe.setAttribute("src", this.createIframeUrl(front_url, iframe_params));
            iframe.setAttribute("width", "600");
            iframe.setAttribute("height", "400");
            iframe.setAttribute("layout", "responsive");
            iframe.setAttribute("title", iframe_params.title);
            iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-modals allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-forms");
            iframe.setAttribute("resizable", "");
            iframe.setAttribute("frameBorder", "0");
            iframe.insertAdjacentHTML("beforeend", '<div overflow tabindex=0 role=button aria-label="">Read more...</div>');
        };

        this.createIframeUrl = function (front_url, iframe_params) {
            var created_url = front_url + "/"; // add them anyway, they won't be added if the comment_id is absent

            if (query_string) {
                iframe_params.comment_id = query_string.comment_id || params.comment_id;
                iframe_params.token = query_string.token;
            }

            if (params.count_per_page) {
                iframe_params.count_per_page = params.count_per_page;
            } // remove all params linked to overlay


            delete iframe_params.target;

            for (var key in iframe_params) {
                if (key.indexOf("overlay_") === 0) delete iframe_params[key];
            }

            if (win) {
                iframe_params.overlay = thread.classList.contains("graphcomment-overlay");
                iframe_params.mobile = isMobile();
            }

            iframe_params.lang = lang;
            iframe_params.cache = Math.round(Math.random() * 10e8);
            iframe_params.pid = pid; // add all the parameters in the query

            created_url = addParamsToUrl(created_url, iframe_params);
            return created_url;
        };
    }
    /**
     * QueryString
     * @returns {*}
     * @constructor
     */


    function QueryString() {
        var query = win.location.search.substring(1);
        if (!query) return {};
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("="); // If first entry with this name

            if (typeof this[pair[0]] === "undefined") {
                this[pair[0]] = pair[1]; // If second entry with this name
            } else if (typeof this[pair[0]] === "string") {
                this[pair[0]] = [this[pair[0]], pair[1]]; // If third or later entry with this name
            } else {
                this[pair[0]].push(pair[1]);
            }
        }
    }

    function addParamsToUrl(created_url, url_params) {
        var appender = "?"; // add all the parameters in the query

        Object.keys(url_params || {}).forEach(function (paramKey) {
            if (!url_params.hasOwnProperty(paramKey) || !url_params[paramKey] && url_params[paramKey] !== false) {
                return; // skip this param if undefined, null or empty
            }

            created_url = created_url + appender + paramKey + "=" + encodeURIComponent(url_params[paramKey]);

            if (appender === "?") {
                appender = "&";
            }
        });
        return created_url;
    }

    function scrollParent(iframe, insideIFrameTop, duration) {
        var from = win.pageYOffset || 0;
        var parentTarget = getTargetPosition();
        var t;
        var t0 = Date.now();
        var scroll = thread && thread.classList.contains("graphcomment-overlay") ? thread : win;
        duration = isNaN(duration) ? 800 : duration || 0;

        if (duration === 0) {
            win.scrollTo(0, parentTarget);
            return;
        }

        requestAnimationFrame(step);

        function step() {
            t = Date.now() - t0;
            t = t > duration ? duration : t;
            scroll.scrollTo(0, easeOutQuart(t, from, parentTarget - from, duration));

            if (t < duration) {
                requestAnimationFrame(step);
            }
        }

        function getTargetPosition() {
            return iframe.getBoundingClientRect().top + (win.pageYOffset || 0) + insideIFrameTop;
        }
    }

    function easeOutQuart(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;

            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

function graphcomment_widget(gc_params) {
    gc_params.widget = true;
    graphcomment(gc_params);
}

function graphcomment_comment_count(params, cb) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 200) {
                try {
                    var resp = JSON.parse(this.responseText);
                } catch (e) {
                    console.error('[graphcomment counter] fail to decode response "' + this.responseText + '", using url "' + params.url + '"');
                    return;
                } // write count


                if (typeof resp.count !== "undefined") {
                    cb(resp.count);

                    if (resp.website.websocket && resp.website.websocket.notification) {
                        var count = resp.count;
                        initWs(resp.thread, function () {
                            count++;
                            cb(count);
                        });
                    } else {
                        setTimeout(function () {
                            graphcomment_comment_count(params, cb);
                        }, 30 * 1000);
                    }
                }
            } else if (this.status === 400) {
                console.error('[graphcomment counter] invalid url "' + params.url + '", this url is not rattached to a GraphComment page.');
            }
        }
    };

    var query = "website=" + encodeURIComponent(params.website_id) + "&url=" + encodeURIComponent(params.url) + (params.uid ? "&uid=" + encodeURIComponent(params.uid) : "") + (params.guid ? "&guid=" + encodeURIComponent(params.guid) : "");
    req.open("GET", "https://graphcomment.com/api/pub/numberOfComments?" + query, true);
    req.send();

    function initWs(threadId, cb) {
        var ws = new WebSocket("wss://graphcomment.com/websocket");

        ws.onerror = function (err) {
            return console.error("WS error", err);
        };

        ws.onmessage = function (event) {
            try {
                var json = JSON.parse(event.data);
            } catch (e) {
                console.error("unable to parse WS event", event.data);
                return;
            }

            cb(json);
        }.bind(this);

        ws.onopen = function () {
            this.send(JSON.stringify({
                joinThread: threadId
            }));
        };
    }
}

function graphcomment_counter() {
    // get all counters
    var counters = document.querySelectorAll(".gc-counter");
    Array.prototype.forEach.call(counters, function (counter) {
        var url = counter.dataset.url || "/";
        var uid = counter.dataset.uid;
        var guid = counter.dataset.guid;
        graphcomment_comment_count({
            url: url,
            uid: uid,
            guid: guid,
            website_id: gc_params.graphcomment_id
        }, function (count) {
            counter.textContent = count;
        });
    });
}

window.graphcommentNotifs = function (params) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 200) {
                try {
                    var resp = JSON.parse(this.responseText);
                } catch (e) {
                    console.error('[graphcomment notifs] fail to decode response "' + this.responseText);
                    return;
                }

                if (params.callback) params.callback(resp);
            }
        }
    };

    var api_public_key = gc_params.sso_public_key || gc_params.api_public_key;
    var sso_data = gc_params.sso_data;
    var url = "https://graphcomment.com/api/pub/notifications/pubkey/" + api_public_key + "/key/" + sso_data;
    url += "?page_nbr=" + params.page || 0;
    url += "&page_size=" + params.limit || 10;
    url += "&action=" + (params.actions || ["pinned", "voted", "replied", "ecd", "reward", "complete", "reco"]).join(",");
    req.open("GET", url, true);
    req.send();
};

window.graphcommentNotifsWs = function (callback) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 200) {
                try {
                    var resp = JSON.parse(this.responseText);
                } catch (e) {
                    console.error('[graphcomment notifs ws] fail to decode response "' + this.responseText);
                    return;
                }

                initWebsocket(resp.website, resp.userId);
            }
        }
    };

    var api_public_key = gc_params.sso_public_key || gc_params.api_public_key;
    var sso_data = gc_params.sso_data;
    req.open("GET", "https://graphcomment.com/api/pub/user-datas/pubkey/" + api_public_key + "/key/" + sso_data, true);
    req.send();

    function initWebsocket(websiteId, userId) {
        var ws = new WebSocket("wss://graphcomment.com/websocket");

        ws.onopen = function () {
            ws.send(JSON.stringify({
                joinUser: websiteId + userId
            }));
        };

        ws.onmessage = function (event) {
            try {
                var json = JSON.parse(event.data);
            } catch (e) {
                console.error("unable to parse WS event", event.data);
                return;
            }

            callback(json.msg);
        };
    }
};

if (typeof module !== "undefined") {
    module.exports = function (params) {
        if (!params.url) throw 'you must provide "url" parameter (full url of your page with GraphComment)';
        if (!params.page_title) throw 'you must provide "page_title" parameter (title of your page with GraphComment)';
        return graphcomment(params);
    };
} else {
    if (window.gc_params || window.graphcomment_id) {
        var gc_params = window.gc_params || {};
        if (window.graphcomment_id) gc_params.graphcomment_id = window.graphcomment_id;
        graphcomment(gc_params);
        graphcomment_counter();
    } // deprecated


    if (window.gc_ready && typeof window.gc_ready === "function") {
        window.gc_ready();
    }

    if (window.gcReady && typeof window.gcReady === "function") {
        window.gcReady();
    }
}