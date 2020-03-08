import React, { useCallback } from 'react';
import { Row, Col, Form, Modal, Input, Select } from 'antd';
import { OrderTimeline } from '../Card';

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const OrderDetail = ({ props, detailVisible, setDetailVisible, socket }) => {
  const [form] = Form.useForm();
  const onSubmit = useCallback(
    values => {
      socket.emit('modify', values);
    },
    [socket],
  );

  return (
    <Modal
      title="Order Detail"
      visible={detailVisible}
      okText="Submit"
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            if (values.event_name === props.state) {
              delete values.event_name;
            }
            onSubmit(values);
            setDetailVisible(false);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={() => setDetailVisible(false)}
      width="80%"
    >
      <Row>
        <Col span={8}>
          <OrderTimeline events={props.events} />
        </Col>
        <Col span={16}>
          <Form
            {...layout}
            form={form}
            name="order-detail"
            initialValues={{
              id: props.id,
              event_name: props.state,
              name: props.name,
              destination: props.destination,
            }}
          >
            <Form.Item name="id" label="Id">
              <Input disabled />
            </Form.Item>
            <Form.Item name="name" label="Name">
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="destination"
              label="Destination"
              rules={[{ required: true }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              name="event_name"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="CREATED">CREATED</Option>
                <Option value="COOKED">COOKED</Option>
                <Option value="DRIVER_RECEIVED">DRIVER_RECEIVED</Option>
                <Option value="DELIVERED">DELIVERED</Option>
                <Option value="CANCELLED">CANCELLED</Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default OrderDetail;
