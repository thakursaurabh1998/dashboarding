import React, { useEffect } from 'react';
import { Menu, Avatar } from 'antd';
import { LockOutlined, HomeFilled, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RoutesEnum from '../../constants/RoutesEnum';
import { deleteAuthorizationToken } from '../../utils/LocalStorage';
import * as UserActions from '../../stores/user/UserActions';
import LoginButton from '../Login/LoginButton';

const { SubMenu } = Menu;

export default function Navbar({ isAuthenticated }) {
  const [current, setCurrent] = useState('user');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.getUser());
  }, [dispatch]);

  const handleClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'home':
        history.push(RoutesEnum.HOME);
        break;
      case 'profile':
        history.push(RoutesEnum.PROFILE);
        break;
      case 'logout':
        dispatch(UserActions.setUserAuth(false));
        deleteAuthorizationToken();
        history.push(RoutesEnum.ROOT);
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
      {isAuthenticated ? (
        <SubMenu
          style={{ float: 'right', marginLeft: 10 }}
          icon={<Avatar src={pictureUrl} />}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="logout" icon={<LockOutlined />}>
            Logout
          </Menu.Item>
        </SubMenu>
      ) : (
        <Menu.Item
          key="login"
          style={{ float: 'right' }}
          icon={<LoginButton />}
        />
      )}
    </Menu>
  );
}
