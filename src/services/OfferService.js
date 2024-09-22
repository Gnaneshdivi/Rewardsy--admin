import { APICallHandler, getBaseURL } from './APIServices';

class OfferService {
  constructor() {
    this.baseURL = `${getBaseURL()}/offers`;
  }

  // Get offers by store ID (GET request)
  async getOffersByStore(storeId) {
    try {
      const url = `${this.baseURL}/by-store/${storeId}`;
      const response = await APICallHandler(url, 'GET');
      return response;
    } catch (error) {
      console.error('Error fetching offers by store ID:', error.message);
      throw error;
    }
  }

  // Create a new offer (POST request)
  async createOffer(offerData, token = undefined) {
    try {
      const url = this.baseURL;
      const response = await APICallHandler(url, 'POST', token, {}, offerData);
      return response;
    } catch (error) {
      console.error('Error creating new offer:', error.message);
      throw error;
    }
  }

  // Update an offer (PUT request)
  async updateOffer(offerId, offerData, token = undefined) {
    try {
      const url = `${this.baseURL}/${offerId}`;
      const response = await APICallHandler(url, 'PUT', token, {}, offerData);
      return response;
    } catch (error) {
      console.error('Error updating offer:', error.message);
      throw error;
    }
  }

  // Delete an offer (DELETE request)
  async deleteOffer(offerId, token = undefined) {
    try {
      const url = `${this.baseURL}/${offerId}`;
      const response = await APICallHandler(url, 'DELETE', token);
      return response;
    } catch (error) {
      console.error('Error deleting offer:', error.message);
      throw error;
    }
  }
}

export const offerService = new OfferService();
