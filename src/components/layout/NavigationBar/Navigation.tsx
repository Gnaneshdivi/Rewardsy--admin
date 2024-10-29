import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store, Search } from 'lucide-react';
import { MenuItemType } from 'antd/es/menu/interface';
import NavigationLogo from './NavigationLogo';

const { Sider } = Layout;

const Navigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItemType[] = [
    {
      key: '/merchant/search',
      icon: <Search size={16} />,
      label: 'Search Merchant',
    },
    {
      key: '/merchant/add',
      icon: <Store size={16} />,
      label: 'Add Merchant',
    },
  ];

  return (
    <Sider
      breakpoint="md"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <NavigationLogo showText={!collapsed} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Navigation;
