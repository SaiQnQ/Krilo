import { BarChart3Icon, FolderOpenIcon, Origami, Rocket, Telescope, WandSparklesIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL = "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
    {
        name: "Asana",
        logo: "/assets/company-01.svg",
    },
    {
        name: "Tidal",
        logo: "/assets/company-02.svg",
    },
    {
        name: "Innovaccer",
        logo: "/assets/company-03.svg",
    },
    {
        name: "Linear",
        logo: "/assets/company-04.svg",
    },
    {
        name: "Raycast",
        logo: "/assets/company-05.svg",
    },
    {
        name: "Labelbox",
        logo: "/assets/company-06.svg",
    }
] as const;

export const PROCESS = [
    {
        title: "Ideation and Discovery",
        description: "We collaborate closely with you to understand your vision and define the problem you're solving.",
        icon: Telescope,
    },
    {
        title: "Design and Development",
        description: "Our experts bring your idea to life through thoughtful design and cutting-edge development, ensuring a polished, functional product.",
        icon: Origami,
    },
    {
        title: "Launch and Optimization",
        description: "We deploy the product and fine-tune it, ensuring it performs flawlessly and evolves with your needs.",
        icon: Rocket,
    },
] as const;

export const REVIEWS = [
  {
    "name": "Alex Johnson",
    "username": "@alex_johnson",
    "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    "rating": 5,
    "review": "The platform is incredibly intuitive and has saved me countless hours. A must-have for any team!"
  },
  {
    "name": "Maria Garcia",
    "username": "@maria_garcia",
    "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
    "rating": 4,
    "review": "A fantastic suite of tools. I wish there was more customization for the analytics dashboard, but overall it’s excellent."
  },
  {
    "name": "James Smith",
    "username": "@james_smith",
    "avatar": "https://randomuser.me/api/portraits/men/3.jpg",
    "rating": 5,
    "review": "The best all-in-one solution I've come across. The link shortening and QR code features are seamless."
  },
  {
    "name": "Emily White",
    "username": "@emily_white",
    "avatar": "https://randomuser.me/api/portraits/women/4.jpg",
    "rating": 4,
    "review": "Great value for the price. The password protection feature is a huge plus for sharing sensitive documents."
  },
  {
    "name": "Michael Brown",
    "username": "@michael_brown",
    "avatar": "https://randomuser.me/api/portraits/men/5.jpg",
    "rating": 5,
    "review": "Customer support is top-notch. They helped me set up my custom domain in minutes."
  },
  {
    "name": "Jessica Lee",
    "username": "@jessica_lee",
    "avatar": "https://randomuser.me/api/portraits/women/6.jpg",
    "rating": 5,
    "review": "I love the clean UI and how easy it is to navigate. The analytics are clear and provide actionable insights."
  },
  {
    "name": "Sophia Carter",
    "username": "@sophia_carter",
    "avatar": "https://randomuser.me/api/portraits/women/9.jpg",
    "rating": 5,
    "review": "Pratyush’s mentorship and AI tools have been invaluable. As a beginner, I couldn’t ask for a better guide in this field."
  },
  {
    "name": "David Chen",
    "username": "@david_chen",
    "avatar": "https://randomuser.me/api/portraits/men/7.jpg",
    "rating": 4,
    "review": "Very intuitive and powerful automation. Still learning some features, but it’s already streamlined my work."
  },
  {
    "name": "Olivia Martinez",
    "username": "@olivia_martinez",
    "avatar": "https://randomuser.me/api/portraits/women/8.jpg",
    "rating": 5,
    "review": "The AI-powered PDF tool is a game-changer. It has completely transformed my research workflow."
  },
  {
    "name": "Lucas Foster",
    "username": "@lucas_foster",
    "avatar": "https://randomuser.me/api/portraits/men/10.jpg",
    "rating": 4,
    "review": "The AI generation tools are extremely powerful and user-friendly. Pratyush’s mentorship was a bonus that made the learning curve easier!"
  }
] as const;

