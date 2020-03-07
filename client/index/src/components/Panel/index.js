import React, { useState, useMemo } from 'react';
import { Button, Modal, List } from 'antd';
import moment from 'moment';
import History from '../History';
import Filter from '../Filter';
import EventCard from '../Card';
import './Panel.css';

const initFilter = ['CREATED', 'COOKED', 'DRIVER_RECEIVED'];

const Panel = ({ events }) => {
  const [historyVisible, setHistoryVisible] = useState(false);
  const [filter, setFilter] = useState(initFilter);

  const eventById = useMemo(() => {
    const eventObj = events.reduce((p, c) => {
      if (!p[c.id]) {
        p[c.id] = [];
      }
      p[c.id].push(c);
      return p;
    }, {});

    return Object.keys(eventObj).map(id => {
      const eventArr = eventObj[id].sort((a, b) => b.time - a.time);

      return {
        id: eventArr[0].id,
        destination: eventArr[0].destination,
        name: eventArr[0].name,
        state: eventArr[0].event_name,
        events: eventArr,
      };
    });
  }, [events]);

  const filteredData = useMemo(() => {
    let filteredData = [...eventById];

    if (filter.findIndex(item => item === 'COOKED') === -1) {
      const justCookedIdx = filter.findIndex(
        item => typeof item === 'object' && item.key === 'JUST_COOKED',
      );

      if (justCookedIdx > -1) {
        filteredData = filteredData.filter(order => {
          if (order.state !== 'COOKED') {
            return true;
          }
          const diff = moment().diff(order.events[0].time, 'seconds');
          if (diff < filter[justCookedIdx].value) {
            return true;
          }

          return false;
        });

        return filteredData.filter(order =>
          [...filter, 'COOKED'].includes(order.state),
        );
      }
    }

    return filteredData.filter(order => filter.includes(order.state));
  }, [eventById, filter]);

  return (
    <div>
      <section className="panel-header">
        <Filter initOptions={initFilter} setFilter={setFilter} />
        <Button type="primary" onClick={() => setHistoryVisible(true)}>
          Event History
        </Button>
      </section>
      <section>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={filteredData.sort(
            (a, b) => b.events[0].time - a.events[0].time,
          )}
          renderItem={item => (
            <List.Item>
              <EventCard props={item} />
            </List.Item>
          )}
        />
      </section>
      <Modal
        title="History"
        visible={historyVisible}
        onOk={() => setHistoryVisible(false)}
        onCancel={() => setHistoryVisible(false)}
        footer={null}
        width="80%"
        bodyStyle={{
          height: '70vh',
          overflow: 'auto',
        }}
      >
        <History events={events} />
      </Modal>
    </div>
  );
};

export default Panel;
