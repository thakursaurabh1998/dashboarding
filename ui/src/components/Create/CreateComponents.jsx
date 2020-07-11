import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TreeSelect, Button, Row, Col } from 'antd';
import { AntDComponents } from '../../constants/AntDComponents';
import * as CreateActions from '../../stores/create/CreateActions';
import openNotification from '../../utils/NotificationUtility';

export default function CreateComponents() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);

  const onChange = (value) => {
    setSelectedValue(value);
  };

  const addComponent = () => {
    if (selectedValue) {
      dispatch(CreateActions.addComponent(selectedValue));
      setSelectedValue(null);
    } else {
      openNotification('MESSAGE', 'info', 'Select a component first');
    }
  };

  return (
    <Row gutter={16}>
      <Col className="gutter-row" md={16} sm={24} xs={24}>
        <TreeSelect
          showSearch
          size="large"
          treeDefaultExpandAll
          onChange={onChange}
          value={selectedValue}
          treeData={AntDComponents}
          style={{ width: '100%' }}
          placeholder="Select a component"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        />
      </Col>
      <Col className="gutter-row" md={8} sm={24} xs={24}>
        <Button size="large" style={{ width: '100%' }} onClick={addComponent}>
          Add Component
        </Button>
      </Col>
    </Row>
  );
}
