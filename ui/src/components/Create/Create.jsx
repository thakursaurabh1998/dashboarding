import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TreeSelect, Button, Divider, Row, Col } from 'antd';
import { AntDComponents } from '../../constants/AntDComponents';
import * as CreateActions from '../../stores/create/CreateActions';
import DisplayComponent from './DisplayComponent';

export default function Create() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);

  const { createComponents } = useSelector((state) => ({
    createComponents: state.create,
  }));

  const onChange = (value) => {
    setSelectedValue(value);
  };

  const addComponent = () => {
    dispatch(CreateActions.addComponent(selectedValue));
    setSelectedValue(null);
  };

  return (
    <>
      <Divider
        orientation="left"
        style={{ color: '#333', fontWeight: 'normal' }}
      >
        <h1>Create Dashboard</h1>
      </Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <TreeSelect
            style={{ width: '100%' }}
            value={selectedValue}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={AntDComponents}
            placeholder="Please select"
            treeDefaultExpandAll
            onChange={onChange}
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <Button onClick={addComponent}>Add Component</Button>
        </Col>
      </Row>
      {createComponents.map((cc) => (
        <DisplayComponent component={cc} meta={null} />
      ))}
    </>
  );
}
