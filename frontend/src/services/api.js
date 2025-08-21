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

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
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
    return this.request(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(leadData),
    });
  }

  async deleteLead(id) {
    return this.request(`/leads/${id}`, {
      method: 'DELETE',
    });
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
}

export default new ApiService();
