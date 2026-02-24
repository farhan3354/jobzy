// export const navItems = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Contact Us", path: "/contact" },
//   { name: "Blogs", path: "/blog" },
// ];

export const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
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
  "No Experience Required",
  "Internship",
  "Entry level",
  "Associate",
  "Mid-Senior level",
  "Director",
  "Executive",
];

export const jobSchedules = [
  "8 hour shift",
  "10 hour shift",
  "12 hour shift",
  "Monday to Friday",
  "Weekend availability",
  "Day shift",
  "Night shift",
  "Overtime",
  "Holidays",
];

export const benefitsList = [
  "Health insurance",
  "Health savings account",
  "Dental insurance",
  "Vision insurance",
  "Life insurance",
  "AD&D insurance",
  "401(k)",
  "401(k) matching",
  "Paid time off",
  "Flexible schedule",
  "Remote work",
  "Employee discount",
  "Referral program",
  "Professional development assistance",
  "Tuition reimbursement",
];

export const hiringTimelines = [
  "1-3 days",
  "Within 2 weeks",
  "2-4 weeks",
  "Over a month",
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

export const degrees = [
  // High School & Equivalent
  "High School Diploma",
  "High School Equivalent (GED)",
  "Intermediate (FA/FSc/ICS)",
  
  // Associate Degrees
  "Associate of Arts (AA)",
  "Associate of Science (AS)",
  "Associate of Applied Science (AAS)",
  "Associate of Business Administration (ABA)",
  
  // Diploma & Certificates
  "Diploma",
  "Advanced Diploma",
  "Post Graduate Diploma",
  "Professional Certificate",
  
  // Bachelor Degrees
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BS)",
  "Bachelor of Commerce (B.Com)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Technology (B.Tech)",
  "Bachelor of Engineering (BE)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Computer Science (BCS)",
  "Bachelor of Education (B.Ed)",
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Architecture (B.Arch)",
  "Bachelor of Pharmacy (B.Pharm)",
  "Bachelor of Laws (LLB)",
  "Bachelor of Design (B.Des)",
  "Bachelor of Social Work (BSW)",
  "Bachelor of Journalism (BJ)",
  "Bachelor of Mass Communication (BMC)",
  "Bachelor of Nursing (BSN)",
  
  // Master Degrees
  "Master of Arts (MA)",
  "Master of Science (MS)",
  "Master of Commerce (M.Com)",
  "Master of Business Administration (MBA)",
  "Master of Technology (M.Tech)",
  "Master of Engineering (ME)",
  "Master of Computer Applications (MCA)",
  "Master of Computer Science (MCS)",
  "Master of Education (M.Ed)",
  "Master of Fine Arts (MFA)",
  "Master of Architecture (M.Arch)",
  "Master of Pharmacy (M.Pharm)",
  "Master of Laws (LLM)",
  "Master of Philosophy (M.Phil)",
  "Master of Public Health (MPH)",
  "Master of Social Work (MSW)",
  "Master of Journalism (MJ)",
  "Master of Mass Communication (MMC)",
  "Master of Nursing (MSN)",
  "Master of Project Management (MPM)",
  "Master of Human Resources (MHR)",
  "Master of Marketing (MM)",
  "Master of Finance (MFin)",
  
  // Doctoral Degrees
  "Doctor of Philosophy (PhD)",
  "Doctor of Medicine (MD)",
  "Doctor of Business Administration (DBA)",
  "Doctor of Education (EdD)",
  "Doctor of Pharmacy (PharmD)",
  "Doctor of Nursing Practice (DNP)",
  "Doctor of Psychology (PsyD)",
  "Doctor of Law (JD)",
  "Doctor of Public Health (DrPH)",
  
  // Medical & Healthcare
  "Bachelor of Medicine (MBBS)",
  "Doctor of Dental Surgery (DDS)",
  "Doctor of Veterinary Medicine (DVM)",
  "Bachelor of Dental Surgery (BDS)",
  "Bachelor of Physiotherapy (BPT)",
  "Master of Physiotherapy (MPT)",
  "Bachelor of Occupational Therapy (BOT)",
  "Master of Occupational Therapy (MOT)",
  "Bachelor of Medical Lab Technology (BMLT)",
  "Master of Medical Lab Technology (MMLT)",
  "Bachelor of Radiology (B.Sc Radiology)",
  "Master of Radiology (M.Sc Radiology)",
  
  // Engineering Specializations
  "Bachelor of Civil Engineering (BCE)",
  "Bachelor of Mechanical Engineering (BME)",
  "Bachelor of Electrical Engineering (BEE)",
  "Bachelor of Electronics Engineering (BECE)",
  "Bachelor of Software Engineering (BSE)",
  "Master of Civil Engineering (MCE)",
  "Master of Mechanical Engineering (MME)",
  "Master of Electrical Engineering (MEE)",
  "Master of Software Engineering (MSE)",
  
  // IT & Computer Science
  "Bachelor of Information Technology (BIT)",
  "Master of Information Technology (MIT)",
  "Bachelor of Information Systems (BIS)",
  "Master of Information Systems (MIS)",
  "Bachelor of Data Science (BDS)",
  "Master of Data Science (MDS)",
  "Bachelor of Artificial Intelligence (BAI)",
  "Master of Artificial Intelligence (MAI)",
  "Bachelor of Cyber Security (BCS)",
  "Master of Cyber Security (MCS)",
  
  // Business & Management
  "Bachelor of Economics (BEcon)",
  "Master of Economics (MEcon)",
  "Bachelor of Accounting (BAcc)",
  "Master of Accounting (MAcc)",
  "Bachelor of Finance (BFin)",
  "Master of Finance (MFin)",
  "Bachelor of Marketing (BMark)",
  "Master of Marketing (MMark)",
  "Bachelor of Human Resources (BHR)",
  "Master of Human Resources (MHR)",
  "Bachelor of International Business (BIB)",
  "Master of International Business (MIB)",
  "Bachelor of Supply Chain Management (BSCM)",
  "Master of Supply Chain Management (MSCM)",
  
  // Arts & Humanities
  "Bachelor of History (BA History)",
  "Master of History (MA History)",
  "Bachelor of English Literature (BA English)",
  "Master of English Literature (MA English)",
  "Bachelor of Philosophy (BA Philosophy)",
  "Master of Philosophy (MA Philosophy)",
  "Bachelor of Psychology (BA Psychology)",
  "Master of Psychology (MA Psychology)",
  "Bachelor of Sociology (BA Sociology)",
  "Master of Sociology (MA Sociology)",
  "Bachelor of Political Science (BA Pol Sci)",
  "Master of Political Science (MA Pol Sci)",
  "Bachelor of International Relations (BA IR)",
  "Master of International Relations (MA IR)",
  
  // Sciences
  "Bachelor of Mathematics (BSc Math)",
  "Master of Mathematics (MSc Math)",
  "Bachelor of Physics (BSc Physics)",
  "Master of Physics (MSc Physics)",
  "Bachelor of Chemistry (BSc Chemistry)",
  "Master of Chemistry (MSc Chemistry)",
  "Bachelor of Biology (BSc Biology)",
  "Master of Biology (MSc Biology)",
  "Bachelor of Biotechnology (BSc Biotech)",
  "Master of Biotechnology (MSc Biotech)",
  "Bachelor of Environmental Science (BSc Env)",
  "Master of Environmental Science (MSc Env)",
  "Bachelor of Geology (BSc Geology)",
  "Master of Geology (MSc Geology)",
  
  // Islamic Studies
  "Bachelor of Islamic Studies (BIS)",
  "Master of Islamic Studies (MIS)",
  "Bachelor of Arabic Language (BA Arabic)",
  "Master of Arabic Language (MA Arabic)",
  "Dars e Nizami (Alim Course)",
  "Tafseer Course",
  "Qirat Course",
  "Hifz Quran",
  
  // Vocational & Technical
  "Certificate in IT (CIT)",
  "Diploma in IT (DIT)",
  "Certificate in Accounting (CIA)",
  "Diploma in Accounting (DIA)",
  "Certificate in Graphic Design",
  "Diploma in Graphic Design",
  "Certificate in Web Development",
  "Diploma in Web Development",
  "Certificate in Digital Marketing",
  "Diploma in Digital Marketing",
  "Certificate in English Language",
  "Diploma in English Language",
  
  // Professional Certifications
  "Chartered Accountant (CA)",
  "Association of Chartered Certified Accountants (ACCA)",
  "Certified Management Accountant (CMA)",
  "Certified Public Accountant (CPA)",
  "Chartered Financial Analyst (CFA)",
  "Financial Risk Manager (FRM)",
  "Project Management Professional (PMP)",
  "Certified Information Systems Auditor (CISA)",
  "Certified Information Security Manager (CISM)",
  "Cisco Certified Network Associate (CCNA)",
  "Cisco Certified Network Professional (CCNP)",
  "Microsoft Certified Solutions Expert (MCSE)",
  "Oracle Certified Professional (OCP)",
  "Amazon Web Services Certified (AWS)",
  "Google Cloud Certified",
  "Certified Ethical Hacker (CEH)",
  "CompTIA A+",
  "CompTIA Network+",
  "CompTIA Security+",
  "Six Sigma Green Belt",
  "Six Sigma Black Belt",
  
  // Others
  "Other (Please Specify)"
];

export const fieldsOfStudy = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Business Administration",
  "Marketing",
  "Finance",
  "Accounting",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Aeronautical Engineering",
  "Psychology",
  "English Literature",
  "History",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "Economics",
  "Political Science",
  "Sociology",
  "Journalism",
  "Mass Communication",
  "Architecture",
  "Law",
  "Medical Sciences",
  "Nursing",
  "Education",
  "Fine Arts",
  "Graphic Design",
  "Animation",
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
