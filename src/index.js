import React from 'react';
import ReactDom from 'react-dom';
import Album from 'app/album';

const App = () => {
  return <div>
    <div><Album /></div>
  </div>
}
ReactDom.render(<App />, document.getElementById("root"))