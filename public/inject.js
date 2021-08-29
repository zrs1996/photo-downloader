const reciver = chrome.runtime.onMessage;
const sendMessage = chrome.extension.sendMessage;
console.log('injdect');
reciver.addListener(function (req, sender, back) {
  console.log("inject reciver", req);
  onRequest(req, sender, back);
});

function onRequest(req) {
  switch (req.type) {
    case "GET_PAGE":
      console.log("inject get page");
      const imgsNodeList = document.body.querySelectorAll("img");
      const title = document.title;
      const list = [];
      let _catalog = {};
      imgsNodeList.forEach(item => {
        list.push({
          src: item.src,
          style: {
            offsetHeight: item.offsetHeight,
            offsetWidth: item.offsetWidth
          },
          outerHTML: item.outerHTML,
          title
        })
      });
      chrome.storage.sync.get({catalog: {}}, function(res) {
        console.log('chrome.storage.sync.get catalog', res);
        if (res) {
          let album = null;
          if (typeof res.catalog === "string") {
            album = {};
          } else {
            album = res.catalog
          }
          album[title] = {
            list,
            title
          }
          _catalog = album;
        }
      });
      const localImgs = JSON.parse(window.localStorage.getItem("localImgs") || "{}");
      localImgs.catalog = _catalog;
      window.localStorage.setItem("imgsList", JSON.stringify(localImgs));
      // 保存数据
      chrome.storage.sync.set({catalog: _catalog}, function() {
        sendMessage({ type: "RETURN_PAGE", catalog: _catalog, title: document.title });
      });
      break;
    default:
      break;
  }
}
