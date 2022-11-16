import React from 'react';
import ReactDOM from 'react-dom/client';
// import CoordinatePicker from './CoordinatePicker';
import CoordinatePickerClass from './CoordinatePickerClass';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <CoordinatePicker /> */}
    <CoordinatePickerClass />
  </React.StrictMode>
);

// ReactDOM.render(<CoordinatePicker/>, document.getElementById('coordinate-picker'))