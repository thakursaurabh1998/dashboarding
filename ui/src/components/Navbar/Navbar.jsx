import React, { useEffect, useState } from 'react';
import { Menu, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LockOutlined, HomeFilled, UserOutlined } from '@ant-design/icons';

import RoutesEnum from 'constants/RoutesEnum';
import { deleteAuthorizationToken } from 'utils/LocalStorage';
import * as UserActions from 'stores/user/UserActions';
import LoginButton from 'components/Login/LoginButton';

const { SubMenu } = Menu;

export default function Navbar({ isAuthenticated }) {
  const [current, setCurrent] = useState('user');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(UserActions.getUser());
    }
  }, [dispatch, isAuthenticated]);

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
        <LoginButton />
      )}
    </Menu>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

Navbar.defaultProps = {
  isAuthenticated: false,
};
