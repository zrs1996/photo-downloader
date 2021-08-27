import React, { useEffect, useState } from 'react';

const Header = (props) => {
  const { data } = props;
  const [_data, set_data] = useState([]);

  useEffect(() => {
    set_data(data);
  }, [data]);

  const download = () => {
    _data.forEach((item, index) => {
      if (item.src) {
        chrome.downloads.download({
          url: item.src
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

  return <div className="header">
    <div className='download_to_local btn' onClick={download}>下载到本地</div>
    <div className='to_gallery btn' onClick={to_gallery}>查看大图列表</div>
    <div className='to_preview btn' onClick={to_preview}>切换到小图预览</div>
  </div>
}
export default Header;