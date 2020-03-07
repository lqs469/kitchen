import React from 'react';
import moment from 'moment';
import { Timeline, Card, Tooltip } from 'antd';
import { EditOutlined, NodeIndexOutlined } from '@ant-design/icons';
import Status from '../Status';
import './Card.css';

const EventCard = ({ props }) => {
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
      actions={[<EditOutlined key="edit" />, <NodeIndexOutlined key="map" />]}
    >
      <div>{props.destination}</div>

      <div className="card-timeline">
        <Timeline mode="left">
          {props.events.map((e, index) => (
            <Timeline.Item
              key={index}
              label={moment(e.time).format('HH:mm:ss')}
            >
              <Status state={e.event_name} />
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </Card>
  );
};

export default EventCard;
