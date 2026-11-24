/**
 * Shared site constants
 * - Skills shown in the Skills section (each description says where the skill was used)
 * - Theme toggle disclaimers
 */




// ---------------------------------
// Types
// ---------------------------------

export enum SkillNames {
  JS = "js",
  PYTHON = "python",
  C = "c",
  CPP = "cpp",
  JAVA = "java",
  VERILOG = "verilog",
  NODEJS = "nodejs",
  EXPRESS = "express",
  FASTAPI = "fastapi",
  LLM = "llm",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  SUPABASE = "supabase",
  FIRESTORE = "firestore",
  SOLIDWORKS = "solidworks",
  RASPBERRYPI = "raspberrypi",
  ARDUINO = "arduino",
  TIVAC = "tivac",
  FUSION360 = "fusion360",
  FPGA = "fpga",
  OSCILLOSCOPE = "oscilloscope",
  SOLDERING = "soldering",
  PRINTING3D = "printing3d",
  GIT = "git",
  GITHUB = "github",
  GITLAB = "gitlab",
  LINUX = "linux",
  BASH = "bash",
  AWS = "aws",
  BITBUCKET = "bitbucket",
  CYPRESS = "cypress",
  POSTMAN = "postman",
  JIRA = "jira",
  CONFLUENCE = "confluence"
}


export type Skill = {
  name: string;
  label: string;
  shortDescription: string;
  color: string;  // Brand hex (chip highlight + fallback icon background)
  icon: string;  // Empty string shows a lettered fallback
};




// ---------------------------------
// Skills
// ---------------------------------

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const SKILLS: Record<SkillNames, Skill> = {
  // Languages
  [SkillNames.JS]: {
    name: "js",
    label: "JavaScript",
    shortDescription: "My main language for backend work at Auto Ninjas and on hackathon projects.",
    color: "#f0db4f",
    icon: `${DEVICON}/javascript/javascript-original.svg`
  },
  [SkillNames.PYTHON]: {
    name: "python",
    label: "Python",
    shortDescription: "FastAPI services at DNV, data analysis for PlasTech research, and machine learning coursework.",
    color: "#3776ab",
    icon: `${DEVICON}/python/python-original.svg`
  },
  [SkillNames.C]: {
    name: "c",
    label: "C",
    shortDescription: "Embedded programming on microcontrollers, including the TM4C123 in Microcontroller Lab.",
    color: "#a8b9cc",
    icon: `${DEVICON}/c/c-original.svg`
  },
  [SkillNames.CPP]: {
    name: "cpp",
    label: "C++",
    shortDescription: "Used in embedded and systems-level coursework.",
    color: "#00599c",
    icon: `${DEVICON}/cplusplus/cplusplus-original.svg`
  },
  [SkillNames.JAVA]: {
    name: "java",
    label: "Java",
    shortDescription: "Wrote the backend and admin CLI for The Buzz, including hand-written OAuth token verification.",
    color: "#007396",
    icon: `${DEVICON}/java/java-original.svg`
  },
  [SkillNames.VERILOG]: {
    name: "verilog",
    label: "Verilog",
    shortDescription: "Hardware description and FPGA design in FPGA Laboratory.",
    color: "#7f52ff",
    icon: ""
  },

  // Backend & AI
  [SkillNames.NODEJS]: {
    name: "nodejs",
    label: "Node.js",
    shortDescription: "Built production backends at Auto Ninjas (Express) and DNV (Koa).",
    color: "#6cc24a",
    icon: `${DEVICON}/nodejs/nodejs-original.svg`
  },
  [SkillNames.EXPRESS]: {
    name: "express",
    label: "Express",
    shortDescription: "Routing and API endpoints for the Auto Ninjas AI backend and NourishLU.",
    color: "#fff",
    icon: `${DEVICON}/express/express-original.svg`
  },
  [SkillNames.FASTAPI]: {
    name: "fastapi",
    label: "FastAPI",
    shortDescription: "Added correlation ID tracing and failure notifications to a FastAPI AI engine at DNV.",
    color: "#009688",
    icon: `${DEVICON}/fastapi/fastapi-original.svg`
  },
  [SkillNames.LLM]: {
    name: "llm",
    label: "LLM APIs & RAG",
    shortDescription: "Integrated OpenAI at Auto Ninjas and LLaMA 3.1 at NourishLU, and monitored a production RAG pipeline at DNV.",
    color: "#a78bfa",
    icon: ""
  },
  [SkillNames.POSTGRES]: {
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "Designed schemas and ran relational databases for The Buzz and NourishLU.",
    color: "#336791",
    icon: `${DEVICON}/postgresql/postgresql-original.svg`
  },
  [SkillNames.MONGODB]: {
    name: "mongodb",
    label: "MongoDB Atlas",
    shortDescription: "Data layer for the MLOps services I worked on at DNV.",
    color: "#47a248",
    icon: `${DEVICON}/mongodb/mongodb-original.svg`
  },
  [SkillNames.SUPABASE]: {
    name: "supabase",
    label: "Supabase",
    shortDescription: "Backend database for The Buzz in Software Engineering.",
    color: "#3ecf8e",
    icon: `${DEVICON}/supabase/supabase-original.svg`
  },
  [SkillNames.FIRESTORE]: {
    name: "firestore",
    label: "Firestore",
    shortDescription: "Cached lease summaries for the Auto Ninjas AI backend.",
    color: "#ffca28",
    icon: `${DEVICON}/firebase/firebase-plain.svg`
  },

  // Embedded & hardware
  [SkillNames.SOLIDWORKS]: {
    name: "solidworks",
    label: "SolidWorks",
    shortDescription: "Designed the LUSI science module (CSWA certified).",
    color: "#e2001a",
    icon: ""
  },
  [SkillNames.RASPBERRYPI]: {
    name: "raspberrypi",
    label: "Raspberry Pi",
    shortDescription: "Set up the LUSI science module's dedicated Pi with an Ethernet connection for testing.",
    color: "#c51a4a",
    icon: `${DEVICON}/raspberrypi/raspberrypi-original.svg`
  },
  [SkillNames.ARDUINO]: {
    name: "arduino",
    label: "Arduino",
    shortDescription: "Microcontroller programming and electronics prototyping.",
    color: "#00979d",
    icon: `${DEVICON}/arduino/arduino-original.svg`
  },
  [SkillNames.TIVAC]: {
    name: "tivac",
    label: "Tiva C",
    shortDescription: "TM4C123 LaunchPad running the Simon game in Microcontroller Lab.",
    color: "#cc0000",
    icon: ""
  },
  [SkillNames.FUSION360]: {
    name: "fusion360",
    label: "Fusion 360",
    shortDescription: "Part modeling in lab and makerspace work.",
    color: "#f26522",
    icon: ""
  },
  [SkillNames.FPGA]: {
    name: "fpga",
    label: "FPGA",
    shortDescription: "Programmed with Verilog and Vivado in FPGA Laboratory.",
    color: "#7c3aed",
    icon: ""
  },
  [SkillNames.OSCILLOSCOPE]: {
    name: "oscilloscope",
    label: "Oscilloscope",
    shortDescription: "Debugging PWM and peripheral signals in Microcontroller and FPGA lab work.",
    color: "#22c55e",
    icon: ""
  },
  [SkillNames.SOLDERING]: {
    name: "soldering",
    label: "Soldering",
    shortDescription: "Hands-on electronics work on LUSI hardware and in lab coursework.",
    color: "#94a3b8",
    icon: ""
  },
  [SkillNames.PRINTING3D]: {
    name: "printing3d",
    label: "3D Printing",
    shortDescription: "Fabricating science module parts for LUSI.",
    color: "#f97316",
    icon: ""
  },

  // Infrastructure
  [SkillNames.GIT]: {
    name: "git",
    label: "Git",
    shortDescription: "Version control across every project and internship.",
    color: "#f1502f",
    icon: `${DEVICON}/git/git-original.svg`
  },
  [SkillNames.GITHUB]: {
    name: "github",
    label: "GitHub",
    shortDescription: "Code hosting and collaboration for LUSI and personal projects.",
    color: "#94a3b8",
    icon: `${DEVICON}/github/github-original.svg`
  },
  [SkillNames.GITLAB]: {
    name: "gitlab",
    label: "GitLab CI/CD",
    shortDescription: "Merge requests and CI/CD pipelines across 8 repos at DNV.",
    color: "#fc6d26",
    icon: `${DEVICON}/gitlab/gitlab-original.svg`
  },
  [SkillNames.LINUX]: {
    name: "linux",
    label: "Linux",
    shortDescription: "Development environments, servers, and systems coursework.",
    color: "#fff",
    icon: `${DEVICON}/linux/linux-original.svg`
  },
  [SkillNames.BASH]: {
    name: "bash",
    label: "Bash",
    shortDescription: "Deployment and environment setup scripts, including NourishLU on EC2.",
    color: "#4eaa25",
    icon: `${DEVICON}/bash/bash-original.svg`
  },
  [SkillNames.AWS]: {
    name: "aws",
    label: "AWS",
    shortDescription: "Deployed NourishLU on EC2 with RDS PostgreSQL, Nginx, and SSL.",
    color: "#ff9900",
    icon: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`
  },
  [SkillNames.BITBUCKET]: {
    name: "bitbucket",
    label: "Bitbucket",
    shortDescription: "Branch management and code review at Auto Ninjas and on The Buzz.",
    color: "#0052cc",
    icon: `${DEVICON}/bitbucket/bitbucket-original.svg`
  },

  // Testing & tools
  [SkillNames.CYPRESS]: {
    name: "cypress",
    label: "Cypress",
    shortDescription: "Rebuilt and expanded the end-to-end test suite at Auto Ninjas.",
    color: "#69d3a7",
    icon: `${DEVICON}/cypressio/cypressio-original.svg`
  },
  [SkillNames.POSTMAN]: {
    name: "postman",
    label: "Postman",
    shortDescription: "REST API testing and validation at Auto Ninjas.",
    color: "#ef5b25",
    icon: `${DEVICON}/postman/postman-original.svg`
  },
  [SkillNames.JIRA]: {
    name: "jira",
    label: "Jira",
    shortDescription: "Bug tracking at Auto Ninjas and project tracking for LUSI.",
    color: "#0052cc",
    icon: `${DEVICON}/jira/jira-original.svg`
  },
  [SkillNames.CONFLUENCE]: {
    name: "confluence",
    label: "Confluence",
    shortDescription: "Reorganized LUSI's documentation twice, first for the science module and then club-wide.",
    color: "#0052cc",
    icon: `${DEVICON}/confluence/confluence-original.svg`
  }
};




// ---------------------------------
// Theme disclaimers
// ---------------------------------

// Toast text shown when the theme toggle is clicked (one picked at random)
export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?"
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thank you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication."
  ]
};