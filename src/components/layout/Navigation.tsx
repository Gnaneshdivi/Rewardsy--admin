import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store, Search } from 'lucide-react';

const { Sider } = Layout;

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '//merchant/search',
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
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo">
        <Store size={24} style={{ marginRight: '8px' }} />
        Rewardsy
      </div>
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
