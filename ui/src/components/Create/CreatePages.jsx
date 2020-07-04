import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, Tabs, Button } from 'antd';
import * as CreateActions from '../../stores/create/CreateActions';
import AddPageModal from './AddPageModal';

const { TabPane } = Tabs;

export default function CreatePages() {
  const dispatch = useDispatch();

  const [activeKey, setActiveKey] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { pages } = useSelector((state) => ({
    pages: state.create.pages,
  }));

  const remove = (targetKey) => {
    let newActiveKey = null;
    const lastIndex = pages.findIndex((page) => page.key === targetKey);
    if (pages && pages.length > 0) {
      if (lastIndex > 0) {
        newActiveKey = pages[lastIndex - 1].key;
      } else {
        newActiveKey = pages[1] && pages[1].key;
      }
    }
    setActiveKey(newActiveKey);
    dispatch(CreateActions.removePage(targetKey));
  };

  const onEdit = (targetKey, action) => {
    switch (action) {
      case 'add':
        setModalVisible(true);
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
              KEY: {page.key}
              ROUTE: {page.route}
              TITLE: {page.title}
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
