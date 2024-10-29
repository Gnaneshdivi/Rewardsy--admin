import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface UploadImageComponentProps {
  className?: string;
  onImageUploaded: (url: string) => void;
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({
  className,
  onImageUploaded,
}) => {
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://api.example.com/upload', // Replace with your upload endpoint
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        onImageUploaded(info.file.response.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      return isImage;
    },
  };

  return (
    <Upload
      {...props}
      listType="picture-card"
      className={className}
      showUploadList={false}
    >
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  );
};

export default UploadImageComponent;
