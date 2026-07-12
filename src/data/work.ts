export type WorkMedia =
  | { type: "photo"; src: string; alt?: string; caption?: string }
  | { type: "photo-grid"; srcs: string[]; columns: number }
  | { type: "youtube"; videoId: string; caption?: string; timestamp?: number }
  | { type: "google-slides"; slideId: string; caption?: string; sidePhoto?: string }
  | { type: "link"; label: string; url: string }
  | { type: "photo-placeholder"; folder: string; label?: string };

export type WorkItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  oneliner: string;
  story: string[];
  media: WorkMedia[];
  // Override the default asset folder (assets/work/<id>).
  // Only needed when the folder name differs from the work item id.
  assetsFolder?: string;
};

const work: WorkItem[] = [
  {
    id: "auto-ninjas-sdet",
    title: "SDET Intern",
    subtitle: "Auto Ninjas",
    date: "Jan 2025 – May 2025",
    category: "Internship",
    oneliner:
      "I taught myself the tools before I walked in the door, and earned a paid offer by the time I left.",
    story: [
      "This internship came through the LehighWest program: 10 hours a week, fully remote, unpaid, while carrying a full course load. Two weeks before starting I found a Cypress tutorial on YouTube and taught myself the framework during winter break so I could contribute immediately.",
      "I worked directly with the CTO, communicated consistently at the start and end of every shift, and expanded an underdeveloped test suite throughout the semester. By the end of spring the CTO offered me a paid full-time position for that same summer. That offer was the result of the work and clear communication. Nothing else.",
    ],
    media: [
      { type: "google-slides", slideId: "1sw7uIZcv4lRHXKLAADc9GEtHPrrb2kpG" },
    ],
    assetsFolder: "assets/work/auto-ninjas",
  },
  {
    id: "auto-ninjas-sde",
    title: "SDE Intern",
    subtitle: "Auto Ninjas",
    date: "May 2025 – Aug 2025",
    category: "Internship",
    oneliner:
      "I came in knowing the codebase and left having built a production AI backend from scratch.",
    story: [
      "This role came directly out of my past SDET internship, the full-time offer I had earned in the spring. By the time summer started I had already spent a semester in the codebase, so I hit the ground running. I expanded the test suite to cover full end-to-end user workflows: logging in as a customer, admin, and salesperson and running through the entire car leasing flow. I also did manual QA, intentionally trying to break things: character limits, malicious inputs, submitting Shakespeare's Hamlet into a single text field.",
      "Beyond the QA work, I built the entire backend for an AI feature: a chatbot and lease summary tool, with a collaborating intern handling the frontend. I taught myself Node.js and Express through a YouTube tutorial and figured out the rest as I went. I integrated it into the production codebase, implemented caching for lease summaries, and organized the codebase with a thorough folder and utility structure.",
      "I also worked in a hybrid environment, going into the office and interfacing directly with the CEO, COO, CTO, and the rest of the team. The flexibility worked because of what I was producing. The output made it easy to navigate.",
    ],
    media: [
      { type: "google-slides", slideId: "1qbKqDJMgkqa3WsV2nxYDEJRpUyHu9XppsLYCts3WoV8" },
    ],
  },
  {
    id: "lusi",
    title: "Science Team Lead",
    subtitle: "Lehigh University Space Initiative",
    date: "Apr 2024 – Present",
    category: "Robotics",
    oneliner: "I learned what leadership actually means when no one has to listen to you.",
    story: [
      "This has been my first real leadership role, spanning two years, and it has taught me things that no class has. Managing a volunteer student team means you have no authority in any traditional sense. People are busy during midterms, finals, and everything else, so the project is not always the priority. Without clear direction, even motivated people lose focus, so I learned quickly that my job was to provide guidance and set explicit concrete goals so each meeting ended with something finished, not just discussed.",
      "I made mistakes early on and learned from them, about setting expectations, following up, and being direct about what needed to get done. What eventually worked was leading by example: thorough Confluence documentation, consistent design reviews, running whiteboarding sessions to work through system design as a team, and doing the work myself when it needed to get done.",
      "In my second year I spent winter break finishing the mechanical design of the science module and writing most of the software. I designed a large portion of the electronics configuration, including the Raspberry Pi, microcontroller, and Ethernet setup, though not everything alone. The module ended up half the size of the previous year's, which was itself a significant achievement in scope and focus. It still has a lot of room for improvement, but it has a strong foundation now, and I'm looking forward to seeing what the next science lead builds on top of it.",
    ],
    media: [
      { type: "youtube", videoId: "Eyu1dI5hLIE", timestamp: 222 },
    ],
  },
  {
    id: "global-social-impact",
    title: "Global Social Impact Fellow",
    subtitle: "Lehigh University Office of Creative Inquiry",
    date: "Jan 2024 – Dec 2024",
    category: "Research",
    oneliner: "A year of research gave me clarity about where I can do the most good.",
    story: [
      "I joined this Lehigh research program as a freshman by applying to three projects I was interested in contributing to. PlasTech Ventures was my top choice: sustainable plastic waste management in the Philippines. I cared about climate change, the project sounded genuinely interesting, and it was a worthwhile cause. I got accepted into the program for that project, though classes ran program-wide. Over the course of a year I took a weekly night class on business models and startup design, conducted material testing on mixed plastic samples, did data analysis in Python, and spent a summer doing full-time research at Lehigh.",
      "I personally dug through years of accumulated Google Drive files from past teams, organized everything that had been lost to turnover, and focused my own work on the business model side, figuring out whether the thing could actually work financially in the Philippines. During the spring and fall semesters we gave startup-style pitch presentations to industry judges; I later came back as a judge myself. We also spent two weeks doing fieldwork in the Philippines.",
      "We published a research paper and presented it at the IEEE GHTC 2024 conference at Villanova. I'm glad I did it. What I came away with wasn't cynicism. It was clarity about where my strengths actually are. I'm most effective when I'm building and implementing something concrete. That realization has shaped everything I've done since.",
    ],
    media: [
      {
        type: "link",
        label: "IEEE GHTC 2024: Published Paper",
        url: "https://ieeexplore.ieee.org/document/10771525",
      },
      {
        type: "link",
        label: "Tensile Tests Data Analysis on GitHub",
        url: "https://github.com/PlasTech-Ventures/Tensile-Tests-Data-Analysis",
      },
      {
        type: "link",
        label: "PlasTech Ventures: Journey So Far",
        url: "https://wordpress.lehigh.edu/plastech/journey-so-far/",
      },
    ],
  },
  {
    id: "nourishlu",
    title: "NourishLU",
    subtitle: "Lehigh Valley Hackathon 2025",
    date: "Oct 2025",
    category: "Hackathon",
    oneliner: "I stayed up all night building something I'd never built before, and it worked.",
    story: [
      "This was a two-day hackathon with a health and wellness theme. After a round of brainstorming with my team we landed on a food and diet web app. I took ownership of the backend and spent most of the night configuring AWS services I hadn't used before: EC2, RDS, PostgreSQL, Nginx, SSL. The hackathon sponsors provided free AWS credits and encouraged teams to use them, so I figured it out in real time under a deadline.",
      "I also integrated an open source LLM to generate meal recommendations from user data. The frontend was handled by teammates. By morning we had a working full-stack application.",
      "I learned more about infrastructure configuration in those two days than I had in any semester-long class.",
    ],
    media: [
      {
        type: "link",
        label: "NourishLU on Devpost",
        url: "https://devpost.com/software/nourishlu",
      },
    ],
  },
  {
    id: "the-buzz",
    title: "The Buzz",
    subtitle: "CSE 216 Software Engineering",
    date: "Aug – Dec 2025",
    category: "Course Project",
    oneliner: "Everyone else was angling for the easy roles. I volunteered for the hard ones.",
    story: [
      "This was a semester-long group project in my software engineering class where a team of four rotated through frontend, backend, admin, and PM roles each phase. Some phases are notoriously harder for certain roles, and people fought over assignments accordingly. I went the other direction.",
      "When the Google OAuth 2.0 integration phase came around and the backend role was known to be the hardest, I volunteered because I had the most relevant experience and knew I was the best person for it. I did the same for other phases. On the backend I designed the full API contract, the database ERD, and the Supabase table structure, and implemented the Google OAuth 2.0 integration. Separately, I built the admin CLI in Java with complete CRUD operations. I kept communication consistent across the team and stayed organized throughout.",
      "At the end of the semester two of my group members specifically vouched for me when asked who deserved an A. I got one.",
    ],
    media: [
      {
        type: "link",
        label: "The Buzz API Contract",
        url: "https://docs.google.com/spreadsheets/d/1MPgqW0V23wUhav8eVYHLCTgdTvvQs1MmeJqfyd5lToc/edit?usp=sharing",
      },
    ],
  },
  {
    id: "simon-game",
    title: "Simon-Style Memory Game",
    subtitle: "ECE 132 Microcontroller Laboratory",
    date: "Apr 2026",
    category: "Course Project",
    oneliner: "Vague instructions, interesting hardware, and a working demo at the end.",
    story: [
      "This was the final project for my microcontrollers class. The course itself was challenging in a specific way: the professor's instructions were often unclear, and understanding how the peripherals actually worked required hands-on testing with oscilloscopes and power supplies rather than relying on documentation.",
      "My group of three met regularly at Wilbur Powerhouse, Lehigh's makerspace stocked with the electronics tools we needed. We chose our peripherals deliberately: the joystick and 2D LED matrix were the most interesting options available, and we designed a Simon-style memory game around them. The joystick navigated a cursor on the LED matrix, the IR sensor registered guesses, and a servo motor indicated difficulty level.",
      "There wasn't really a codebase in the traditional sense. Everything lived in one large file, which I thoroughly organized and commented per the professor's requirements. Throughout the project I also learned how to navigate challenges with group members: being proactive about meeting in different locations and at different times to keep momentum and regularly make and track progress. We finished with a full live hardware demo, a group report, and an individual reflection. The most valuable part was learning how to figure things out when the instructions don't give you what you need.",
    ],
    media: [],
  },
];

export default work;
