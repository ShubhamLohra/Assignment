import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Dashboard = () => {
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',        // This will store service ID
    city: '',
    budget: '',
    status: 'NEW'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState([]); // Add services state
  const [servicesLoading, setServicesLoading] = useState(true); // Add services loading state
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state

  // Add CSS for consistent dropdown styling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Force consistent dropdown styling across all browsers */
      select {
        background-size: 12px auto !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        box-sizing: border-box !important;
      }
      
      /* Specific styling for service dropdown */
      select[name="service"] {
        font-size: 14px !important;
        font-weight: 500 !important;
        height: 48px !important;
        min-height: 48px !important;
        max-height: 48px !important;
        line-height: 1.5 !important;
        padding: 12px 16px !important;
        box-sizing: border-box !important;
      }
      
      /* Ensure all options have exactly the same size */
      select option {
        padding: 12px 16px !important;
        height: 40px !important;
        min-height: 40px !important;
        max-height: 40px !important;
        line-height: 16px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        display: block !important;
        box-sizing: border-box !important;
        border-bottom: 1px solid #e5e7eb !important;
        background-color: white !important;
        color: #374151 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }
      
      /* Service dropdown specific option styling */
      select[name="service"] option {
        padding: 12px 16px !important;
        height: 40px !important;
        min-height: 40px !important;
        max-height: 40px !important;
        line-height: 16px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        display: block !important;
        box-sizing: border-box !important;
        border-bottom: 1px solid #e5e7eb !important;
        background-color: white !important;
        color: #374151 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }
      
      /* Remove borders from last option */
      select option:last-child {
        border-bottom: none !important;
      }
      
      /* Hover state for options */
      select option:hover {
        background-color: #f3f4f6 !important;
        color: #1f2937 !important;
      }
      
      /* Selected/focused option state */
      select option:checked,
      select option:selected,
      select:focus option:checked {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
        color: white !important;
        font-weight: 600 !important;
      }
      
      /* Disabled options */
      select option:disabled {
        background-color: #f9fafb !important;
        color: #9ca3af !important;
        cursor: not-allowed !important;
      }
      
      /* Ensure consistent spacing in dropdown */
      select optgroup {
        padding: 8px 0 !important;
      }
      
      /* Override any browser-specific styling */
      select::-ms-expand {
        display: none !important;
      }
      
      /* Firefox specific fixes */
      @-moz-document url-prefix() {
        select[name="service"] {
          height: 48px !important;
          min-height: 48px !important;
          max-height: 48px !important;
        }
        select option {
          padding: 12px 16px !important;
          height: 40px !important;
          min-height: 40px !important;
        }
        select[name="service"] option {
          padding: 12px 16px !important;
          height: 40px !important;
          min-height: 40px !important;
        }
      }
      
      /* Webkit specific fixes */
      select::-webkit-listbox {
        padding: 8px 0 !important;
      }
      
      select::-webkit-option {
        padding: 12px 16px !important;
        height: 40px !important;
        min-height: 40px !important;
        line-height: 16px !important;
      }
      
      /* Additional webkit fixes for service dropdown */
      select[name="service"]::-webkit-option {
        padding: 12px 16px !important;
        height: 40px !important;
        min-height: 40px !important;
        line-height: 16px !important;
      }
      
      /* Ensure input fields and select have consistent styling */
      input[type="text"], input[type="email"], input[type="tel"], input[type="number"], select {
        height: 48px !important;
        min-height: 48px !important;
        max-height: 48px !important;
        padding: 12px 16px !important;
        font-size: 14px !important;
        line-height: 1.5 !important;
        box-sizing: border-box !important;
        border-radius: 8px !important;
        border: 1px solid #d1d5db !important;
        transition: all 0.2s ease !important;
      }
      
      /* Focus states for consistency */
      input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus, input[type="number"]:focus, select:focus {
        outline: none !important;
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [stats, setStats] = useState([
    { title: 'Total Leads', value: '0', color: 'bg-blue-500' },
    { title: 'Qualified Leads', value: '0', color: 'bg-green-500' },
    { title: 'Total Revenue', value: '₹0', color: 'bg-purple-500' },
    { title: 'Revenue in Pipeline', value: '₹0', color: 'bg-orange-500' },
    { title: 'Conversion Rate', value: '0%', color: 'bg-red-500' },
  ]);

  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Functions
  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      const data = await apiService.getServices();
      console.log('Services loaded from backend:', data); // Debug log
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      // For now, we'll calculate stats from leads data
      // In the future, you can add a dedicated stats endpoint
      const leads = await apiService.getLeads();
      const totalLeads = leads.length;
      const qualifiedLeads = leads.filter(lead => lead.status === 'QUALIFIED');
      const qualifiedLeadsCount = qualifiedLeads.length;
      
      // Calculate revenue from qualified leads only
      const totalRevenue = qualifiedLeads.reduce((sum, lead) => {
        return sum + (lead.budget ? parseFloat(lead.budget) : 0);
      }, 0);
      
      // Calculate revenue in pipeline (all leads excluding qualified)
      const pipelineRevenue = leads
        .filter(lead => lead.status !== 'QUALIFIED')
        .reduce((sum, lead) => {
          return sum + (lead.budget ? parseFloat(lead.budget) : 0);
        }, 0);
      
      setStats([
        { title: 'Total Leads', value: totalLeads.toString(), color: 'bg-blue-500' },
        { title: 'Qualified Leads', value: qualifiedLeadsCount.toString(), color: 'bg-green-500' },
        { title: 'Total Revenue', value: '₹' + totalRevenue.toLocaleString(), color: 'bg-purple-500' },
        { title: 'In Pipeline', value: '₹' + pipelineRevenue.toLocaleString(), color: 'bg-orange-500' },
        { title: 'Conversion Rate', value: totalLeads > 0 ? Math.round((qualifiedLeadsCount / totalLeads) * 100) + '%' : '0%', color: 'bg-red-500' },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchRecentLeads = async () => {
    try {
      const data = await apiService.getLeads();
      setRecentLeads(data.slice(0, 5)); // Get first 5 leads
    } catch (error) {
      console.error('Error fetching recent leads:', error);
    }
  };

  const createLead = async (leadData) => {
    try {
      const newLead = await apiService.createLead(leadData);
      setRecentLeads(prev => [newLead, ...prev]);
      fetchDashboardStats(); // Refresh stats
      return newLead;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchDashboardStats(), fetchRecentLeads(), fetchServices()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!newLead.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!newLead.service || newLead.service === '') {
      newErrors.service = 'Service is required';
    } else if (isNaN(parseInt(newLead.service))) {
      newErrors.service = 'Please select a valid service';
    } else {
      // Check if the selected service ID exists in available services
      const serviceExists = services.some(service => service.id === parseInt(newLead.service));
      if (!serviceExists) {
        newErrors.service = 'Selected service is not available';
      }
    }
    
    if (!newLead.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (newLead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newLead.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (newLead.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(newLead.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (newLead.budget && newLead.budget < 0) {
      newErrors.budget = 'Budget cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create lead using real API with proper service structure
      const leadData = {
        ...newLead,
        service: { id: parseInt(newLead.service) }, // Convert to object with ID
        budget: newLead.budget ? parseFloat(newLead.budget) : null,
        status: 'NEW',
        source: 'WEBSITE'
      };
      
      console.log('Sending lead data to backend:', leadData); // Debug log
      
      await createLead(leadData);
      
      // Reset form
      setNewLead({
        name: '',
        email: '',
        phone: '',
        service: '',
        city: '',
        budget: '',
        status: 'NEW'
      });
      setErrors({});
      setShowAddLeadModal(false);
      setSuccessMessage('Lead added successfully!');
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error('Error adding lead:', error);
      
      // Show more specific error messages
      let errorMessage = 'Failed to add lead. Please try again.';
      
      if (error.message && error.message.includes('Service with ID')) {
        errorMessage = 'Invalid service selected. Please choose a valid service.';
      } else if (error.message && error.message.includes('foreign key constraint')) {
        errorMessage = 'Invalid service or user selected. Please check your selections.';
      } else if (error.message && error.message.includes('400')) {
        errorMessage = 'Invalid data provided. Please check all required fields.';
      } else if (error.message && error.message.includes('500')) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Main Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your CRM today.
          </p>
          
          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    type="button"
                    onClick={() => setSuccessMessage('')}
                    className="inline-flex text-green-400 hover:text-green-600"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

                {/* Stats Grid */}
                <div className="flex flex-wrap gap-4">
                  {loading ? (
                    // Loading skeleton
                    Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="card animate-pulse flex-1 min-w-[200px]">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
                            <div className="h-6 bg-gray-300 rounded w-12"></div>
                          </div>
                          <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    stats.map((stat, index) => (
                      <div key={index} className="card flex-1 min-w-[200px]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                          </div>
                          <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center relative`}>
                            {/* Special handling for conversion rate card */}
                            {stat.title === 'Conversion Rate' ? (
                              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                                </svg>
                              </div>
                            ) : (
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                       {/* Recent Leads */}
               <div className="card">
                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h2>
                 <div className="space-y-3">
                   {loading ? (
                     // Loading skeleton
                     Array.from({ length: 3 }).map((_, index) => (
                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse">
                         <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                           <div>
                             <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                             <div className="h-3 bg-gray-300 rounded w-32"></div>
                           </div>
                         </div>
                         <div className="text-right">
                           <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                           <div className="h-6 bg-gray-300 rounded w-20"></div>
                         </div>
                       </div>
                     ))
                   ) : recentLeads.length > 0 ? (
                     recentLeads.map((lead, index) => (
                       <div key={lead.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                         <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                             <span className="text-blue-600 font-medium">{lead.name?.charAt(0) || '?'}</span>
                           </div>
                           <div>
                             <p className="font-medium text-gray-900">{lead.name || 'Unknown'}</p>
                             <div className="flex items-center space-x-2 text-sm text-gray-500">
                               <span>{lead.serviceName || (lead.serviceId ? 'Service ID: ' + lead.serviceId : 'No service selected')}</span>
                               <span>•</span>
                               <span>{lead.city || 'No city'}</span>
                             </div>
                           </div>
                         </div>
                         <div className="text-right">
                           <p className="font-semibold text-gray-900">₹{lead.budget?.toLocaleString() || '0'}</p>
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                             {lead.status || 'NEW'}
                           </span>
                         </div>
                       </div>
                     ))
                   ) : (
                     <div className="text-center py-8 text-gray-500">
                       <p>No leads found. Create your first lead!</p>
                     </div>
                   )}
                 </div>
               </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex justify-center">
            <button 
              onClick={() => setShowAddLeadModal(true)}
              className="btn-primary px-8 py-3 text-lg"
            >
              Add New Deal
            </button>
          </div>
        </div>
      </div>

      {/* Add New Lead Modal - Production Ready */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-5">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh]">
            {/* Header */}
            <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-200 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">+</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Add New Deal</h3>
                    <p className="text-gray-500 text-sm">Fill in the details below to create a new deal</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddLeadModal(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all duration-200"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newLead.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-12 border-gray-300 ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : 'hover:border-gray-400'
                    }`}
                    style={{
                      height: '48px',
                      minHeight: '48px',
                      maxHeight: '48px',
                      padding: '12px 16px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newLead.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-12 border-gray-300 ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'hover:border-gray-400'
                    }`}
                    style={{
                      height: '48px',
                      minHeight: '48px',
                      maxHeight: '48px',
                      padding: '12px 16px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>
              
              {/* Row 2: Phone & Service */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newLead.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-12 border-gray-300 ${
                      errors.phone ? 'border-red-300 focus:ring-red-500' : 'hover:border-gray-400'
                    }`}
                    style={{
                      height: '48px',
                      minHeight: '48px',
                      maxHeight: '48px',
                      padding: '12px 16px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700">
                      Service <span className="text-red-500">*</span>
                    </label>
                    {!servicesLoading && services.length === 0 && (
                      <button
                        type="button"
                        onClick={fetchServices}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        🔄 Refresh Services
                      </button>
                    )}
                  </div>
                  <select
                    name="service"
                    value={newLead.service}
                    onChange={handleInputChange}
                    required
                    disabled={servicesLoading}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-12 border-gray-300 ${
                      errors.service ? 'border-red-300 focus:ring-red-500' : 'hover:border-gray-400'
                    } ${servicesLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ 
                      height: '48px',
                      minHeight: '48px',
                      maxHeight: '48px',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.1c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '12px auto',
                      paddingRight: '40px',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '1.5',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="" className="py-2">
                      {servicesLoading ? '🔄 Loading services...' : 'Select Service'}
                    </option>
                    {servicesLoading ? (
                      <option value="" disabled>Loading services...</option>
                    ) : services.length === 0 ? (
                      <option value="" disabled>No services available</option>
                    ) : (
                      services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))
                    )}
                  </select>
                  {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
                  {!servicesLoading && services.length === 0 && (
                    <p className="text-amber-600 text-sm">
                      ⚠️ No services available. Please add services in the backend first.
                    </p>
                  )}
                  
                </div>
              </div>
              
              {/* Row 3: City & Budget */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={newLead.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter city"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-12 border-gray-300 ${
                      errors.city ? 'border-red-300 focus:ring-red-500' : 'hover:border-gray-400'
                    }`}
                    style={{
                      height: '48px',
                      minHeight: '48px',
                      maxHeight: '48px',
                      padding: '12px 16px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Budget (₹)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="budget"
                      value={newLead.budget}
                      onChange={handleInputChange}
                      placeholder="Enter budget amount"
                      min="0"
                      className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-12 border-gray-300 ${
                        errors.budget ? 'border-red-300 focus:ring-red-500' : 'hover:border-gray-400'
                      }`}
                      style={{
                        height: '48px',
                        minHeight: '48px',
                        maxHeight: '48px',
                        padding: '12px 16px 12px 32px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || servicesLoading || services.length === 0}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Lead...</span>
                    </div>
                  ) : servicesLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading Services...</span>
                    </div>
                  ) : services.length === 0 ? (
                    'No Services Available'
                  ) : (
                    'Add Deal'
                  )}
                </button>
              </div>
            </form>
            
            {/* Help message when no services */}
            {!servicesLoading && services.length === 0 && (
              <div className="px-8 pb-6">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-800">
                        <strong>No services available.</strong> Please add services in the backend first, or check if the backend is running.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
