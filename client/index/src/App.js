import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import './App.css';
import { Layout } from 'antd';
import Panel from './components/Panel';

const { Header, Content, Footer } = Layout;

function App() {
  const [events, setEvents] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    const socket = io('/ws');

    socket.on('connect', () => {
      console.log('connect');
      socket.emit('event', 'ready');
    });

    socket.on('res', data => {
      if (typeof data === 'object') {
        data.forEach(item => {
          item.time = moment.now();
        });
        setEvents(value => [...value, ...data].reverse());
      } else {
        setTime(() => 0);
        interval = setInterval(() => {
          setTime(time => time + 1);
        }, 1000);
      }
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout className="app">
      <Header>
        <span className="logo">Kitchen</span>
        <span className="timer">timer: {time}</span>
      </Header>
      <Content className="content">
        <Panel events={events} />
      </Content>
      <Footer className="footer">Created by Allen Lee</Footer>
    </Layout>
  );
}

export default App;
