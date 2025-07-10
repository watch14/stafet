/**
 * EDITOR STORE - Main Data Management System
 * ==========================================
 *
 * This file manages all the content for your website using Zustand state management.
 * It handles:
 * - All text, colors, and images for each section
 * - User authentication (admin login)
 * - Edit mode state (when editing is enabled)
 * - Auto-save functionality
 * - Data persistence (saves to browser storage)
 *
 * Think of this as the "brain" that remembers all your website content
 * and whether someone is logged in as admin to edit it.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Content structure for the Hero (main banner) section
// Content structure for the Hero (main banner) section
type HeroContent = {
  title: string; // Main headline text
  subtitle: string; // Subheadline text
  titleColor: string; // Color of the main headline
  subtitleColor: string; // Color of the subheadline
  button: {
    // Call-to-action button
    text: string; // Button text
    href: string; // Where button links to
    textColor: string; // Button text color
    bgColor: string; // Button background color
  };
  bgType: "color" | "image"; // Background type (solid color or image)
  bgColor: string; // Background color
  bgImage: string; // Background image URL
};

// Content structure for the Navigation Bar
type NavbarContent = {
  logo: string; // Logo text or image URL
  logoColor: string; // Logo text color
  links: { label: string; href: string }[]; // Navigation menu items
  linkColor: string; // Navigation link colors
  cta: { label: string; href: string; textColor: string; bgColor: string }; // Header CTA button
};

// Content structure for individual Process steps
type ProcessItem = {
  number: string; // Step number (e.g., "01", "02")
  title: string; // Step title
  subtitle: string; // Step subtitle
  description: string; // Step description
  titleBgColor: string; // Title background color
  bgColor: string; // Step card background color
  textColor: string; // Text color
  image: string; // Step image URL
};

// Content structure for the Process section
type ProcessContent = {
  processes: ProcessItem[]; // Array of all process steps
};

// Content structure for the Footer section
type FooterContent = {
  logo: string; // Footer logo text
  customerTitle: string; // Customer links section title
  customerLinks: { label: string; href: string }[]; // Customer navigation links
  contactTitle: string; // Contact section title
  contactText: string; // Contact description text
  contactEmail: string; // Contact email address
  bgColor: string; // Footer background color
  textColor: string; // Footer text color
};

// Content structure for the Value Proposition section
type ValuePropositionContent = {
  title: string; // Main value proposition headline
  bgColor: string; // Section background color
  textColor: string; // Text color
};

// Content structure for the Testimonials section
type TestimonialsContent = {
  title: string; // Testimonials section title
  quote: string; // Customer testimonial quote
  author: string; // Quote author name
  bgColor: string; // Section background color
  textColor: string; // Text color
};

// Content structure for the Client Logos section
type ClientLogosContent = {
  title: string; // Client logos section title
  logos: { name: string; logo: string; alt: string }[]; // Array of client logos
  bgColor: string; // Section background color
  textColor: string; // Text color
};

// Content structure for the About section
type AboutContent = {
  title: string; // About section title
  subtitle: string; // About section subtitle
  content: string[]; // Array of about content paragraphs
  ctaText: string; // Call-to-action button text
  bgColor: string; // Section background color
  titleColor: string; // Title text color
  textColor: string; // Main text color
  ctaBgColor: string; // CTA button background color
  ctaTextColor: string; // CTA button text color
  image: string; // About section image URL
};

/**
 * MAIN EDITOR STATE TYPE
 * ======================
 * This defines all the functions and data available throughout the app.
 * It includes:
 * - Edit mode controls (turn editing on/off)
 * - Content for all website sections
 * - Functions to update each section
 * - Reset functionality
 */
type EditorState = {
  // Edit mode state management
  editMode: boolean; // Whether editing is currently enabled
  setEditMode: (v: boolean) => void; // Function to enable/disable editing
  isEditorOpen: boolean; // Whether editor panel is open
  setIsEditorOpen: (open: boolean) => void; // Function to open/close editor panel
  activeEditor: string | null; // Which editor is currently active
  setActiveEditor: (editor: string | null) => void; // Function to set active editor

  // Website content sections
  hero: HeroContent; // Hero section content
  setHero: (h: Partial<HeroContent>) => void; // Function to update hero content
  navbar: NavbarContent; // Navigation bar content
  setNavbar: (n: Partial<NavbarContent>) => void; // Function to update navbar content
  process: ProcessContent; // Process section content
  setProcess: (p: Partial<ProcessContent>) => void; // Function to update process content
  footer: FooterContent; // Footer section content
  setFooter: (f: Partial<FooterContent>) => void; // Function to update footer content
  valueProposition: ValuePropositionContent; // Value proposition content
  setValueProposition: (v: Partial<ValuePropositionContent>) => void; // Function to update value prop
  testimonials: TestimonialsContent; // Testimonials section content
  setTestimonials: (t: Partial<TestimonialsContent>) => void; // Function to update testimonials
  clientLogos: ClientLogosContent; // Client logos section content
  setClientLogos: (c: Partial<ClientLogosContent>) => void; // Function to update client logos
  about: AboutContent; // About section content
  setAbout: (a: Partial<AboutContent>) => void; // Function to update about content
  resetToDefaults: () => void; // Function to reset all content to defaults
};

/**
 * DEFAULT CONTENT VALUES
 * =======================
 * These are the initial values for each section when the site is first loaded
 * or when reset to defaults is triggered.
 */

// Default Hero section content
const defaultHero: HeroContent = {
  title: "More than a traditional\nsoftware agency",
  subtitle:
    "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
  titleColor: "#000000",
  subtitleColor: "#000000",
  button: {
    text: "Work with us",
    href: "#",
    textColor: "#000000",
    bgColor: "#FFCEE5",
  },
  bgType: "color",
  bgColor: "#6366F1",
  bgImage: "",
};

const defaultNavbar: NavbarContent = {
  logo: "STAFET",
  logoColor: "#000000",
  links: [
    { label: "Cases", href: "#" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#" },
  ],
  linkColor: "#000000",
  cta: {
    label: "Work with us",
    href: "#",
    textColor: "#000000",
    bgColor: "#ffffff",
  },
};

const defaultProcess: ProcessContent = {
  processes: [
    {
      number: "01.",
      title: "WHAT",
      subtitle: "Calibrating your business targets",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      titleBgColor: "#FFC6E7",
      bgColor: "#ffffff",
      textColor: "#000000",
      image: "/images/WHAT.png",
    },
    {
      number: "02.",
      title: "WHY",
      subtitle: "Identifying why you haven't reached your potential",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      titleBgColor: "#C6E7FF",
      bgColor: "#f5f5f5",
      textColor: "#000000",
      image: "/images/WHY.png",
    },
    {
      number: "03.",
      title: "HOW",
      subtitle: "Defining actions to reach your targets",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      titleBgColor: "#C6FFC6",
      bgColor: "#ffffff",
      textColor: "#000000",
      image: "/images/HOW.png",
    },
    {
      number: "04.",
      title: "ACTION",
      subtitle: "Making your vision a reality",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      titleBgColor: "#FFE5C6",
      bgColor: "#f5f5f5",
      textColor: "#000000",
      image: "/images/ACTION.png",
    },
  ],
};

const defaultFooter: FooterContent = {
  logo: "STAFF.",
  customerTitle: "Customer",
  customerLinks: [
    { label: "Returns & Refunds", href: "#" },
    { label: "Shipping & Delivery", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  contactTitle: "Contact",
  contactText: "Get in touch at",
  contactEmail: "hello@staffet.com",
  bgColor: "#FFFFFB",
  textColor: "#000000",
};

const defaultValueProposition: ValuePropositionContent = {
  title:
    "We do not just develop software solutions.\nWe amplify your business.",
  bgColor: "#FEF3C7",
  textColor: "#000000",
};

const defaultTestimonials: TestimonialsContent = {
  title: "What our clients say",
  quote:
    "Our process starts by diving into your business, customers, and objectives. From there, we create a strategy rooted in our findings",
  author: "- Marcus, 29, HeadHunter",
  bgColor: "#ffffff",
  textColor: "#000000",
};

const defaultClientLogos: ClientLogosContent = {
  title: "Client Logos",
  logos: [
    {
      name: "Express Bank",
      logo: "/images/Express.png",
      alt: "Express Bank Logo",
    },
    { name: "TwoPoint", logo: "/images/TwoPoint.png", alt: "TwoPoint Logo" },
    {
      name: "Gentofte Kommune",
      logo: "/images/HeadHunter.png",
      alt: "Gentofte Kommune Logo",
    },
    {
      name: "Fundbricks",
      logo: "/images/Gentofte.png",
      alt: "Fundbricks Logo",
    },
    { name: "STAFF", logo: "/images/Fundbricks.png", alt: "STAFF Logo" },
  ],
  bgColor: "#ffffff",
  textColor: "#000000",
};

const defaultAbout: AboutContent = {
  title: "Solving business problems with solid software",
  subtitle: "",
  content: [
    "STAFET is a team of experienced entrepreneurs and engineers with experience from companies such as Microsoft, bp, consultancies and co-founded startups.",
    "We have had our hands dirty from working with many different organisations. Each is different in its own way. Meaning most organisations need tailored solutions to improve their business. Together with our passion for building great software with real impact.",
    "We empower you and your team to focus on your core business while we handle the technical side.",
    "If you are curious to know more about how we help optimizing our clients' budget, enhancing efficiency, and foster growth by unlocking the untapped potential.",
    "Feel free to reach out.",
  ],
  ctaText: "Get in contact",
  bgColor: "#ffffff",
  titleColor: "#000000",
  textColor: "#6b7280",
  ctaBgColor: "#fecaca",
  ctaTextColor: "#dc2626",
  image: "/images/About.png",
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      editMode: false,
      setEditMode: (v) => set({ editMode: v }),
      isEditorOpen: false,
      setIsEditorOpen: (open) => set({ isEditorOpen: open }),
      activeEditor: null,
      setActiveEditor: (editor) => set({ activeEditor: editor }),
      hero: defaultHero,
      setHero: (h) => set((state) => ({ hero: { ...state.hero, ...h } })),
      navbar: defaultNavbar,
      setNavbar: (n) => set((state) => ({ navbar: { ...state.navbar, ...n } })),
      process: defaultProcess,
      setProcess: (p) =>
        set((state) => ({ process: { ...state.process, ...p } })),
      footer: defaultFooter,
      setFooter: (f) => set((state) => ({ footer: { ...state.footer, ...f } })),
      valueProposition: defaultValueProposition,
      setValueProposition: (v) =>
        set((state) => ({
          valueProposition: { ...state.valueProposition, ...v },
        })),
      testimonials: defaultTestimonials,
      setTestimonials: (t) =>
        set((state) => ({ testimonials: { ...state.testimonials, ...t } })),
      clientLogos: defaultClientLogos,
      setClientLogos: (c) =>
        set((state) => ({ clientLogos: { ...state.clientLogos, ...c } })),
      about: defaultAbout,
      setAbout: (a) => set((state) => ({ about: { ...state.about, ...a } })),
      resetToDefaults: () =>
        set({
          hero: defaultHero,
          navbar: defaultNavbar,
          process: defaultProcess,
          footer: defaultFooter,
          valueProposition: defaultValueProposition,
          testimonials: defaultTestimonials,
          clientLogos: defaultClientLogos,
          about: defaultAbout,
        }),
    }),
    {
      name: "webflow-editor-storage", // unique name for localStorage key
      partialize: (state) => ({
        hero: state.hero,
        navbar: state.navbar,
        process: state.process,
        footer: state.footer,
        valueProposition: state.valueProposition,
        testimonials: state.testimonials,
        clientLogos: state.clientLogos,
        about: state.about,
        // Don't persist editMode - it should always start as false
      }),
    }
  )
);
