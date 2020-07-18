import React from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Form, Radio, Select, Row, Divider } from 'antd';

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
      {(type === String && !expectedValues && (
        <Row>
          <Input type="text" />
        </Row>
      )) ||
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
  const [form] = Form.useForm();

  const onCreate = (data) => {
    console.log(data);
    // dispatch(CreateActions.addComponent(selectedValue));

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
      title="Create a new component"
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
