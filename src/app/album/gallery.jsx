import React, { useEffect, useState } from 'react';

const Gallery = (props) => {
  const { data } = props;
  const [_data, set_data] = useState([]);


  const renderImg = () => {
    console.log('gallery data', data);
    if (!data?.length) return <div>no img</div>
    return data.map((item, index) => {
      return <div className="img_li" key={'img_li_id' + index}>
        <img src={item.src} alt="" />
      </div>
    })
  }

  return <div className='gallery'>
    <div className="img_ul">{renderImg()}</div>
  </div>
}
export default Gallery;