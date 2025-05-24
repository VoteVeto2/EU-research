import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { InlineMath } from 'react-katex'; // Import react-katex component

const EUResearchNetworkDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Network metrics data from our analysis
  const networkMetrics = [
    { name: 'Organizations(Nodes)', value: 27224 },
    { name: 'Collaborations(Edges)', value: 751350 },
    { name: 'Average Degree', value: 56.48 },
    { name: 'Maximum Degree', value: 5310 },
  ];

  // Top organizations by degree (most connected)
  const topOrganizations = [
    { name: 'FRAUNHOFER GESELLSCHAFT', country: 'DE', degree: 5312 },
    { name: 'CSIC', country: 'ES', degree: 4104 },
    { name: 'CNRS', country: 'FR', degree: 3964 },
    { name: 'CNR', country: 'IT', degree: 3631 },
    { name: 'KUL', country: 'BE', degree: 3467 },
    { name: 'ETHNIKO KENTRO EREVNAS', country: 'EL', degree: 3194 },
    { name: 'CEA', country: 'FR', degree: 3132 },
    { name: 'DELFT', country: 'NL', degree: 3102 },
    { name: 'VTT', country: 'FI', degree: 2944 },
    { name: 'DTU', country: 'DK', degree: 2814 },
  ];

  // Country participation data
  const countryData = [
    {
      name: 'DE',
      participations: 11264,
      funding: 7143895811,
    },
    {
      name: 'ES',
      participations: 11234,
      funding: 4525546554,
    },
    {
      name: 'IT',
      participations: 9730,
      funding: 3810963991,
    },
    {
      name: 'FR',
      participations: 9380,
      funding: 5005580743,
    },
    {
      name: 'NL',
      participations: 6319,
      funding: 3791088379,
    },
    {
      name: 'BE',
      participations: 5576,
      funding: 3394415000,
    },
    {
      name: 'EL',
      participations: 4498,
      funding: 1677250792,
    },
    { name: 'UK', participations: 4310, funding: 417174489 },
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
    { name: 'DE-NL', value: 12661 },
  ];

  // Organization type data
  const orgTypeData = [
    { name: 'Higher Education (HES)', value: 34370, percent: 34.28 },
    { name: 'Private Company (PRC)', value: 30129, percent: 30.05 },
    { name: 'Research Org (REC)', value: 22471, percent: 22.42 },
    { name: 'Other (OTH)', value: 8114, percent: 8.09 },
    { name: 'Public Body (PUB)', value: 5141, percent: 5.13 },
  ];

  // Project coordinator type data
  const coordinatorTypeData = [
    { name: 'Higher Education (HES)', value: 8682 },
    { name: 'Research Org (REC)', value: 4344 },
    { name: 'Private Company (PRC)', value: 1847 },
    { name: 'Other (OTH)', value: 346 },
    { name: 'Public Body (PUB)', value: 121 },
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
    { range: '51+', count: 32 },
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
    { name: 'MSCA Doctoral Networks 2021', projects: 152 },
  ];

  
  // Project duration data
  const durationData = [
    { name: '< 1 year', projects: 249, percent: 1.62 },
    { name: '1-2 years', projects: 4712, percent: 30.72 },
    { name: '2-3 years', projects: 3204, percent: 20.89 },
    { name: '3-4 years', projects: 2901, percent: 18.91 },
    { name: '4-5 years', projects: 4063, percent: 26.48 },
    { name: '> 5 year', projects: 212, percent: 1.38 },
  ];

  // Degree distribution data (log-binned)
  const degreeDistribution = [
    { degree: '1-2', nodes: 3841 },
    { degree: '3-4', nodes: 3102 },
    { degree: '5-8', nodes: 4329 },
    { degree: '9-16', nodes: 3840 },
    { degree: '17-32', nodes: 3522 },
    { degree: '33-64', nodes: 3018 },
    { degree: '65-2⁷', nodes: 2408 },
    { degree: '129-2⁸', nodes: 1506 },
    { degree: '257-2⁹', nodes: 712 },
    { degree: '513-2¹⁰', nodes: 278 },
    { degree: '> 2¹⁰', nodes: 62 },
  ];


  // COLORS
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#8dd1e1',
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        EU Research Projects Network Analysis (2021-2027)
      </h1>

      <div className="mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Network Overview
          </button>
         
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'countries'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('countries')}
          >
            Countries
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'topics'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('topics')}
          >
            Research Topics
          </button>
          
        </div>
      </div>

      {activeTab === 'overview' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Network Structure Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Key Network Metrics</h3>
              <ul className="space-y-2">
                {networkMetrics.map((metric, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-600">{metric.name}:</span>
                    <span className="font-medium">
                      {typeof metric.value === 'number' && metric.value < 1
                        ? metric.value.toFixed(6)
                        : metric.value.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Network Interpretation:</h4>
                <p className="text-sm text-gray-600">
                  The EU research collaboration network shows very low density
                   but high average degree (56.48), indicating a
                  sparse network with <strong>centralized collaboration hubs</strong>. The
                  network appears to follow a power-law degree distribution as shown in the right.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Degree Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={degreeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="degree"
                    tickFormatter={(tick) => {
                      // Try to match "> LATEX_POWER_OF_2"
                      let match = tick.match(/^> (2\\\\^\\\\d+|2\\\\^{\\\\d+})$/);
                      if (match) {
                        return <>{'> '}<InlineMath math={match[1]} /></>;
                      }
                      // Try to match "PREFIX-LATEX_POWER_OF_2"
                      match = tick.match(/^(\\\\d+-)(2\\\\^\\\\d+|2\\\\^{\\\\d+})$/);
                      if (match) {
                        return <>{match[1]}<InlineMath math={match[2]} /></>;
                      }
                      // Default: return the tick as is
                      return tick;
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nodes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  The log-binned degree distribution follows a power law. One potential reason behind is that 
                  <strong> new organizations tend to collaborate with already well-connected institutions. </strong>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <h3 className="text-lg font-medium mb-4">
              Top 10 Organizations by Degree
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Degree centrality measures the number of direct connections an
              organization has in the network. These organizations are the most
              connected hubs in the EU research ecosystem.{' '}
              <strong>KU Leuven ranks at the fifth</strong>, while Fraunhofer
              Gesellschaft from Germany being the most connected hub.
            </p>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topOrganizations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border">
                          <p className="font-medium">
                            {payload[0].payload.name}
                          </p>
                          <p>Country: {payload[0].payload.country}</p>
                          <p>Connections: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="degree" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
      
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
                    label={({ name, percent }) =>
                      `${name.split(' ')[0]}: ${percent.toFixed(0)}%`
                    }
                  >
                    {orgTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      `${value.toLocaleString()} organizations (${(
                        (value / 100249) *
                        100
                      ).toFixed(2)}%)`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
      
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Higher Education institutions (HES) make up the largest
                  portion of participating organizations at 34.3%, followed
                  closely by Private Companies (PRC) at 30.1% and Research
                  Organizations (REC) at 22.4%.
                </p>
              </div>
            </div>
      
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">
                Organization Network Roles
              </h3>
      
              <div className="mb-4">
                <h4 className="font-medium">Key Insights</h4>
                <p className="text-sm text-gray-600 mb-2">
                  The network shows distinct tiers of organizations based on their
                  connectivity:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>
                    <strong>Tier 1 (Super-connectors):</strong> The top 10
                    organizations each connect to 2,800+ partners, forming the
                    core of the EU research network.
                  </li>
                  <li>
                    <strong>Tier 2 (Major hubs):</strong> ~250 organizations with
                    500-2,800 connections each, serving as sectoral or regional
                    hubs.
                  </li>
                  <li>
                    <strong>Tier 3 (Active collaborators):</strong> ~3,000
                    organizations with 100-500 connections, representing active
                    but specialized research entities.
                  </li>
                  <li>
                    <strong>Tier 4 (Peripheral participants):</strong> The
                    remaining organizations with fewer than 100 connections,
                    predominantly participating in fewer projects.
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  This tiered structure creates a hierarchical network with high
                  assortativity, where Tier 1 organizations connect extensively
                  with other Tier 1 and Tier 2 organizations, forming a densely
                  connected core surrounded by progressively sparser shells of
                  connectivity.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {activeTab === 'countries' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Country Participation Analysis
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">
                Country Participation
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="participations"
                    fill="#8884d8"
                    name="Participations"
                  />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Germany and Spain lead in total participations with over
                  11,000 each, followed by Italy and France with around 9,500
                  each. Germany also leads in project coordination roles with
                  2,114 coordinators.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">
                Top Country Collaborations
              </h3>

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
                  The strongest international collaboration link is between
                  Spain and Italy (20,322 collaborations), followed by
                  Germany-Spain (19,094) and Germany-France (18,831). Notably,
                  within-country collaborations are also very strong,
                  particularly in Spain and France.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">
              Country Funding Distribution
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) =>
                    `€${(value / 1000000000).toFixed(0)}B`
                  }
                />
                <Tooltip
                  formatter={(value) =>
                    `€${(value / 1000000000).toFixed(2)} billion`
                  }
                />
                <Bar
                  dataKey="funding"
                  fill="#ffc658"
                  name="EC Contribution (€)"
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6">
              <h4 className="font-medium mb-2">
                Insights on Country Collaboration Structure:
              </h4>
              <p className="text-sm text-gray-600">
                The country collaboration matrix exhibits interesting
                mathematical properties:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                <li>
                  The matrix
                </li>
                <li>
                  Collaboration intensity
                </li>
                <li>
                  The exponent <InlineMath math="\alpha" /> 
                </li>
                <li>
                  The eigenvector centrality of the country collaboration matrix
                  reveals a core group (DE, ES, FR, IT) that forms the backbone
                  of European research collaboration.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Research Topics Analysis
          </h2>

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
                ERC Starting Grants dominate the research landscape with 1,734
                projects, followed by various Marie Skłodowska-Curie Actions
                (MSCA) postdoctoral fellowships. 
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
             <h3 className="text-lg font-medium mb-4">
                Project Duration Distribution
              </h3>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={durationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) =>
                      `${value} projects (${durationData
                        .find((item) => item.projects === value)
                        ?.percent.toFixed(2)}%)`
                    }
                  />
                  <Bar dataKey="projects" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4">
              <p className="text-sm text-gray-600">
                During this funding period, the majority of projects (30.7%) last for 1-2 years. Only 1.6% of projects are shorter than 1 year, while 1.4% exceed 5 years.
              </p>
            </div>
            

            
          </div>
        </div>
      )}

    </div>
  );
};

export default EUResearchNetworkDashboard;