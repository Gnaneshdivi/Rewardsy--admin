import React from 'react';
import { Card, List, Button } from 'antd';
import { IReel } from '../../types/merchantDetails';
import UploadVideoComponent from '../common/UploadVideoComponent';

interface ReelsTabProps {
  merchantId: string;
  reels: IReel[];
  onReelUpload: (reel: Partial<IReel>) => void;
  onReelDelete: (reelId: string) => void;
}

const ReelsTab: React.FC<ReelsTabProps> = ({
  merchantId,
  reels,
  onReelUpload,
  onReelDelete,
}) => {
  const handleVideoUpload = (videoUrl: string, thumbnail: string) => {
    onReelUpload({
      merchantId,
      videoUrl,
      thumbnail,
      createdAt: new Date(),
    });
  };

  return (
    <div className="reels-container">
      <Card className="upload-section">
        <UploadVideoComponent onVideoUploaded={handleVideoUpload} />
      </Card>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={reels}
        renderItem={(reel) => (
          <List.Item>
            <Card
              className="reel-card"
              cover={<img alt="thumbnail" src={reel.thumbnail} />}
              actions={[
                <Button danger onClick={() => onReelDelete(reel.id)}>
                  Delete
                </Button>,
              ]}
            >
              <Card.Meta
                title={`Reel ${reel.id}`}
                description={new Date(reel.createdAt).toLocaleDateString()}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReelsTab;
