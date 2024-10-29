import React from 'react';
import { Form, Select, Button, Card, List } from 'antd';
import { IQRCode, IOffer } from '../../types/merchantDetails';

interface QRCodesTabProps {
  merchantId: string;
  qrCodes: IQRCode[];
  offers: IOffer[];
  onQRCodeCreate: (qrCode: Partial<IQRCode>) => void;
  onQRCodeDelete: (qrCodeId: string) => void;
}

const QRCodesTab: React.FC<QRCodesTabProps> = ({
  merchantId,
  qrCodes,
  offers,
  onQRCodeCreate,
  onQRCodeDelete,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Partial<IQRCode>) => {
    onQRCodeCreate({
      merchantId,
      ...values,
      createdAt: new Date(),
    });
    form.resetFields();
  };

  return (
    <div className="qr-codes-container">
      <Card title="Generate New QR Code">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="type"
            label="QR Code Type"
            rules={[{ required: true, message: 'Please select QR code type' }]}
          >
            <Select>
              <Select.Option value="STORE">Store</Select.Option>
              <Select.Option value="OFFER">Offer</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.type !== currentValues.type
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('type') === 'OFFER' && (
                <Form.Item
                  name="referenceId"
                  label="Select Offer"
                  rules={[
                    { required: true, message: 'Please select an offer' },
                  ]}
                >
                  <Select>
                    {offers.map((offer) => (
                      <Select.Option key={offer.id} value={offer.id}>
                        {offer.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )
            }
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Generate QR Code
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={qrCodes}
        renderItem={(qrCode) => (
          <List.Item>
            <Card
              className="qr-card"
              title={`QR Code - ${qrCode.type}`}
              extra={
                <Button danger onClick={() => onQRCodeDelete(qrCode.id)}>
                  Delete
                </Button>
              }
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  JSON.stringify({
                    type: qrCode.type,
                    merchantId: qrCode.merchantId,
                    referenceId: qrCode.referenceId,
                  })
                )}`}
                alt="QR Code"
              />
              <p>Created: {new Date(qrCode.createdAt).toLocaleDateString()}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QRCodesTab;
