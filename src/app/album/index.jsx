import React, { useEffect, useState } from 'react';
import Watcher from 'src/app/js/watch.js';
import { checkoutImgs } from "/src/app/js/checkoutImgs.js";
import Tab from 'src/app/tab';
import Gallery from 'src/app/album/gallery.jsx';
import Preview from 'src/app/album/preview.jsx';
import './index.less';

const Album = () => {
  const [_catalog, set_catalog] = useState({});
  const [_title, set_title] = useState('');
  const [_tabType, set_tabType] = useState('gallery');
  const [_key, set_key] = useState('');

  const callback = (req) => {
    set_catalog(req.catalog);
    set_title(req.title);
  }
  Watcher.on(callback);

  const download = () => {
    if (_catalog[_key]?.list) {
      _catalog[_key].list.forEach((item, index) => {
        console.log('item', item);
        if (item.src) {
          chrome.downloads.download({
            url: item.src,
            saveAs: false,
            conflictAction: "uniquify"
          }, (res) => {
            console.log('开始下载', res);
          })
        } else {
          console.warn('item.src no exist', item);
        }
      })
      console.log('下载到本地');
      return;
    }
    console.warn('catalog do not legal', _catalog);
  }

  const to_gallery = () => {
    set_tabType("gallery");
  }

  const to_preview = () => {
    set_tabType("preview");
  }

  useEffect(() => {
    if (chrome?.storage) {
      chrome.storage.sync.get({ catalog: null }, function (res) {
        console.log('chrome.storage.sync.get catalog', res);
        if (res.catalog) {
          const catalog = checkoutImgs(res.catalog, { condition: {} });
          catalog && set_catalog(catalog);
        }
      });
    }
    const localRes = JSON.parse(window.localStorage.getItem("catalog") || "[]");
    console.log('localRes', localRes);
    if (Object.keys(_catalog).length) {
      localRes.push(_catalog);
      window.localStorage.setItem("catalog", JSON.stringify(localRes));
    }
  }, []);

  useEffect(() => {
    const catalog = checkoutImgs(_catalog, { condition: {} });
    catalog && set_catalog(catalog);
    console.log('checkoutImgs-_catalog', catalog);
  }, [JSON.stringify(_catalog)]);

  const topBarConfig = [
    { id: 0, tabName: "下载到本地", callback: download },
    { id: 1, tabName: "查看大图列表", callback: to_gallery },
    { id: 2, tabName: "切换到小图预览", callback: to_preview }
  ]

  const setComponent = (list) => {
    switch (_tabType) {
      case "gallery":
        return <Gallery data={list} />
      case "preview":
        return <Preview data={list} />
      default:
        break;
    }
  }


  const getSideBarConfig = () => {
    const config = [];
    let id = 0;
    for (const key in _catalog) {
      config.push({
        id,
        tabName: key,
        callback: () => { set_key(key) },
        component: setComponent(_catalog[key].list)
      });
      id++;
    }
    return config;
  }

  return <div className='album'>
    <div className='title'>{`page： ${_title}`}</div>
    <div className='menu'>
      <div className='topbar'>
        <Tab config={topBarConfig} defaultId={3} />
      </div>
      <div className='sidebar'>
        <Tab config={getSideBarConfig()} />
      </div>
    </div>
  </div>
}
export default Album;