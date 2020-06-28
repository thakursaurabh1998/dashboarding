import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import TextArea from 'antd/lib/input/TextArea';

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

export default function DisplayComponent({ meta, component }) {
  return componentNameToFunctionMap[component](meta);
}

DisplayComponent.propTypes = {
  meta: PropTypes.object,
  component: PropTypes.string.isRequired,
};
