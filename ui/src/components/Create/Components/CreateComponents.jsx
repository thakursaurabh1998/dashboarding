import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TreeSelect, Button, Row, Col } from 'antd';

import { AntDComponents } from 'constants/AntDComponents';
import * as CreateActions from 'stores/create/CreateActions';
import openNotification from 'utils/NotificationUtility';
import AddComponentModal from 'components/Create/Components/AddComponentModal';

export default function CreateComponents() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const onChange = (value) => {
    setSelectedValue(value);
  };

  // const addComponent = () => {
  //   if (selectedValue) {
  //     setSelectedValue(null);
  //   } else {
  //     openNotification('MESSAGE', 'info', 'Select a component first');
  //   }
  // };

  return (
    <>
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
          <Button
            size="large"
            style={{ width: '100%' }}
            disabled={!selectedValue}
            onClick={() => setModalVisible(true)}
          >
            Add Component
          </Button>
        </Col>
      </Row>
      {isModalVisible && (
        <AddComponentModal
          component={selectedValue}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
}
