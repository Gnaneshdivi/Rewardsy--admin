export interface IMerchant {
  id: string;
  storeName: string;
  ownerName: string;
  contactNumber: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
  };
  bannerImage: string;
  profileImage: string;
  isActive: boolean;
}

export interface IReel {
  id: string;
  merchantId: string;
  videoUrl: string;
  thumbnail: string;
  createdAt: Date;
}

export interface IOffer {
  id: string;
  merchantId: string;
  title: string;
  description: string;
  validUntil: Date;
  createdAt: Date;
  discount: number;
}

export interface IQRCode {
  id: string;
  merchantId: string;
  type: 'STORE' | 'OFFER';
  referenceId?: string;
  createdAt: Date;
}
