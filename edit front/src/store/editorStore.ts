import { create } from "zustand";
import { persist } from "zustand/middleware";

type HeroContent = {
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  button: {
    text: string;
    href: string;
    textColor: string;
    bgColor: string;
  };
  bgType: "color" | "image";
  bgColor: string;
  bgImage: string;
};

type NavbarContent = {
  logo: string;
  logoColor: string;
  links: { label: string; href: string }[];
  linkColor: string;
  cta: { label: string; href: string; textColor: string; bgColor: string };
};

type ProcessItem = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  titleBgColor: string;
  bgColor: string;
  textColor: string;
  image: string;
};

type ProcessContent = {
  processes: ProcessItem[];
};

type FooterContent = {
  logo: string;
  customerTitle: string;
  customerLinks: { label: string; href: string }[];
  contactTitle: string;
  contactText: string;
  contactEmail: string;
  bgColor: string;
  textColor: string;
};

type ValuePropositionContent = {
  title: string;
  bgColor: string;
  textColor: string;
};

type TestimonialsContent = {
  title: string;
  quote: string;
  author: string;
  bgColor: string;
  textColor: string;
};

type ClientLogosContent = {
  title: string;
  logos: { name: string; logo: string; alt: string }[];
  bgColor: string;
  textColor: string;
};

type EditorState = {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  activeEditor: string | null;
  setActiveEditor: (editor: string | null) => void;
  hero: HeroContent;
  setHero: (h: Partial<HeroContent>) => void;
  navbar: NavbarContent;
  setNavbar: (n: Partial<NavbarContent>) => void;
  process: ProcessContent;
  setProcess: (p: Partial<ProcessContent>) => void;
  footer: FooterContent;
  setFooter: (f: Partial<FooterContent>) => void;
  valueProposition: ValuePropositionContent;
  setValueProposition: (v: Partial<ValuePropositionContent>) => void;
  testimonials: TestimonialsContent;
  setTestimonials: (t: Partial<TestimonialsContent>) => void;
  clientLogos: ClientLogosContent;
  setClientLogos: (c: Partial<ClientLogosContent>) => void;
  resetToDefaults: () => void;
};

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
  logo: "STAFF.",
  logoColor: "#000000",
  links: [
    { label: "Cases", href: "#" },
    { label: "About", href: "#" },
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
      resetToDefaults: () =>
        set({
          hero: defaultHero,
          navbar: defaultNavbar,
          process: defaultProcess,
          footer: defaultFooter,
          valueProposition: defaultValueProposition,
          testimonials: defaultTestimonials,
          clientLogos: defaultClientLogos,
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
        // Don't persist editMode - it should always start as false
      }),
    }
  )
);
