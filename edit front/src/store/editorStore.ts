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

type EditorState = {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  hero: HeroContent;
  setHero: (h: Partial<HeroContent>) => void;
  navbar: NavbarContent;
  setNavbar: (n: Partial<NavbarContent>) => void;
  resetToDefaults: () => void;
};

const defaultHero: HeroContent = {
  title: "More than a traditional\nsoftware agency",
  subtitle:
    "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
  titleColor: "#ffffff",
  subtitleColor: "#ffffff",
  button: {
    text: "Work with us",
    href: "#",
    textColor: "#000000",
    bgColor: "#ffffff",
  },
  bgType: "color",
  bgColor: "#636ede",
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

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      editMode: false,
      setEditMode: (v) => set({ editMode: v }),
      hero: defaultHero,
      setHero: (h) => set((state) => ({ hero: { ...state.hero, ...h } })),
      navbar: defaultNavbar,
      setNavbar: (n) => set((state) => ({ navbar: { ...state.navbar, ...n } })),
      resetToDefaults: () => set({ hero: defaultHero, navbar: defaultNavbar }),
    }),
    {
      name: "webflow-editor-storage", // unique name for localStorage key
      partialize: (state) => ({
        hero: state.hero,
        navbar: state.navbar,
        // Don't persist editMode - it should always start as false
      }),
    }
  )
);
