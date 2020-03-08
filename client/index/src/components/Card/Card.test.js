import React from 'react';
import ReactDOM from 'react-dom';
import Card, { OrderTimeline } from '../Card';

it('renders <Card /> without crashing', () => {
  const props = {
    events: [],
  };

  const div = document.createElement('div');
  ReactDOM.render(<Card props={props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders <OrderTimeline /> without crashing', () => {
  const events = [];

  const div = document.createElement('div');
  ReactDOM.render(<OrderTimeline events={events} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
