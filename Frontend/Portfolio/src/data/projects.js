export const projects = [
  {
    id: 'urban-commerce',
    title: 'Urban Commerce',
    desc: 'Full-stack e-commerce with real-time inventory, Stripe payments, and a luxury dark UI.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    emoji: '🛍️',
    github: 'https://github.com/vihanga-theekshana/urban-commerce',
    live: 'https://urban-commerce-demo.vercel.app',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1000&auto=format&fit=crop&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'Real-time inventory sync using WebSockets',
      'Secure credit card payments with Stripe integration',
      'Clean luxury dark mode UI/UX layout',
      'Comprehensive admin dashboard for sales metrics and order tracking',
      'Fully responsive shopping cart and checkout pipeline'
    ],
    details: 'Urban Commerce is designed to meet the demands of modern digital storefronts. It utilizes Node.js on the backend to handle inventory updates in real time, communicating changes instantly to the frontend using WebSockets. Payment processing is handled securely with Stripe API integration, including webhook confirmation.'
  },
  {
    id: 'city-analytics',
    title: 'City Analytics',
    desc: 'Data visualization dashboard for urban transport — real-time charts, heatmaps, live feeds.',
    tags: ['Python', 'FastAPI', 'D3.js', 'Redis'],
    emoji: '📊',
    github: 'https://github.com/vihanga-theekshana/city-analytics',
    live: 'https://city-analytics-demo.vercel.app',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'Interactive D3.js traffic heatmaps and geospatial overlays',
      'High-performance async backend powered by FastAPI',
      'Redis cache caching transit records to maintain sub-10ms response times',
      'Simulated live GPS streams from city transit fleets',
      'Historical data charts showing congestion levels and travel time variations'
    ],
    details: 'City Analytics processes geospatial transit logs to assist urban planners in optimizing transit schedules. The FastAPI backend aggregates millions of data points from transit logs, caching hot areas in Redis. The frontend visualizes transport overlays dynamically using D3.js and Leaflet maps.'
  },
  {
    id: 'nightowl-app',
    title: 'NightOwl App',
    desc: 'Social nightlife discovery for London. Venues, event booking, crowd prediction with ML.',
    tags: ['React Native', 'Firebase', 'TensorFlow'],
    emoji: '🦉',
    github: 'https://github.com/vihanga-theekshana/nightowl-app',
    live: 'https://nightowl-app-demo.vercel.app',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'Mobile geolocation searching for nearby pubs, clubs, and events',
      'Crowd density forecasts utilizing a custom TensorFlow prediction model',
      'Seat reservations and ticketing system integrated via Firebase',
      'Interactive chats inside venue pages using Firestore database listeners',
      'Dark-themed UI matching nightlife aesthetics'
    ],
    details: 'NightOwl provides users with real-time predictions of crowd levels in London venues. Utilizing TensorFlow-based ML models trained on historical foot traffic data, the app offers peak-hour estimations. The client application is built on React Native for seamless cross-platform utility.'
  },
  {
    id: 'glassui-library',
    title: 'GlassUI Library',
    desc: 'Open-source React component library with glassmorphism tokens and Framer Motion.',
    tags: ['React', 'TypeScript', 'Storybook'],
    emoji: '🎨',
    github: 'https://github.com/vihanga-theekshana/glassui-library',
    live: 'https://glassui-library-demo.vercel.app',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1000&auto=format&fit=crop&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      '30+ highly-customizable glassmorphism components',
      'Strict TypeScript typings for reliable prop integration',
      'Smooth micro-interactions utilizing Framer Motion animation tokens',
      'Complete Storybook sandbox workspace for visual components testing',
      'Fully compatible with Tailwind CSS and modern styling setups'
    ],
    details: 'GlassUI targets frontend developers building premium portfolios and SaaS dashboards. Every element follows strict glassmorphism tokens (backdrop blurs, border transparency, glowing shadows). Components compile down to lightweight, treeshakable packages.'
  },
  {
    id: 'devcollab',
    title: 'DevCollab',
    desc: 'Real-time collaborative code editor with video chat and AI pair-programming hints.',
    tags: ['Socket.io', 'WebRTC', 'OpenAI', 'Next.js'],
    emoji: '💻',
    github: 'https://github.com/vihanga-theekshana/devcollab',
    live: 'https://devcollab-demo.vercel.app',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=1000&auto=format&fit=crop&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'Collaborative editor with simultaneous cursors powered by Socket.io',
      'Peer-to-peer audio and video feeds utilizing WebRTC technology',
      'Intelligent code optimization hints through OpenAI GPT API integrations',
      'Syntax highlighter supporting over 15 programming languages',
      'Quick code sandbox run environment'
    ],
    details: 'DevCollab solves remote collaboration challenges for developers. By merging WebRTC audio/video calls directly into a unified cursor-shared Monaco code editor, users can conduct remote interviews and pair programming sessions without context switching.'
  },
  {
    id: 'smartlease',
    title: 'SmartLease',
    desc: 'AI-powered lease analyser that flags risky clauses and summarises legal docs for renters.',
    tags: ['OpenAI', 'LangChain', 'FastAPI', 'React'],
    emoji: '🏠',
    github: 'https://github.com/vihanga-theekshana/smartlease',
    live: 'https://smartlease-demo.vercel.app',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&auto=format&fit=crop&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512403754473-2785561399cf?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'PDF lease agreement document uploader and parsing engine',
      'AI legal analysis classifying clauses (Low, Medium, High risk)',
      'Automated semantic summaries of landlord and tenant obligations using LangChain',
      'FastAPI async document storage and metadata manager',
      'Interactive chat assistant for asking specific document questions'
    ],
    details: 'SmartLease leverages LangChain and OpenAI vectors to perform semantic analysis on residential lease agreements. The pipeline parses uploaded PDF files, splits them into semantic chunks, generates embeddings, and flags terms that deviate from standard city guidelines.'
  }
];
