import { APICallHandler, getBaseURL } from '..APIServices';

class MerchantService {
  constructor() {
    this.baseURL = `${getBaseURL()}/store`;
  }

  // Onboard a new merchant (POST request)
  async onboardMerchant(merchantData) {
    try {
      const url = this.baseURL;
      const response = await APICallHandler(url, 'POST', undefined, {}, merchantData);
      return response;
    } catch (error) {
      console.error('Error onboarding merchant:', error.message);
      throw error;
    }
  }

  // Update merchant details (PUT request)
  async updateMerchant(merchantId, merchantData) {
    try {
      const url = `${this.baseURL}/${merchantId}`;
      const response = await APICallHandler(url, 'PUT', undefined, {}, merchantData);
      return response;
    } catch (error) {
      console.error('Error updating merchant:', error.message);
      throw error;
    }
  }

  // Change merchant status (Approve, Block, Decline)
  async changeMerchantStatus(merchantId, status) {
    try {
      const url = `${this.baseURL}/${merchantId}`;
      const statusBody = { status };
      const response = await APICallHandler(url, 'PUT', undefined, {}, statusBody);
      return response;
    } catch (error) {
      console.error(`Error changing merchant status to ${status}:`, error.message);
      throw error;
    }
  }

  // Get all merchants (GET request)
  async getAllMerchants() {
    try {
      const url = this.baseURL;
      const response = await APICallHandler(url, 'GET', undefined, {});
      return response;
    } catch (error) {
      console.error('Error fetching all merchants:', error.message);
      throw error;
    }
  }

  // Get merchant by location (GET request)
  async getMerchantByLocation() {
    try {
      const url = `${this.baseURL}/by-location`;
      const response = await APICallHandler(url, 'GET', undefined, {});
      return response;
    } catch (error) {
      console.error('Error fetching merchant by location:', error.message);
      throw error;
    }
  }
}

export const merchantService = new MerchantService();