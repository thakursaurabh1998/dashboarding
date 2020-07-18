import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Input, Modal, Form } from 'antd';
import * as CreateActions from '../../../stores/create/CreateActions';

export default function AddPageModal({
  route,
  title,
  isVisible,
  setActiveKey,
  setModalVisible,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onCreate = (data) => {
    const { route, title } = data;
    const newPage = {
      route,
      title,
      content: 'Content of new Tab' + data.key,
    };
    setActiveKey(route);
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
        initialValues={{ route, title }}
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
      </Form>
    </Modal>
  );
}

AddPageModal.propTypes = {
  route: PropTypes.string,
  title: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

AddPageModal.defaultProps = {
  isVisible: false,
};
