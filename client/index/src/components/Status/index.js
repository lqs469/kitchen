import React from 'react';
import { Tag } from 'antd';

const Status = ({ state }) => {
  let color = 'default';

  switch (state) {
    case 'CREATED':
      color = 'processing';
      break;
    case 'COOKED':
      color = 'success';
      break;
    case 'CANCELLED':
      color = 'error';
      break;
    case 'DRIVER_RECEIVED':
      color = 'warning';
      break;
    case 'DELIVERED':
      break;
    default:
      break;
  }

  return <Tag color={color}>{state}</Tag>;
};

export default Status;
