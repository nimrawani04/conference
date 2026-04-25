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
      pastEvent: false,
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
          title: "Data Science Workshop",
          speaker: "Mr. Chitresh Sharma",
          date: "July 2, 2024",
        },
        {
          title: "Kubernetes Workshop",
          speaker: "Mr. Pradeep Chintale",
          date: "July 2, 2024",
        },
        {
          title: "Cloud DevOps Workshop",
          speaker: "Mr. Rahul S. Sengar",
          date: "July 3-4, 2024",
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
