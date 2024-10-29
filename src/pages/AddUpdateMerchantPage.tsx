import React, { useState } from 'react';
import { Tabs, message } from 'antd';
import { useParams } from 'react-router-dom';
import DetailsTab from '../components/merchant/DetailsTab';
import ReelsTab from '../components/merchant/ReelsTab';
import OffersTab from '../components/merchant/OffersTab';
import QRCodesTab from '../components/merchant/QRCodesTab';
import { IMerchant, IReel, IOffer, IQRCode } from '../types/merchantDetails';

const AddUpdateMerchantPage: React.FC = () => {
  const { id } = useParams();
  const [merchant, setMerchant] = useState<IMerchant | undefined>();
  const [reels, setReels] = useState<IReel[]>([]);
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [qrCodes, setQRCodes] = useState<IQRCode[]>([]);

  const handleSaveMerchant = (data: Partial<IMerchant>) => {
    // Here you would typically make an API call
    setMerchant({ ...merchant, ...data } as IMerchant);
    message.success('Merchant details saved successfully');
  };

  const handleReelUpload = (reel: Partial<IReel>) => {
    setReels([...reels, { id: Date.now().toString(), ...reel } as IReel]);
    message.success('Reel uploaded successfully');
  };

  const handleOfferCreate = (offer: Partial<IOffer>) => {
    setOffers([...offers, { id: Date.now().toString(), ...offer } as IOffer]);
    message.success('Offer created successfully');
  };

  const handleQRCodeCreate = (qrCode: Partial<IQRCode>) => {
    setQRCodes([
      ...qrCodes,
      { id: Date.now().toString(), ...qrCode } as IQRCode,
    ]);
    message.success('QR Code generated successfully');
  };

  const items = [
    {
      key: '1',
      label: 'Details',
      children: (
        <DetailsTab initialData={merchant} onSave={handleSaveMerchant} />
      ),
    },
    {
      key: '2',
      label: 'Reels',
      children: (
        <ReelsTab
          merchantId={id || ''}
          reels={reels}
          onReelUpload={handleReelUpload}
          onReelDelete={(reelId) => {
            setReels(reels.filter((r) => r.id !== reelId));
            message.success('Reel deleted successfully');
          }}
        />
      ),
    },
    {
      key: '3',
      label: 'Offers',
      children: (
        <OffersTab
          merchantId={id || ''}
          offers={offers}
          onOfferCreate={handleOfferCreate}
          onOfferDelete={(offerId) => {
            setOffers(offers.filter((o) => o.id !== offerId));
            message.success('Offer deleted successfully');
          }}
        />
      ),
    },
    {
      key: '4',
      label: 'QR Codes',
      children: (
        <QRCodesTab
          merchantId={id || ''}
          qrCodes={qrCodes}
          offers={offers}
          onQRCodeCreate={handleQRCodeCreate}
          onQRCodeDelete={(qrCodeId) => {
            setQRCodes(qrCodes.filter((q) => q.id !== qrCodeId));
            message.success('QR Code deleted successfully');
          }}
        />
      ),
    },
  ];

  return (
    <div className="merchant-page">
      <h1>{id ? 'Update Merchant' : 'Add New Merchant'}</h1>
      <Tabs items={items} />
    </div>
  );
};

export default AddUpdateMerchantPage;
