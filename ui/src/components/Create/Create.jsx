import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Collapse, Row, Col } from 'antd';
import CreatePages from './CreatePages';
import DisplayComponent from './DisplayComponent';
import CreateComponents from './CreateComponents';
import * as CreateActions from '../../stores/create/CreateActions';

const { Panel } = Collapse;

export default function Create() {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState('pages');

  const { activePage, pages, components } = useSelector((state) => ({
    pages: state.create.pages,
    activePage: state.create.activePage,
    components: state.create.components,
  }));

  useEffect(() => {
    if (activePage) {
      dispatch(CreateActions.getComponents(pages[activePage]?.id));
    }
  }, [activePage, pages, dispatch]);

  const onPanelChange = (key) => {
    key && setActiveKey(key);
  };

  return (
    <>
      <Divider
        orientation="left"
        style={{ color: '#333', fontWeight: 'normal' }}
      >
        <h1>Create Dashboard</h1>
      </Divider>
      <Collapse
        ghost
        accordion
        destroyInactivePanel
        activeKey={activeKey}
        onChange={onPanelChange}
      >
        <Panel header="Pages" key="pages">
          <Row gutter={16}>
            <Col md={16} sm={24}>
              <CreatePages />
            </Col>
          </Row>
        </Panel>
        <Panel header="Components" key="components">
          <Row>
            <Col span={24}>
              <CreateComponents />
            </Col>
          </Row>
        </Panel>
      </Collapse>
      {activeKey === 'components' && (
        <>
          <Divider orientation="left">
            <h3>Preview</h3>
          </Divider>
          <Row gutter={16}>
            <Col md={12} sm={24} xs={24}>
              {components && components.map((cc, index) => (
                <DisplayComponent component={cc} meta={null} key={index} />
              ))}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
