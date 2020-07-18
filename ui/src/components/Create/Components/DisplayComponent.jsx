import React from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

function InputComponent(meta) {
  return <Input {...meta}></Input>;
}

function TextAreaComponent(display) {
  return (
    <TextArea
      placeholder={display?.placeholder}
      key={display?.key}
      hidden={display?.hidden}
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
          key={component.key}
          name={component.key}
          label={component.label}
          rules={[
            {
              ...component?.meta?.rules,
              message: 'Field empty!',
            },
          ]}
        >
          {componentNameToFunctionMap[component.name] &&
            componentNameToFunctionMap[component.name](component.meta.display)}
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
