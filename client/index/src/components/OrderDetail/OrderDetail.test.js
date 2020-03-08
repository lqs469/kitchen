import React from 'react';
import ReactDOM from 'react-dom';
import OrderDetail from '../OrderDetail';

it('renders <OrderDetail /> without crashing', () => {
  const props = {};

  const div = document.createElement('div');
  ReactDOM.render(<OrderDetail props={props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
