import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Input, Modal, Form } from 'antd';
import * as CreateActions from '../../stores/create/CreateActions';

export default function AddPageModal({
  key,
  route,
  title,
  isVisible,
  setActiveKey,
  setModalVisible,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onCreate = (data) => {
    const { route, title, key } = data;
    const newPage = {
      key,
      route,
      title,
      content: 'Content of new Tab' + data.key,
    };
    setActiveKey(key);
    dispatch(CreateActions.addPage(newPage));
    setModalVisible(false);
    return true;
  };

  return (
    <Modal
      visible={isVisible}
      title="Create a new page"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => setModalVisible(false)}
      onOk={() =>
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.error('Validate Failed:', info);
          })
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="add_page_modal"
        initialValues={{ route, title, key }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of page!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="route"
          label="Route"
          rules={[
            {
              required: true,
              message: 'Please input the route for the page!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="key"
          label="Key"
          rules={[
            {
              required: true,
              message: 'Please input the key of page!',
            },
          ]}
        >
          <Input placeholder="Can be the same as title but without spaces" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

AddPageModal.propTypes = {
  route: PropTypes.string,
  title: PropTypes.string,
  key: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

AddPageModal.defaultProps = {
  isVisible: false,
};
