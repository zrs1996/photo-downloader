import React, { useEffect, useState } from 'react';
import Watcher from 'src/app/js/watch.js';
import { checkoutImgs } from "/src/app/js/checkoutImgs.js";
import Header from 'src/app/header';
import Tab from 'src/app/tab';
import Gallery from 'src/app/album/gallery.jsx';
import Preview from 'src/app/album/preview.jsx';
import './index.less';

const Album = () => {
  const [_data, set_data] = useState([]);
  const [_imgList, set_imgList] = useState([{ src: "https://rokuhentai.com/_images/pages/d3qx52/22.jpg" }]);

  Watcher.on(set_data);

  const getImg = (list) => {
    const res = [];
    return list;
  }

  const download = () => {
    _imgList.forEach((item, index) => {
      console.log('item', item);
      if (item.src) {
        chrome.downloads.download({
          url: item.src,
          saveAs: false,
          conflictAction: "uniquify"
        }, (res) => {
          console.log(res);
        })
      } else {
        console.log('item.src no exist', item);
      }
    })
    console.log('下载到本地');
  }

  const to_gallery = () => {

  }

  const to_preview = () => {

  }

  useEffect(() => {
    const cacheDatatest = window.localStorage.getItem("imgsList")
    chrome.storage.sync.get({ imgsList: "[]" }, function (res) {
      if (res.imgsList) {
        console.log('imgsList', res.imgsList);
        const list = JSON.parse(res.imgsList);
        console.log('list', list);
        list.length > 0 && set_data(list);
      }
    });
    console.log('cacheDatatest', cacheDatatest);
  }, []);

  useEffect(() => {
    console.log('_data', _data);
    set_imgList(checkoutImgs(_data, { condition: {}}));
  }, [JSON.stringify(_data)]);

  const config = [
    { id: 0, tabName: "下载到本地", callback: download },
    { id: 1, tabName: "查看大图列表", callback: to_gallery, component: <Gallery data={_imgList} /> },
    { id: 2, tabName: "切换到小图预览", callback: to_preview, component: <Preview data={_imgList} /> }
  ]

  return <div>
    <Tab config={config} defaultId={3}/>
  </div>
}
export default Album;