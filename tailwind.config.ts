import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: {
          50: "#FCFAF6",
          100: "#F9F5EE",
          200: "#F3EDE1",
          300: "#ECE1CE",
          400: "#E3D3B9",
          500: "#D8C2A0",
        },
        sandstone: {
          50: "#FAF7F2",
          100: "#F4EFE6",
          200: "#ECE3D3",
          300: "#E0D1BB",
          400: "#D1BDA0",
          500: "#BD9E78",
          600: "#A0805C",
          700: "#7E6446",
          800: "#5E4A35",
          900: "#3D3023",
        },
        terracotta: {
          50: "#FDF4F0",
          100: "#F9E4DB",
          200: "#F3C7B5",
          300: "#E8A38B",
          400: "#D8795A",
          500: "#C85A32", // primary rich terracotta
          600: "#B34927",
          700: "#92371D",
          800: "#732C18",
          900: "#572113",
        },
        jaipur: {
          50: "#FDF5F5",
          100: "#FBE6E6",
          200: "#F6C7C7",
          300: "#EEA1A1",
          400: "#E27777",
          500: "#D48B7E", // signature muted Jaipur rose
          600: "#BE574B",
          700: "#9E3E34",
          800: "#7F3129",
          900: "#602520",
        },
        ochre: {
          50: "#FCF9EC",
          100: "#F8F1CF",
          200: "#F0E19B",
          300: "#E7CE65",
          400: "#DCBB3A",
          500: "#C5A059", // luxury warm artisan gold
          600: "#A48039",
          700: "#7E6029",
          800: "#5D451D",
          900: "#3F2E13",
        },
        warmbrown: {
          50: "#F8F6F4",
          100: "#ECE7E2",
          200: "#DACEC4",
          300: "#C2AFA2",
          400: "#A58C7C",
          500: "#7C6354",
          600: "#5F4B3F",
          700: "#493930",
          800: "#362A24",
          900: "#221A16", // deep luxury dark
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Cinzel", "serif"],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(45, 31, 26, 0.08)',
        'luxury-hover': '0 20px 40px -15px rgba(45, 31, 26, 0.16)',
        'drawer': '-10px 0 30px rgba(45, 31, 26, 0.15)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
