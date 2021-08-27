
export function setCrossDomain() {
  function t(t) {
    return (
      t.responseHeaders.push({
        name: "Access-Control-Allow-Origin",
        value: "*",
      }),
      { responseHeaders: t.responseHeaders }
    );
  }
  try {
    chrome.webRequest.onHeadersReceived.addListener(
      t,
      { urls: ["<all_urls>"] },
      ["blocking", "responseHeaders", "extraHeaders"]
    );
  } catch (e) {
    chrome.webRequest.onHeadersReceived.addListener(
      t,
      { urls: ["<all_urls>"] },
      ["blocking", "responseHeaders"]
    );
  }
}
export function setHeaders(t) {
  var e = t.map(function (t) {
    return t.name.toLowerCase();
  });
  function i(i) {
    if (
      (i.initiator && i.initiator.indexOf(chrome.runtime.id) > 0) ||
      gApp.imgList.map((t) => t.bigUrl).indexOf(i.url) >= 0
    )
      return (
        e.forEach(function (e, n) {
          for (var s = 0; s < i.requestHeaders.length; s++)
            i.requestHeaders[s].name.toLowerCase() == e &&
              (i.requestHeaders[s].value = t[n].value);
          s == i.requestHeaders.length && i.requestHeaders.push(t[n]);
        }),
        { requestHeaders: i.requestHeaders }
      );
  }
  try {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      i,
      { urls: ["<all_urls>"] },
      ["blocking", "requestHeaders", "extraHeaders"]
    );
  } catch (t) {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      i,
      { urls: ["<all_urls>"] },
      ["blocking", "requestHeaders"]
    );
  }
}