import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, Tabs, Button } from 'antd';
import * as CreateActions from '../../stores/create/CreateActions';
import AddPageModal from './AddPageModal';

const { TabPane } = Tabs;

export default function CreateComponents() {
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const { pages } = useSelector((state) => ({
    pages: state.create.pages,
  }));

  const [activeKey, setActiveKey] = useState(null);

  const add = () => {
    setModalVisible(true);
  };

  const remove = (targetKey) => {
    let newActiveKey = 0;
    if (pages.length - 1 && activeKey === targetKey) {
      const lastIndex =
        pages.findIndex((page) => page.key === parseInt(targetKey)) - 1;
      if (lastIndex >= 0) {
        newActiveKey = pages[lastIndex].key;
      } else {
        newActiveKey = pages[0].key;
      }
    }
    dispatch(CreateActions.removePage(targetKey));
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    switch (action) {
      case 'add':
        add();
        break;
      case 'remove':
        remove(targetKey);
        break;
      default:
    }
  };

  return (
    <Row gutter={16}>
      <Tabs
        type="editable-card"
        onChange={setActiveKey}
        activeKey={activeKey}
        onEdit={onEdit}
      >
        {pages.map((page) => (
          <TabPane tab={page.title} key={page.key} closable={page.closable}>
            <Card
              title={page.title}
              extra={<Button type="primary">Save</Button>}
            >
              {page.key}
              {page.route}
              {page.title}
            </Card>
          </TabPane>
        ))}
      </Tabs>
      <AddPageModal
        setModalVisible={setModalVisible}
        isVisible={isModalVisible}
        setActiveKey={setActiveKey}
      />
    </Row>
  );
}
