import React, { useState } from 'react';
import './index.less';

const Tab = (props) => {
  const { config = [], defaultId = 0 } = props;
  const [_id, set_id] = useState(defaultId);

  const changeTabId = (item) => {
    if (item.component) set_id(item.id)
    item.callback && item.callback(item)
  }

  const renderTab = () => {
    return config.map((item, index) => {
      return <div className='tab_li'>
        <div className='tab_name btn' onClick={() => changeTabId(item)}>{item.tabName}</div>
      </div>
    })
  }

  return <div className="Tab">
    <div className='tab_ul'>{renderTab()}</div>
    {config[_id]?.component && <div className="tab_component">{config[_id].component}</div>}
  </div>
}
export default Tab;