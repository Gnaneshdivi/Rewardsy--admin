import React from 'react';
import { Typography, theme } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface NavigationLogoProps {
  text?: string;
  showText?: boolean;
}

const NavigationLogo: React.FC<NavigationLogoProps> = ({
  text = 'Rewarsdy',
  showText = true,
}) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: token.borderRadiusLG,
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 5s',
      }}
    >
      <SettingOutlined
        style={{ fontSize: '24px', color: token.colorPrimary }}
      />
      {showText && (
        <Title
          level={3}
          style={{
            margin: 0,
            color: token.colorPrimaryActive,
          }}
        >
          {text}
        </Title>
      )}
    </div>
  );
};

export default NavigationLogo;
