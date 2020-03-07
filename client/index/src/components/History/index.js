import React from 'react';
import moment from 'moment';
import { Timeline } from 'antd';
import Status from '../Status';

const History = ({ events }) => {
  // red | gray | green
  return (
    <Timeline reverse mode="left">
      {events.map((event, index) => {
        return (
          <Timeline.Item key={index} color="green" position="left">
            <span>{moment(event.time).format('YYYY-MM-DD HH:mm:ss')} </span>
            <Status state={event.event_name} />
            <strong>{event.name} </strong>
            <span> ({event.id}) </span>
            <span> - {event.destination}</span>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

export default History;
