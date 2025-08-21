import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Dashboard = () => {
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    city: '',
    budget: '',
    status: 'NEW'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [stats, setStats] = useState([
    { title: 'Total Leads', value: '0', color: 'bg-blue-500' },
    { title: 'Active Deals', value: '0', color: 'bg-green-500' },
    { title: 'Total Revenue', value: '₹0', color: 'bg-purple-500' },
    { title: 'Conversion Rate', value: '0%', color: 'bg-orange-500' },
  ]);

  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Functions
  const fetchDashboardStats = async () => {
    try {
      // For now, we'll calculate stats from leads data
      // In the future, you can add a dedicated stats endpoint
      const leads = await apiService.getLeads();
      const totalLeads = leads.length;
      const qualifiedLeads = leads.filter(lead => lead.status === 'QUALIFIED').length;
      
      setStats([
        { title: 'Total Leads', value: totalLeads.toString(), color: 'bg-blue-500' },
        { title: 'Active Deals', value: qualifiedLeads.toString(), color: 'bg-green-500' },
        { title: 'Total Revenue', value: '₹' + (totalLeads * 50000).toLocaleString(), color: 'bg-purple-500' },
        { title: 'Conversion Rate', value: totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) + '%' : '0%', color: 'bg-orange-500' },
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
      await Promise.all([fetchDashboardStats(), fetchRecentLeads()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!newLead.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!newLead.service) {
      newErrors.service = 'Service is required';
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
      // Create lead using real API
      const leadData = {
        ...newLead,
        budget: newLead.budget ? parseFloat(newLead.budget) : null,
        status: 'NEW',
        source: 'WEBSITE'
      };
      
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
      
      // Show success message
      alert('Lead added successfully!');
    } catch (error) {
      console.error('Error adding lead:', error);
      alert('Failed to add lead. Please try again.');
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
        </div>

                       {/* Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {loading ? (
                   // Loading skeleton
                   Array.from({ length: 4 }).map((_, index) => (
                     <div key={index} className="card animate-pulse">
                       <div className="flex items-center justify-between">
                         <div>
                           <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                           <div className="h-8 bg-gray-300 rounded w-16"></div>
                         </div>
                         <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                       </div>
                     </div>
                   ))
                 ) : (
                   stats.map((stat, index) => (
                     <div key={index} className="card">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                           <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                         </div>
                         <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                           <span className="text-white font-bold text-lg">📊</span>
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
                               <span>{lead.service?.name || lead.service || 'N/A'}</span>
                               <span>•</span>
                               <span>{lead.city || 'N/A'}</span>
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
              Add New Lead
            </button>
          </div>
        </div>
      </div>

      {/* Add New Lead Modal - Production Ready */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-200 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">+</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Add New Lead</h3>
                    <p className="text-gray-500 text-sm">Fill in the details below to create a new lead</p>
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
                <div className="space-y-2">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newLead.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>
              
              {/* Row 2: Phone & Service */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newLead.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={newLead.service}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.service ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Service</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Photography">Photography</option>
                    <option value="Decor">Decor</option>
                    <option value="Planning">Planning</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
                </div>
              </div>
              
              {/* Row 3: City & Budget */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.city ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Budget (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="budget"
                      value={newLead.budget}
                      onChange={handleInputChange}
                      placeholder="Enter budget amount"
                      min="0"
                      className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.budget ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
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
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Lead...</span>
                    </div>
                  ) : (
                    'Add Lead'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
