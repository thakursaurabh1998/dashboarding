import React from 'react';
import { Menu, Avatar, Button } from 'antd';
import { LockOutlined, HomeFilled } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RoutesEnum from '../../constants/RoutesEnum';
import { deleteAuthorizationToken } from '../../utils/LocalStorage';
import * as UserActions from '../../stores/user/UserActions';

export default function Navbar() {
  const [current, setCurrent] = useState('user');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'home':
        history.push(RoutesEnum.ROOT);
        break;
      case 'profile':
        history.push(RoutesEnum.PROFILE);
        break;
      case 'logout':
        dispatch(UserActions.setUserAuth(false));
        deleteAuthorizationToken();
        history.push(RoutesEnum.LOGIN);
        break;
      default:
    }
  };

  const { pictureUrl } = useSelector((state) => ({
    pictureUrl: state.user?.pictureUrl,
  }));

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeFilled />} />
      <Menu.Item
        style={{ float: 'right' }}
        key="profile"
        icon={<Avatar src={pictureUrl} />}
      ></Menu.Item>
      <Menu.Item
        style={{ float: 'right' }}
        key="logout"
        icon={
          <Button>
            Logout
            <LockOutlined />
          </Button>
        }
      ></Menu.Item>
    </Menu>
  );
}
