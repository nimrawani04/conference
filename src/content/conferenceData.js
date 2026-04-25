/**
 * Centralized conference data for all years.
 * Each key is a year (number), and the value contains all content for that year.
 */

const conferenceData = {
  2024: {
    meta: {
      title: "2024 International Conference on Applied Artificial Intelligence (2AI)",
      shortTitle: "2AI-2024",
      dates: "July 2 - 4, 2024",
      venue: "Shoolini University, Solan, India",
      venueUrl: "https://shooliniuniversity.com/",
      mode: "Hybrid Event",
      organizer: "Yogananda School of AI, Computers and Data Sciences, Shoolini University",
      collaboration: "2AI Research Lab, University of South Dakota (USA)",
      collaborationUrl: "https://www.ai-research-lab.org/",
      cmt: "https://cmt3.research.microsoft.com/AAI2024",
      email: "appliedaiconf@gmail.com",
      pastEvent: true,
    },
    hero: {
      badge: "Shoolini University & 2AI Research Lab | Flagship Hybrid Conference",
      heading: "2024 International Conference on Applied Artificial Intelligence (2AI)",
      description:
        "A premier global platform for researchers and practitioners to highlight advancements in AI, machine learning, and real-time computing across various domains.",
      images: [
        "/2024/shoolini1.jpg",
        "/2024/shoolini2.jpg",
        "/2024/shoolini3.jpg",
      ],
      stats: [
        { value: "300+", label: "Attendees" },
        { value: "25", label: "Speakers" },
        { value: "15", label: "Countries" },
      ],
    },
    importantDates: [
      {
        title: "Article Submission Deadline",
        subtitle: "Submit your research papers",
        date: "25 May 2024",
        label: "Extended",
      },
      {
        title: "Notification of Acceptance",
        subtitle: "Review results announced",
        date: "05 Jun 2024",
        label: "Notification",
      },
      {
        title: "Registration Deadline (Authors)",
        subtitle: "Author registration closes",
        date: "20 Jun 2024",
        label: "Deadline",
      },
      {
        title: "Registration Deadline (Non-Authors)",
        subtitle: "Non-author registration closes",
        date: "30 Jun 2024",
        label: "Deadline",
      },
      {
        title: "Pre-Conference Workshop",
        subtitle: "Hands-on training sessions",
        date: "02 Jul 2024",
        label: "Workshop Day",
      },
      {
        title: "Main Conference",
        subtitle: "Keynotes, presentations & networking",
        date: "03-04 Jul 2024",
        label: "Conference Days",
        isMain: true,
      },
    ],
    themes: [
      { name: "AI for Education", icon: "GraduationCap" },
      { name: "AI for Healthcare", icon: "Stethoscope" },
      { name: "AI for Agriculture", icon: "Wheat" },
      { name: "AI for Business & Finance", icon: "Briefcase" },
      { name: "AI for Energy", icon: "Zap" },
      { name: "AI for Defense & Security", icon: "Shield" },
    ],
    keynoteSpeakers: [
      {
        name: "Prof. Rajesh Kumar",
        role: "Professor",
        org: "MNIT Jaipur, India",
        image: "/2024/speaker-rajesh.jpg",
        bio: "Prof. Rajesh Kumar is a distinguished Professor at Malaviya National Institute of Technology (MNIT), Jaipur, India. He is recognized for his extensive work in artificial intelligence, optimization, and computational intelligence. His research spans evolutionary algorithms, neural networks, fuzzy logic, and machine learning with applications in engineering and real-world problem solving.",
      },
      {
        name: "Prof. Niladri Chatterjee",
        role: "Professor",
        org: "IIT Delhi, India",
        image: "/2024/speaker-niladri.jpg",
        bio: "Prof. Niladri Chatterjee is a senior Professor at the Department of Mathematics, Indian Institute of Technology (IIT) Delhi. He is renowned for his research in natural language processing, computational linguistics, and machine learning. His work has contributed significantly to text analysis, machine translation, and language understanding systems.",
      },
      {
        name: "Prof. Prerna Gaur",
        role: "Professor, ICE",
        org: "NSUT (Netaji Subhas University of Technology), New Delhi, India",
        image: "/2024/speaker-prerna.jpg",
        bio: "Prof. Prerna Gaur is a Professor in the Division of Instrumentation and Control Engineering at Netaji Subhas University of Technology (NSUT), New Delhi. Her research interests include neural networks, intelligent control systems, power electronics, and renewable energy systems. She has published extensively and guided numerous PhD scholars.",
      },
      {
        name: "Prof. Maheshkumar H. Kolekar",
        role: "Associate Professor, Electrical Engineering",
        org: "IIT Patna, India",
        image: "/mahesh.jpg",
        bio: "Dr. Maheshkumar H. Kolekar, Head and Associate Professor in Electrical Engineering at IIT Patna, is a leading researcher in artificial intelligence, computer vision, and signal processing. After earning his Ph.D. from IIT Kharagpur, he advanced international research through fellowships at the University of Missouri and TU Berlin.",
      },
    ],
    invitedSpeakers: [],
    about: {
      overview: `A three-day flagship academic event hosted by Shoolini University in collaboration with 2AI Research Lab, University of South Dakota, bringing together researchers, students, and industry professionals working across applied artificial intelligence.`,
      conference: `The 2024 International Conference on Applied Artificial Intelligence (2AI), organized by Yogananda School of AI, Computers and Data Sciences at Shoolini University of Biotechnology and Management Sciences, Solan, India, in collaboration with 2AI Research Lab (now USD AI Research), University of South Dakota (USA), was a three-day event from July 2 to 4, 2024. The conference facilitated global collaboration and exchange of ideas among researchers, students, and industry professionals in the fields of computer science, data science, and artificial intelligence.
The conference covered various themes including the application of AI in education, healthcare, agriculture, business and finance, energy, and defense and information security. It featured plenary talks, workshops, and technical sessions on the latest advancements in data science, machine learning, and real-time computing.`,
      sections: [
        {
          title: "About Solan, Himachal Pradesh",
          text: `Solan is a picturesque city in Himachal Pradesh, India, often referred to as the "Mushroom City of India" and the "City of Red Gold." Nestled in the lower Himalayan ranges at an altitude of about 1,500 meters, Solan offers pleasant weather, lush green valleys, and scenic mountain views. The city is well-connected by road and rail, making it easily accessible from major cities like Chandigarh and Delhi. Known for its serene environment, Solan provides an ideal setting for academic conferences and scholarly gatherings.`,
          image: "/2024/solan.jpg",
        },
        {
          title: "About Shoolini University",
          text: `Shoolini University of Biotechnology and Management Sciences is a leading research university located in Solan, Himachal Pradesh, India. Established in 2009, the university has rapidly risen in national and international rankings, known for its emphasis on research, innovation, and industry partnerships. With world-class infrastructure and a focus on cutting-edge research, Shoolini University offers a wide range of programs across biotechnology, science, management, engineering, and pharmacy. The university's Yogananda School of AI, Computers and Data Sciences drives innovation in artificial intelligence and data science research.`,
          image: "/2024/shoolini-campus.jpg",
        },
        {
          title: "About 2AI Research Lab (USD AI Research)",
          text: `Based at the University of South Dakota (USD), the 2AI Research Lab (now USD AI Research) pushes the boundaries of foundational AI and machine learning while embracing sustainable AI solutions. The research covers green computing, active learning, and scalable, robust AI, delivering efficiency with minimal carbon footprint. The lab specializes in pattern recognition, computer vision, image processing, data mining, and big data analytics, with interdisciplinary applications in healthcare informatics, medical imaging, document analysis, biometrics, forensics, speech processing, and the Internet of Things.`,
          image: "/aiconference.jpeg",
        },
      ],
    },
    registration: {
      conferenceDates: "July 2-4, 2024",
      mode: "Hybrid Event",
      deadline: "June 20, 2024",
      includes: "Kit + Meals",
      lateFeeDate: null,
      fees: [
        {
          category: "Authors",
          rows: [
            { subCategory: "Indian (Full)", inr: 7000, usd: 250 },
            { subCategory: "Indian (Student)", inr: 6000, usd: 200 },
            { subCategory: "Foreign (Full)", inr: null, usd: 250 },
            { subCategory: "Foreign (Student)", inr: null, usd: 200 },
          ],
        },
        {
          category: "Non-Authors (Listeners)",
          rows: [
            { subCategory: "Indian", inr: 2000, usd: null },
            { subCategory: "Foreign", inr: null, usd: 200 },
          ],
        },
      ],
      workshopFee: null,
      bankDetails: {
        bank: "Punjab National Bank",
        account: "Shoolini University",
        accountNo: "0433000100728136",
        ifsc: "PUNB0043300",
      },
    },
    contact: {
      email: "appliedaiconf@gmail.com",
      alternateEmail: "gaurav@shooliniuniversity.com",
      location: "Shoolini University, Solan, Himachal Pradesh, India",
      contactPerson: "Dr. Gaurav Gupta, Associate Professor",
      phone: "+91 9817452559",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3425.3901055437556!2d77.1027259!3d30.8540793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f83f3d8c4f65d%3A0x74d1086b11fd1f87!2sShoolini%20University%20of%20Biotechnology%20and%20Management%20Sciences!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      mapLink: "https://maps.app.goo.gl/ShooliniUniversity",
    },
    schedule: {
      available: true,
      days: [
        {
          date: "July 2, 2024 (Day 1)",
          label: "Workshop & Inaugural",
          events: [
            { time: "09:00 - 10:00", title: "Registration" },
            { time: "10:00 - 11:30", title: "Inaugural Session" },
            { time: "11:30 - 13:00", title: "Workshop: Data Science (Mr. Chitresh Sharma)" },
            { time: "14:00 - 15:30", title: "Workshop: Kubernetes (Mr. Pradeep Chintale)" },
            { time: "15:30 - 17:00", title: "Technical Session 1" },
          ],
        },
        {
          date: "July 3, 2024 (Day 2)",
          label: "Keynotes & Sessions",
          events: [
            { time: "09:30 - 10:30", title: "Keynote: Prof. Rajesh Kumar (MNIT Jaipur)" },
            { time: "10:30 - 11:30", title: "Keynote: Prof. Niladri Chatterjee (IIT Delhi)" },
            { time: "11:30 - 13:00", title: "Technical Session 2" },
            { time: "14:00 - 15:30", title: "Workshop: Cloud DevOps (Mr. Rahul S. Sengar)" },
            { time: "15:30 - 17:00", title: "Poster Session" },
            { time: "17:00 onwards", title: "Social Visit: Solan & Local Monastery" },
          ],
        },
        {
          date: "July 4, 2024 (Day 3)",
          label: "Keynotes & Valedictory",
          events: [
            { time: "09:30 - 10:30", title: "Keynote: Prof. Prerna Gaur (NSUT)" },
            { time: "10:30 - 11:30", title: "Keynote: Prof. Maheshkumar H. Kolekar (IIT Patna)" },
            { time: "11:30 - 13:00", title: "Technical Session 3" },
            { time: "14:00 - 15:30", title: "Workshop: Cloud DevOps contd. (Mr. Rahul S. Sengar)" },
            { time: "15:30 - 17:00", title: "Valedictory & Award Ceremony" },
          ],
        },
      ],
    },
    workshops: {
      available: true,
      date: "July 2-4, 2024",
      items: [
        {
          day: "Day 1",
          date: "02/07/2024",
          time: "02:30 PM – 03:30 PM",
          title: "Expert Talk 1: Data Science",
          speaker: "Mr. Chitresh Sharma (Head of Europe Data Insights)",
          coordinator: "Dr. Bharti Thakur",
          moderator: "Ms Maya Thapa",
        },
        {
          day: "Day 1",
          date: "02/07/2024",
          time: "04:00 PM – 05:00 PM",
          title: "Expert Talk 2: Kubernatics",
          speaker: "Mr. Pradeep Chintale (Sr. Cloud Solution Architect)",
          coordinator: "Dr. Bharti Thakur",
          moderator: "Ms Ishani Sharma",
        },
        {
          day: "Day 2",
          date: "03/07/2024",
          time: "11:20 AM – 01:30 PM",
          title: "Workshop Session 1: Cloud DevOps",
          speaker: "Mr. Rahul S. Sengar (Lead Software Engineer)",
          coordinator: "Dr. Rather Gousia",
          moderator: "Mr. Anitya Gupta",
        },
        {
          day: "Day 2",
          date: "03/07/2024",
          time: "02:20 PM – 04:30 PM",
          title: "Workshop Session 2: Cloud DevOps",
          speaker: "Mr. Rahul S. Sengar (Lead Software Engineer)",
          coordinator: "Dr. Rather Gousia",
          moderator: "Mr. Anitya Gupta",
        },
        {
          day: "Day 3",
          date: "04/07/2024",
          time: "11:20 AM – 01:30 PM",
          title: "Workshop Session 3: Cloud DevOps",
          speaker: "Mr. Rahul S. Sengar (Lead Software Engineer)",
          coordinator: "Dr. Rather Gousia",
          moderator: "Mr. Anitya Gupta",
        },
      ],
    },
    notifications: [
      {
        icon: "BookOpen",
        text: "Selected papers published in Springer CCIS proceedings (Scopus indexed).",
        tone: "text-[#7B4FFF]",
      },
      {
        icon: "MapPin",
        text: "Conference held at Shoolini University, Solan, Himachal Pradesh, India.",
        tone: "text-[#1A5C38]",
      },
    ],
    committee: {
      steeringCommittee: [
        { name: "KC Santosh", affiliation: "University of South Dakota", country: "USA" },
        { name: "Ravindra Hegadi", affiliation: "Central University of Karnataka", country: "India" },
        { name: "Manju Khari", affiliation: "Jawaharlal Nehru University", country: "India" },
        { name: "Gaurav Gupta", affiliation: "Shoolini University of Biotechnology and Management Sciences", country: "India" },
        { name: "Anshuman Shastri", affiliation: "Vanasthali Vidhyapith", country: "India" },
      ],
      organizingCommittee: {
        "Chief Patron": [{ name: "Prem Kumar Khosla" }],
        "Patron(s)": [
          { name: "Atul Khosla" },
          { name: "Vishal Anand" },
          { name: "Ashish Khosla" },
        ],
        "Honorary Chairs": [
          { name: "KC Santosh" },
          { name: "Virender Rihani" },
        ],
        "General Chairs": [
          { name: "Gaurav Gupta" },
          { name: "Pankaj Vaidya" },
          { name: "Ashutosh K Singh" },
          { name: "Ravindra Hegadi" },
        ],
        "Program Chairs": [
          { name: "Manju Khari" },
          { name: "M. Tanveer" },
          { name: "Mufti Mahmud" },
          { name: "Surbhi Bhatia" },
          { name: "Rodrigue Rizk" },
          { name: "Deepak Kumar" },
          { name: "Harish Garg" },
        ],
        "Theme Chairs": [
          { name: "Vinaytosh Mishra" },
          { name: "Pethuru Raj Chelliah" },
          { name: "Nibaran Das" },
          { name: "Shakir Khan" },
          { name: "K. K. Patel" },
          { name: "Rajeev Singh" },
          { name: "S.S. Chandel" },
          { name: "Yashwant Singh" },
          { name: "Sonia" },
          { name: "Ashish Ghosh" },
          { name: "Janmenjoy Nayak" },
          { name: "Anshuman Shastri" },
        ],
      },
    },
    sponsorship: {
      tiers: [
        {
          name: "Platinum Sponsor",
          amount: "₹2,00,000",
          slots: 1,
          benefits: {
            "Logo on conference website": true,
            "Logo on print collateral": true,
            "Logo on certificates": true,
            "Social media outreach": true,
            "Opportunity to deliver talk": true,
            "Opportunity to chair technical session": true,
            "Opportunity to deliver tutorial/workshop": true,
            "Networking opportunity": true,
            "Exhibit area during conference": true,
            "Conference passes": 10,
          },
        },
        {
          name: "Gold Sponsor",
          amount: "₹1,00,000",
          slots: 3,
          benefits: {
            "Logo on conference website": true,
            "Logo on print collateral": true,
            "Logo on certificates": true,
            "Social media outreach": true,
            "Opportunity to deliver talk": true,
            "Opportunity to chair technical session": true,
            "Opportunity to deliver tutorial/workshop": false,
            "Networking opportunity": true,
            "Exhibit area during conference": true,
            "Conference passes": 5,
          },
        },
        {
          name: "Silver Sponsor",
          amount: "₹50,000",
          slots: 5,
          benefits: {
            "Logo on conference website": true,
            "Logo on print collateral": true,
            "Logo on certificates": false,
            "Social media outreach": true,
            "Opportunity to deliver talk": false,
            "Opportunity to chair technical session": true,
            "Opportunity to deliver tutorial/workshop": false,
            "Networking opportunity": true,
            "Exhibit area during conference": true,
            "Conference passes": 2,
          },
        },
        {
          name: "Bronze Sponsor",
          amount: "₹20,000",
          slots: "Unlimited (∞)",
          benefits: {
            "Logo on conference website": true,
            "Logo on print collateral": true,
            "Logo on certificates": false,
            "Social media outreach": true,
            "Opportunity to deliver talk": false,
            "Opportunity to chair technical session": false,
            "Opportunity to deliver tutorial/workshop": false,
            "Networking opportunity": true,
            "Exhibit area during conference": false,
            "Conference passes": 1,
          },
        },
      ],
      benefitList: [
        "Logo on conference website",
        "Logo on print collateral",
        "Logo on certificates",
        "Social media outreach",
        "Opportunity to deliver talk",
        "Opportunity to chair technical session",
        "Opportunity to deliver tutorial/workshop",
        "Networking opportunity",
        "Exhibit area during conference",
        "Conference passes",
      ],
    },
    specialSessions: {
      available: true,
      overview: "The conference invites experts from multiple sectors to organize Special Sessions aligned with designated conference tracks. These sessions are intended to encourage collaboration, deeper technical discussions, and focused presentations.",
      invitedParticipants: [
        "Distinguished academicians",
        "Scientists",
        "Researchers",
        "Industrialists",
        "Technocrats",
        "Government officials",
        "Social visionaries",
        "Domain experts from various sectors"
      ],
      purposes: [
        "Promote collaboration and impactful outcomes",
        "Conduct focused sessions in specialized domains",
        "Enable in-depth discussions and presentations",
        "Be supervised by specialists from diverse disciplines",
        "Run during the three scheduled conference days at the venue"
      ],
      publication: {
        proceedings: "Selected papers will be included in the pre-conference proceedings soft copy on the conference website.",
        submission: "All presented papers will be submitted to Springer for publication and indexing."
      }
    },
    technicalCommittee: [
      { name: "Abhinav Muley", affiliation: "SVPCET" },
      { name: "Abhirup Paria", affiliation: "Haldia Institute of Technology" },
      { name: "Abhishek Shukla", affiliation: "Dell Technologies" },
      { name: "Ajay Nagne", affiliation: "Dept. of Computer Science & IT, Dr. B.A.M University" },
      { name: "Ali Nazarizadeh", affiliation: "Islamic Azad University Central Tehran Branch" },
      { name: "Amarjeet Singh", affiliation: "UPES Dehradun" },
      { name: "Amit Soni Arya", affiliation: "IIT (ISM), Dhanbad" },
      { name: "Anas Abou El Kalam", affiliation: "Cadi Ayyad University" },
      { name: "Aniket Muley", affiliation: "Swami Ramanad Teerth Marathwada University" },
      { name: "Ankur Mahida", affiliation: "Site Reliability Engineer at Barclays, USA" },
      { name: "Archana Nandibewoor", affiliation: "SDMCET" },
      { name: "Arkajyoti Mitra", affiliation: "University of Texas at Arlington" },
      { name: "Arun Pandiyan Perumal", affiliation: "Illinois Institute of Technology, USA" },
      { name: "Arvind Bhardwaj", affiliation: "Capgemini" },
      { name: "Ashish Mourya", affiliation: "ABES Institute of Technology" },
      { name: "Ashutosh Dhar Dwivedi", affiliation: "Aalborg University" },
      { name: "B H Shekar", affiliation: "Mangalore University" },
      { name: "Bhanu Chander", affiliation: "IIIT K" },
      { name: "Bindu V R", affiliation: "Mahatma Gandhi University, Kerala" },
      { name: "Bouchaib Cherradi", affiliation: "CRMEF Casablanca-Settat" },
      { name: "Brian Keith Norambuena", affiliation: "Universidad Católica del Norte" },
      { name: "Camille Kurtz", affiliation: "Université Paris Descartes" },
      { name: "Chitra Gaikwad", affiliation: "Government College of Engineering Aurangabad" },
      { name: "Dattatray Sawat", affiliation: "HCLTech" },
      { name: "Deepika Saxena", affiliation: "University of Aizu" },
    ],
    submissionDetails: {
      manuscriptRules: [
        "Images and tables must be self-drawn or used with proper permission/copyright.",
        "All equations must be created using an equation editor.",
        "Must use Mendeley for referencing.",
        "Similarity index not more than 5% from a single source.",
        "Overall similarity less than 15% (including self-plagiarism)."
      ],
      paperLength: {
        short: "6–8 pages",
        full: "12–15 pages",
        note: "Submissions below 12 pages are considered short papers.",
        maxSize: "5 MiB"
      },
      submissionRules: [
        "Only high-quality and substantial research manuscripts.",
        "Submit only through the official CMT portal.",
        "Email submissions are not accepted."
      ],
      reviewCriteria: ["Originality", "Structure", "Clarity", "Relevance"],
      publicationDetails: {
         고려사항: "All papers will be considered for publication in Springer CCIS.",
        templates: "Authors must use Springer templates (Word or LaTeX).",
        requirements: [
          "No page numbers / headers / footers",
          "Do not change template margins",
          "Paper size: 8.5 × 11",
          "Include author names, affiliations, and country",
          "Use clear graphics within margins",
          "Embed all fonts in PDF",
          "Pages in portrait orientation"
        ]
      },
      copyrightRules: [
        "Signed copyright form must be submitted as scanned PDF after acceptance.",
        "Corresponding author must verify final paper.",
        "Once sent to Springer: Authors/Order/Corresponding author cannot be changed."
      ],
      presentationRules: [
        "Oral presentation must match submitted paper.",
        "Duration announced before event.",
        "Presenters must register like other attendees."
      ],
      templates: [
        { name: "Word Template", url: "#" },
        { name: "LaTeX Template", url: "#" },
        { name: "Author Guidelines", url: "#" },
        { name: "Springer Proceedings Guidelines", url: "#" }
      ]
    }
  },

  2026: {
    meta: {
      title: "2026 International Conference on Applied Artificial Intelligence (2AI)",
      shortTitle: "2AI-2026",
      dates: "June 17 - 19, 2026",
      venue: "CUKashmir, Ganderbal, India",
      venueUrl: "https://www.cukashmir.ac.in/",
      mode: "Hybrid Event",
      organizer: "Central University of Kashmir",
      collaboration: "USD AI Research, University of South Dakota (USA)",
      collaborationUrl: "https://www.ai-research-lab.org/",
      cmt: "https://cmt3.research.microsoft.com/AAI2026",
      email: "aaiconferences@gmail.com",
      pastEvent: false,
    },
    // 2026 data continues to be used from existing hardcoded components
    // Components fall through to default rendering when year is 2026
  },
};

export default conferenceData;
