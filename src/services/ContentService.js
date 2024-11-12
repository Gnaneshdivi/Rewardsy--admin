import { APICallHandler, getBaseURL } from './APIServices';

class ContentService {
  constructor() {
    this.baseURL = `${getBaseURL()}/reels`;
  }

  // Get all content by store ID (GET request)
  async getContentByStore(storeId) {
    try {
      const url = `${this.baseURL}/admin/by-store/${storeId}`;
      const response = await APICallHandler(url, 'GET');
      return response;
    } catch (error) {
      console.error('Error fetching content by store ID:', error.message);
      throw error;
    }
  }

  // Get reels by store ID (GET request)
  async getReelsByStoreId(storeId) {
    try {
      const url = `${this.baseURL}/reels/by-store/${storeId}`;
      const response = await APICallHandler(url, 'GET');
      return response;
    } catch (error) {
      console.error('Error fetching reels by store ID:', error.message);
      throw error;
    }
  }

  // Get content by ID (GET request) - New method
  async getContentById(contentId) {
    try {
      const url = `${this.baseURL}/admin/${contentId}`;
      const response = await APICallHandler(url, 'GET');
      return response;
    } catch (error) {
      console.error('Error fetching content by ID:', error.message);
      throw error;
    }
  }

  // Create new content (POST request)
  async createContent(contentData, token = undefined) {
    try {
      const url = this.baseURL;
      const response = await APICallHandler(url, 'POST', token, {}, contentData);
      return response;
    } catch (error) {
      console.error('Error creating new content:', error.message);
      throw error;
    }
  }

  // Update content by ID (PUT request)
  async updateContent(contentId, contentData, token = undefined) {
    try {
      const url = `${this.baseURL}/${contentId}`;
      const response = await APICallHandler(url, 'PUT', token, {}, contentData);
      return response;
    } catch (error) {
      console.error('Error updating content:', error.message);
      throw error;
    }
  }

  // Delete content by ID (DELETE request)
  async deleteContent(contentId, token = undefined) {
    try {
      const url = `${this.baseURL}/${contentId}`;
      const response = await APICallHandler(url, 'DELETE', token);
      return response;
    } catch (error) {
      console.error('Error deleting content:', error.message);
      throw error;
    }
  }
}

export const contentService = new ContentService();
