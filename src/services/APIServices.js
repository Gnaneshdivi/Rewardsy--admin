export const getBaseURL = () => {
    return import.meta.env.VITE_BACKEND_URL; // Returns the base URL from environment variables
  };
  
  export const APICallHandler = async (
    endpoint,      // Relative endpoint, e.g., '/login' or '/users'
    method = 'GET', // Default method is GET, but you can pass POST, PUT, DELETE, etc.
    token = undefined, // Optional token for Authorization (default is undefined)
    additionalHeaders = {}, // Any additional custom headers
    body = undefined // Request body (default is undefined)
  ) => {
    try {
      const baseURL = getBaseURL(); // Get base URL from environment variables
      const url = `${baseURL}${endpoint}`; // Combine base URL with the endpoint
  
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // Add Authorization header if token exists
        ...additionalHeaders // Spread additional headers (e.g., custom headers)
      };
  
      const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }) // Only add body if it's provided (for POST, PUT requests)
      };
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Call Error:', error.message);
      throw error;
    }
  };
  