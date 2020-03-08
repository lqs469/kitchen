import React from 'react';
import ReactDOM from 'react-dom';
import Filter from '../Filter';

it('renders <Filter /> without crashing', () => {
  const initOptions = ['CREATED', 'COOKED', 'DRIVER_RECEIVED'];
  const setFilter = () => {};

  const div = document.createElement('div');
  ReactDOM.render(
    <Filter initOptions={initOptions} setFilter={setFilter} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
