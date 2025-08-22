import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Pipeline = () => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingLead, setUpdatingLead] = useState(null);
  const [showStageModal, setShowStageModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedStage, setSelectedStage] = useState('');

  // Available stages for switching
  const availableStages = [
    { key: 'NEW', name: 'New Leads', color: 'bg-blue-50', textColor: 'text-blue-900', borderColor: 'border-blue-200' },
    { key: 'CONTACTED', name: 'Contacted', color: 'bg-amber-50', textColor: 'text-amber-900', borderColor: 'border-amber-200' },
    { key: 'QUALIFIED', name: 'Qualified', color: 'bg-emerald-50', textColor: 'text-emerald-900', borderColor: 'border-emerald-200' },
    { key: 'PROPOSAL', name: 'Proposal', color: 'bg-violet-50', textColor: 'text-violet-900', borderColor: 'border-violet-200' },
    { key: 'NEGOTIATION', name: 'Negotiation', color: 'bg-orange-50', textColor: 'text-orange-900', borderColor: 'border-orange-200' },
    { key: 'CLOSED_WON', name: 'Closed Won', color: 'bg-green-50', textColor: 'text-green-900', borderColor: 'border-green-200' },
    { key: 'LOST', name: 'Lost', color: 'bg-red-50', textColor: 'text-red-900', borderColor: 'border-red-200' }
  ];

  // Function to open stage change modal
  const openStageModal = (lead) => {
    setSelectedLead(lead);
    setSelectedStage(lead.status || 'NEW');
    setShowStageModal(true);
  };

  // Function to change lead stage
  const changeLeadStage = async (leadId, newStage) => {
    try {
      console.log('Attempting to change lead stage:', { leadId, newStage });
      setUpdatingLead(leadId);
      
      // Update lead status via API - only send the status field
      const response = await apiService.updateLead(leadId, { status: newStage });
      console.log('API response:', response);
      
      // Refresh the pipeline
      await fetchLeads();
      
      // Close modal
      setShowStageModal(false);
      setSelectedLead(null);
      setSelectedStage('');
      
      console.log('Lead stage updated successfully');
      
    } catch (error) {
      console.error('Error updating lead stage:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        leadId,
        newStage
      });
      alert(`Failed to update lead stage: ${error.message}. Please try again.`);
    } finally {
      setUpdatingLead(null);
    }
  };

  // Function to fetch leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const leads = await apiService.getLeads();
        
      // Group leads by status using available stages
      const stageMap = {};
      availableStages.forEach(stage => {
        stageMap[stage.key] = { 
          name: stage.name, 
          leads: [], 
          color: stage.color, 
          textColor: stage.textColor,
          borderColor: stage.borderColor
        };
      });
        
      leads.forEach(lead => {
        if (stageMap[lead.status]) {
          stageMap[lead.status].leads.push({
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            city: lead.city,
            service: lead.serviceName || (lead.serviceId ? 'Service ID: ' + lead.serviceId : 'No service'),
            budget: lead.budget || 0,
            source: lead.source || 'OTHER',
            notes: lead.notes,
            createdAt: lead.createdAt,
            status: lead.status // Add status for stage switching
          });
        }
      });
        
      setStages(Object.values(stageMap));
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Fallback to empty stages
      setStages(availableStages.map(stage => ({ ...stage, leads: [] })));
    } finally {
      setLoading(false);
    }
  };

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lead Pipeline</h1>
        <p className="text-gray-600 mt-1">
          Manage your leads across different stages
        </p>
      </div>

      {/* Pipeline Board */}
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-4 min-h-[600px] w-80 animate-pulse">
                <div className="mb-4 pb-2 border-b border-gray-200">
                  <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-8"></div>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 2 }).map((_, leadIndex) => (
                    <div key={leadIndex} className="bg-white rounded-lg shadow p-4">
                      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          stages.map((stage, stageIndex) => (
            <div key={stageIndex} className="flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-4 min-h-[600px] w-80">
                <div className={`mb-4 pb-2 border-b-2 ${stage.borderColor}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-lg ${stage.textColor}`}>{stage.name}</h3>
                    <span className={`${stage.color} ${stage.borderColor} border px-3 py-1 rounded-full text-sm font-bold ${stage.textColor} shadow-sm`}>
                      {stage.leads.length}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {stage.leads.map((lead, leadIndex) => (
                    <div key={leadIndex} className="bg-white rounded-lg shadow p-4 cursor-move hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight">
                          {lead.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold shadow-sm border ${
                          lead.source === 'WEBSITE' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                          lead.source === 'INSTAGRAM' ? 'bg-pink-100 text-pink-900 border-pink-300' :
                          lead.source === 'WHATSAPP' ? 'bg-green-100 text-green-900 border-green-300' :
                          lead.source === 'REFERRAL' ? 'bg-violet-100 text-violet-900 border-violet-300' :
                          'bg-gray-100 text-gray-900 border-gray-300'
                        }`}>
                          {lead.source}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">📧</span>
                          <span className="font-medium">{lead.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">📱</span>
                          <span className="font-medium">{lead.phone || 'No phone'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">🏙️</span>
                          <span className="font-medium">{lead.city || 'No city'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">🎯</span>
                          <span className="font-medium">{lead.service}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-700 font-semibold">Budget</span>
                          <span className="text-sm font-bold text-green-800 bg-green-100 border border-green-300 px-2 py-1 rounded shadow-sm">
                            ₹{lead.budget?.toLocaleString() || '0'}
                          </span>
                        </div>
                        
                        {/* Stage Change Button */}
                        <button
                          onClick={() => openStageModal(lead)}
                          disabled={updatingLead === lead.id}
                          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-md border-2 border-blue-700"
                        >
                          {updatingLead === lead.id ? 'Updating...' : 'Change Stage'}
                        </button>
                        
                        {/* Quick Stage Transitions */}
                        <div className="mt-2 space-y-1">
                          {lead.status === 'NEW' && (
                            <button
                              onClick={() => changeLeadStage(lead.id, 'CONTACTED')}
                              disabled={updatingLead === lead.id}
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded transition-colors duration-200 disabled:opacity-50 font-bold shadow-md border-2 border-orange-600"
                            >
                              → Contacted
                            </button>
                          )}
                          {lead.status === 'CONTACTED' && (
                            <button
                              onClick={() => changeLeadStage(lead.id, 'QUALIFIED')}
                              disabled={updatingLead === lead.id}
                              className="w-full bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded transition-colors duration-200 disabled:opacity-50 font-bold shadow-md border-2 border-green-600"
                            >
                              → Qualified
                            </button>
                          )}
                          {lead.status === 'QUALIFIED' && (
                            <button
                              onClick={() => changeLeadStage(lead.id, 'PROPOSAL')}
                              disabled={updatingLead === lead.id}
                              className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs px-2 py-1 rounded transition-colors duration-200 disabled:opacity-50 font-bold shadow-md border-2 border-purple-600"
                            >
                              → Proposal
                            </button>
                          )}
                          {lead.status === 'PROPOSAL' && (
                            <button
                              onClick={() => changeLeadStage(lead.id, 'NEGOTIATION')}
                              disabled={updatingLead === lead.id}
                              className="w-full bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors duration-200 disabled:opacity-50 font-bold shadow-md border-2 border-red-600"
                            >
                              → Negotiation
                            </button>
                          )}
                          {lead.status === 'NEGOTIATION' && (
                            <button
                              onClick={() => changeLeadStage(lead.id, 'CLOSED_WON')}
                              disabled={updatingLead === lead.id}
                              className="w-full bg-teal-500 hover:bg-teal-600 text-white text-xs px-2 py-1 rounded transition-colors duration-200 disabled:opacity-50 font-bold shadow-md border-2 border-teal-600"
                            >
                              → Closed Won
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {stage.leads.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                        <span className="text-2xl">📝</span>
                      </div>
                      <p className="text-sm text-gray-500">No leads in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stage Change Modal */}
      {showStageModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Change Lead Stage</h3>
              <button
                onClick={() => setShowStageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Moving <strong>{selectedLead.name}</strong> to a new stage:
              </p>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select New Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableStages.map((stage) => (
                  <option key={stage.key} value={stage.key}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowStageModal(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 hover:border-gray-500 transition-colors duration-200 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => changeLeadStage(selectedLead.id, selectedStage)}
                disabled={updatingLead === selectedLead.id}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-md border-2 border-blue-700"
              >
                {updatingLead === selectedLead.id ? 'Updating...' : 'Update Stage'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pipeline;
