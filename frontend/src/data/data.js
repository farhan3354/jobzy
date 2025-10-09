export const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  // { name: "Carrier", path: "/carrier" },
  { name: "Contact Us", path: "/contact" },
  { name: "Blogs", path: "/blog" },
];

export const stats = [
  { label: "  Jobs posted monthly", value: " 25,000+" },
  { label: " Successful hires", value: "50,000+" },
  { label: "Companies registered", value: "8,000+" },
  { label: "Average time to hire", value: "14 days" },
];

export const menuItems = [
  {
    title: "Home",
    icon: "IoHome",
    to: "/user-dashboard",
  },
  {
    title: "Applied jobs",
    icon: "MdSend",
    to: "/user-dashboard/applied",
  },

  {
    title: "All Jobs",
    icon: "MdOutlineWorkOutline",
    to: "/user-dashboard/jobs",
  },
  {
    title: "See Interview",
    to: "/user-dashboard/interview",
    icon: "MdWork",
  },
  {
    title: "Profile",
    icon: "IoIosContact",
    to: "/user-dashboard/profile",
  },
];

export const employersidebarmenu = [
  { title: "Dashboard", to: "/employer-dashboard", icon: "RxDashboard" },

  {
    title: "Post a Job",
    to: "/employer-dashboard/posta-job",
    icon: "MdWorkOutline",
  },
  {
    title: "All Jobs",
    to: "/employer-dashboard/all-job",
    icon: "BsCardChecklist",
  },
  {
    title: "Applicants",
    to: "/employer-dashboard/alljobs-applicant",
    icon: "FaUsers",
  },
  {
    title: "See Interview",
    to: "/employer-dashboard/view-interviews",
    icon: "MdWork",
  },
  { title: "Profile", to: "/employer-dashboard/profile", icon: "CgProfile" },
];

export const adminsidebarmenu = [
  { title: "Dashboard", icon: "RxDashboard", to: "/admin-dashboard" },
  { title: "Users", icon: "FaUsers", to: "/admin-dashboard/manage-users" },
  {
    title: "Employers",
    icon: "FaUsers",
    to: "/admin-dashboard/manage-employers",
  },
  { title: "Jobs", icon: "MdWorkOutline", to: "/admin-dashboard/manage-jobs" },
  { title: "Profile", icon: "CgProfile", to: "/admin-dashboard/profile" },
  { title: "Add Blog", icon: "FaPlus", to: "/admin-dashboard/add-blog" },
  { title: "Blogs", icon: "FaPlus", to: "/admin-dashboard/blog" },
  { title: "Queries", icon: "FaCommentDots", to: "/admin-dashboard/queries" },
];

export const statsofhome = [
  { value: "50,000+", label: "Jobs Available" },
  { value: "8,000+", label: "Companies Hiring" },
  { value: "1M+", label: "Candidates Hired" },
  { value: "95%", label: "Satisfaction Rate" },
];

export const appliedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    appliedDate: "2023-05-15",
    status: "interview", // 'applied', 'interview', 'offer', 'rejected'
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description:
      "We are looking for an experienced frontend developer to join our team working with React and TypeScript.",
    interviewDate: "2023-06-10",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSystems LLC",
    location: "New York, NY",
    appliedDate: "2023-05-20",
    status: "applied",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    description:
      "Join our backend team to build scalable APIs and microservices using Node.js and Python.",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "CreativeMinds",
    location: "Austin, TX (Hybrid)",
    appliedDate: "2023-05-10",
    status: "offer",
    type: "Contract",
    salary: "$90 - $120/hr",
    description:
      "Looking for a talented UX designer to revamp our customer-facing applications.",
  },
  {
    id: 4,
    title: "DevOps Specialist",
    company: "CloudSolutions",
    location: "Remote",
    appliedDate: "2023-05-05",
    status: "rejected",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    description:
      "Seeking a DevOps engineer to manage our AWS infrastructure and CI/CD pipelines.",
  },
];

export const alljobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    description:
      "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces and implementing features for our web applications.",
    requirements: [
      "5+ years of experience with React.js",
      "Strong knowledge of JavaScript, HTML5, and CSS3",
      "Experience with Redux or similar state management libraries",
      "Familiarity with RESTful APIs",
      "Bachelor's degree in Computer Science or related field",
    ],
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable components and front-end libraries",
      "Optimize components for maximum performance",
      "Collaborate with UX/UI designers",
      "Participate in code reviews",
    ],
    skills: ["React", "JavaScript", "Redux", "HTML/CSS"],
    remote: true,
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Remote",
    type: "Contract",
    salary: "$80 - $100 per hour",
    posted: "1 week ago",
    description:
      "Join our design team to create beautiful and functional user experiences for our clients.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Portfolio demonstrating design skills",
      "Proficiency in Figma or Sketch",
      "Understanding of user-centered design",
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Conduct user research",
      "Collaborate with developers",
      "Maintain design systems",
    ],
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    remote: true,
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DataSystems LLC",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    posted: "3 days ago",
    description:
      "We need a skilled Backend Engineer to develop and maintain our server infrastructure.",
    requirements: [
      "Experience with Node.js and Python",
      "Knowledge of database systems",
      "Understanding of RESTful API design",
      "Familiarity with cloud services",
    ],
    responsibilities: [
      "Develop server-side logic",
      "Optimize database queries",
      "Implement security measures",
      "Monitor system performance",
    ],
    skills: ["Node.js", "Python", "SQL", "AWS"],
    remote: false,
  },
];

export const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Temporary",
  "Volunteer",
];

export const experienceLevels = [
  "Internship",
  "Entry level",
  "Associate",
  "Mid-Senior level",
  "Director",
  "Executive",
];

export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Sales",
  "Design",
  "Engineering",
  "Operations",
  "Other",
];

export const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    type: "Full-time",
    location: "San Francisco, CA (Remote)",
    experience: "3+ years experience",
    salary: "$90,000 - $120,000/year",
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Creative Solutions",
    type: "Contract",
    location: "New York, NY",
    experience: "5+ years experience",
    salary: "$45 - $55/hour",
    postedDate: "1 week ago",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Analytics Pro",
    type: "Full-time",
    location: "Boston, MA (Hybrid)",
    experience: "2+ years experience",
    salary: "$110,000 - $140,000/year",
    postedDate: "3 days ago",
  },
];
