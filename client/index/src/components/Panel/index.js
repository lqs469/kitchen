import React, { useState, useMemo } from 'react';
import { Button, Modal, List } from 'antd';
import moment from 'moment';
import History from '../History';
import Filter from '../Filter';
import EventCard from '../Card';
import OrderDetail from '../OrderDetail';
import './Panel.css';
import MapModal from '../MapModal';

const initFilter = ['CREATED', 'COOKED', 'DRIVER_RECEIVED'];

const Panel = ({ events, socket }) => {
  const [historyVisible, setHistoryVisible] = useState(false);
  const [filter, setFilter] = useState(initFilter);
  const [currOrderId, setCurrOrderId] = useState(null);
  const [mapProps, setMapProps] = useState(null);

  const eventById = useMemo(() => {
    const eventObj = events.reduce((p, c) => {
      if (!p[c.id]) {
        p[c.id] = {
          id: c.id,
          destination: c.destination,
          name: c.name,
          state: c.event_name,
          events: [],
        };
      }

      if (c.event_name) {
        p[c.id].events.push(c);
      }

      if (p[c.id].destination !== c.destination) {
        p[c.id].destination = c.destination;
      }

      return p;
    }, {});

    const result = Object.keys(eventObj).map(id => {
      const eventValue = eventObj[id];
      const sortedEvents = eventValue.events.sort((a, b) => b.time - a.time);

      return {
        id: eventValue.id,
        destination: eventValue.destination,
        name: eventValue.name,
        state: sortedEvents[0].event_name,
        events: sortedEvents,
      };
    });

    return result;
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

  const currOrderDetail = useMemo(() => {
    return eventById.find(order => order.id === currOrderId);
  }, [currOrderId, eventById]);

  const currOrderMap = useMemo(() => {
    if (mapProps) {
      return eventById.find(order => order.id === mapProps.id);
    } else {
      return null;
    }
  }, [mapProps, eventById]);

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
              <EventCard
                props={item}
                setCurrOrderId={setCurrOrderId}
                setMapProps={setMapProps}
              />
            </List.Item>
          )}
        />
      </section>

      {currOrderId && (
        <OrderDetail
          props={currOrderDetail}
          detailVisible={!!currOrderId}
          setDetailVisible={() => setCurrOrderId(null)}
          socket={socket}
        />
      )}

      <MapModal props={currOrderMap} setMapProps={setMapProps} />

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
