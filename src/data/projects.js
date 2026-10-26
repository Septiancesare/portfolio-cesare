export const PROJECTS = [
  {
    title: "Learning Management System",
    shortTitle: "LMS",
    category: "Web Development",
    description:
      "A web-based Learning Management System designed to support digital learning activities, including course management, learning materials, assignments, and user administration. The project focuses on providing a structured platform for managing learning resources and interactions between users.",
    objective:
      "To develop a centralized digital learning platform that simplifies learning management and improves accessibility to educational resources.",
    tech: ["PHP", "Laravel", "Filament", "Tailwind CSS", "MySQL"],
    images: Array.from({ length: 13 }, (_, i) => `/lms/${i + 1}.jpg`),
  },
  {
    title: "GlobeUpdate",
    shortTitle: "GlobeUpdate",
    category: "Mobile Development",
    description:
      "A mobile news application built to provide users with accessible and organized news content. The application integrates Firebase services for authentication and data management while providing a mobile-friendly interface for browsing news.",
    objective:
      "To create a simple and accessible mobile news platform that allows users to discover and read news through a modern mobile interface.",
    tech: ["Dart", "Flutter", "Firebase"],
    images: Array.from({ length: 4 }, (_, i) => `/portalweb/${i + 1}.jpg`),
  },
  {
    title: "KasoemFinance POS",
    shortTitle: "KasoemFinance",
    category: "Web Development",
    description:
      "A web-based Point of Sale and financial management system developed to support transaction management, product administration, and business operations. The system provides an administrative interface for managing and monitoring operational data.",
    objective:
      "To develop a centralized POS system that helps simplify transaction processes and improve the management of business data.",
    tech: ["PHP", "Laravel", "Filament", "Tailwind CSS", "MySQL"],
    images: Array.from({ length: 11 }, (_, i) => `/pos/${i + 1}.jpg`),
  },
  {
    title: "E-Commerce",
    shortTitle: "E-Commerce",
    category: "Web Development",
    description:
      "An e-commerce web application developed to support online product browsing and purchasing workflows. The system includes product management, data handling, and a structured interface for managing e-commerce content.",
    objective:
      "To build a functional online shopping platform that demonstrates the implementation of common e-commerce workflows.",
    tech: ["PHP", "Laravel", "Filament", "Tailwind CSS", "SQLite"],
    images: Array.from({ length: 7 }, (_, i) => `/ecommerce/${i + 1}.jpg`),
  },
  {
    title: "Todo List",
    shortTitle: "Todo List",
    category: "Web Development",
    description:
      "A task management web application designed to help users organize and manage daily activities. The application implements task creation, updating, completion, and deletion through a simple and responsive interface.",
    objective:
      "To develop a lightweight task management application while applying fundamental CRUD operations and database integration.",
    tech: ["PHP", "Laravel", "Filament", "Tailwind CSS", "MySQL"],
    images: Array.from({ length: 6 }, (_, i) => `/todolist/${i + 1}.jpg`),
  },
  {
    title: "Company Profile PSP Dinas Pertanian Grobogan",
    shortTitle: "Company Profile",
    category: "Web Development",
    description:
      "A company profile website developed for the Plant Protection and Agricultural Infrastructure division of the Agriculture Office. The website presents organizational information, services, activities, and relevant institutional content.",
    objective:
      "To provide an informative and accessible digital presence for the division while improving the presentation and accessibility of institutional information.",
    tech: ["PHP", "Laravel", "Filament", "Tailwind CSS", "MySQL"],
    images: Array.from({ length: 13 }, (_, i) => `/companyprofile/${i + 1}.jpg`),
  },
  {
    title: "ArtFusion",
    shortTitle: "ArtFusion",
    category: "Web Development",
    description:
      "A digital art gallery website designed to showcase artworks through a visually focused and modern interface. The project emphasizes visual presentation, responsive layouts, and an engaging browsing experience.",
    objective:
      "To create an aesthetically focused digital gallery that provides an intuitive platform for exploring and presenting artwork.",
    tech: ["JavaScript", "Next.js"],
    images: Array.from({ length: 8 }, (_, i) => `/artfusion/${i + 1}.jpg`),
  },
  {
    title: "STEM Learning - VR & IoT",
    shortTitle: "VR + IoT",
    category: "Interactive Learning",
    description:
      "An interactive STEM learning project combining Virtual Reality and IoT to introduce students to basic IoT concepts. The learning experience uses temperature detection as an example to demonstrate how sensors and digital technologies can be applied in real-world contexts.",
    objective:
      "To introduce IoT concepts through an interactive and immersive learning experience that combines VR visualization with real-time sensor data.",
    tech: ["Unity", "C#", "IoT", "Python"],
    images: Array.from({ length: 7 }, (_, i) => `/vr/${i + 1}.jpeg`),
  },
];

export const CATEGORY_ACCENTS = {
  "Web Development": "cyan",
  "Mobile Development": "lime",
  "Interactive Learning": "amber",
};
