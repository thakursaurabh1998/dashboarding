import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Collapse } from 'antd';
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
          <CreatePages />
        </Panel>
        <Panel header="Components" key="components">
          <CreateComponents />
        </Panel>
      </Collapse>
      {createdComponents.map((cc, index) => (
        <DisplayComponent component={cc} meta={null} key={index} />
      ))}
    </>
  );
}
