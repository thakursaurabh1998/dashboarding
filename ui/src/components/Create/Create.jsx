import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Collapse, Row, Col } from 'antd';
import CreatePages from './CreatePages';
import DisplayComponent from './DisplayComponent';
import CreateComponents from './CreateComponents';
import { useState } from 'react';

const { Panel } = Collapse;

export default function Create() {
  const [activeKey, setActiveKey] = useState('pages');

  const { createdComponents } = useSelector((state) => ({
    createdComponents: state.create.components,
  }));

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
              {createdComponents.map((cc, index) => (
                <DisplayComponent component={cc} meta={null} key={index} />
              ))}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
