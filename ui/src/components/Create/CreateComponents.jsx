import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TreeSelect, Button, Row, Col } from 'antd';
import { AntDComponents } from '../../constants/AntDComponents';
import * as CreateActions from '../../stores/create/CreateActions';

export default function CreateComponents() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);

  const onChange = (value) => {
    setSelectedValue(value);
  };

  const addComponent = () => {
    dispatch(CreateActions.addComponent(selectedValue));
    setSelectedValue(null);
  };

  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <TreeSelect
          showSearch
          treeDefaultExpandAll
          onChange={onChange}
          value={selectedValue}
          treeData={AntDComponents}
          style={{ width: '100%' }}
          placeholder="Select a component"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        />
      </Col>
      <Col className="gutter-row" span={6}>
        <Button onClick={addComponent}>Add Component</Button>
      </Col>
    </Row>
  );
}
