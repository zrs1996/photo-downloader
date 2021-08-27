/* global chrome */
const sendMessage = chrome.extension.sendMessage;
const reciver = chrome.extension.onMessage;

// chrome.browserAction.setPopup({
//   popup: "./popup/index.html"
// })

reciver.addListener(function (req, sender, back) {
  console.log("reciver", req);
  onRequest(req, sender, back);
});

function onRequest(e) {
  console.log("e", e);
  switch (e.type) {
    case "open_page":
      if (!e.tab) {
        chrome.windows.create({
          url: e.targetUrl,
        });
        console.log("create a new tab");
      } else {
        console.log("do not need create");
      }
      break;
    case "RETURN_PAGE":
      console.log("case RETURN_PAGE");
      getAllImgs(e);
      break;
    case "download_current_page":
      console.log("case download_current_page");
      chrome.tabs.sendMessage(e.tab.id, { type: "GET_PAGE" }, function() {
        console.log('tabs.sendMessage');
      });
      break;
    default:
      break;
  }
}

function download(tab) {
  chrome.downloads.onChanged.addListener((res) => {
    console.log("downloads.onChanged", res);
  });
}

function getAllImgs(info) {
  console.log('info', info);
}

function getAllBgImages () {
  var e,
    t = [],
    n = document.getElementsByTagName("*");
  for (n = t.slice.call(n, 0, n.length); n.length; )
    (e = utils.deepCss(n.shift(), "background-image")) &&
      (e = /url\(['"]?([^")]+)/.exec(e) || []),
      (e = e[1]) &&
        !e.match(/:\/\//) &&
        (e = e.match(/^\/\//)
          ? location.protocol + e
          : e.match(/^\/[^/]/)
          ? location.protocol + "//" + location.host + e
          : location.href.replace(/[^/]+$/, e)),
      e && -1 == t.indexOf(e) && (t[t.length] = e);
  return t;
}

// (function () {
//   function e() {
//     var e = [];
//     document.querySelectorAll("img").forEach(function (t, i) {
//       e.push(t.src);
//     });
//     for (
//       var t = document.getElementsByTagName("input"), i = 0;
//       i < t.length;
//       i++
//     ) {
//       var n = t[i];
//       if ("IMAGE" == n.type.toUpperCase()) {
//         var a = n.src;
//         e.push(a);
//       }
//     }
//     var r = document.getElementsByTagName("a");
//     for (i = 0; i < r.length; i++) {
//       var o = r[i].href;
//       o.match(".(jpg|jpeg|bmp|ico|gif|png)\b") && e.push(o);
//     }
//     return e;
//   }
//   return {
//     getImage: function (t) {
//       if (this.config)
//         if (void 0 !== manager.aiparser) manager.aiparser(t);
//         else {
//           var i = utils.getAllBgImages(),
//             n = [];
//           e()
//             .concat(i)
//             .forEach(function (e, t) {
//               e && -1 == n.indexOf(e) && n.push(e);
//             }),
//             n.forEach(function (e, i) {
//               new ParsedPItem({ src: e }, i, t, function (e) {
//                 chrome.runtime.sendMessage({
//                   cmd: "ADD_IMG",
//                   tabId: t.id,
//                   item: e,
//                 });
//               });
//             });
//         }
//       else this.waiting = !0;
//     },
//     getImage2: function (t, i) {
//       if (this.config)
//         if (void 0 !== manager.aiparser) manager.aiparser(t);
//         else {
//           var n = utils.getAllBgImages(),
//             a = [];
//           e()
//             .concat(n)
//             .concat(i)
//             .forEach(function (e) {
//               e && -1 == a.indexOf(e) && a.push(e);
//             }),
//             a.forEach(function (e, i) {
//               new ParsedPItem({ src: e }, i, t, function (e) {
//                 chrome.runtime.sendMessage({
//                   cmd: "ADD_IMG",
//                   tabId: t.id,
//                   item: e,
//                 });
//               });
//             });
//         }
//       else this.waiting = !0;
//     },
//     getImage3: function (t, i) {
//       if (this.config) {
//         chrome.runtime.sendMessage({
//           cmd: "GA",
//           category: "download",
//           action: "domain",
//           opt_label: utils.getDomainFromUrl(t.url),
//         });
//         var n = 0;
//         if (
//           (void 0 !== manager.aiparser &&
//             ((n = manager.aiparser(t)),
//             chrome.runtime.sendMessage({
//               cmd: "GA",
//               category: "aiscript",
//               action: "domain",
//               opt_label: utils.getDomainFromUrl(t.url),
//             })),
//           void 0 === manager.aiparser || -1 == n)
//         ) {
//           var a = getSiteScript();
//           if (!a) {
//             var r = e(),
//               o = utils.getAllBgImages(),
//               s = [];
//             return (
//               r
//                 .concat(o)
//                 .concat(i)
//                 .forEach(function (e, t) {
//                   e && -1 == s.indexOf(e) && s.push(e);
//                 }),
//               s
//             );
//           }
//           a();
//         }
//       } else this.waiting = !0;
//     },
//     listenShortKey: function () {
//       manager.config.enableShortkey &&
//         (manager.config.shortKeyCurrent || manager.config.shortKeyAll) &&
//         document.addEventListener(
//           "keydown",
//           function (e) {
//             var t = e.keyCode;
//             if (!e.ctrlKey && e.altKey)
//               switch (t) {
//                 case manager.config.shortKeyCurrent.charCodeAt(0):
//                   chrome.runtime.sendMessage({
//                     cmd: "GET_CURRENT_TAB_IMAGE",
//                     from: "shortkey",
//                   }),
//                     tj.send("dl", { tab: "one", from: "shortkey" });
//                   break;
//                 case manager.config.shortKeyAll.charCodeAt(0):
//                   chrome.runtime.sendMessage({
//                     cmd: "GET_ALL_TAB_IMAGE",
//                     from: "shortkey",
//                   }),
//                     tj.send("dl", { tab: "all", from: "shortkey" });
//               }
//           },
//           !1
//         );
//     },
//   };
// });
