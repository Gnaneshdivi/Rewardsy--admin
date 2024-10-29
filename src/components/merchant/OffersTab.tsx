import React from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Card, List } from 'antd';
import { IOffer } from '../../types/merchantDetails';

interface OffersTabProps {
  merchantId: string;
  offers: IOffer[];
  onOfferCreate: (offer: Partial<IOffer>) => void;
  onOfferDelete: (offerId: string) => void;
}

const OffersTab: React.FC<OffersTabProps> = ({
  merchantId,
  offers,
  onOfferCreate,
  onOfferDelete,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Partial<IOffer>) => {
    onOfferCreate({
      merchantId,
      ...values,
      createdAt: new Date(),
    });
    form.resetFields();
  };

  return (
    <div className="offers-container">
      <Card title="Create New Offer">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Offer Title"
            rules={[{ required: true, message: 'Please enter offer title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter offer description' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="discount"
            label="Discount (%)"
            rules={[
              { required: true, message: 'Please enter discount percentage' },
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>

          <Form.Item
            name="validUntil"
            label="Valid Until"
            rules={[{ required: true, message: 'Please select expiry date' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Offer
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <List
        className="offers-list"
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
        dataSource={offers}
        renderItem={(offer) => (
          <List.Item>
            <Card
              title={offer.title}
              extra={
                <Button danger onClick={() => onOfferDelete(offer.id)}>
                  Delete
                </Button>
              }
            >
              <p>{offer.description}</p>
              <p>Discount: {offer.discount}%</p>
              <p>
                Valid until: {new Date(offer.validUntil).toLocaleDateString()}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default OffersTab;
