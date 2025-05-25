import React, { useState, useEffect, useRef } from 'react';
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
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { motion, useInView, useAnimation } from "framer-motion";

// TypeScript interfaces for better type safety
interface NetworkMetric {
  name: string;
  value: number;
  icon: string;
}

interface Organization {
  name: string;
  country: string;
  degree: number;
}

interface CountryData {
  name: string;
  participations: number;
  funding: number;
}

interface CountryCollaboration {
  name: string;
  value: number;
}

interface OrgTypeData {
  name: string;
  value: number;
  percent: number;
}

interface CoordinatorTypeData {
  name: string;
  value: number;
}

interface OrgsPerProjectData {
  range: string;
  count: number;
}

interface TopTopic {
  name: string;
  projects: number;
}

interface DurationData {
  name: string;
  projects: number;
  percent: number;
}

interface DegreeDistribution {
  degree: string;
  nodes: number;
}

interface AnimatedBarChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  height?: number;
  color?: string;
  customXAxisTick?: boolean;
  labelPrefix?: string;
  valueLabel?: string;
  showInBillions?: boolean;
  [key: string]: any;
}

interface AnimatedPieChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  height?: number;
  [key: string]: any;
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  [key: string]: any;
}

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

interface StatDisplayProps {
  label: string;
  value: number;
  icon: string;
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'pink';
}

const EUResearchNetworkDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const scrollRef = useRef(null);
  const controls = useAnimation();

  // Animation variants for scroll-triggered animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Animation hook for section visibility
  const useAnimateOnScroll = (threshold = 0.1) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    
    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView, controls]);
    
    return { ref, controls, variants: fadeInUp };
  };

  // Network metrics data from our analysis
  const networkMetrics: NetworkMetric[] = [
    { name: 'Organizations(Nodes)', value: 27224, icon: 'business' },
    { name: 'Collaborations(Edges)', value: 751350, icon: 'share' },
    { name: 'Average Degree', value: 56.48, icon: 'hub' },
    { name: 'Maximum Degree', value: 5312, icon: 'star' },
  ];

  // Top organizations by degree (most connected)
  const topOrganizations: Organization[] = [
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
  const countryData: CountryData[] = [
    { name: 'DE', participations: 11264, funding: 7143895811 },
    { name: 'ES', participations: 11234, funding: 4525546554 },
    { name: 'IT', participations: 9730, funding: 3810963991 },
    { name: 'FR', participations: 9380, funding: 5005580743 },
    { name: 'NL', participations: 6319, funding: 3791088379 },
    { name: 'BE', participations: 5576, funding: 3394415000 },
    { name: 'EL', participations: 4498, funding: 1677250792 },
    { name: 'UK', participations: 4310, funding: 417174489 },
  ];

  // Country collaboration data
  const countryCollaborations: CountryCollaboration[] = [
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
  const orgTypeData: OrgTypeData[] = [
    { name: 'Higher Education (HES)', value: 34370, percent: 34.28 },
    { name: 'Private Company (PRC)', value: 30129, percent: 30.05 },
    { name: 'Research Org (REC)', value: 22471, percent: 22.42 },
    { name: 'Other (OTH)', value: 8114, percent: 8.09 },
    { name: 'Public Body (PUB)', value: 5141, percent: 5.13 },
  ];

  // Project coordinator type data
  const coordinatorTypeData: CoordinatorTypeData[] = [
    { name: 'Higher Education (HES)', value: 8682 },
    { name: 'Research Org (REC)', value: 4344 },
    { name: 'Private Company (PRC)', value: 1847 },
    { name: 'Other (OTH)', value: 346 },
    { name: 'Public Body (PUB)', value: 121 },
  ];

  // Organizations per project distribution
  const orgsPerProjectData: OrgsPerProjectData[] = [
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
  const topTopics: TopTopic[] = [
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
  const durationData: DurationData[] = [
    { name: '< 1 year', projects: 249, percent: 1.62 },
    { name: '1-2 years', projects: 4712, percent: 30.72 },
    { name: '2-3 years', projects: 3204, percent: 20.89 },
    { name: '3-4 years', projects: 2901, percent: 18.91 },
    { name: '4-5 years', projects: 4063, percent: 26.48 },
    { name: '> 5 year', projects: 212, percent: 1.38 },
  ];

  // Degree distribution data (log-binned)
  const degreeDistribution: DegreeDistribution[] = [
    { degree: '1-2', nodes: 3841 },
    { degree: '3-4', nodes: 3102 },
    { degree: '5-8', nodes: 4329 },
    { degree: '9-16', nodes: 3840 },
    { degree: '17-32', nodes: 3522 },
    { degree: '33-64', nodes: 3018 },
    { degree: '65-2^{7}', nodes: 2408 },
    { degree: '129-2^{8}', nodes: 1506 },
    { degree: '257-2^{9}', nodes: 712 },
    { degree: '513-2^{10}', nodes: 278 },
    { degree: '> 2^{10}', nodes: 62 },
  ];

  // Helper function to render degree labels with LaTeX
  const renderDegreeLabel = (degree: string) => {
    if (degree.includes('^')) {
      return <InlineMath math={degree} />;
    }
    return degree;
  };

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

  // Custom tick component for LaTeX rendering
  const CustomTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize="12">
          {payload.value.includes('^') ? (
            <foreignObject x={-20} y={-8} width={40} height={20}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <InlineMath math={payload.value} />
              </div>
            </foreignObject>
          ) : (
            payload.value
          )}
        </text>
      </g>
    );
  };

  // Custom chart components with animations
  const AnimatedBarChart = ({ data, dataKey, xAxisKey, height = 300, color = "#82ca9d", customXAxisTick = false, labelPrefix = "", valueLabel = "Value", showInBillions = false, ...props }: AnimatedBarChartProps) => {
    const chartRef = useRef(null);
    const isInView = useInView(chartRef, { once: false });
    
    return (
      <motion.div 
        ref={chartRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        style={{ width: '100%', height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} {...props}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={xAxisKey} 
              tick={customXAxisTick ? <CustomTick /> : { fill: '#666', fontSize: 12 }} 
            />
            <YAxis 
              tick={{ fill: '#666', fontSize: 12 }} 
              tickFormatter={showInBillions ? (value: any) => `${(Number(value) / 1000000000).toFixed(1)}B` : undefined}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '8px', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
                border: 'none' 
              }} 
              formatter={(value: any, name: any) => {
                if (showInBillions) {
                  const billionValue = (Number(value) / 1000000000).toFixed(2);
                  return [`${billionValue}B ${valueLabel.includes('€') ? '€' : ''}`, valueLabel.replace('€', '').trim()];
                }
                return [
                  `${Number(value).toLocaleString()}${valueLabel.includes('€') ? '' : ` ${valueLabel.toLowerCase()}`}`,
                  valueLabel
                ];
              }}
              labelFormatter={(label: any) => {
                if (typeof label === 'string' && label.includes('^')) {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{labelPrefix} </span>
                      <InlineMath math={label} />
                    </div>
                  );
                }
                return `${labelPrefix}${label}`;
              }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  const AnimatedPieChart = ({ data, dataKey, nameKey, height = 300, ...props }: AnimatedPieChartProps) => {
    const chartRef = useRef(null);
    const isInView = useInView(chartRef, { once: false });
    
    return (
      <motion.div 
        ref={chartRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        style={{ width: '100%', height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }: any) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '8px', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
                border: 'none' 
              }}
              formatter={(value: any) => `${Number(value).toLocaleString()} organizations (${((Number(value) / 100249) * 100).toFixed(2)}%)`}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Custom card component with animation
  const BentoCard = ({ children, className = "", size = "md", ...props }: BentoCardProps) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false });
    
    const sizeClasses: Record<string, string> = {
      sm: "col-span-1",
      md: "col-span-1 md:col-span-1",
      lg: "col-span-1 md:col-span-2",
      xl: "col-span-1 md:col-span-3",
      full: "col-span-1 md:col-span-4",
    };
    
    return (
      <motion.div
        ref={cardRef}
        className={`bg-white rounded-2xl shadow-lg overflow-hidden ${sizeClasses[size]} ${className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        {...props}
      >
        <div className="p-6 h-full">{children}</div>
      </motion.div>
    );
  };

  // Custom section header with oversized typography
  const SectionHeader = ({ children, className = "", ...props }: SectionHeaderProps) => {
    return (
      <motion.h2 
        className={`text-4xl md:text-6xl font-black mb-8 text-gray-800 tracking-tight ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        {...props}
      >
        {children}
      </motion.h2>
    );
  };

  // Custom stat display with oversized typography
  const StatDisplay = ({ label, value, icon, color = "blue" }: StatDisplayProps) => {
    const colorClasses: Record<string, string> = {
      blue: "text-blue-600",
      green: "text-green-600",
      amber: "text-amber-600",
      purple: "text-purple-600",
      pink: "text-pink-600",
    };
    
    return (
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <span className={`material-icons mr-2 ${colorClasses[color]}`}>{icon}</span>
          <span className="text-gray-600 text-sm">{label}</span>
        </div>
        <div className="text-3xl md:text-4xl font-bold">
          {typeof value === 'number' && value < 1
            ? value.toFixed(6)
            : value.toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter']">
      {/* Hero section with oversized typography */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-8xl font-black mb-4 tracking-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            EU Research<br />Network
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-light max-w-2xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Analyzing collaboration patterns across 27,000+ organizations in the European research ecosystem (2021-2027)
          </motion.p>
          
          {/* Abstract network visualization as line art */}
          <motion.div 
            className="absolute right-0 top-0 w-1/2 h-full opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8, duration: 1.5 }}
          >
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <g stroke="white" fill="none" strokeWidth="1.5">
                <circle cx="400" cy="300" r="100" />
                <circle cx="400" cy="300" r="200" />
                <line x1="200" y1="300" x2="600" y2="300" />
                <line x1="400" y1="100" x2="400" y2="500" />
                <line x1="250" y1="150" x2="550" y2="450" />
                <line x1="250" y1="450" x2="550" y2="150" />
                <circle cx="200" cy="300" r="20" />
                <circle cx="600" cy="300" r="20" />
                <circle cx="400" cy="100" r="20" />
                <circle cx="400" cy="500" r="20" />
                <circle cx="250" cy="150" r="15" />
                <circle cx="550" cy="450" r="15" />
                <circle cx="250" cy="450" r="15" />
                <circle cx="550" cy="150" r="15" />
              </g>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation tabs */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4">
            {['overview', 'countries', 'topics'].map((tab) => (
              <motion.button
                key={tab}
                className={`py-2 px-6 font-medium whitespace-nowrap mx-2 rounded-full transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center">
                  <span className="material-icons mr-2">
                    {tab === 'overview' ? 'dashboard' : tab === 'countries' ? 'public' : 'topic'}
                  </span>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-12" ref={scrollRef}>
        {activeTab === 'overview' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <SectionHeader>Network Structure</SectionHeader>
            
            {/* Key metrics in a bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {networkMetrics.map((metric, index) => (
                <BentoCard key={index} size="sm">
                  <StatDisplay 
                    label={metric.name} 
                    value={metric.value} 
                    icon={metric.icon} 
                    color={(['blue', 'green', 'amber', 'purple'] as const)[index % 4]} 
                  />
                </BentoCard>
              ))}
            </div>
            
            {/* Network insights in bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <BentoCard size="md">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Network Interpretation</h3>
                <div className="flex items-start mb-6">
                  <span className="material-icons text-blue-600 mr-3 text-3xl">insights</span>
                  <p className="text-gray-600">
                    The EU research collaboration network shows very low density but high average degree (56.48), indicating a
                    sparse network with <strong>centralized collaboration hubs</strong>.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="material-icons text-amber-600 mr-3 text-3xl">trending_up</span>
                  <p className="text-gray-600">
                    The network appears to follow a <strong>power-law degree distribution</strong>, suggesting new organizations tend to collaborate with already well-connected institutions.
                  </p>
                </div>
              </BentoCard>
              
              <BentoCard size="lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Degree Distribution</h3>
                <AnimatedBarChart 
                  data={degreeDistribution} 
                  dataKey="nodes" 
                  xAxisKey="degree" 
                  color="#8884d8"
                  customXAxisTick={true}
                  labelPrefix="Degree range: "
                  valueLabel="Nodes"
                />
              </BentoCard>
            </div>
            
            {/* Top organizations */}
            <BentoCard size="full" className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Top 10 Organizations by Connections</h3>
              <p className="text-gray-600 mb-6">
                These organizations are the most connected hubs in the EU research ecosystem. 
                German institution <strong>Fraunhofer-Gesellschaft</strong> leads with 5,312 connections, while <strong>KU Leuven </strong> ranks the fifth with 3,467 connections.
              </p>
              <AnimatedBarChart 
                data={topOrganizations} 
                dataKey="degree" 
                xAxisKey="name" 
                color="#82ca9d"
                height={350}
                labelPrefix="Organization: "
                valueLabel="Connections"
              />
            </BentoCard>
            
            {/* Organization types and roles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <BentoCard>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Organization Types</h3>
                <AnimatedPieChart 
                  data={orgTypeData} 
                  dataKey="value" 
                  nameKey="name"
                />
                <p className="text-gray-600 mt-4">
                  Higher Education institutions (HES) make up the largest
                  portion of participating organizations at 34.3%, followed
                  closely by Private Companies (PRC) at 30.1%.
                </p>
              </BentoCard>
              
              <BentoCard>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Network Roles</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <span className="material-icons text-blue-600">stars</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Tier 1: Super-connectors</h4>
                      <p className="text-gray-600">Top 10 organizations each connect to 2,800+ partners, forming the core of the EU research network.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <span className="material-icons text-green-600">hub</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Tier 2: Major hubs</h4>
                      <p className="text-gray-600">~250 organizations with 500-2,800 connections each, serving as sectoral or regional hubs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <span className="material-icons text-amber-600">group_work</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Tier 3: Active collaborators</h4>
                      <p className="text-gray-600">~3,000 organizations with 100-500 connections, representing active but specialized research entities.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <span className="material-icons text-purple-600">person</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Tier 4: Peripheral participants</h4>
                      <p className="text-gray-600">Remaining organizations with fewer than 100 connections, predominantly participating in fewer projects.</p>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>
          </motion.div>
        )}

        {activeTab === 'countries' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <SectionHeader>Country Analysis</SectionHeader>
            
            {/* Country participation */}
            <BentoCard size="full" className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Country Participation</h3>
              <AnimatedBarChart 
                data={countryData} 
                dataKey="participations" 
                xAxisKey="name" 
                color="#0088FE"
                height={350}
                labelPrefix="Country: "
                valueLabel="Participations"
              />
            </BentoCard>
            
            {/* Country funding and collaborations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <BentoCard>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Funding by Country (€)</h3>
                <AnimatedBarChart 
                  data={countryData} 
                  dataKey="funding" 
                  xAxisKey="name" 
                  color="#00C49F"
                  labelPrefix="Country: "
                  valueLabel="Funding"
                  showInBillions={true}
                />
              </BentoCard>
              
              <BentoCard>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Top Country Collaborations</h3>
                <AnimatedBarChart 
                  data={countryCollaborations} 
                  dataKey="value" 
                  xAxisKey="name" 
                  color="#FFBB28"
                  labelPrefix="Collaboration: "
                  valueLabel="Joint Projects"
                />
              </BentoCard>
            </div>
            
            {/* Country insights */}
            <BentoCard size="full" className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Country Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <div className="bg-blue-100 p-4 rounded-xl mb-4">
                    <span className="material-icons text-blue-600 text-4xl mb-2">leaderboard</span>
                    <h4 className="font-bold text-lg text-gray-800">Top Participants</h4>
                    <p className="text-gray-600">Germany, Spain, and Italy lead in total participation counts, showing their extensive involvement in EU research.</p>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="bg-green-100 p-4 rounded-xl mb-4">
                    <span className="material-icons text-green-600 text-4xl mb-2">euro</span>
                    <h4 className="font-bold text-lg text-gray-800">Funding Distribution</h4>
                    <p className="text-gray-600">Germany receives the highest funding, followed by France, suggesting these countries host more expensive or larger-scale research projects.</p>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="bg-amber-100 p-4 rounded-xl mb-4">
                    <span className="material-icons text-amber-600 text-4xl mb-2">handshake</span>
                    <h4 className="font-bold text-lg text-gray-800">Collaboration Patterns</h4>
                    <p className="text-gray-600">Spain-Italy and Germany-Spain show the strongest bilateral collaboration ties, indicating strong research relationships.</p>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>
        )}

        {activeTab === 'topics' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <SectionHeader>Research Topics</SectionHeader>
            
            {/* Top research topics */}
            <BentoCard size="full" className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Top Research Topics</h3>
              <AnimatedBarChart 
                data={topTopics} 
                dataKey="projects" 
                xAxisKey="name" 
                color="#8884d8"
                height={350}
                labelPrefix="Topic: "
                valueLabel="Projects"
              />
            </BentoCard>
            
            {/* Project duration and organizations per project */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <BentoCard>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Project Duration</h3>
                <AnimatedPieChart 
                  data={durationData} 
                  dataKey="projects" 
                  nameKey="name"
                />
              </BentoCard>
              
              <BentoCard>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Organizations per Project</h3>
                <AnimatedBarChart 
                  data={orgsPerProjectData} 
                  dataKey="count" 
                  xAxisKey="range" 
                  color="#FF8042"
                  labelPrefix="Project size: "
                  valueLabel="Projects"
                />
              </BentoCard>
            </div>
            
            {/* Topic insights */}
            <BentoCard size="full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Research Topic Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <span className="material-icons text-purple-600 text-2xl">school</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">ERC Dominance</h4>
                    <p className="text-gray-600">European Research Council (ERC) grants dominate the top research topics, highlighting the importance of fundamental research in the EU ecosystem.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <span className="material-icons text-pink-600 text-2xl">people</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">MSCA Popularity</h4>
                    <p className="text-gray-600">Marie Skłodowska-Curie Actions (MSCA) postdoctoral fellowships appear multiple times in the top topics, showing strong support for researcher mobility and career development.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <span className="material-icons text-blue-600 text-2xl">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Duration Patterns</h4>
                    <p className="text-gray-600">Most projects (30.7%) last 1-2 years, with another significant portion (26.5%) lasting 4-5 years, reflecting different funding instrument timeframes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <span className="material-icons text-green-600 text-2xl">groups</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Consortium Size</h4>
                    <p className="text-gray-600">Single-organization projects are most common (6,940), but there's significant diversity in consortium sizes, with many projects involving 7-20 organizations.</p>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>
        )}

        
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">EU Research Network Dashboard</h3>
              <p className="text-gray-400 max-w-md">
                A comprehensive analysis of research collaboration patterns across the European Union's Horizon Europe program (2021-2027).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Data Sources</h4>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <a href = "https://data.europa.eu/data/datasets/cordis-eu-research-projects-under-horizon-europe-2021-2027?locale=en" 
                  target="_blank" rel="noopener noreferrer">
                  EU Open Data Portal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-gray-500 text-sm">
            © {new Date().getFullYear()} EU Research Network Analysis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EUResearchNetworkDashboard;
