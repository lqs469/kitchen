import React from 'react';
import ReactDOM from 'react-dom';
import Panel from '../Panel';

it('renders <Panel /> without crashing', () => {
  const events = [];

  const div = document.createElement('div');
  ReactDOM.render(<Panel events={events} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
