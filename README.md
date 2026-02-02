# Dieuclat Website

A modern, elegant e-commerce website for artificial flower delivery, built with React and Vite. The website features a beautiful, user-friendly interface with a soft pink aesthetic and showcases premium artificial flower arrangements.

## 🎨 Overview

Dieuclat is an e-commerce platform specializing in artificial flower delivery. The website offers a seamless shopping experience with features like free shipping, free delivery, and a curated selection of premium flower arrangements.

## ✨ Features

- **Hero Section**: Eye-catching banner with call-to-action
- **Top Selling Products**: Showcase of monthly bestsellers
- **Deal of the Day**: Special offers with countdown timer
- **Free Shipping & Delivery**: Cost-effective shopping experience
- **Responsive Design**: Optimized for all devices
- **Modern UI/UX**: Clean and elegant interface

## 🖼️ Website Sections

### Hero Section

The hero section features a prominent banner with a beautiful artificial flower bouquet, highlighting the unique value proposition of doorstep delivery.

![Hero Section](./public/images/hero-section.png)

**Key Features:**
- Bold headline: "Unique Flowers delivered to your doorstep"
- Call-to-action "Shop Now" button
- Elegant floral imagery
- Soft pink color scheme

---

### Top Selling Product Section

This section displays the month's top-selling products in a carousel format, allowing users to browse through popular flower arrangements.

![Top Selling Products](./public/images/top-selling-products.png)

**Key Features:**
- Product carousel with navigation arrows
- Product cards with images, titles, prices, and ratings
- Star ratings (5-star system)
- Multiple bouquet options (Combo Bouquet 02, 03, 04)

**Product Information Displayed:**
- Product name
- Price ($40.00)
- Customer ratings (5 stars)

---

### Deal of the Day Section

The Deal of the Day section showcases special offers with a countdown timer, creating urgency and encouraging immediate purchases.

![Deal of the Day](./public/images/deal-of-the-day.png)

**Key Features:**
- Countdown timer (Days, Hours, Minutes, Seconds)
- Special discounted products
- Product cards with:
  - Product images (wicker basket bouquets)
  - Product titles
  - Descriptions
  - Pricing (original and discounted)
  - "Add to Cart" buttons

**Offer Details:**
- Multiple product options available
- Attractive pricing
- Easy add-to-cart functionality

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Dieuclat-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

## 🛠️ Technology Stack

- **React**: UI library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (JSX)**: Programming language

## 📁 Project Structure

```
Dieuclat-website/
├── public/
│   └── images/          # Image assets
├── src/
│   ├── components/      # React components
│   │   ├── Hero.jsx
│   │   ├── Products.jsx
│   │   ├── DealOfTheDay.jsx
│   │   ├── FeaturesStrip.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── index.html
├── package.json
└── README.md
```

## 🎯 Components

- **Hero.jsx**: Hero section with banner and call-to-action
- **Products.jsx**: Top selling products carousel
- **DealOfTheDay.jsx**: Deal of the day section with countdown timer
- **FeaturesStrip.jsx**: Features banner (Free Shipping, Free Delivery, etc.)
- **Navbar.jsx**: Navigation bar component

## 📝 Notes

- Make sure to add the actual image files to the `public/images/` directory:
  - `hero-section.png` (or update the path in README)
  - `top-selling-products.png` (or update the path in README)
  - `deal-of-the-day.png` (or update the path in README)

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ for Dieuclat**
