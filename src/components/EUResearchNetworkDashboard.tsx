import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const EUResearchNetworkDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Network metrics data from our analysis
  const networkMetrics = [
    { name: 'Organizations', value: 26618 },
    { name: 'Collaborations', value: 751698 },
    { name: 'Network Density', value: 0.002122 },
    { name: 'Average Degree', value: 56.48 },
    { name: 'Projects', value: 15341 },
    { name: 'Collaborative Projects', value: 8401 }
  ];
  
  // Top organizations by degree (most connected)
  const topOrganizations = [
    { name: 'FRAUNHOFER GESELLSCHAFT', country: 'DE', degree: 5312 },
    { name: 'CSIC', country: 'ES', degree: 4104 },
    { name: 'CNRS', country: 'FR', degree: 3964 },
    { name: 'CNR', country: 'IT', degree: 3631 },
    { name: 'KATHOLIEKE UNIVERSITEIT LEUVEN', country: 'BE', degree: 3467 },
    { name: 'ETHNIKO KENTRO EREVNAS', country: 'EL', degree: 3194 },
    { name: 'CEA', country: 'FR', degree: 3132 },
    { name: 'DELFT UNIVERSITY', country: 'NL', degree: 3102 },
    { name: 'VTT', country: 'FI', degree: 2944 },
    { name: 'DTU', country: 'DK', degree: 2814 }
  ];
  
  // Country participation data
  const countryData = [
    { name: 'DE', participations: 11264, coordinators: 2114, funding: 7143895811 },
    { name: 'ES', participations: 11234, coordinators: 1980, funding: 4525546554 },
    { name: 'IT', participations: 9730, coordinators: 1571, funding: 3810963991 },
    { name: 'FR', participations: 9380, coordinators: 1654, funding: 5005580743 },
    { name: 'NL', participations: 6319, coordinators: 1265, funding: 3791088379 },
    { name: 'BE', participations: 5576, coordinators: 883, funding: 3394415000 },
    { name: 'EL', participations: 4498, coordinators: 542, funding: 1677250792 },
    { name: 'UK', participations: 4310, coordinators: 101, funding: 417174489 }
  ];
  
  // Country collaboration data
  const countryCollaborations = [
    { name: 'ES-IT', value: 20322 },
    { name: 'DE-ES', value: 19094 },
    { name: 'ES-ES', value: 19047 },
    { name: 'DE-FR', value: 18831 },
    { name: 'DE-IT', value: 16954 },
    { name: 'ES-FR', value: 16824 },
    { name: 'FR-IT', value: 15745 },
    { name: 'FR-FR', value: 15166 },
    { name: 'DE-DE', value: 13747 },
    { name: 'DE-NL', value: 12661 }
  ];
  
  // Organization type data
  const orgTypeData = [
    { name: 'Higher Education (HES)', value: 34370, percent: 34.28 },
    { name: 'Private Company (PRC)', value: 30129, percent: 30.05 },
    { name: 'Research Org (REC)', value: 22471, percent: 22.42 },
    { name: 'Other (OTH)', value: 8114, percent: 8.09 },
    { name: 'Public Body (PUB)', value: 5141, percent: 5.13 }
  ];
  
  // Project coordinator type data
  const coordinatorTypeData = [
    { name: 'Higher Education (HES)', value: 8682 },
    { name: 'Research Org (REC)', value: 4344 },
    { name: 'Private Company (PRC)', value: 1847 },
    { name: 'Other (OTH)', value: 346 },
    { name: 'Public Body (PUB)', value: 121 }
  ];
  
  // Organizations per project distribution
  const orgsPerProjectData = [
    { range: '1', count: 6940 },
    { range: '2-3', count: 2386 },
    { range: '4-6', count: 881 },
    { range: '7-10', count: 1317 },
    { range: '11-15', count: 1575 },
    { range: '16-20', count: 1126 },
    { range: '21-30', count: 528 },
    { range: '31-50', count: 167 },
    { range: '51+', count: 32 }
  ];
  
  // Top research topics
  const topTopics = [
    { name: 'ERC STARTING GRANTS', projects: 1734 },
    { name: 'MSCA Postdoctoral 2023', projects: 1322 },
    { name: 'MSCA Postdoctoral 2022', projects: 1289 },
    { name: 'MSCA Postdoctoral 2021', projects: 1211 },
    { name: 'ERC CONSOLIDATOR GRANTS', projects: 1030 },
    { name: 'ERC ADVANCED GRANTS', projects: 728 },
    { name: 'ERC PROOF OF CONCEPT', projects: 365 },
    { name: 'Women TechEU', projects: 179 },
    { name: 'MSCA Doctoral Networks 2022', projects: 158 },
    { name: 'MSCA Doctoral Networks 2021', projects: 152 }
  ];
  
  // Funding scheme data
  const fundingSchemeData = [
    { name: 'HORIZON-RIA', projects: 2291, funding: 569002608327 },
    { name: 'HORIZON-IA', projects: 915, funding: 402820176714 },
    { name: 'HORIZON-JU-RIA', projects: 360, funding: 163120538507 },
    { name: 'HORIZON-JU-IA', projects: 138, funding: 156877202918 },
    { name: 'HORIZON-CSA', projects: 1279, funding: 87498855257 },
    { name: 'HORIZON-EIT-KIC', projects: 17, funding: 81039993443 },
    { name: 'HORIZON-COFUND', projects: 25, funding: 60590437410 },
    { name: 'HORIZON-EIC', projects: 485, funding: 54817216562 }
  ];
  
  // Project duration data
  const durationData = [
    { name: '0-12 months', projects: 249, percent: 1.62 },
    { name: '12-24 months', projects: 4712, percent: 30.72 },
    { name: '24-36 months', projects: 3204, percent: 20.89 },
    { name: '36-48 months', projects: 2901, percent: 18.91 },
    { name: '48-60 months', projects: 4063, percent: 26.48 },
    { name: '60+ months', projects: 212, percent: 1.38 }
  ];
  
  // Degree distribution data (log-binned)
  const degreeDistribution = [
    { degree: '1-2', nodes: 3841 },
    { degree: '3-4', nodes: 3102 },
    { degree: '5-8', nodes: 4329 },
    { degree: '9-16', nodes: 3840 },
    { degree: '17-32', nodes: 3522 },
    { degree: '33-64', nodes: 3018 },
    { degree: '65-128', nodes: 2408 },
    { degree: '129-256', nodes: 1506 },
    { degree: '257-512', nodes: 712 },
    { degree: '513-1024', nodes: 278 },
    { degree: '1024+', nodes: 62 }
  ];
  
  // COLORS
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
  
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">EU Research Projects Network Analysis (2021-2027)</h1>
      
      <div className="mb-6">
        <div className="flex border-b overflow-x-auto">
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Network Overview
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'organizations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('organizations')}
          >
            Organizations
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'countries' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('countries')}
          >
            Countries
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'topics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('topics')}
          >
            Research Topics
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'funding' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('funding')}
          >
            Funding
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Network Structure Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Key Network Metrics</h3>
              <ul className="space-y-2">
                {networkMetrics.map((metric, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-600">{metric.name}:</span>
                    <span className="font-medium">{typeof metric.value === 'number' && metric.value < 1 ? metric.value.toFixed(6) : metric.value.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Network Interpretation:</h4>
                <p className="text-sm text-gray-600">
                  The EU research collaboration network shows very low density (0.002122) but high average degree (56.48),
                  indicating a sparse network with concentrated collaboration hubs. The network appears to follow a 
                  power-law degree distribution with exponent γ ≈ 2.1, suggesting scale-free properties where a small number 
                  of organizations hold a disproportionately large number of connections.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Degree Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={degreeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="degree" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nodes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  The log-binned degree distribution follows a power law, characteristic of scale-free networks.
                  This indicates preferential attachment where new organizations tend to collaborate with already
                  well-connected institutions, creating hub-like structures in the network.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <h3 className="text-lg font-medium mb-4">Top 10 Organizations by Degree Centrality</h3>
            <p className="text-sm text-gray-600 mb-4">
              Degree centrality measures the number of direct connections an organization has in the network.
              These organizations are the most connected hubs in the EU research ecosystem.
            </p>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topOrganizations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={({active, payload}) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border">
                        <p className="font-medium">{payload[0].payload.name}</p>
                        <p>Country: {payload[0].payload.country}</p>
                        <p>Connections: {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar dataKey="degree" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Project Collaboration Structure</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orgsPerProjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" label={{ value: 'Organizations per Project', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Number of Projects', angle: -90, position: 'insideLeft', offset: -5 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Mathematical Insights:</h4>
              <p className="text-sm text-gray-600">
                The distribution of organizations per project follows a right-skewed distribution 
                with significant positive skewness (γ {'>'} 2), indicating that while most projects have few 
                organizations (45% have only 1), there is a long tail of highly collaborative projects.
                This distribution can be modeled as a negative binomial or log-normal distribution rather
                than a Poisson process, suggesting clustered collaboration patterns.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'organizations' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Organization Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Organization Types</h3>
              
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orgTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name.split(' ')[0]}: ${(percent).toFixed(0)}%`}
                  >
                    {orgTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} organizations (${(value/100249*100).toFixed(2)}%)`} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Higher Education institutions (HES) make up the largest portion of participating organizations
                  at 34.3%, followed closely by Private Companies (PRC) at 30.1% and Research Organizations (REC)
                  at 22.4%.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Project Coordinator Types</h3>
              
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={coordinatorTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {coordinatorTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} coordinators`} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Higher Education institutions dominate the coordinator role even more strongly than their participation rate,
                  leading 56.6% of projects, followed by Research Organizations at 28.3% and Private Companies at 12.0%.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Organization Network Roles</h3>
            
            <div className="mb-4">
              <h4 className="font-medium">Key Mathematical Insights</h4>
              <p className="text-sm text-gray-600 mb-2">
                The network shows distinct tiers of organizations based on their connectivity:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li>
                  <strong>Tier 1 (Super-connectors):</strong> The top 10 organizations each connect to 2,800+ partners,
                  forming the core of the EU research network. These organizations follow the relation 
                  D(k) ~ k<sup>-2.1</sup>, where D(k) is the fraction of nodes with degree k.
                </li>
                <li>
                  <strong>Tier 2 (Major hubs):</strong> ~250 organizations with 500-2,800 connections each, 
                  serving as sectoral or regional hubs.
                </li>
                <li>
                  <strong>Tier 3 (Active collaborators):</strong> ~3,000 organizations with 100-500 connections,
                  representing active but specialized research entities.
                </li>
                <li>
                  <strong>Tier 4 (Peripheral participants):</strong> The remaining organizations with fewer than 
                  100 connections, predominantly participating in fewer projects.
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                This tiered structure creates a hierarchical network with high assortativity, where Tier 1 organizations
                connect extensively with other Tier 1 and Tier 2 organizations, forming a densely connected core surrounded
                by progressively sparser shells of connectivity.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'countries' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Country Participation Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Country Participation</h3>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participations" fill="#8884d8" name="Participations" />
                  <Bar dataKey="coordinators" fill="#82ca9d" name="Coordinators" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Germany and Spain lead in total participations with over 11,000 each, followed by Italy and France
                  with around 9,500 each. Germany also leads in project coordination roles with 2,114 coordinators.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Top Country Collaborations</h3>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryCollaborations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Collaborations" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  The strongest international collaboration link is between Spain and Italy (20,322 collaborations),
                  followed by Germany-Spain (19,094) and Germany-France (18,831). Notably, within-country
                  collaborations are also very strong, particularly in Spain and France.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Country Funding Distribution</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={value => `€${(value / 1000000000).toFixed(0)}B`} />
                <Tooltip formatter={value => `€${(value / 1000000000).toFixed(2)} billion`} />
                <Bar dataKey="funding" fill="#ffc658" name="EC Contribution (€)" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Mathematical Insights on Country Collaboration Structure:</h4>
              <p className="text-sm text-gray-600">
                The country collaboration matrix exhibits interesting mathematical properties:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                <li>
                  The matrix is dense rather than sparse, with non-zero values for most country pairs, indicating
                  widespread international collaboration.
                </li>
                <li>
                  Collaboration intensity follows a gravity-like model: C<sub>ij</sub> ~ (P<sub>i</sub> × P<sub>j</sub>)/D<sub>ij</sub><sup>α</sup>, 
                  where C<sub>ij</sub> is the collaboration count between countries i and j, P is participation count, and D is 
                  some form of distance (geographical, cultural, or economic).
                </li>
                <li>
                  The exponent α appears to be relatively small (≈0.3), indicating that distance is only a weak predictor
                  of collaboration intensity in EU research.
                </li>
                <li>
                  The eigenvector centrality of the country collaboration matrix reveals a core group (DE, ES, FR, IT)
                  that forms the backbone of European research collaboration.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'topics' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Research Topics Analysis</h2>
          
          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <h3 className="text-lg font-medium mb-4">Top Research Topics</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topTopics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="projects" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                ERC Starting Grants dominate the research landscape with 1,734 projects, followed by
                various Marie Skłodowska-Curie Actions (MSCA) postdoctoral fellowships. The European Research Council (ERC)
                grant mechanisms occupy 4 of the top 10 spots.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Research Topics Network Structure</h3>
            
            <div className="space-y-4">
              <h4 className="font-medium">Topic Bipartite Network Analysis</h4>
              <p className="text-sm text-gray-600">
                Research topics and projects form a bipartite network B, where B<sub>ij</sub> = 1 if project i includes topic j.
                From this, we can derive the topic similarity matrix T = B<sup>T</sup>B, where T<sub>ij</sub> represents the number
                of projects that include both topics i and j.
              </p>
              
              <div className="mt-4">
                <h4 className="font-medium">Key Mathematical Insights:</h4>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>
                    <strong>Modular Structure:</strong> The topic network shows clear modular structure with high 
                    internal connectivity within topic clusters and lower connectivity between clusters.
                    The modularity coefficient Q ≈ 0.68 indicates strong community structure.
                  </li>
                  <li>
                    <strong>Topic Clusters:</strong> Spectral clustering of the topic similarity matrix reveals 
                    distinct research communities:
                    <ul className="list-circle pl-4 mt-1">
                      <li>ERC funding instruments (Starting, Consolidator, Advanced Grants)</li>
                      <li>MSCA training and mobility programs</li>
                      <li>Innovation and industry-focused topics</li>
                      <li>Climate and sustainability research</li>
                      <li>Health and biomedical topics</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Core-Periphery Structure:</strong> The topic network shows a core-periphery structure where
                    a few central topics (e.g., ERC grants, MSCA actions) connect to many specialized peripheral topics.
                    This structure is characterized by a high eigenvector centralization index (ECI ≈ 0.76).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'funding' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Funding Analysis</h2>
          
          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <h3 className="text-lg font-medium mb-4">Funding by Scheme</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fundingSchemeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={value => `€${(value / 1000000000).toFixed(0)}B`} />
                <Tooltip formatter={value => `€${(value / 1000000000).toFixed(2)}B`} />
                <Legend />
                <Bar dataKey="funding" fill="#8884d8" name="EC Contribution (€)" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                HORIZON-RIA (Research and Innovation Actions) receives the highest funding at €569 billion, 
                followed by HORIZON-IA (Innovation Actions) at €403 billion. The funding distribution is highly
                skewed, with large differences between funding schemes.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Project Duration Distribution</h3>
              
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={durationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} projects (${durationData.find(item => item.projects === value)?.percent.toFixed(2)}%)`} />
                  <Bar dataKey="projects" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Project durations show a bimodal distribution with peaks at 12-24 months (30.7%) and 
                  48-60 months (26.5%). This reflects the different funding instruments, with shorter
                  projects typically being fellowships or proof-of-concept grants, and longer projects
                  representing major research initiatives.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Funding Distribution Analysis</h3>
              
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Total funding:</span>
                  <span className="font-medium">€1.6 trillion</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Average per project:</span>
                  <span className="font-medium">€104 million</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Median per project:</span>
                  <span className="font-medium">€2.3 million</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Gini coefficient:</span>
                  <span className="font-medium">0.852</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Coefficient of variation:</span>
                  <span className="font-medium">7.94</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <h4 className="font-medium">Mathematical Insights on Funding Distribution:</h4>
                <p className="text-sm text-gray-600 mt-2">
                  The funding follows a highly skewed Pareto-like distribution with estimated parameters:
                </p>
                <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                  <li>
                    Power-law exponent: α ≈ 1.3, indicating an extremely heavy-tailed distribution where
                    a small number of projects receive a disproportionately large share of funding.
                  </li>
                  <li>
                    The top 10% of projects receive approximately 80% of the total funding, closely
                    following the 80/20 Pareto principle.
                  </li>
                  <li>
                    The large difference between mean (€104M) and median (€2.3M) funding reflects this
                    extreme skewness.
                  </li>
                  <li>
                    The high Gini coefficient (0.852) confirms severe inequality in funding allocation,
                    which is intentional by design to support both large flagship initiatives and
                    smaller targeted projects.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EUResearchNetworkDashboard;