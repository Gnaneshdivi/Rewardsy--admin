import React, { useState } from 'react';
import { Input, Table, Switch, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { IMerchant } from '../types/merchantDetails';

const { Search: SearchInput } = Input;

const SearchMerchantPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [merchants] = useState<IMerchant[]>([]); // In real app, this would be fetched from API

  const columns = [
    {
      title: 'Merchant ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Store Name',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: 'Location',
      key: 'location',
      render: (record: IMerchant) =>
        `${record.location.latitude}, ${record.location.longitude}`,
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: IMerchant) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleStatusChange(record.id, checked)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IMerchant) => (
        <Button onClick={() => navigate(`/merchant/edit/${record.id}`)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
    // In real app, this would trigger an API call
  };

  const handleStatusChange = (merchantId: string, status: boolean) => {
    // In real app, this would make an API call
    console.log(`Changing status for ${merchantId} to ${status}`);
  };

  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.storeName.toLowerCase().includes(searchText.toLowerCase()) ||
      merchant.id.includes(searchText)
  );

  return (
    <div className="search-page">
      <Space direction="vertical" style={{ width: '100%' }}>
        <SearchInput
          placeholder="Search by Merchant ID or Store Name"
          onSearch={handleSearch}
          prefix={<Search size={16} />}
          enterButton
        />
        <Table
          columns={columns}
          dataSource={filteredMerchants}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          style={{ overflow: 'scroll' }}
        />
      </Space>
    </div>
  );
};

export default SearchMerchantPage;
