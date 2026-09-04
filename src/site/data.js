export const nav = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    title: "Web3 Job Hunter",
    tag: "Personal tool",
    year: "2025",
    desc: "A job board that pulls Web3 and frontend roles from multiple sources into one ranked feed, with an AI assistant for digging into specific listings.",
    stack: ["Anthropic API", "Web Search", "Job Aggregation"],
    thumb: "job-hunter",
    linkLabel: "Read more",
    detail: {
      summary:
        "Built to solve my own problem: Web3 and frontend job listings are scattered across too many sources to check daily.",
      body: [
        "Web3 Job Hunter aggregates roles from RemoteOK, Web3.career, CryptoJobsList, and Remotive into a single ranked feed, so I don't have to check four sites separately every day.",
        "Each listing is tagged by source, role type, and relevance, with save/apply tracking so nothing gets lost in the shuffle.",
        "The built-in AI assistant, powered by the Anthropic API, can answer questions about the current feed on demand — for example, surfacing design-focused roles from a specific source, or pulling out listings that match a specific stack.",
      ],
      stack: ["Anthropic API", "Web Search Integration", "RemoteOK", "Web3.career", "CryptoJobsList", "Remotive"],
    },
  },
  {
    title: "Crypto Market Intelligence Platform",
    tag: "Product design",
    year: "2025",
    desc: "A UI concept exploring how research, alerts, and portfolio data can live inside a single dashboard rather than scattered across five tabs of tools.",
    stack: ["Figma", "UI/UX Design", "Design Systems"],
    href: "https://dribbble.com/shots/27680785-Crypto-Market-Intelligence-Platform",
    linkLabel: "View on Dribbble",
    thumb: "crypto-platform",
    detail: {
      summary:
        "A UI exploration for a crypto research dashboard, which later became the visual foundation for QuestXS.",
      body: [
        "The design leans into a dark green, black, and gold palette, using grain overlays for texture instead of the default glassmorphism look.",
        "Card grouping and hierarchy were worked out here first — market data, sentiment, and screener tools laid out for fast scanning rather than a cluttered dashboard.",
        "This exploration became the direct visual reference for QuestXS, the crypto research platform I later built and shipped.",
      ],
      stack: ["Figma", "UI/UX Design", "Design Systems"],
    },
  },
  {
    title: "Travel Agency Design",
    tag: "Product design",
    year: "2025",
    desc: "A booking-focused landing page concept for a travel agency, balancing warm, image-led storytelling with a clear path to booking.",
    stack: ["Figma", "UI/UX Design", "Web Design"],
    href: "https://dribbble.com/shots/27680951-Travel-Agency-Design",
    linkLabel: "View on Dribbble",
    thumb: "travel-agency",
    detail: {
      summary:
        "A booking-focused concept for a travel agency landing page, leaning on big destination photography and a simple path to booking.",
      body: [
        "The layout puts large, warm destination imagery front and center, with trust signals — rating, traveler count — placed close to the booking action instead of buried further down the page.",
        "Typography and spacing were kept simple and confident, letting the photography carry most of the visual weight rather than competing with it.",
      ],
      stack: ["Figma", "UI/UX Design", "Web Design"],
    },
  },
];

export const skills = [
  {
    title: "Frontend Development",
    copy: "React, TypeScript, Next.js, Tailwind CSS, and clean, maintainable component architecture.",
  },
  {
    title: "UI/UX Design",
    copy: "Figma-based interface design, design systems, and translating product ideas into usable, coherent screens.",
  },
  {
    title: "Web3 Integration",
    copy: "Wallet connects (RainbowKit, MetaMask SDK, WalletConnect), on-chain data displays, and crypto product UX.",
  },
  {
    title: "Product Building",
    copy: "Taking a product from idea to shipped: Supabase-backed features, auth, email infrastructure, and deployment.",
  },
];

export const experience = [
  {
    period: "Now",
    title: "Freelance Frontend Developer & UI/UX Designer",
    copy: "Building web products for clients — including dashboard UIs and portfolio sites — while running my own client acquisition and marketing.",
  },
  {
    period: "Ongoing",
    title: "Founder & Builder, QuestXS",
    copy: "Designing and building a crypto research platform from the ground up, from product direction to shipped features.",
  },
  {
    period: "5+ years",
    title: "Web3 & Crypto Community",
    copy: "Long-standing involvement in the Web3 space — building products, exploring NFT projects, and staying close to how the ecosystem moves.",
  },
];

export const contact = {
  email: "west15455@gmail.com",
  github: "https://github.com/Dave56hf",
  githubLabel: "github.com/Dave56hf",
  x: "https://x.com/_Creative_Dave",
  xLabel: "@_Creative_Dave",
  linkedin: "https://www.linkedin.com/in/david-west-3215302b8",
  linkedinLabel: "LinkedIn",
};
