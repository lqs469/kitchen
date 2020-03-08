import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal } from 'antd';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import Status from '../Status';

const accessToken =
  'pk.eyJ1IjoibHFzNDY5IiwiYSI6ImNqcXhmdGxqaDA1aXYzeHBnb3AxMzdwY3kifQ.RLt3AhxVpSDY8GcHv5lDbQ';

let directions = null;

const ORIGIN = '1800 Marine Street, Santa Monica, CA 90405';

const MapModal = ({ props, setMapProps }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const destination = useMemo(() => {
    return props ? props.destination : ORIGIN;
  }, [props]);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      mapboxgl.accessToken = accessToken;

      directions = new MapboxDirections({
        accessToken,
        unit: 'metric',
        profile: 'mapbox/cycling',
      });

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-118.496475, 34.024212],
        zoom: 13,
      });

      map.addControl(directions, 'top-left');

      map.on('load', () => {
        directions.setOrigin(ORIGIN);
        directions.setDestination(destination);

        setMap(map);
        map.resize();
      });
    };

    if (!map && mapContainer.current) {
      initializeMap({ setMap, mapContainer });
    } else if (props && directions) {
      directions.setDestination(destination);
    }

    return () => {
      if (directions) {
        directions.setDestination(destination);
      }
    };
  }, [map, mapContainer.current, destination]);

  return (
    <Modal
      title={
        <div>
          <span>{props ? props.name : ''}</span>{' '}
          {props ? <Status state={props.state} /> : ''}
        </div>
      }
      forceRende={true}
      visible={!!props}
      onCancel={() => {
        setMapProps(null);
      }}
      footer={null}
      width="80vw"
    >
      <div
        ref={mapContainer}
        style={{
          margin: '-20px',
          height: '500px',
        }}
      ></div>
    </Modal>
  );
};

export default MapModal;
