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
      console.log('imgsNodeList', imgsNodeList);
      const imgsList = [];
      imgsNodeList.forEach(item => {
        imgsList.push({
          src: item.src,
          style: {
            offsetHeight: item.offsetHeight,
            offsetWidth: item.offsetWidth
          },
          outerHTML: item.outerHTML
        })
      });
      console.log('imgsList', imgsList);
      imgsList.length > 0 && window.localStorage.setItem("imgsList", JSON.stringify(imgsList));
      // 保存数据
      chrome.storage.sync.set({imgsList: JSON.stringify(imgsList)}, function() {
        console.log('保存成功！');
      });
      sendMessage({ type: "RETURN_PAGE", imgsList: imgsList, title: document.title });
      break;
    default:
      break;
  }
}
