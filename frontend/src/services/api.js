import config from '../config/config';

const API_BASE_URL = config.api.baseURL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    console.log('API Service - Making request to:', url);
    console.log('API Service - Request config:', config);

    try {
      const response = await fetch(url, config);
      console.log('API Service - Response status:', response.status);
      console.log('API Service - Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Service - Response not OK:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Service - Response data:', data);
      return data;
    } catch (error) {
      console.error('API Service - Request failed:', error);
      throw error;
    }
  }

  // Lead API methods
  async getLeads() {
    return this.request('/leads');
  }

  async getLead(id) {
    return this.request(`/leads/${id}`);
  }

  async createLead(leadData) {
    return this.request('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }

  async updateLead(id, leadData) {
    console.log('API Service - updateLead called with:', { id, leadData });
    try {
      const response = await this.request(`/leads/${id}`, {
        method: 'PUT',
        body: JSON.stringify(leadData),
      });
      console.log('API Service - updateLead response:', response);
      return response;
    } catch (error) {
      console.error('API Service - updateLead error:', error);
      throw error;
    }
  }

  async deleteLead(id) {
    return this.request(`/leads/${id}`, {
      method: 'DELETE',
    });
  }

  // Service API methods
  async getServices() {
    return this.request('/services');
  }

  // Deal API methods
  async getDeals() {
    return this.request('/deals');
  }

  async getDeal(id) {
    return this.request(`/deals/${id}`);
  }

  async createDeal(dealData) {
    return this.request('/deals', {
      method: 'POST',
      body: JSON.stringify(dealData),
    });
  }

  async updateDeal(id, dealData) {
    return this.request(`/deals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dealData),
    });
  }

  async deleteDeal(id) {
    return this.request(`/deals/${id}`, {
      method: 'DELETE',
    });
  }

  // AI Service methods
  async analyzeLead(leadData) {
    return this.request('/ai/analyze-lead', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }

  async generateFollowUp(dealId) {
    return this.request(`/ai/generate-followup/${dealId}`, {
      method: 'POST',
    });
  }

  // Authentication methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    const token = localStorage.getItem('token');
    return this.request('/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export default new ApiService();
