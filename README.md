# EU Research Network Web

A comprehensive interactive dashboard for analyzing collaboration patterns across the European Union's research ecosystem under the Horizon Europe program (2021-2027).

This repositroy is a front-end project to visualize the findings in another repository [MDA_project](https://github.com/VoteVeto2/MDA_project), it's deployed on the following link: 

- [EU Research Network](https://eu-research-visualization.netlify.app/)

## 🌟 Overview

This project visualizes the complex network of research collaborations statistics between 27,000+ organizations participating in EU-funded research projects. The dashboard provides insights into collaboration patterns, funding distribution, research topics, and organizational relationships across the European research landscape.

## 🚀 Features

### 📊 Interactive Data Visualizations
- **Network Metrics**: Key statistics including 751,350 collaborations between organizations
- **Organization Analysis**: Top connected institutions and their collaboration patterns
- **Country Insights**: Participation rates, funding distribution, and bilateral collaborations
- **Research Topics**: Analysis of popular research areas and project characteristics
- **Dynamic Charts**: Animated bar charts, pie charts, and interactive visualizations

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Framer Motion-powered transitions and scroll-triggered animations
- **Bento Grid Layout**: Modern card-based interface for optimal information display
- **Material Design Icons**: Intuitive iconography throughout the interface
- **Tabbed Navigation**: Easy switching between Overview, Countries, and Topics sections

### 📈 Key Insights Provided
- **Network Structure**: Analysis of collaboration density and hub organizations
- **Geographic Distribution**: Country-wise participation and funding patterns
- **Research Focus Areas**: Popular topics including ERC grants and MSCA fellowships
- **Project Characteristics**: Duration patterns and consortium sizes
- **Organizational Types**: Distribution across universities, companies, and research institutes

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts library for data visualization
- **Animations**: Framer Motion for smooth transitions
- **Mathematical Notation**: KaTeX for rendering formulas
- **Icons**: Material Design Icons via Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EU-research
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the platform:**
   - Open your browser to `http://localhost:5173/`

```
EU-research/
├── src/
│   ├── components/
│   │   └── EUResearchNetworkDashboard.tsx  # Main dashboard component
│   ├── App.tsx                             # Root application component
│   ├── main.tsx                           # Application entry point
│   ├── index.css                          # Global styles
│   └── vite-env.d.ts                      # Vite type definitions
├── public/                                # Static assets
├── index.html                            # HTML template
├── package.json                          # Dependencies and scripts
├── tailwind.config.js                    # Tailwind CSS configuration
├── vite.config.ts                        # Vite configuration
└── tsconfig.json                         # TypeScript configuration
```

## 📊 Data Sources

The dashboard analyzes data from the [EU Open Data Portal](https://data.europa.eu/data/datasets/cordis-eu-research-projects-under-horizon-europe-2021-2027?locale=en), specifically the CORDIS database containing information about EU research projects under Horizon Europe (2021-2027).

Data Analysis part can be found in `Descriptive_Statistics.py` from [MDA_project](https://github.com/VoteVeto2/MDA_project)

### Key Metrics Analyzed
- **27,224 organizations** participating in EU research
- **751,350 collaboration edges** between organizations
- **Average degree of 56.48** connections per organization
- **Top organizations** with up to 5,312 connections (Fraunhofer-Gesellschaft)
- **Country participation** across all EU member states
- **Research topics** spanning ERC grants, MSCA fellowships, and thematic areas

## 🎯 Key Features by Section

### Overview Tab
- Network structure metrics and interpretation
- Degree distribution analysis
- Top 10 most connected organizations
- Organization type distribution
- Network role hierarchy (Super-connectors, Major hubs, Active collaborators)

### Countries Tab
- Country participation rankings
- Funding distribution by country
- Top bilateral collaboration pairs
- Geographic insights and patterns

### Topics Tab
- Most popular research topics
- Project duration analysis
- Organizations per project distribution
- Research focus area insights

---
**Group Project for [Modern Data Analytics(2024-2025)](https://onderwijsaanbod.kuleuven.be/syllabi/e/G0Z39CE.htm#activetab=doelstellingen_idp1222816)** at KU Leuven