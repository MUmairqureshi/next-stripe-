const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--green)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        green: "var(--green)",
        greenDark: "var(--green-dark)",
        greenLight: "var(--green-light)",
        black: "var(--green)",
        white: "var(--white)",
        pink: "var(--pink)",
        brown: "var(--brown)",
        cream: "var(--cream)",
        blue: "var(--blue)",
        blueLight: "var(--blue-light)",
        blueTrans: "rgba((--blue-trans))",
        blueTransLight: "rgba((--blue-trans-light))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "var(--green)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "var(--green)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "var(--green)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "var(--green)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "var(--green)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "var(--green)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "var(--green)",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) * 50)`,
        lg: `calc(var(--radius) * 2)`,
        md: `calc(var(--radius))`,
        sm: "calc(var(--radius) - 4)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      fontSize: {
        lg: ['18px', '24px'],
        xl: ['24px', '32px'],
        '2xl': ['32px', '40px'],
        '3xl': ['40px', '48px'],
        '4xl': ['48px', '64px'],
        '5xl': ['64px', '80px'],
        '6xl': ['72px', '80px'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
