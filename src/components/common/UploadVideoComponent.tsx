import React from 'react';
import { Upload, message } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface UploadVideoComponentProps {
  onVideoUploaded: (url: string, thumbnail: string) => void;
}

const UploadVideoComponent: React.FC<UploadVideoComponentProps> = ({
  onVideoUploaded,
}) => {
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://api.example.com/upload',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} uploaded successfully`);
        onVideoUploaded(
          info.file.response.videoUrl,
          info.file.response.thumbnailUrl
        );
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} upload failed.`);
      }
    },
    beforeUpload(file) {
      const isVideo = file.type.startsWith('video/');
      if (!isVideo) {
        message.error('You can only upload video files!');
      }
      return isVideo;
    },
  };

  return (
    <Upload {...props} className="upload-video">
      <div className="upload-video-button">
        <VideoCameraOutlined />
        <div>Upload Video</div>
      </div>
    </Upload>
  );
};

export default UploadVideoComponent;
