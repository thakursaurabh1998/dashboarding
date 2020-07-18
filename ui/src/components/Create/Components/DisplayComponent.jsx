import React from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

function InputComponent(meta) {
  return (
    <Input
      placeholder={meta?.placeholder}
      key={meta?.key}
      hidden={meta?.hidden}
    ></Input>
  );
}

function TextAreaComponent(meta) {
  return (
    <TextArea
      placeholder={meta?.placeholder}
      key={meta?.key}
      hidden={meta?.hidden}
    ></TextArea>
  );
}

const componentNameToFunctionMap = {
  Input: InputComponent,
  TextArea: TextAreaComponent,
};

export default function DisplayComponent({ components }) {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" name="demo_form">
      {components.map((component) => (
        <Form.Item
          key={component.label}
          name={component.label}
          label={component.label}
          rules={[
            {
              required: component.required,
              message: 'Field empty!',
            },
          ]}
        >
          {componentNameToFunctionMap[component.name](component.meta)}
        </Form.Item>
      ))}
    </Form>
  );
}

DisplayComponent.propTypes = {
  components: PropTypes.array.isRequired,
};

DisplayComponent.defaultProps = {
  components: [],
};
