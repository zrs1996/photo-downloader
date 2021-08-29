const Watcher = {};
function onRequest(e, callback) {
  switch (e.type) {
    case "RETURN_PAGE":
      console.log("Album case RETURN_PAGE");
      callback(e);
      break;
    default:
      break;
  }
}

function on(callback) {
  if (chrome?.runtime && chrome?.extension) {
    // const sendMessage = chrome.runtime.sendMessage;
    const onMessage = chrome.extension.onMessage;
    onMessage.addListener(function (req, sender, back) {
      console.log('req', req);
      onRequest(req, callback);
    });
  }
}

Watcher.on = on;

export default Watcher;
