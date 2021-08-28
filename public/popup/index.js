const sendMessage = chrome.extension.sendMessage;
const open_page = document.getElementById("open_page");
const download_current_page = document.getElementById("download_current_page");
let isCreateFirstTab = true;
let targetTab = null;
let allTabs = null;


/* 打开 展示下载图片的UI界面 */
open_page.onclick = function () {
  const sendInfo = {
    targetUrl: "chrome-extension://ngglnafaahejaecldhnecgockidjacce/dist/index.html",
    type: "open_page",
    tab: null,
  };
  sendMessage(sendInfo);
};

download_current_page.onclick = function () {
  Promise.all(setPromiseAll()).then((res) => {
    console.log('setPromiseAll', res);
    let currentTab = null;
    const sendInfo = {
      targetUrl: "chrome-extension://ngglnafaahejaecldhnecgockidjacce/dist/index.html",
      type: "download_current_page",
      tab: null,
    };
    /* 第一次点击下载当前页面大图 需要 获取 展示下载图片的UI界面 的tab信息 */
    if (isCreateFirstTab && res instanceof Array && res.length > 1) {
      allTabs = res[0];
      currentTab = res[1];
      isCreateFirstTab = false;
      !targetTab &&
        (targetTab = checkout(allTabs, {
          condtion: "url",
          keywords:
            "chrome-extension://ngglnafaahejaecldhnecgockidjacce/dist/index.html",
        }));
      sendInfo.tab = currentTab;
      sendInfo.targetTab = targetTab;

      // 保存数据
      chrome.storage.sync.set({ allTabs }, function() {
        console.log('保存成功！');
      });


    } else {
      /* 每次点击下载当前页面大图 发送下载消息 并传递 需下载页面的tab信息 */
      currentTab = res[0];
      sendInfo.tab = targetTab;
    }
    sendMessage(sendInfo);
  });
};


function getCurrentTab() {
  return new Promise((reslove, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (res) {
      if (res && res.length > 0) {
        reslove(res[0]);
      } else {
        reject();
      }
    });
  });
}

function getAllTab() {
  return new Promise((reslove, reject) => {
    chrome.tabs.query({ currentWindow: false }, function (res) {
      if (res) {
        reslove(res);
      } else {
        reject();
      }
    });
  });
}

function checkout(data, req) {
  console.log('data', data);
  console.log('req', req);
  const type = Object.prototype.toString.call(data);
  let res = null;
  switch (type) {
    case "[object Array]":
      data.forEach((item) => {
        if (item[req.condtion] === req.keywords) {
          console.log('res--checkout', res);
          console.log('item--checkout', item);
          !res && (res = item);
        }
      });
      break;
    default:
      break;
  }
  return res;
}

function setPromiseAll() {
  const arr = [];
  if (!getLocalStorage({ targetTab: {} })?.targetTab && isCreateFirstTab) {
    arr.push(getAllTab());
  }
  arr.push(getCurrentTab());
  return arr;
}

function getLocalStorage(keyInfo = {}) {
  return new Promise((reslove, reject) => {
    chrome.storage.sync.get(keyInfo, function(res) {
      console.log('chrome.storage.sync.get', res);
      reslove(res)
    });
  })
}