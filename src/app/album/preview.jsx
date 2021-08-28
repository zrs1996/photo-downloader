import React, { useEffect, useState } from 'react';

const Preview = (props) => {
  const { data } = props;
  const [_data, set_data] = useState([]);

  const renderImg = () => {
    console.log('preview data', data);
    if (!data?.length) return <div>no img</div>
    return data.map((item, index) => {
      return <div className="img_li" key={'img_li_id' + index}>
        <img src={item.src} alt="" />
      </div>
    })
  }

  return <div className='preview'>
    <div className="img_ul">{renderImg()}</div>
  </div>
}
export default Preview;