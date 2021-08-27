import { setCrossDomain, setHeaders } from "src/app/js/download.js";
const Watcher = {};
function onRequest(e, callback) {
  switch (e.type) {
    case "RETURN_PAGE":
      console.log("Album case RETURN_PAGE");
      callback(e.imgsList);
      break;
    default:
      break;
  }
}

function on(callback) {
  const sendMessage = chrome.runtime.sendMessage;
  const onMessage = chrome.extension.onMessage;
  onMessage.addListener(function (req, sender, back) {
    console.log('req', req);
    onRequest(req, callback);
  });
}

Watcher.on = on;

export default Watcher;
