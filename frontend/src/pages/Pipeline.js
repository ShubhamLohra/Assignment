import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Pipeline = () => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch deals from API
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const deals = await apiService.getDeals();
          
          // Group deals by stage
          const stageMap = {
            'QUALIFIED': { name: 'Qualified', deals: [] },
            'CONTACTED': { name: 'Contacted', deals: [] },
            'NEGOTIATION': { name: 'Negotiation', deals: [] },
            'CLOSED': { name: 'Closed', deals: [] }
          };
          
          deals.forEach(deal => {
            if (stageMap[deal.stage]) {
              stageMap[deal.stage].deals.push({
                title: deal.title,
                lead: deal.lead?.name || 'Unknown',
                value: deal.value || 0,
                probability: deal.probability || 0
              });
            }
          });
          
          setStages(Object.values(stageMap));
      } catch (error) {
        console.error('Error fetching deals:', error);
        // Fallback to empty stages
        setStages([
          { name: 'Qualified', deals: [] },
          { name: 'Contacted', deals: [] },
          { name: 'Negotiation', deals: [] },
          { name: 'Closed', deals: [] }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeals();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Deal Pipeline</h1>
        <p className="text-gray-600 mt-1">
          Manage your deals across different stages
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
                  {Array.from({ length: 2 }).map((_, dealIndex) => (
                    <div key={dealIndex} className="bg-white rounded-lg shadow p-4">
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
                <div className="mb-4 pb-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{stage.name}</h3>
                    <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                      {stage.deals.length}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {stage.deals.map((deal, dealIndex) => (
                    <div key={dealIndex} className="bg-white rounded-lg shadow p-4 cursor-move hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight">
                          {deal.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center space-x-2">
                          <span>👤 {deal.lead}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>💰 ₹{deal.value?.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Probability</span>
                          <span className="text-xs font-medium text-blue-600">
                            {deal.probability}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {stage.deals.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                        <span className="text-2xl">📝</span>
                      </div>
                      <p className="text-sm text-gray-500">No deals in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pipeline;
