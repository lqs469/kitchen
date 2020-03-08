import React from 'react';
import ReactDOM from 'react-dom';
import History from '../History';

it('renders <History /> without crashing', () => {
  const events = [];

  const div = document.createElement('div');
  ReactDOM.render(<History events={events} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
