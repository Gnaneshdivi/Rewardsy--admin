import { APICallHandler, getBaseURL } from './APIServices';

class QrService {
  constructor() {
    this.baseURL = `${getBaseURL()}/qr`;
  }

  // Create a new QR code (POST request)
  async createQr(createQrDto, token = undefined) {
    try {
      const url = this.baseURL;
      const response = await APICallHandler(url, 'POST', token, {}, createQrDto);
      return response;
    } catch (error) {
      console.error('Error creating QR code:', error.message);
      throw error;
    }
  }

  // Get QR code details by ID (GET request)
  async readQr(id) {
    try {
      const url = `${this.baseURL}/${id}`;
      const response = await APICallHandler(url, 'GET');
      return response;
    } catch (error) {
      console.error('Error fetching QR code details:', error.message);
      throw error;
    }
  }

  // Disable a QR code (PUT request)
  async disableQr(id, token = undefined) {
    try {
      const url = `${this.baseURL}/${id}/disable`;
      const response = await APICallHandler(url, 'PUT', token);
      return response;
    } catch (error) {
      console.error('Error disabling QR code:', error.message);
      throw error;
    }
  }

  // Get stats for a QR code (GET request)
  async getStats(id) {
    try {
      const url = `${this.baseURL}/${id}/stats`;
      const response = await APICallHandler(url, 'GET');
      return response;
    } catch (error) {
      console.error('Error fetching QR code stats:', error.message);
      throw error;
    }
  }

  // Update an existing QR code (PUT request)
  async updateQr(id, updateQrDto, token = undefined) {
    try {
      const url = `${this.baseURL}/${id}`;
      const response = await APICallHandler(url, 'PUT', token, {}, updateQrDto);
      return response;
    } catch (error) {
      console.error('Error updating QR code:', error.message);
      throw error;
    }
  }
}

export const qrService = new QrService();
