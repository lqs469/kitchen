import React from 'react';
import moment from 'moment';
import { Timeline, Card, Tooltip } from 'antd';
import { EditOutlined, NodeIndexOutlined } from '@ant-design/icons';
import Status from '../Status';
import './Card.css';

const EventCard = ({ props, setCurrOrderId, setMapProps }) => {
  return (
    <Card
      hoverable
      title={
        <Tooltip placement="top" title={`id: ${props.id}`}>
          <Status state={props.state} />
          <strong>{props.name}</strong>
        </Tooltip>
      }
      size="small"
      actions={[
        <EditOutlined key="edit" onClick={() => setCurrOrderId(props.id)} />,
        <NodeIndexOutlined key="map" onClick={() => setMapProps(props)} />,
      ]}
    >
      <div>{props.destination}</div>
      <div className="card-timeline">
        <OrderTimeline events={props.events} />
      </div>
    </Card>
  );
};

export const OrderTimeline = ({ events }) => {
  return (
    <Timeline mode="left">
      {events.map((e, index) => (
        <Timeline.Item key={index} label={moment(e.time).format('HH:mm:ss')}>
          <Status state={e.event_name} />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default EventCard;
