const config = {
  title: "Avery Nudell-Cook | CompE & IDEAS Honors Student @ Lehigh",
  description: {
    long: "I'm a dual Computer Engineering and IDEAS honors student at Lehigh University, currently seeking 2026 internships in robotics, embedded systems, or software. My experience spans software development, robotics systems design, academic research, and nonprofit leadership. I’ve worked on AI-integrated backend systems at a startup, led the science module team for a space robotics initiative, and contributed to policy-focused youth organizations.\n\nI’m driven by a belief that engineering and entrepreneurship can address global challenges. I’m especially interested in systems that blend hardware and software like IoT, robotics, and sustainable infrastructure, and I take pride in being an obsessive learner and builder. Whether it’s hands-on prototyping or writing clean, scalable code, I enjoy collaborating across disciplines to bring ideas to life.",
    short:
      "Prev SDE & SDET Intern @ Auto Ninjas | Junior CompE & IDEAS Honors Student @ Lehigh | Seeking 2026 Internships in Robotics, SWE/AI, Systems Engineering",
  },
  keywords: [
    "Avery Nudell-Cook",
    "portfolio",
    "computer engineering",
    "Lehigh University",
    "robotics",
    "embedded systems",
    "software engineering",
    "Python",
    "Node.js",
    "space robotics",
    "LUSI",
    "Auto Ninjas",
    "SolidWorks",
    "systems engineering",
    "SDET",
    "machine learning",
  ],
  author: "Avery Nudell-Cook",
  email: "avery.nudellcook@gmail.com",
  site: "https://averync2005.github.io",

  // for github stars button
  githubUsername: "averync2005",
  githubRepo: "",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/averynudellcook/",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/averync2005",
    twitter: undefined as string | undefined,
    instagram: undefined as string | undefined,
  },
};
export { config };
