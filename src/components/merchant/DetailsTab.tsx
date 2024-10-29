import React from 'react';
import { Form, Select, Button, Space } from 'antd';
import { MapPin } from 'lucide-react';
import { IMerchant } from '../../types/merchantDetails';
import InputField from '../common/InputField';
import UploadImageComponent from '../common/UploadImageComponent';
import MapDisplay from '../common/MapDisplay';

const { Option } = Select;

interface DetailsTabProps {
  initialData?: IMerchant;
  onSave: (data: Partial<IMerchant>) => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ initialData, onSave }) => {
  const [form] = Form.useForm();
  const [location, setLocation] = React.useState(
    initialData?.location || { latitude: 0, longitude: 0 }
  );

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(newLocation);
        form.setFieldsValue({ location: newLocation });
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialData}
      onFinish={onSave}
      className="merchant-form"
    >
      <div className="upload-container">
        <div className="banner-upload">
          <UploadImageComponent
            onImageUploaded={(url) => form.setFieldsValue({ bannerImage: url })}
          />
        </div>
        <div className="profile-upload">
          <UploadImageComponent
            className="profile-picture"
            onImageUploaded={(url) =>
              form.setFieldsValue({ profileImage: url })
            }
          />
        </div>
      </div>

      <InputField
        name="storeName"
        label="Store Name"
        rules={[{ required: true, message: 'Please enter store name' }]}
      />

      <InputField
        name="ownerName"
        label="Owner Name"
        rules={[{ required: true, message: 'Please enter owner name' }]}
      />

      <InputField
        name="contactNumber"
        label="Contact Number"
        type="tel"
        rules={[{ required: true, message: 'Please enter contact number' }]}
      />

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select placeholder="Select category">
          <Option value="restaurant">Restaurant</Option>
          <Option value="retail">Retail</Option>
          <Option value="services">Services</Option>
          <Option value="entertainment">Entertainment</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Location">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button icon={<MapPin size={16} />} onClick={handleGetLocation}>
            Get Current Location
          </Button>
          <MapDisplay {...location} />
        </Space>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Details
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailsTab;
