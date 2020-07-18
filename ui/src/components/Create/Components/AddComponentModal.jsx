import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Modal, Form, Radio, Select, Divider } from 'antd';

import openNotification from 'utils/NotificationUtility';
import * as CreateActions from 'stores/create/CreateActions';
import { componentsMeta } from 'constants/AntDComponents';

const Option = Select.Option;

function FormItem({ currentKey, value }) {
  const [required, type, expectedValues] = value;
  return (
    <Form.Item
      key={currentKey}
      name={currentKey}
      label={currentKey}
      rules={[
        {
          required: required,
          message: 'Input missing!',
        },
      ]}
    >
      {(type === String && !expectedValues && <Input type="text" />) ||
        (type === String && expectedValues && (
          <Select>
            {expectedValues.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        )) ||
        (type === Boolean && (
          <Radio.Group>
            {expectedValues.map((val) => (
              <Radio key={val} value={val}>
                {val.toString()}
              </Radio>
            ))}
          </Radio.Group>
        )) ||
        (type === Array && (
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Enter desired enum and press enter"
          ></Select>
        )) ||
        (type === Number && <Input type="number" />)}
    </Form.Item>
  );
}

export default function AddComponentModal({
  meta,
  component,
  isModalVisible,
  setModalVisible,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { pages, activePage } = useSelector((state) => ({
    pages: state.create?.pages,
    activePage: state.create?.activePage,
  }));

  const onCreate = (data) => {
    const componentData = {
      name: component,
      key: data.key,
      label: data.label,
      pageID: pages[activePage].id,
      meta: {
        display: Object.keys(componentsMeta[component].display).reduce(
          (config, key) => {
            config[key] = data[key];
            return config;
          },
          {}
        ),
        rules: Object.keys(componentsMeta[component].rules).reduce(
          (config, key) => {
            config[key] = data[key];
            return config;
          },
          {}
        ),
      },
    };

    dispatch(CreateActions.addComponent(componentData));

    setModalVisible(false);
    return true;
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      onOk={onOk}
      okText="Create"
      cancelText="Cancel"
      visible={isModalVisible}
      title={`Create a new ${component} component`}
      onCancel={() => setModalVisible(false)}
    >
      <Form
        form={form}
        layout="vertical"
        name="add_page_modal"
        initialValues={meta?.initialValues}
      >
        <Divider
          orientation="left"
          style={{ color: '#333', fontWeight: 'normal' }}
        >
          <h3>Properties</h3>
        </Divider>

        <Form.Item
          key="label"
          label="Label"
          name="label"
          rules={[
            {
              required: true,
              message: 'Input missing!',
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          key="key"
          label="Key"
          name="key"
          rules={[
            {
              required: true,
              message: 'Input missing!',
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        <Divider
          orientation="left"
          style={{ color: '#333', fontWeight: 'normal' }}
        >
          <h3>Display</h3>
        </Divider>
        {Object.entries(componentsMeta[component].display).map(
          ([key, value]) => (
            <FormItem key={key} currentKey={key} value={value} />
          )
        )}
        <Divider
          orientation="left"
          style={{ color: '#333', fontWeight: 'normal' }}
        >
          <h3>Rules</h3>
        </Divider>
        {Object.entries(componentsMeta[component].rules).map(([key, value]) => (
          <FormItem key={key} currentKey={key} value={value} />
        ))}
      </Form>
    </Modal>
  );
}

AddComponentModal.propTypes = {
  meta: PropTypes.object,
  component: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

AddComponentModal.defaultProps = {
  isVisible: false,
};
