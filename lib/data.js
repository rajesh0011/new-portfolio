// All portfolio content lives here — curated for Senior Frontend / UI Architect standards.

export const profile = {
  name: "Rajesh Kumar",
  role: "Senior Front-End Developer | UI Architect",
  specialties: "React.js · Next.js · TypeScript · Enterprise Architecture",
  tagline: "Senior Front-End Developer with 7+ years architecting high-performance web ecosystems, mission-critical booking platforms, and enterprise design systems.",
  email: "rajeshrathaur0011@gmail.com",
  phone: "+91-7900099842",
  location: "Gurugram, Haryana, India",
  github: "https://github.com/rajesh0011",
  linkedin: "https://www.linkedin.com/in/rajesh-rathore-5a4207153",
  whatsapp:"https://wa.me/917900099842",
  portfolio: "https://raj-rathor.netlify.app/",
  summary:
    "Senior Front-End Developer with 7+ years of experience building high-performance, scalable web applications and enterprise design systems using React.js, Next.js, and TypeScript. Proven track record in optimizing Core Web Vitals (achieving 1.5s LCP, 136ms INP, 0.02 CLS), implementing modular component-driven architectures, and driving page load speed improvements by up to 60% across international web platforms. Adept at scaling consumer-facing platforms, orchestrating high-concurrency reservation engines (STAAH, custom REST APIs), and collaborating in fast-paced Agile environments to deliver robust, accessible (WCAG 2.1 AA), and user-centric software solutions for global scale.",
  targetEnterpriseValue:
    "Brings enterprise-grade engineering rigor: micro-frontend modularity, resilient state management (TanStack Query, Redux Toolkit), sub-second page performance, zero-regression deployments, and seamless third-party API orchestration.",
};

export const achievements = [
  { value: "7+", label: "Years building React.js & Next.js applications" },
  { value: "48+", label: "Production platforms & enterprise apps shipped" },
  { value: "60%", label: "Peak page load acceleration achieved" },
  { value: "1.5s", label: "Mobile LCP benchmark on flagship hotel rebuild" },
];

// Live Core Web Vitals console metrics
export const liveMetrics = [
  { code: "LCP", value: "1.5", unit: "s", status: "PASS (GOOD)", note: "Mobile Largest Contentful Paint (< 2.5s)" },
  { code: "INP", value: "136", unit: "ms", status: "PASS (GOOD)", note: "Interaction to Next Paint (< 200ms)" },
  { code: "CLS", value: "0.02", unit: "", status: "PASS (GOOD)", note: "Cumulative Layout Shift (< 0.1)" },
  { code: "PSI", value: "86", unit: "/100", status: "OPTIMIZED", note: "Google PageSpeed — Desktop Score" },
];

export const skillGroups = [
  {
    title: "Core Technologies",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js (App Router, SSR, SSG, ISR)",
      "React Hooks",
      "HTML5 / Semantic Web",
      "CSS3 & SCSS",
    ],
  },
  {
    title: "State Management & Data Flow",
    items: [
      "Redux Toolkit",
      "TanStack Query (React Query)",
      "Context API",
      "Zustand",
      "Asynchronous Caching",
      "Optimistic UI Updates",
    ],
  },
  {
    title: "UI Systems & Design Architecture",
    items: [
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
      "CSS Modules",
      "Component-Driven Development",
      "Mobile-First Responsive Design",
      "Figma to Code",
    ],
  },
  {
    title: "Performance & Quality Engineering",
    items: [
      "Core Web Vitals (LCP, INP, CLS)",
      "Google PageSpeed Optimization",
      "Code Splitting & Dynamic Imports",
      "Lazy Loading & Image Optimization",
      "Memoization (useMemo, useCallback)",
      "Web Accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    title: "APIs & Systems Integration",
    items: [
      "RESTful APIs Orchestration",
      "GraphQL Integration",
      "STAAH Reservation Engines",
      "Payment Gateways (Razorpay/Stripe)",
      "JWT Secure Authentication",
      "Role-Based Access Control (RBAC)",
    ],
  },
  {
    title: "Tooling & Enterprise Delivery",
    items: [
      "Vite",
      "Webpack",
      "Git & GitHub",
      "CI/CD Pipelines",
      "Jest & React Testing Library",
      "Vercel & Netlify",
      "AWS & Windows IIS",
    ],
  },
];

export const experience = [
  {
    role: "Front-End Developer",
    company: "CIN Universe",
    location: "Hauz Khas, Delhi",
    start: "May 2024",
    end: "Present",
    current: true,
    points: [
      "Architected and maintained scalable hotel booking platforms, enterprise loyalty dashboards, and extranets using React.js, Next.js, and TypeScript.",
      "Spearheaded performance optimization initiatives, implementing code-splitting, lazy loading, and memoization to minimize unnecessary re-renders and lower load times by 35%.",
      "Engineered reusable, accessible component libraries that streamlined cross-team development and enforced strict UI consistency across 20+ hospitality client products.",
      "Integrated complex third-party reservation APIs (STAAH, proprietary booking engines), secure user authentication flows, and payment processing systems.",
      "Participated actively in Agile sprint planning, code reviews, and technical scoping with cross-functional product and backend engineering teams.",
    ],
  },
  {
    role: "Front-End Developer",
    company: "Infinite IT Solutions",
    location: "Gurgaon, Haryana",
    start: "Apr 2021",
    end: "Apr 2024",
    current: false,
    points: [
      "Delivered multiple Hospitality, Immigration, Real Estate, and E-Commerce applications using React.js, Next.js, TypeScript, JavaScript, Redux, and Shopify.",
      "Translated intricate UI/UX design wireframes from Figma into pixel-perfect, highly responsive, mobile-first interfaces.",
      "Optimized frontend architecture for maintainability, high SEO visibility, and fast asset delivery.",
      "Improved website speed, accessibility, SEO performance, and user engagement through advanced frontend optimization techniques.",
      "Collaborated with cross-functional teams to convert business requirements into scalable web applications.",
      "Customized and maintained WordPress, WooCommerce, and Shopify-based business platforms.",
    ],
  },
  {
    role: "Front-End Developer",
    company: "Codelare Pvt. Ltd.",
    location: "Gurgaon, Haryana",
    start: "Oct 2019",
    end: "Apr 2021",
    current: false,
    points: [
      "Developed responsive web applications for Car Rentals, E-Commerce, and Real Estate domains.",
      "Built modular UI elements, ensuring robust cross-browser compatibility and seamless user experiences.",
      "Worked closely with stakeholders and engineering teams to convert complex business requirements into high-quality, maintainable, and responsive web applications.",
      "Improved website performance, UI consistency, and cross-browser compatibility across multiple projects.",
      "Participated in requirement analysis, development planning, and client-facing discussions.",
    ],
  },
  {
    role: "Front-End Developer Intern",
    company: "Darcon Digital",
    location: "Noida, UP",
    start: "Jan 2019",
    end: "Oct 2019",
    current: false,
    points: [
    "Collaborated with backend developers to implement feature updates and UI improvements.",
    "Developed responsive interfaces compatible across desktop, iOS, and Android devices.",
    "Translated UI/UX designs and wireframes into functional, user-friendly web interfaces.",
    "Built and maintained reusable front-end components to improve code consistency and maintainability.",
    "Improved website responsiveness and cross-browser compatibility across multiple screen sizes.",
    "Optimized web pages for improved loading speed and overall user experience.",
    "Tested website functionality across different browsers and devices to ensure consistent performance.",
    "Implemented interactive UI elements, forms, navigation menus, and other website components.",
    "Assisted in maintaining existing web applications and implementing new feature requirements."
  ],
  },
];

export const education = {
  degree: "Bachelor of Technology (Computer Engineering)",
  school: "YMCA University of Science & Technology, Faridabad (HR)",
  years: "2015 – 2019",
};

export const projectCategories = [
  {
    "id": "all",
    "label": "All Systems",
    "count": 49
  },
  {
    "id": "featured",
    "label": "⭐ Featured Flagship",
    "count": 10
  },
  {
    "id": "hospitality",
    "label": "Enterprise Hospitality",
    "count": 12
  },
  {
    "id": "portals",
    "label": "B2B & SaaS Portals",
    "count": 12
  },
  {
    "id": "ecommerce",
    "label": "E-Commerce & Retail",
    "count": 9
  },
  {
    "id": "lifestyle",
    "label": "Media, Real Estate & Lifestyle",
    "count": 9
  },
  {
    "id": "booking",
    "label": "Direct Booking Engines",
    "count": 3
  },
  {
    "id": "crm",
    "label": "CRM & Internal Systems",
    "count": 2
  }
];

export const projects = [
  {
    "name": "Pride Hotels & Resorts",
    "url": "https://pridehotels.cinuniverse.com/",
    "image": "/projects/pride-hotels.png",
    "tag": "National Chain",
    "category": "hospitality",
    "summary": "Pan-India hotel chain platform featuring member rate unlocks, location-based property finders, dynamic pricing rules, and seamless corporate booking paths.",
    "points": [
      "Built location-aware property finder with multi-destination search and interactive maps.",
      "Integrated loyalty membership tier pricing that recalculates room rates on the fly."
    ],
    "metrics": [
      {
        "label": "Locations",
        "value": "40+ Units"
      },
      {
        "label": "State",
        "value": "Redux"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "Redux Toolkit",
      "REST APIs"
    ]
  },
   {
    "name": "Scottish High International School",
    "url": "https://scottishigh.com/",
    "image": "/projects/scottish-high.png",
    "tag": "Premier K-12 Academy",
    "category": "portals",
    "featured": true,
    "summary": "Next.js-powered digital ecosystem for Gurugram's top-tier international school, featuring dynamic academic curricula, admissions inquiry portal, campus virtual showcases, and event calendars.",
    "points": [
      "Architected modern Next.js frontend with SSR and dynamic routing to power high-traffic admission cycles with sub-second page loads.",
      "Built interactive admissions inquiry workflows with multi-step validation and CRM lead syncing.",
      "Engineered accessible, WCAG-compliant responsive navigation and media galleries for parents and prospective students."
    ],
    "metrics": [
      {
        "label": "Framework",
        "value": "Next.js"
      },
      {
        "label": "Admissions UX",
        "value": "Multi-Step"
      },
      {
        "label": "Performance",
        "value": "Sub-Second"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "SSR"
    ]
  },
  {
    "name": "Ramee Hotels & Resorts",
    "url": "https://rameehotels.cinuniverse.com/",
    "image": "/projects/ramee-hotels.png",
    "tag": "Enterprise Hospitality",
    "category": "hospitality",
    "featured": true,
    "summary": "Fully API-driven enterprise hotel web ecosystem architected with Next.js, React, and TypeScript. Eliminated static dependencies so all property data, room availability, dynamic pricing, and promotional banners render in real time via backend REST APIs.",
    "points": [
      "Architected a fully API-driven enterprise hotel web ecosystem using Next.js, React, and TypeScript, eliminating static dependencies.",
      "Engineered asynchronous state management and caching strategies using TanStack Query, enabling seamless multi-property searches, localized currency updates, and low-latency booking flows.",
      "Optimized Core Web Vitals through SSR/ISR techniques, image optimization, and lazy rendering, ensuring high Google PageSpeed scores and fast interactive speeds across mobile devices."
    ],
    "metrics": [
      {
        "label": "Architecture",
        "value": "SSR & ISR"
      },
      {
        "label": "Data Caching",
        "value": "TanStack Query"
      },
      {
        "label": "Speed Gain",
        "value": "+38%"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "REST APIs",
      "Tailwind CSS"
    ]
  },
  {
    "name": "Vaaya",
    "url": "https://vaaya.com/",
    "image": "/projects/vaaya.png",
    "tag": "Contemporary Handcrafted Fashion",
    "category": "ecommerce",
    "summary": "Contemporary Indian artisanal fashion house e-commerce platform blending heritage hand-block prints and modern silhouettes with smooth international checkout.",
    "points": [
      "Built immersive visual fashion lookbooks with direct shoppable tags, fabric texture closeups, and size recommendation tools.",
      "Integrated multi-currency pricing switcher with geo-IP detection and international worldwide shipping calculations.",
      "Optimized checkout path and mobile page performance, achieving high engagement across seasonal collection drops."
    ],
    "metrics": [
      {
        "label": "Catalog",
        "value": "Artisanal Couture"
      },
      {
        "label": "Currency",
        "value": "Global Geo-IP"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "E-Commerce",
      "Multi-Currency",
      "CSS Modules"
    ]
  },
  {
    "name": "Eight Continents Hotels & Resorts",
    "url": "https://eightcontinentshotels.com/",
    "image": "/projects/eight-continents.png",
    "tag": "Global Luxury Chain",
    "category": "hospitality",
    "featured": true,
    "summary": "Global multi-brand luxury hospitality platform spanning international properties with server-side rendering, dynamic routing, and high SEO visibility.",
    "points": [
      "Developed a global multi-brand luxury hospitality platform spanning international properties using Next.js and TypeScript.",
      "Optimized image delivery, server-side rendering (SSR), and dynamic routing to drive high SEO visibility and swift global content delivery.",
      "Implemented seamless multi-destination booking paths, tailored experience filters, and robust state workflows."
    ],
    "metrics": [
      {
        "label": "Scale",
        "value": "Global Brand"
      },
      {
        "label": "Delivery",
        "value": "SSR / CDN"
      },
      {
        "label": "Booking Path",
        "value": "Multi-Dest"
      }
    ],
    "tech": [
      "Next.js",
      "TypeScript",
      "SSR",
      "SEO Architecture",
      "Dynamic Routing"
    ]
  },

   {
    "name": "Amaris by Prerna Rajpal",
    "url": "https://www.amarisjewels.com/",
    "image": "/projects/amaris-jewels.png",
    "tag": "Haute Joaillerie & Diamonds",
    "category": "ecommerce",
    "featured": true,
    "summary": "Ultra-luxury handcrafted fine jewelry and couture diamond boutique platform featuring virtual concierge consultations, high-carat jewelry showcases, and VIP clienteling.",
    "points": [
      "Crafted high-elegance, editorial-grade visual architecture showcasing intricate diamond cuts with multi-angle micro-zoom.",
      "Built private bespoke consultation booking calendar connecting VIP clients directly with master jewelry designers.",
      "Optimized high-resolution luxury photography delivery with adaptive image sets and zero layout shifts (CLS 0.00)."
    ],
    "metrics": [
      {
        "label": "Segment",
        "value": "Haute Joaillerie"
      },
      {
        "label": "CLS",
        "value": "0.00"
      },
      {
        "label": "Concierge",
        "value": "Private VIP"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "High-Resolution Image Delivery"
    ]
  },
  {
    "name": "WelcomHeritage Hotels",
    "url": "https://www.welcomheritagehotels.in/",
    "image": "/projects/welcom-heritage.png",
    "tag": "Flagship Heritage",
    "category": "hospitality",
    "featured": true,
    "summary": "Flagship luxury heritage chain platform engineered for near-perfect Core Web Vitals, achieving 1.5s Mobile LCP, 136ms INP, and 86+ Desktop Google PageSpeed score.",
    "points": [
      "Developed and optimized responsive hospitality website pages and booking workflows.",
      "Achieved Core Web Vitals metrics of 1.5s Mobile LCP, 136ms INP, and 0.02 CLS.",
      "Improved Google PageSpeed scores to 74+ Mobile and 86+ Desktop while enhancing accessibility and SEO performance."
    ],
    "metrics": [
      {
        "label": "Mobile LCP",
        "value": "1.5s"
      },
      {
        "label": "INP",
        "value": "136ms"
      },
      {
        "label": "Desktop PSI",
        "value": "86+"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Core Web Vitals",
      "STAAH API",
      "Tailwind CSS"
    ]
  },

  {
    "name": "Lemon Tree Hotels",
    "url": "https://www.lemontreehotels.com/",
    "image": "/projects/lemontree.png",
    "tag": "Enterprise Hospitality",
    "category": "hospitality",
    "featured": true,
    "summary": "India's premier upscale hotel chain web platform with multi-brand booking workflows, performance enhancements, and 70+ Desktop PageSpeed score.",
    "points": [
      "Developed responsive booking and property pages for multiple hospitality brands under the Lemon Tree umbrella.",
      "Enhanced booking flow performance, accessibility (WCAG), and search engine optimization.",
      "Achieved Google PageSpeed scores exceeding 65+ Mobile and 70+ Desktop across high-traffic booking dates."
    ],
    "metrics": [
      {
        "label": "Scale",
        "value": "Tier-1 Chain"
      },
      {
        "label": "Mobile PSI",
        "value": "65+"
      },
      {
        "label": "Desktop PSI",
        "value": "70+"
      }
    ],
    "tech": [
      "React.js",
      "Next.js",
      "Responsive Architecture",
      "SEO & Analytics"
    ]
  },
  {
    "name": "Clarks Hotels & Resorts",
    "url": "https://www.theclarkshotels.com/",
    "image": "/projects/clarks-hotels.png",
    "tag": "Enterprise Hospitality",
    "category": "hospitality",
    "summary": "Reusable component architecture spanning 10+ booking and loyalty modules across the brand, reducing development effort by 40%.",
    "points": [
      "Designed reusable component architecture across 10+ booking and loyalty modules, reducing development effort by 40%.",
      "Integrated STAAH APIs and secure payment gateway solutions.",
      "Improved PageSpeed scores through frontend optimization and SEO enhancements."
    ],
    "metrics": [
      {
        "label": "Modules",
        "value": "10+"
      },
      {
        "label": "Dev Effort",
        "value": "-40%"
      },
      {
        "label": "Booking Engine",
        "value": "STAAH"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "STAAH APIs",
      "Component Design",
      "Payment Gateway"
    ]
  },
  {
    "name": "Hotel Clarks",
    "url": "https://www.hotelclarks.com/",
    "image": "/projects/hotel-clarks.png",
    "tag": "Heritage Hospitality",
    "category": "hospitality",
    "summary": "Historic luxury hospitality group web platform featuring integrated multi-tier room reservations, banquet booking inquiries, and guest loyalty incentives.",
    "points": [
      "Engineered multi-tier room selection and event inquiry flows for iconic heritage properties.",
      "Integrated reservation engine APIs and optimized touch targets for high mobile conversion."
    ],
    "metrics": [
      {
        "label": "Conversions",
        "value": "+24%"
      },
      {
        "label": "Platform",
        "value": "Next.js"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "REST APIs",
      "Tailwind CSS"
    ]
  },
  {
    "name": "Brij Hotels",
    "url": "https://www.brijhotels.com/",
    "image": "/projects/brij-hotels.png",
    "tag": "Boutique Luxury",
    "category": "hospitality",
    "summary": "Experiential boutique luxury hotel platform showcasing bespoke heritage properties, immersive visual journeys, curated safari/culinary packages, and streamlined booking.",
    "points": [
      "Developed responsive, media-rich property showcases with smooth micro-interactions and mobile-first room selection.",
      "Optimized heavy high-resolution imagery and video backgrounds for instantaneous LCP delivery."
    ],
    "metrics": [
      {
        "label": "Fidelity",
        "value": "Ultra-High"
      },
      {
        "label": "Uptime",
        "value": "99.9%"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "REST APIs"
    ]
  },
  {
    "name": "Bawa Hotels",
    "url": "https://www.bawahotels.com/",
    "image": "/projects/bawa-hotels.png",
    "tag": "Boutique Hospitality",
    "category": "hospitality",
    "summary": "Prime Mumbai boutique business hotel portal with direct room booking flows, banquet & event inquiries, meeting hall reservations, and localized rate rules.",
    "points": [
      "Delivered responsive booking flows for business travelers with fast check-in inquiry workflows.",
      "Optimized critical rendering path for mobile business travelers on high-latency networks."
    ],
    "metrics": [
      {
        "label": "Market",
        "value": "Mumbai Hub"
      },
      {
        "label": "Load Time",
        "value": "<1.8s"
      }
    ],
    "tech": [
      "React.js",
      "Next.js",
      "SCSS",
      "REST APIs"
    ]
  },
  {
    "name": "Orange Tiger Hotels",
    "url": "https://www.orangetigerhotels.com/",
    "image": "/projects/orange-tiger.png",
    "tag": "Hotel Management",
    "category": "hospitality",
    "summary": "Multi-brand hotel management and franchise ecosystem showcasing diverse brand tiers (Kyriad, Citrus), investor dashboards, and lead funnels.",
    "points": [
      "Created multi-brand hub for hotel owners, franchisees, and travelers with unified architecture.",
      "Implemented dynamic franchise lead capture pipeline with client-side validation and CRM integration."
    ],
    "metrics": [
      {
        "label": "Portfolio",
        "value": "Multi-Brand"
      },
      {
        "label": "Leads",
        "value": "+45%"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Lead Funnel"
    ]
  },
  {
    "name": "Amritara Hotels & Resorts",
    "url": "https://www.amritara.co.in/",
    "image": "/projects/amritara-hotels.png",
    "tag": "Heritage & Wildlife",
    "category": "hospitality",
    "summary": "Premier experiential heritage & wildlife resort platform with interactive property exploration, curated experiences, and instant availability.",
    "points": [
      "Constructed experiential travel landing pages and dynamic package builders across 20+ heritage destinations.",
      "Achieved high mobile performance scores through lazy loading and modern image formats (WebP/AVIF)."
    ],
    "metrics": [
      {
        "label": "Destinations",
        "value": "20+ Stays"
      },
      {
        "label": "UX Rating",
        "value": "4.9 / 5"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "REST APIs"
    ]
  },
  {
    "name": "Quick Travel (QT) Engine",
    "url": "https://qt.cinuniverse.com/",
    "image": "",
    "tag": "Direct Booking Engine",
    "category": "booking",
    "summary": "High-throughput hotel & travel reservation engine designed for sub-second quote rendering, room customization, add-on upsells, and instant voucher issuance.",
    "points": [
      "Engineered lightweight booking funnel with sub-second quote calculation and dynamic add-on upsells.",
      "Implemented asynchronous room search caching with TanStack Query to eliminate duplicate network calls."
    ],
    "metrics": [
      {
        "label": "Quote Speed",
        "value": "<800ms"
      },
      {
        "label": "Checkout",
        "value": "Instant"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "TanStack Query",
      "Payment Gateway"
    ]
  },
  {
    "name": "Rajasthali Resort & Spa",
    "url": "https://www.rajasthaliresort.com/",
    "image": "/projects/rajasthali.png",
    "tag": "Luxury Destination Resort",
    "category": "hospitality",
    "summary": "Royal palace resort experience in Jaipur showcasing luxury tented suites, Aravali mountain views, royal wedding planning portals, and wellness retreats.",
    "points": [
      "Designed high-elegance interactive interface showcasing palatial rooms, spa therapies, and grand destination wedding venues.",
      "Integrated lead qualification forms for luxury destination weddings and corporate retreats."
    ],
    "metrics": [
      {
        "label": "Engagement",
        "value": "+52%"
      },
      {
        "label": "Segment",
        "value": "Palace Resort"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "CSS Animations",
      "Responsive UI"
    ]
  },
  {
    "name": "Today's Traveller",
    "url": "https://todaystravellerwp.cinuniverse.com/",
    "image": "/projects/todays-traveller.png",
    "tag": "Digital Publishing",
    "category": "lifestyle",
    "summary": "India's leading travel & hospitality trade publication. Engineered high-traffic content delivery with sub-second page loads, categorized news feeds, and editorial layouts.",
    "points": [
      "Engineered headless Next.js frontend consuming WordPress REST API via Incremental Static Regeneration (ISR).",
      "Optimized layout shifts (CLS < 0.01) across rich editorial layouts with dynamic advertising slots."
    ],
    "metrics": [
      {
        "label": "Mode",
        "value": "ISR Headless"
      },
      {
        "label": "CLS",
        "value": "0.01"
      }
    ],
    "tech": [
      "Next.js",
      "Headless CMS",
      "ISR",
      "REST APIs",
      "Tailwind CSS"
    ]
  },
  {
    "name": "Ananta Hotels & Resorts",
    "url": "https://ananta.cinuniverse.com/",
    "image": "/projects/ananta.png",
    "tag": "Eco-Luxury Chain",
    "category": "hospitality",
    "summary": "Luxury sanctuary & eco-resorts across Pushkar, Udaipur, and Jaipur with interactive villa selection, wellness packages, and event space reservation flows.",
    "points": [
      "Built interactive resort and villa selection UI with real-time seasonal tariff calculations.",
      "Optimized component re-rendering using React.memo and custom hooks for smooth browsing."
    ],
    "metrics": [
      {
        "label": "Properties",
        "value": "Multi-City"
      },
      {
        "label": "Tariff Calc",
        "value": "Real-time"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "API Booking"
    ]
  },
    {
    "name": "CIN Extranet & Channel Manager",
    "url": "https://extranet.cinuniverse.com/",
    "image": "/projects/extranet.png",
    "tag": "Extranet & Channel Mgr",
    "category": "portals",
    "featured": true,
    "summary": "Mission-critical hotelier back-office extranet for real-time room inventory management, rate parity matrix, minimum-stay restrictions, and OTA distribution.",
    "points": [
      "Architected a high-density, real-time inventory and pricing matrix for hotel revenue managers across dozens of properties.",
      "Implemented optimistic UI updates and resilient error handling for critical rate and restriction changes.",
      "Integrated multi-role authentication, permission matrices, and audit logs for administrative actions."
    ],
    "metrics": [
      {
        "label": "Grid State",
        "value": "Real-Time"
      },
      {
        "label": "Latency",
        "value": "<100ms"
      },
      {
        "label": "Integrations",
        "value": "Multi-OTA"
      }
    ],
    "tech": [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Complex Grid State",
      "REST APIs"
    ]
  },
  {
    "name": "Amritara B2B Partner Portal",
    "url": "https://www.amritara.co.in/B2B-Portal/",
    "image": "/projects/amritara-b2b-portal.png",
    "tag": "B2B SaaS Portal",
    "category": "portals",
    "featured": true,
    "summary": "Enterprise B2B reservation portal for travel agents and corporate partners featuring negotiated net rates, credit line ledger management, and instant voucher issuance.",
    "points": [
      "Engineered B2B agent dashboard with credit balance tracking, instant invoice generation, and automated commission calculations.",
      "Built secure JWT-based authentication with role-based access for agent admins and sales associates.",
      "Implemented high-speed room allotment allocation engine for group and corporate bookings."
    ],
    "metrics": [
      {
        "label": "Pricing Mode",
        "value": "B2B Net Rates"
      },
      {
        "label": "Security",
        "value": "JWT / RBAC"
      },
      {
        "label": "Ledger",
        "value": "Real-time"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "RBAC",
      "Financial Ledger UI"
    ]
  },
  {
    "name": "Enterprise Task Manager",
    "url": "http://taskmanager.cinuniverse.com/",
    "image": "",
    "tag": "SaaS Workflow",
    "category": "crm",
    "summary": "Internal enterprise workflow & agile ticket management system with sprint tracking, role-based access control, task delegation, and productivity analytics.",
    "points": [
      "Architected kanban board with optimistic drag-and-drop state updates and conflict resolution.",
      "Implemented team role permissions, task assignment queues, and milestone sprint tracking."
    ],
    "metrics": [
      {
        "label": "Workflow",
        "value": "Agile / Kanban"
      },
      {
        "label": "State",
        "value": "Redux Toolkit"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "Redux Toolkit",
      "REST APIs",
      "Tailwind CSS"
    ]
  },
  {
    "name": "Sutra CRM",
    "url": "https://www.sutraacrm.com/",
    "image": "/projects/sutra.png",
    "tag": "Enterprise CRM",
    "category": "crm",
    "summary": "Enterprise hospitality & sales customer relationship management system featuring lead pipelines, automated follow-up sequences, agent attribution, and deal analytics.",
    "points": [
      "Developed interactive sales pipeline stages with real-time conversion probability calculations.",
      "Built customer communication history, call logs, follow-up reminders, and automated email triggers."
    ],
    "metrics": [
      {
        "label": "Pipelines",
        "value": "Multi-Stage"
      },
      {
        "label": "System",
        "value": "SaaS CRM"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "TypeScript",
      "Data Viz",
      "REST APIs"
    ]
  },
  {
    "name": "Guest Loyalty Platform",
    "url": "https://guestloyalty.cinuniverse.com/",
    "image": "/projects/amritara-loyalty.png",
    "tag": "Loyalty SaaS",
    "category": "portals",
    "summary": "Multi-tenant guest loyalty & rewards platform featuring tier progression (Silver/Gold/Platinum), point redemption on room bookings, voucher wallet, and member analytics.",
    "points": [
      "Developed customer loyalty dashboard with reward point ledger, tier upgrades, and automated reward redemption.",
      "Integrated authentication, loyalty APIs, and customer profile management modules."
    ],
    "metrics": [
      {
        "label": "Tiers",
        "value": "Silver / Gold / Plat"
      },
      {
        "label": "Redemption",
        "value": "Instant"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "TypeScript",
      "JWT Auth",
      "Points Engine"
    ]
  },
  {
    "name": "Infinite IT Solutions",
    "url": "https://www.infiniteitsolutions.net/",
    "image": "/projects/infiniteit.png",
    "tag": "Digital & IT Agency",
    "category": "portals",
    "summary": "Full-service digital technology and web development corporate agency platform featuring interactive case studies, responsive service modules, and lead qualification funnels.",
    "points": [
      "Architected high-performance corporate web interface with smooth scroll animations and mobile-first responsive layouts.",
      "Engineered dynamic lead generation funnels with client-side form validation and automated routing.",
      "Optimized Core Web Vitals and SEO metadata structure to maximize organic search visibility and user retention."
    ],
    "metrics": [
      {
        "label": "SEO Visibility",
        "value": "95+"
      },
      {
        "label": "Responsive",
        "value": "Mobile-First"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "GSAP Animations",
      "SEO"
    ]
  },
 
 
  {
    "name": "Hashtag Portal",
    "url": "https://hashtagportal.com.au/",
    "image": "/projects/hash-portal.png",
    "tag": "Creative Tech Agency",
    "category": "portals",
    "summary": "Australian digital media and creative technology portal featuring dynamic video case studies, digital marketing service tiers, and interactive proposal request tools.",
    "points": [
      "Delivered dynamic creative portfolio with smooth video showreels and interactive client project spotlights.",
      "Implemented custom consultation scheduler with automated calendar syncing and project scoping questionnaire.",
      "Engineered responsive modular UI components with high Lighthouse performance and accessibility scores."
    ],
    "metrics": [
      {
        "label": "Client Base",
        "value": "Australia"
      },
      {
        "label": "Design",
        "value": "Editorial High-Design"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Video Streaming"
    ]
  },
  {
    "name": "Zap Europe",
    "url": "https://zapeurope.com/",
    "image": "/projects/zap-europe.png",
    "tag": "Clean Mobility & EV",
    "category": "portals",
    "summary": "European electric mobility solutions and zero-emission urban transport platform showcasing commercial EV fleets, charging infrastructure, and distributor networks.",
    "points": [
      "Created multilingual electric vehicle showcase with interactive battery range calculators and charging specs.",
      "Built B2B fleet inquiry portal with total cost of ownership (TCO) comparison charts and emissions savings estimates.",
      "Optimized asset loading across European CDNs for lightning-fast international page delivery."
    ],
    "metrics": [
      {
        "label": "Market",
        "value": "Pan-Europe"
      },
      {
        "label": "Tool",
        "value": "TCO & Range Calc"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "CDN Architecture"
    ]
  },
  {
    "name": "Yogveda",
    "url": "https://yogveda.in/",
    "image": "/projects/yogveda.png",
    "tag": "Ayurvedic Health & Wellness",
    "category": "ecommerce",
    "summary": "Holistic Ayurvedic remedies and chronic wellness e-commerce platform offering certified herbal formulations, dosha health assessments, and doctor consultations.",
    "points": [
      "Built interactive Ayurvedic health assessment quiz that recommends personalized herbal regimens based on user health profiles.",
      "Implemented fast e-commerce cart, one-click checkout, customer reviews, and COD/online payment options.",
      "Optimized mobile browsing speed and checkout conversion funnel, boosting repeat health orders."
    ],
    "metrics": [
      {
        "label": "Conversion",
        "value": "+32%"
      },
      {
        "label": "Quiz Funnel",
        "value": "Personalized"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "E-Commerce Cart",
      "Payment Gateway",
      "Tailwind CSS"
    ]
  },
  {
    "name": "Machine Station",
    "url": "https://www.machinestation.us/",
    "image": "/projects/machine-station.png",
    "tag": "Industrial Machinery Marketplace",
    "category": "ecommerce",
    "summary": "California-based premier global marketplace for used and new CNC machinery, industrial machining centers, lathes, and fabrication equipment.",
    "points": [
      "Engineered comprehensive machinery database with video machine inspections, technical specifications, and RFQ workflows.",
      "Built advanced search by manufacturer, axis count, spindle speed, and machine condition.",
      "Optimized high-resolution equipment photo galleries and PDF machinery specification sheet delivery."
    ],
    "metrics": [
      {
        "label": "Equipment",
        "value": "Heavy Industrial"
      },
      {
        "label": "RFQ Engine",
        "value": "Instant Quote"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Search Engine",
      "RFQ Workflows",
      "Responsive Web"
    ]
  },
  {
    "name": "Chrysalis High",
    "url": "https://chrysalis.in/",
    "image": "/projects/chrysalis.png",
    "tag": "K-12 Education Network",
    "category": "portals",
    "summary": "Comprehensive school network portal across major Indian metros featuring academic curriculum frameworks, campus virtual tours, fee inquiry, and parent admission portals.",
    "points": [
      "Architected multi-campus portal with localized branch finders, admissions brochures, and parent interaction modules.",
      "Implemented secure online admission registration forms with document upload capabilities and CRM ingestion.",
      "Achieved responsive design benchmarks across low-bandwidth mobile networks for accessible parent communication."
    ],
    "metrics": [
      {
        "label": "Campuses",
        "value": "Multi-City"
      },
      {
        "label": "Admissions",
        "value": "Online Portal"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Forms & Document Upload",
      "CSS Modules",
      "REST APIs"
    ]
  },
  {
    "name": "Baby Luv",
    "url": "https://babyluv.in/",
    "image": "/projects/babyluv.png",
    "tag": "Maternity & Baby E-Commerce",
    "category": "ecommerce",
    "summary": "Direct-to-consumer baby clothing, newborn essentials, and mother care e-commerce brand featuring curated gift bundles, size guides, and frictionless checkout.",
    "points": [
      "Developed clean, pastel-toned mobile-first e-commerce shopping experience with instant cart slideouts and wishlist syncing.",
      "Integrated dynamic product variant selectors (sizes, colors, newborn age tiers) with real-time stock indicators.",
      "Optimized checkout steps and integrated UPI / Card payment gateways to minimize abandoned carts."
    ],
    "metrics": [
      {
        "label": "Mobile UX",
        "value": "D2C Optimized"
      },
      {
        "label": "Cart Abandon",
        "value": "-22%"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Shopify / Headless",
      "Tailwind CSS",
      "Payment Gateway"
    ]
  },
  {
    "name": "Crafts Lane",
    "url": "https://www.craftslane.com/",
    "image": "/projects/craftslane.png",
    "tag": "Handcrafted Decor & DIY",
    "category": "ecommerce",
    "summary": "Artisanal handcrafted wooden home decor, decoupage DIY craft supplies, and bespoke gifting e-commerce platform with custom engraving order options.",
    "points": [
      "Built rich visual product catalog featuring custom text engraving previews and personalized gift configuration.",
      "Engineered responsive category mega-menus and filtered navigation across thousands of artistic craft SKUs.",
      "Streamlined domestic shipping rate calculations and automated order status tracking."
    ],
    "metrics": [
      {
        "label": "Catalog",
        "value": "Handcrafted DIY"
      },
      {
        "label": "Customizer",
        "value": "Live Preview"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "E-Commerce",
      "Product Customizer",
      "SCSS"
    ]
  },
 
  {
    "name": "Complinity",
    "url": "https://complinity.com/",
    "image": "/projects/complinity.png",
    "tag": "Governance, Risk & Compliance",
    "category": "portals",
    "featured": true,
    "summary": "India's leading enterprise Governance, Risk, and Compliance (GRC) software platform tracking 2,000+ legal compliances, automated alerts, and regulatory audit boards.",
    "points": [
      "Architected enterprise product showcase highlighting compliance tracking modules across labor, tax, environmental, and corporate laws.",
      "Engineered interactive compliance health score calculator and enterprise demo scheduling engine.",
      "Implemented enterprise-grade responsive UI systems adhering to strict corporate branding and performance benchmarks."
    ],
    "metrics": [
      {
        "label": "Enterprise Scale",
        "value": "2,000+ Laws"
      },
      {
        "label": "Audits",
        "value": "Zero Non-Compliance"
      },
      {
        "label": "Architecture",
        "value": "B2B Enterprise SaaS"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "TypeScript",
      "Enterprise Design System",
      "REST APIs"
    ]
  },
  {
    "name": "EOI Community",
    "url": "https://eoicommunity.com/",
    "image": "/projects/eoi-community.png",
    "tag": "Founders & Angel Syndicate",
    "category": "portals",
    "summary": "Curated community ecosystem connecting visionary startup founders, angel investors, and venture syndicate leaders with pitch rooms, deal flow trackers, and networking roundtables.",
    "points": [
      "Built member authentication and invite-only application vetting funnel with profile endorsement modules.",
      "Engineered investor pitch deck submission pipeline with confidential access control and review queues.",
      "Delivered modern community dashboard featuring upcoming demo days, founder masterclasses, and syndicate updates."
    ],
    "metrics": [
      {
        "label": "Network",
        "value": "Founders & Angels"
      },
      {
        "label": "Deal Flow",
        "value": "Private Syndicate"
      }
    ],
    "tech": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Authentication"
    ]
  },
  {
    "name": "Logixgrid",
    "url": "https://logixgrid.com/",
    "image": "/projects/logixgrid.png",
    "tag": "Supply Chain & Logistics SaaS",
    "category": "portals",
    "summary": "Cloud-native logistics, courier dispatch, and freight tracking SaaS platform orchestrating first-to-last-mile delivery workflows for cross-border logistics enterprises.",
    "points": [
      "Constructed interactive live shipment tracking widget with multi-carrier API resolution and milestone status cards.",
      "Designed SaaS product solutions architecture showcasing automated dispatch, route optimization, and air freight modules.",
      "Built enterprise demo request pipeline with CRM qualification triggers and automated sales team assignment."
    ],
    "metrics": [
      {
        "label": "Tracking Latency",
        "value": "<80ms"
      },
      {
        "label": "Deployment",
        "value": "Global Cloud"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Real-Time Tracking UI",
      "Tailwind CSS",
      "REST APIs"
    ]
  },
  {
    "name": "Catalyze Capital",
    "url": "https://www.catalyzecapital.in/",
    "image": "/projects/catalyze-capital.png",
    "tag": "Venture Capital & Advisory",
    "category": "portals",
    "summary": "Boutique venture capital and strategic financial advisory firm web portal highlighting growth-stage investments, portfolio exits, and founder growth advisory services.",
    "points": [
      "Developed minimalist, high-trust corporate aesthetic featuring interactive investment thesis portfolios and founder spotlights.",
      "Implemented secure founder pitch deck upload portal with encrypted document handling and partner notifications.",
      "Optimized page speed and typography scaling for executive review across iPads and desktop workstations."
    ],
    "metrics": [
      {
        "label": "Portfolio",
        "value": "Growth-Stage"
      },
      {
        "label": "Security",
        "value": "Encrypted Submissions"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Clean Minimalist UI",
      "Tailwind CSS",
      "Lead Funnel"
    ]
  },
  
  {
    "name": "Aryan Realty Infratech",
    "url": "https://www.aryanrealty.com/",
    "image": "/projects/aryan-realty.png",
    "tag": "Luxury Real Estate Gurugram",
    "category": "lifestyle",
    "summary": "Gurugram's premier luxury real estate advisory and property management platform showcasing Golf Course Road penthouses, Dwarka Expressway projects, and commercial hubs.",
    "points": [
      "Developed interactive luxury property exploration portal with micro-location mapping, floor plans, and amenities breakdowns.",
      "Built investor EMI and mortgage affordability calculators with dynamic down payment and interest rate sliders.",
      "Integrated instant WhatsApp advisory chat and lead capture system connecting high-net-worth buyers directly to senior brokers."
    ],
    "metrics": [
      {
        "label": "Market",
        "value": "Delhi NCR Hub"
      },
      {
        "label": "Calculator",
        "value": "Mortgage / EMI"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Mortgage Engine",
      "WhatsApp Integration",
      "Tailwind CSS"
    ]
  },
   {
    "name": "Brickstone Consultants",
    "url": "https://brickstoneconsultants.cinuniverse.com/",
    "image": "/projects/brickstone.png",
    "tag": "Real Estate Advisory",
    "category": "lifestyle",
    "summary": "Commercial & luxury residential real estate consultancy platform featuring dynamic property filters, investment ROI calculators, and investor lead capture.",
    "points": [
      "Built interactive investment ROI calculator and multi-parameter commercial property search filters.",
      "Integrated secure lead capture pipeline delivering qualified investor inquiries directly to advisory teams."
    ],
    "metrics": [
      {
        "label": "Search Engine",
        "value": "Property Filter"
      },
      {
        "label": "Tool",
        "value": "ROI Engine"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Filter Engine",
      "Lead Funnel"
    ]
  },
   {
    "name": "Reform Wellness Noida",
    "url": "https://reformnoida.cinuniverse.com/",
    "image": "/projects/reform-noida.png",
    "tag": "Healthcare & Clinic",
    "category": "lifestyle",
    "summary": "Luxury aesthetic wellness clinic portal with interactive treatment discovery, specialist doctor consultations, and appointment booking.",
    "points": [
      "Engineered treatment catalog with multi-step appointment booking and consultation calendar.",
      "Implemented responsive mobile navigation and accessibility compliant forms."
    ],
    "metrics": [
      {
        "label": "Booking",
        "value": "Multi-Step"
      },
      {
        "label": "Mobile UX",
        "value": "WCAG 2.1"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Appointment Scheduler",
      "Tailwind CSS"
    ]
  },
  {
    "name": "Bawa Kitchen",
    "url": "https://bawakitchen.cinuniverse.com/",
    "image": "/projects/bawa-kitchen.png",
    "tag": "Food Tech & E-Com",
    "category": "ecommerce",
    "summary": "Interactive cloud kitchen & restaurant food delivery platform with category filtering, real-time cart calculations, dietary preference tags, and online payment.",
    "points": [
      "Implemented dynamic digital food menu with dietary filters, customization add-ons, and instant cart updates.",
      "Integrated secure checkout and automated order confirmation notifications."
    ],
    "metrics": [
      {
        "label": "Cart",
        "value": "Optimistic State"
      },
      {
        "label": "Checkout",
        "value": "Secure Gateway"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Cart State",
      "Payment Gateway"
    ]
  },
  {
    "name": "Kaara Hotels & Resorts",
    "url": "https://www.kaarahotels.com/",
    "image": "/projects/kaara-hotels.png",
    "tag": "Boutique Hospitality",
    "category": "hospitality",
    "summary": "Contemporary boutique hotel chain portal with curated destination guides, direct package reservations, and lightning-fast mobile room selection.",
    "points": [
      "Built high-speed destination and room selection flow optimized for mobile travelers.",
      "Implemented reusable cards and micro-animations for immersive hotel exploration."
    ],
    "metrics": [
      {
        "label": "Mobile LCP",
        "value": "<1.9s"
      },
      {
        "label": "Booking Flow",
        "value": "Direct API"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Booking API"
    ]
  },
  {
    "name": "26 Hospitality",
    "url": "https://26hospitality.cinuniverse.com/",
    "image": "/projects/26th-hospitality.png",
    "tag": "Hospitality Advisory",
    "category": "hospitality",
    "summary": "Boutique hotel advisory and asset management platform highlighting operational benchmarks, brand acquisitions, and strategic hotel management.",
    "points": [
      "Delivered sleek, minimalist corporate brand experience highlighting hotel portfolio metrics and advisory services.",
      "Ensured cross-browser compatibility and responsive layout rendering across all viewport sizes."
    ],
    "metrics": [
      {
        "label": "Quality",
        "value": "Pixel-Perfect"
      },
      {
        "label": "Compatibility",
        "value": "Cross-Device"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Clean Minimalist UI",
      "Investor Deck"
    ]
  },
  {
    "name": "SalesCode.ai",
    "url": "https://salescode.ai/",
    "image": "/projects/salescode.png",
    "tag": "Enterprise AI SaaS",
    "category": "portals",
    "summary": "Scalable enterprise UI components for an AI-powered sales automation and revenue acceleration platform serving global FMCG enterprises.",
    "points": [
      "Contributed to the development of responsive interfaces for an AI-powered enterprise sales automation platform.",
      "Built scalable, reusable UI components and optimized frontend performance for high-concurrency dashboards.",
      "Improved responsiveness, SEO performance, and overall user experience for enterprise clients."
    ],
    "metrics": [
      {
        "label": "Industry",
        "value": "Global AI SaaS"
      },
      {
        "label": "Design System",
        "value": "Enterprise"
      }
    ],
    "tech": [
      "React",
      "TypeScript",
      "AI Automation UI",
      "Design System"
    ]
  },
 
  {
    "name": "LexisNexis India Store",
    "url": "https://store.lexisnexis.com/en-in",
    "image": "/projects/lexis-nexis.png",
    "tag": "Legal Tech E-Commerce",
    "category": "ecommerce",
    "featured": true,
    "summary": "Global legal tech leader's enterprise e-commerce platform in India, delivering vast legal publishing catalogs, digital commentary subscriptions, and secure multi-currency checkout.",
    "points": [
      "Delivered enterprise-grade e-commerce storefront handling extensive legal catalogs, multi-format editions, and subscription bundles.",
      "Implemented facet-based catalog search, dynamic price calculation, and seamless payment gateway orchestration.",
      "Optimized critical checkout flows and shopping cart state for enterprise institutional and legal professional buyers."
    ],
    "metrics": [
      {
        "label": "Catalog Scale",
        "value": "10K+ Titles"
      },
      {
        "label": "Checkout",
        "value": "Secure Multi-Pay"
      },
      {
        "label": "Architecture",
        "value": "Enterprise E-Com"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Redux",
      "E-Commerce",
      "REST APIs",
      "Payment Gateway"
    ]
  },
  {
    "name": "Perth Airport Taxi",
    "url": "https://perthairporttaxi.com/",
    "image": "/projects/perth-airport-taxi.png",
    "tag": "Airport Transfer & Booking",
    "category": "booking",
    "summary": "Fast-dispatch airport transfer and taxi reservation portal in Western Australia with real-time route quoting, terminal pickup scheduling, and instant booking confirmations.",
    "points": [
      "Built instantaneous fare estimation and pickup scheduler with Google Maps address autocompletion.",
      "Engineered mobile-first dispatch inquiry form with automated SMS/email driver notification triggers.",
      "Optimized page load speed to capture urgent airport traveler search traffic with near-zero bounce rates."
    ],
    "metrics": [
      {
        "label": "Booking Funnel",
        "value": "<60s"
      },
      {
        "label": "Dispatch",
        "value": "Real-Time"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Google Maps API",
      "Booking Engine",
      "CSS3"
    ]
  },
  {
    "name": "Delta Force Security",
    "url": "https://deltaforcesecurity.com.au/",
    "image": "/projects/delta-force-security.png",
    "tag": "Security Services Australia",
    "category": "portals",
    "summary": "Australian national security and surveillance provider platform featuring commercial guard services, event security quoting, and corporate security audit requests.",
    "points": [
      "Developed responsive corporate interface highlighting diverse protective services, compliance licenses, and client testimonials.",
      "Implemented interactive service cost estimate calculators and emergency response request forms.",
      "Structured SEO architecture targeting high-intent security procurement searches across Melbourne and Perth."
    ],
    "metrics": [
      {
        "label": "Region",
        "value": "Australia"
      },
      {
        "label": "Lead Funnel",
        "value": "Instant Quote"
      }
    ],
    "tech": [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive UI",
      "Lead Capture"
    ]
  },
  {
    "name": "Cobra Carbide",
    "url": "https://cobracarbide.com/",
    "image": "/projects/cobra-carbide.png",
    "tag": "Industrial Cutting Tools",
    "category": "ecommerce",
    "summary": "US-based premier precision cutting tools manufacturer e-commerce catalog featuring thousands of solid carbide end mills, drills, and CNC tooling specifications.",
    "points": [
      "Built high-density technical product catalog with multi-attribute filtering (diameters, flutes, coatings, and material grades).",
      "Streamlined bulk order inquiry flows, distributor portals, and CAD spec sheet downloadable resources.",
      "Enhanced web performance across deep industrial catalog trees with lazy-loaded imagery and cached specs."
    ],
    "metrics": [
      {
        "label": "SKU Catalog",
        "value": "5K+ Tools"
      },
      {
        "label": "Filter Latency",
        "value": "<120ms"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Filter Engine",
      "E-Commerce",
      "SCSS"
    ]
  },
  {
    "name": "Auriga Racing",
    "url": "https://aurigaracing.com/",
    "image": "/projects/auriga-racing.png",
    "tag": "Sim Racing & Motorsport",
    "category": "lifestyle",
    "summary": "Professional sim racing cockpit engineering and motorsport simulation portal showcasing precision racing rigs, custom hardware integrations, and esports tournaments.",
    "points": [
      "Designed futuristic, dark-mode visual interface with interactive 3D rig customizer and telemetry showcase.",
      "Engineered modular hardware bundle builder with dynamic price recalculation and component compatibility checks.",
      "Achieved fluid micro-interactions and GPU-accelerated motion effects for an immersive automotive experience."
    ],
    "metrics": [
      {
        "label": "Aesthetics",
        "value": "Dark Cyberpunk"
      },
      {
        "label": "FPS Target",
        "value": "60 FPS"
      }
    ],
    "tech": [
      "Next.js",
      "React",
      "Framer Motion",
      "Tailwind CSS",
      "Interactive UI"
    ]
  },
  {
    "name": "Leasing India",
    "url": "https://www.leasing.net.in/",
    "image": "/projects/leasing.png",
    "tag": "Commercial Real Estate",
    "category": "lifestyle",
    "summary": "Pan-India commercial, retail, and corporate office leasing marketplace with verified property listings, square footage filters, and landlord leasing agreements.",
    "points": [
      "Constructed multi-parameter commercial space search engine with city, micro-market, carpet area, and budget filters.",
      "Integrated landlord inventory submission portal with automated document verification workflows.",
      "Optimized property gallery layouts for rapid mobile exploration by corporate real estate heads."
    ],
    "metrics": [
      {
        "label": "Inventory",
        "value": "Pan-India"
      },
      {
        "label": "Search Latency",
        "value": "<150ms"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Filter Engine",
      "Responsive UI",
      "REST APIs"
    ]
  },
  {
    "name": "People For Animals (PFA)",
    "url": "https://peopleforanimalsindia.org/",
    "image": "/projects/people-for-animals.png",
    "tag": "National Animal Welfare NGO",
    "category": "lifestyle",
    "summary": "India's largest animal welfare organization platform with shelter location networks, wildlife rescue helplines, donation campaigns, and volunteering registries.",
    "points": [
      "Engineered seamless donation workflows with 80G tax exemption receipt generation and instant payment gateway processing.",
      "Built interactive nationwide shelter and ambulance finder map connecting citizens to local animal care units.",
      "Optimized web accessibility and mobile performance for urgent rescue report dispatches."
    ],
    "metrics": [
      {
        "label": "Reach",
        "value": "Nationwide"
      },
      {
        "label": "Donation Flow",
        "value": "Razorpay / Stripe"
      }
    ],
    "tech": [
      "React",
      "JavaScript",
      "Payment Gateway",
      "Interactive Maps",
      "Accessibility"
    ]
  },
];

export const enterprisePillars = [
  {
    title: "Core Web Vitals & Sub-Second Latency",
    description:
      "Enterprise platforms live and die by millisecond latency. My systems systematically hit < 1.5s LCP, < 150ms INP, and 0.02 CLS through server rendering (SSR/ISR), memoization, edge caching, and aggressive asset optimization.",
    metrics: "1.5s Mobile LCP · 86+ Desktop PSI",
    badge: "Performance Mastery",
  },
  {
    title: "Modular Design Systems & Micro-Frontends",
    description:
      "Engineering reusable, accessible (WCAG 2.1 AA) component architectures across 20+ distributed brand properties — slashing redundant code by 40% and accelerating sprint release cycles.",
    metrics: "10+ Shared Modules · -40% Dev Time",
    badge: "Scale & Maintainability",
  },
  {
    title: "High-Concurrency Reservation & Extranets",
    description:
      "Architecting zero-latency real-time rate grids, STAAH integrations, payment gateways, and B2B credit ledger portals with TanStack Query caching and optimistic UI updates under heavy traffic.",
    metrics: "Real-Time Sync · Multi-OTA Parity",
    badge: "Systems Orchestration",
  },
];

export const freelanceServices = [
  {
    title: "Enterprise Next.js Web Ecosystems",
    description: "High-scale SSR/SSG/ISR platforms, dashboards, and booking engines built for international performance.",
  },
  {
    title: "Core Web Vitals & Performance Audits",
    description: "Deep-dive diagnostic audits and architectural fixes — transforming slow websites into sub-2s speed champions.",
  },
  {
    title: "Reusable Design Systems & UI",
    description: "Translating intricate Figma specs into robust, accessible, pixel-perfect component libraries.",
  },
  {
    title: "API Orchestration & Payment Integrations",
    description: "Connecting STAAH engines, custom REST/GraphQL APIs, secure payment gateways, and JWT auth workflows.",
  },
];

export const process = [
  { step: "Discovery & Architecture", detail: "Deep dive into your technical stack, business KPIs, and scalability goals." },
  { step: "Design System & Scaffolding", detail: "Component architecture, responsive tokens, and state layer design." },
  { step: "Iterative Build & Optimization", detail: "Agile delivery with continuous Core Web Vitals profiling and reviews." },
  { step: "Production Launch & Handoff", detail: "Zero-downtime deployment, automated CI/CD integration, and documentation." },
];
