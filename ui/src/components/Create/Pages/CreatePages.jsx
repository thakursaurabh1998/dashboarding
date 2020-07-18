import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, Tabs, Button, Col, Typography, Input } from 'antd';

import AddPageModal from 'components/Create/Pages/AddPageModal';
import * as CreateActions from 'stores/create/CreateActions';

const { TabPane } = Tabs;

export default function CreatePages() {
  const dispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatedRoute, setUpdatedRoute] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState(null);
  const { activeKey, pages } = useSelector((state) => ({
    activeKey: state.create.activePage,
    pages: Object.values(state.create.pages),
  }));

  useEffect(() => {
    dispatch(CreateActions.getCreatedPages());
  }, [dispatch]);

  useEffect(() => {
    if (!activeKey && pages.length > 0) {
      dispatch(CreateActions.updateActivePage(pages[0].route));
    }
  }, [pages, activeKey, dispatch]);

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
    dispatch(CreateActions.updateActivePage(newActiveKey));
    dispatch(CreateActions.removePage(targetKey));
  };

  const changeEditable = () => {
    setIsEditable(!isEditable);
  };

  const setActiveKey = (key) => {
    dispatch(CreateActions.updateActivePage(key));
  };

  const savePageData = (oldData) => (e) => {
    const update = {
      route: oldData.route,
      newTitle: updatedTitle || oldData.title,
      newRoute: updatedRoute || oldData.route,
    };
    dispatch(CreateActions.editPage(update));
    setUpdatedRoute(null);
    setUpdatedTitle(null);
    setIsEditable(false);
    dispatch(update.newRoute);
  };

  const handleUpdate = (key) => (e) => {
    if (key === 'title') {
      setUpdatedTitle(e.target.value);
    } else if (key === 'route') {
      setUpdatedRoute(e.target.value);
    }
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
    <>
      <Tabs
        type="editable-card"
        onChange={setActiveKey}
        activeKey={activeKey}
        onEdit={onEdit}
      >
        {pages.map((page) => (
          <TabPane tab={page.title} key={page.route} closable={page.closable}>
            <div>
              <Row gutter={16} style={{ backgroundColor: '#f5f5f5' }}>
                <Col span={23}>
                  <Card
                    title={
                      <Typography.Title level={3}>
                        {page.title}
                      </Typography.Title>
                    }
                    style={{ margin: 10, minHeight: 350, width: '100%' }}
                    extra={
                      !isEditable ? (
                        <Button onClick={changeEditable}>Edit</Button>
                      ) : (
                        <Button type="primary" onClick={savePageData(page)}>
                          Save
                        </Button>
                      )
                    }
                  >
                    <Row style={{ marginBottom: 10 }}>
                      <Col span={6}>
                        <Typography.Title level={4}>ROUTE:</Typography.Title>
                      </Col>
                      <Col span={12}>
                        <Input
                          size="large"
                          disabled={!isEditable}
                          defaultValue={page.route}
                          onChange={handleUpdate('route')}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}>
                        <Typography.Title level={4}>TITLE:</Typography.Title>
                      </Col>
                      <Col span={12}>
                        <Input
                          size="large"
                          disabled={!isEditable}
                          defaultValue={page.title}
                          onChange={handleUpdate('title')}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        ))}
      </Tabs>
      <AddPageModal
        setModalVisible={setModalVisible}
        isVisible={isModalVisible}
        setActiveKey={setActiveKey}
      />
    </>
  );
}
