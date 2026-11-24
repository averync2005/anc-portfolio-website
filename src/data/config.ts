/**
 * Site-wide config (page metadata, contact email, social links)
 * - Social links can be overridden with NEXT_PUBLIC_* environment variables
 */




// ---------------------------------
// Config
// ---------------------------------

const config = {
  title: "Avery Nudell-Cook | Computer Engineer in Embodied AI, Robotics & IoT",
  tagline: "Engineer · Builder · Leader",  // Hero subtitle and share-preview image
  focus: "Working toward embodied AI, deployment and automation engineering, and IoT",  // Line under the hero tagline
  description: {
    // Search result snippet (kept near 160 characters)
    long: "Avery Nudell-Cook is a Computer Engineering and IDEAS honors student at Lehigh University working toward embodied AI, robotics deployment, and IoT. Former MLOps intern at DNV and President of LUSI.",
    // Link preview text (LinkedIn, Slack, iMessage)
    short: "CompE & IDEAS Honors @ Lehigh '27 | Prev SWE Intern (MLOps & LLM Systems) @ DNV | LUSI President | Embodied AI, deployment and automation engineering, IoT"
  },
  keywords: [
    "Avery Nudell-Cook",
    "portfolio",
    "computer engineering",
    "Lehigh University",
    "embodied AI",
    "robotics",
    "deployment engineering",
    "automation engineering",
    "forward deployed engineer",
    "IoT",
    "embedded systems",
    "MLOps",
    "LLM",
    "DNV",
    "LUSI",
    "University Rover Challenge",
    "Python",
    "Node.js",
    "SolidWorks"
  ],
  author: "Avery Nudell-Cook",
  email: "avery.nudellcook@gmail.com",
  site: "https://anc-portfolio-website.vercel.app",  // Change here if a custom domain is added
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/averynudellcook/",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/averync2005",
    twitter: undefined as string | undefined,  // Hidden in the footer while unset
    instagram: undefined as string | undefined
  }
};




// ---------------------------------
// Export
// ---------------------------------

export { config };