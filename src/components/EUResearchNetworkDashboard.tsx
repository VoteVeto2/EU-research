import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// TypeScript interfaces 
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
  subtitle?: string;
  [key: string]: any;
}

interface StatDisplayProps {
  label: string;
  value: number;
  icon: string;
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'pink' | 'cyan';
  formula?: string;
}

const EUResearchNetworkDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const scrollRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);
  
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

  // Network metrics data 
  const networkMetrics: NetworkMetric[] = [
    { name: 'Organizations(Nodes)', value: 27224, icon: 'business' },
    { name: 'Collaborations(Edges)', value: 751350, icon: 'share' },
    { name: 'Average Degree', value: 56.48, icon: 'hub' },
    { name: 'Maximum Degree', value: 5312, icon: 'star' },
  ];

  // Top organizations by degree
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
    { name: 'Higher Education', value: 34370, percent: 34.28 },
    { name: 'Private Company', value: 30129, percent: 30.05 },
    { name: 'Research Org', value: 22471, percent: 22.42 },
    { name: 'Other', value: 8114, percent: 8.09 },
    { name: 'Public Body', value: 5141, percent: 5.13 },
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
    { degree: '65-128', nodes: 2408 },
    { degree: '129-256', nodes: 1506 },
    { degree: '257-512', nodes: 712 },
    { degree: '513-1024', nodes: 278 },
    { degree: '> 1024', nodes: 62 },
  ];


  // COLORS palette
  const COLORS = [
    '#00D9FF', // cyan
    '#7C3AED', // purple
    '#10B981', // emerald
    '#F59E0B', // amber
    '#EF4444', // red
    '#3B82F6', // blue
    '#EC4899', // pink
    '#8B5CF6', // violet
  ];

  // Custom X-axistick component 
  const CustomTick = ({ x, y, payload }: any) => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );

  // Loading skeleton component with shimmer effect
  const LoadingSkeleton = () => (
    <div className="relative overflow-hidden">
      <div className="animate-pulse">
        <div className="h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-3/4 mb-4"></div>
        <div className="h-64 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg"></div>
      </div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  );

  // Enhanced AnimatedNumber with color transitions
  const AnimatedNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        const startTime = Date.now();
        const timer = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.floor(value * easeOut));
          if (progress === 1) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
      }
    }, [isInView, value, duration]);

    return (
      <motion.span 
        ref={ref}
        initial={{ color: '#60A5FA' }}
        animate={{ color: ['#60A5FA', '#A78BFA', '#EC4899', '#60A5FA'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {displayValue.toLocaleString()}
      </motion.span>
    );
  };

  // Custom chart components with enhanced animations
  const AnimatedBarChart = ({ data, dataKey, xAxisKey, height = 300, color = "#00D9FF", customXAxisTick = false, labelPrefix = "", valueLabel = "Value", showInBillions = false, ...props }: AnimatedBarChartProps) => {
    const chartRef = useRef(null);
    const isInView = useInView(chartRef, { once: false });

    return (
      <motion.div 
        ref={chartRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        style={{ width: '100%', height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} {...props}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={color} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis 
              dataKey={xAxisKey} 
              tick={customXAxisTick ? <CustomTick /> : { fill: '#94a3b8', fontSize: 11 }} 
              axisLine={{ stroke: '#475569' }}
            />
            <YAxis 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
              tickFormatter={showInBillions ? (value: any) => `${(Number(value) / 1000000000).toFixed(1)}B` : undefined}
              axisLine={{ stroke: '#475569' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                borderRadius: '12px', 
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)', 
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
              itemStyle={{ color: '#e2e8f0' }}
              labelStyle={{ color: '#cbd5e1' }}
              labelFormatter={xAxisKey && labelPrefix ? (label) => `${labelPrefix}${label}` : undefined}
              formatter={(value: number, name: string /* dataKey */, entry: any) => {
                let formattedDisplayValue = Number(value).toLocaleString();
                if (showInBillions) {
                  formattedDisplayValue = `€${(Number(value) / 1000000000).toFixed(2)}B`;
                }
                // valueLabel is from AnimatedBarChartProps, e.g., "Participations", "Funding"
                // The first element is the formatted value string, the second is the label for that value.
                return [formattedDisplayValue, valueLabel];
              }}
            />
            <Bar dataKey={dataKey} fill={`url(#gradient-${dataKey})`} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  const AnimatedPieChart = ({ data, dataKey, nameKey, height = 300, ...props }: AnimatedPieChartProps) => {
    const chartRef = useRef(null);
    const isInView = useInView(chartRef, { once: false });
    
    // Calculate total for percentage calculation
    const total = data.reduce((sum, item) => sum + Number(item[dataKey]), 0);
    
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
              label={({ name, percent, payload }: any) => {
                // Use the percent field from data if available, otherwise calculate from recharts percent
                const displayPercent = payload.percent !== undefined ? payload.percent : (percent * 100);
                return `${name}: ${displayPercent.toFixed(1)}%`;
              }}
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
              formatter={(value: number, name: string, entry: any) => {
                const percentage = entry.payload.percent !== undefined
                  ? parseFloat(entry.payload.percent).toFixed(2)
                  : ((Number(value) / total) * 100).toFixed(2);

                // name is the slice label (e.g., "Higher Education")
                // value is the metric for that slice
                return [`${Number(value).toLocaleString()} (${percentage}%)`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Custom card component with glassmorphism effects
  const BentoCard = ({ children, className = "", size = "md", ...props }: BentoCardProps) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false });
    const [isHovered, setIsHovered] = useState(false);
    
    const sizeClasses: Record<string, string> = {
      sm: "col-span-1",
      md: "col-span-1 md:col-span-1",
      lg: "col-span-1 md:col-span-2",
      xl: "col-span-1 md:col-span-3",
      full: "col-span-1 md:col-span-4",
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    return (
      <motion.div
        ref={cardRef}
        className={`group relative ${sizeClasses[size]} ${className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Glassmorphism container */}
        <motion.div
          className="relative h-full rounded-2xl overflow-hidden"
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Background glass layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl" />
          
          {/* Border gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent p-[1px]">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
          </div>
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              background: isHovered
                ? `linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`
                : "transparent",
            }}
          />
          
          {/* Content container */}
          <div className="relative h-full p-6 z-10">
            {children}
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                }}
                animate={{
                  y: isHovered ? ["-10%", "110%"] : "50%",
                  opacity: isHovered ? [0, 1, 0] : 0,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: isHovered ? Infinity : 0,
                  delay: i * 0.2,
                  ease: "linear",
                }}
              />
            ))}
          </div>
          
          {/* Shadow layer */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl blur-xl -z-10"
            animate={{
              scale: isHovered ? 1.06 : 1,
              opacity: isHovered ? 0.9 : 0.3,
              filter: isHovered ? 'blur(16px)' : 'blur(24px)',
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        </motion.div>
      </motion.div>
    );
  };

  // Custom section header with gradient text
  const SectionHeader = ({ children, subtitle, className = "", ...props }: SectionHeaderProps) => {
    return (
      <motion.div
        className={`mb-12 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        {...props}
      >
        <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          {children}
        </h2>
        {subtitle && (
          <p className="text-lg text-slate-600 max-w-3xl">
            {subtitle}
          </p>
        )}
      </motion.div>
    );
  };

  // Custom stat display with animated numbers and formulas
  const StatDisplay = ({ label, value, icon, color = "blue", formula }: StatDisplayProps) => {
    const colorClasses: Record<string, string> = {
      blue: "from-blue-400 to-blue-600",
      green: "from-green-400 to-green-600",
      amber: "from-amber-400 to-amber-600",
      purple: "from-purple-400 to-purple-600",
      pink: "from-pink-400 to-pink-600",
      cyan: "from-cyan-400 to-cyan-600",
    };

    return (
      <motion.div 
        className="flex flex-col h-full"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center mb-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
            <span className="material-icons text-white text-2xl">{icon}</span>
          </div>
          <span className="text-slate-600 text-sm ml-3">{label}</span>
        </div>
        <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
          <AnimatedNumber value={value} />
        </div>
        {formula && (
          <div className="mt-auto pt-4 border-t border-gray-700/50">
            <InlineMath math={formula} />
          </div>
        )}
      </motion.div>
    );
  };


  
  return (
    <div className="min-h-screen bg-gray-50 font-['Inter']">
      {/* Add shimmer animation to styles */}
      <style jsx>{`
        @keyframes shimmer {
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
      
      {/* Hero section with oversized typography */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-purple-800 text-white py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSI+PC9yZWN0PgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIj48L3JlY3Q+Cjwvc3ZnPg==')] opacity-10"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <div className="max-w-7xl mx-auto">
          <motion.h1 
              className="text-6xl md:text-9xl font-black mb-6 tracking-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                EU Research
              </span>
              <br />
              <span className="text-white">Network</span>
          </motion.h1>
          {/* Animated metrics */}
          <motion.div
            className="flex gap-8 mt-12"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div>
              <p className="text-3xl font-bold text-cyan-400">27K+</p>
              <p className="text-sm text-gray-300">Organizations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-400">751K+</p>
              <p className="text-sm text-gray-300">Collaborations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-pink-400">€93.5B</p>
              <p className="text-sm text-gray-300">Total Funding</p>
            </div>
          </motion.div>
          
          {/* Animated network visualization */}
          <motion.div 
            className="absolute right-0 top-0 -translate-y-1/4 w-1/2 h-full opacity-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
          >
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g stroke="url(#networkGradient)" fill="none" strokeWidth="2" filter="url(#glow)">
                {/* Animated network paths */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const x1 = 400 + Math.cos(angle) * 150;
                  const y1 = 300 + Math.sin(angle) * 150;
                  const x2 = 400 + Math.cos(angle + Math.PI/6) * 200;
                  const y2 = 300 + Math.sin(angle + Math.PI/6) * 200;
                  return (
                    <motion.path
                      key={i}
                      d={`M400,300 Q${x1},${y1} ${x2},${y2}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.15, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
                {/* Central pulsing node */}
                <motion.circle 
                  cx="400" 
                  cy="300" 
                  r="12" 
                  fill="#00D9FF"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Outer nodes */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const x = 400 + Math.cos(angle) * 200;
                  const y = 300 + Math.sin(angle) * 200;
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="6"
                      fill={i % 2 === 0 ? "#7C3AED" : "#EC4899"}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.5 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    />
                  );
                })}
              </g>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation tabs with glassmorphism */}
      <div className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-3">
            {['overview', 'countries', 'topics'].map((tab) => (
              <motion.button
                key={tab}
                className={`relative py-3 px-8 font-medium whitespace-nowrap rounded-full transition-all overflow-hidden ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800'
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === tab && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  <motion.span 
                    className="material-icons text-lg"
                    animate={activeTab === tab ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {tab === 'overview' ? 'hub' : tab === 'countries' ? 'public' : 'category'}
                  </motion.span>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-12" ref={scrollRef}>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
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
                          color={(['cyan', 'green', 'amber', 'purple'] as const)[index % 4]} 
                        />
                      </BentoCard>
                    ))}
                  </div>
                  
                  {/* Network insights in bento grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <BentoCard size="md">
                    <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Network Interpretation
                    </h3>
                    <div className="flex items-start mb-6">
                      <span className="material-icons text-cyan-400 mr-3 text-2xl">insights</span>
                      <p className="text-slate-700">
                        The EU research collaboration network shows very low density but high average degree (56.48), indicating a
                        sparse network with <strong>centralized collaboration hubs</strong>.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-amber-600 mr-3 text-3xl">trending_up</span>
                      <p className="text-slate-700">
                        The network appears to follow a <strong>power-law degree distribution</strong>, suggesting new organizations tend to collaborate with hub institutions.
                      </p>
                    </div>
                    </BentoCard>
                    
                    <BentoCard size="lg">
                      <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                          Degree Distribution
                        </h3>
                        <AnimatedBarChart 
                          data={degreeDistribution} 
                          dataKey="nodes" 
                          xAxisKey="degree" 
                          color="#8B5CF6"
                          customXAxisTick={true}
                          height={250}
                          valueLabel="Nodes"
                        />
                    </BentoCard>
                  </div>
                  
                  {/* Top organizations */}
                  <BentoCard size="full" className="mb-16">
                      <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Network Hubs: Top 10 Organizations
                      </h3>
                      <p className="text-gray-400 mb-8">
                        The most connected nodes exhibit extreme centrality. <strong className="text-cyan-400">Fraunhofer-Gesellschaft</strong> leads by
                        <InlineMath math="\ 5,312" /> connections, while <strong className="text-purple-400">KU Leuven </strong> 
                        ranks 5th with <InlineMath math="3,467" /> connections.
                      </p>
                      <AnimatedBarChart 
                        data={topOrganizations} 
                        dataKey="degree" 
                        xAxisKey="name" 
                        color="green"
                        height={400}
                        valueLabel="Degree"
                      />
                  </BentoCard>

                  
                  {/* Organization types and roles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <BentoCard>
                    <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">
                        Organization Types
                      </h3>
                      <AnimatedPieChart 
                        data={orgTypeData} 
                        dataKey="value" 
                        nameKey="name"
                      />
                      <p className="text-slate-700 mt-4">
                        Higher Education institutions make up the largest
                        portion of participating organizations at 34.3%, followed
                        closely by Private Companies at 30.1%.
                      </p>
                    </BentoCard>
                    
                    <BentoCard>
                      <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
                        Network Roles
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <span className="material-icons text-blue-600">stars</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Tier 1</h4>
                            <p className="text-slate-700">Top 10 organizations each connect to 2,800+ partners, forming the <strong className="text-blue-600">core of the EU research network.</strong></p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <span className="material-icons text-green-600">hub</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Tier 2</h4>
                            <p className="text-slate-700">~250 organizations with 500-2,800 connections each, serving as sectoral or regional hubs.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-2 rounded-full mr-3">
                            <span className="material-icons text-amber-600">group_work</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Tier 3</h4>
                            <p className="text-slate-700">~3,000 organizations with 100-500 connections, representing active but specialized research entities.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-purple-100 p-2 rounded-full mr-3">
                            <span className="material-icons text-purple-600">person</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Tier 4</h4>
                            <p className="text-slate-700">Remaining organizations with fewer than 100 connections, predominantly participating in fewer projects.</p>
                          </div>
                        </div>
                      </div>
                    </BentoCard>
                  </div>
                </motion.div>
              )}

              {activeTab === 'countries' && (
                <motion.div
                  key="countries"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={staggerContainer}
                >
                  <SectionHeader subtitle="Geographic distribution and cross-border collaboration patterns">
                      Country Analysis
                  </SectionHeader>
                  
                  {/* Country participation */}
                  <BentoCard size="full" className="mb-12">
                    <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Participation by Country
                    </h3>
                    <AnimatedBarChart 
                      data={countryData} 
                      dataKey="participations" 
                      xAxisKey="name" 
                      color="#0088FE"
                      height={350}
                      labelPrefix="Country: "
                      valueLabel="Participations"
                    />
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {countryData.slice(0, 4).map((country, idx) => (
                        <div key={country.name} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-cyan-400">{idx + 1}</p>
                          <p className="text-lg font-semibold">{country.name}</p>
                          <p className="text-sm text-gray-400">{country.participations.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </BentoCard>
                  
                  {/* Country funding and collaborations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <BentoCard>
                        <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                          Funding Distribution
                        </h3>
                        <AnimatedBarChart 
                          data={countryData} 
                          dataKey="funding" 
                          xAxisKey="name" 
                          color="#10B981"
                          height={300}
                          valueLabel="Funding"
                          showInBillions={true}
                        />
                        <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                          <p className="text-sm text-gray-400">
                            Total funding: <span className="text-green-400 font-semibold">€93.5B</span>
                          </p>
                        </div>
                      </BentoCard>
                    
                    <BentoCard>
                      <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Collaboration Patterns
                      </h3>
                      <AnimatedBarChart 
                        data={countryCollaborations} 
                        dataKey="value" 
                        xAxisKey="name" 
                        color="#FFBB28"
                        labelPrefix="Collaboration: "
                        valueLabel="Joint Projects"
                      />
                      <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-gray-400">
                          Spain-Italy show the strongest collaboration pattern with <span className="text-green-400 font-semibold">20,322</span> joint projects.
                        </p>
                      </div>
                    </BentoCard>
                  </div>
                  
                  {/* Country insights */}
                  <BentoCard size="full" className="mb-12">
                  <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Insights
                  </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col">
                        <div className="bg-blue-100 p-4 rounded-xl mb-4">
                          <span className="material-icons text-blue-600 text-4xl mb-2">leaderboard</span>
                          <h4 className="font-bold text-lg text-slate-800">Top Participants</h4>
                          <p className="text-slate-700">Germany, Spain, and Italy lead in total participation counts, showing their extensive involvement in EU research.</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="bg-green-100 p-4 rounded-xl mb-4">
                          <span className="material-icons text-green-600 text-4xl mb-2">euro</span>
                          <h4 className="font-bold text-lg text-slate-800">Funding Distribution</h4>
                          <p className="text-slate-700">Germany receives the highest funding, followed by France, suggesting these countries host more expensive or larger-scale research projects.</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="bg-amber-100 p-4 rounded-xl mb-4">
                          <span className="material-icons text-amber-600 text-4xl mb-2">handshake</span>
                          <h4 className="font-bold text-lg text-slate-800">Collaboration Patterns</h4>
                          <p className="text-slate-700">Spain-Italy and Germany-Spain show the strongest bilateral collaboration ties, indicating strong research relationships.</p>
                        </div>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              )}

              {activeTab === 'topics' && (
                <motion.div
                  key="topics"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={staggerContainer}
                >
                  <SectionHeader>Research Topics</SectionHeader>
                  
                  {/* Top research topics */}
                  <BentoCard size="full" className="mb-16">
                      <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Leading Research Programs
                      </h3>
                      <AnimatedBarChart 
                        data={topTopics} 
                        dataKey="projects" 
                        xAxisKey="name" 
                        color="#8B5CF6"
                        height={400}
                        valueLabel="Projects"
                      />
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
                          <h4 className="font-semibold text-purple-400 mb-2">ERC Grants</h4>
                          <p className="text-2xl font-bold">3,857</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
                          <h4 className="font-semibold text-blue-400 mb-2">MSCA Actions</h4>
                          <p className="text-2xl font-bold">4,132</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-pink-500/30">
                          <h4 className="font-semibold text-pink-400 mb-2">Gender Balance</h4>
                          <p className="text-2xl font-bold">179</p>
                        </div>
                      </div>
                    </BentoCard>
                  
                  {/* Project duration and organizations per project */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <BentoCard>
                      <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Project Duration
                      </h3>
                      <AnimatedPieChart 
                        data={durationData} 
                        dataKey="projects" 
                        nameKey="name"
                        height={300}
                      />
                      <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-gray-400">
                          Average duration: <InlineMath math="\mu = 2.84" /> years;  
                          Standard deviation: <InlineMath math="\sigma = 1.37" /> years
                        </p>
                      </div>
                    </BentoCard>
                    
                    <BentoCard>
                      <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                        Consortium Size Distribution
                      </h3>
                      <AnimatedBarChart 
                        data={orgsPerProjectData} 
                        dataKey="count" 
                        xAxisKey="range" 
                        color="#EF4444"
                        height={300}
                        valueLabel="Projects"
                      />

                      <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-gray-400">
                          Most projects involve 7-20 organizations, excluding single-organization projects.
                        </p>
                      </div>
                    </BentoCard>
                  </div>
                  
                  {/* Topic insights */}
                  <BentoCard size="full">
                    <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-500">Research Topic Insights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-3 rounded-full mr-4">
                          <span className="material-icons text-purple-600 text-2xl">school</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-800">ERC Dominance</h4>
                          <p className="text-slate-700">European Research Council (ERC) grants dominate the top research topics, highlighting the importance of fundamental research in the EU ecosystem.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-pink-100 p-3 rounded-full mr-4">
                          <span className="material-icons text-pink-600 text-2xl">people</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-800">MSCA Popularity</h4>
                          <p className="text-slate-700">Marie Skłodowska-Curie Actions (MSCA) postdoctoral fellowships appear multiple times in the top topics, showing strong support for researcher mobility and career development.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <span className="material-icons text-blue-600 text-2xl">schedule</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-800">Duration Patterns</h4>
                          <p className="text-slate-700">Most projects (30.7%) last 1-2 years, with another significant portion (26.5%) lasting 4-5 years.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <span className="material-icons text-green-600 text-2xl">groups</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-800">Consortium Size</h4>
                          <p className="text-slate-700">Single-organization projects are most common (6,940), but there's significant diversity in consortium sizes, with many projects involving 7-20 organizations.</p>
                        </div>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                EU Research Network
              </h3>
              <p className="text-gray-400">
                A comprehensive analysis of research collaboration in Horizon Europe (2021-2027)
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-300">Network Analysis</h4>
              <ul className="space-y-2">
                <li><p className="text-gray-400">Key Metrics &amp; Hubs</p></li>
                <li><p className="text-gray-400">Country-level Insights</p></li>
                <li><p className="text-gray-400">Research Topic Trends</p></li>
                <li><p className="text-gray-400">Collaboration Patterns</p></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-300">Data Source</h4>
              <a 
                href="https://data.europa.eu/data/datasets/cordis-eu-research-projects-under-horizon-europe-2021-2027?locale=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                EU Open Data Portal
                <span className="material-icons text-sm">open_in_new</span>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>EU Research Network Analysis • Built with React & Recharts</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EUResearchNetworkDashboard;
