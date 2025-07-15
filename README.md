# AutoPartHub - Modern Car Parts Marketplace

A modern, responsive car parts marketplace built with React 18, TypeScript, and Tailwind CSS 3. This application showcases a complete migration from a traditional HTML/CSS/JS setup to a modern React ecosystem.

## 🚀 Features

### Modern React 18 Features
- **TypeScript** - Full type safety and better developer experience
- **React 18** - Latest React features including concurrent rendering
- **Vite** - Lightning-fast build tool and development server
- **Framer Motion** - Smooth animations and transitions
- **React Hot Toast** - Beautiful toast notifications

### UI/UX Enhancements
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-first approach with breakpoints
- **Skeleton Loading** - Loading states for better UX
- **Mobile Drawers** - Slide-out cart and filters for mobile
- **Hover Animations** - Interactive product cards with Framer Motion

### Shopping Cart Features
- **Context API** - Global cart state management
- **Local Storage** - Persistent cart data
- **Real-time Updates** - Live cart calculations
- **Toast Notifications** - User feedback for cart actions
- **Quantity Controls** - Add/remove items with quantity management

### Product Management
- **Product Grid** - Responsive grid layout
- **Filter System** - Category, brand, price, and stock filters
- **Search Functionality** - Real-time product search
- **Image Optimization** - Lazy loading and modern formats
- **Rating System** - Product ratings and reviews display

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd auto-parts-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation with dark mode toggle
│   ├── ProductGrid.tsx     # Product display with skeleton loading
│   ├── ProductCard.tsx     # Individual product component
│   ├── Cart.tsx           # Shopping cart with mobile drawer
│   └── Filters.tsx        # Filter sidebar with mobile drawer
├── context/
│   └── CartContext.tsx    # Global cart state management
├── types.ts               # TypeScript interfaces
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#f97316` (automotive-orange)
- **Dark Blue**: `#0f172a` (automotive-dark)
- **Blue**: `#1e40af` (automotive-blue)
- **Gray**: `#64748b` (automotive-gray)
- **Light**: `#f8fafc` (automotive-light)

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Secondary Font**: Lato (Google Fonts)

### Responsive Breakpoints
- **Mobile**: `sm:grid-cols-1`
- **Tablet**: `md:grid-cols-2`
- **Desktop**: `lg:grid-cols-3`
- **Large Desktop**: `xl:grid-cols-4`

## 🔄 Migration Highlights

### From HTML/CSS/JS to React 18
1. **Component Architecture** - Modular, reusable components
2. **TypeScript Integration** - Type safety and better DX
3. **Modern State Management** - Context API instead of global variables
4. **Responsive Design** - Mobile-first with Tailwind utilities
5. **Animation System** - Framer Motion for smooth transitions

### CSS to Tailwind Conversion
```diff
- .product-card { border: 1px solid #ddd; border-radius: 8px; padding: 16px }
+ <div className="border border-gray-300 rounded-lg p-4">

- .price-tag { color: #f97316; font-weight: bold }
+ <p className="text-orange-500 font-bold">

- .cart-btn { background: #0f172a; transition: all 0.3s }
+ <button className="bg-slate-900 transition-all duration-300">
```

### JavaScript to React Conversion
```typescript
// Modern React Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Type-safe cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    // ... other cases
  }
};
```

## 📱 Mobile Features

### Mobile Cart
- **Floating Cart Button** - Fixed position for easy access
- **Slide-out Drawer** - Full-screen cart interface
- **Touch-friendly Controls** - Large buttons and spacing

### Mobile Filters
- **Floating Filter Button** - Quick access to filters
- **Slide-out Drawer** - Collapsible filter sections
- **Responsive Controls** - Touch-optimized inputs

## 🎯 Performance Optimizations

- **Lazy Loading** - Images load only when needed
- **Skeleton Loading** - Placeholder content during data fetch
- **Code Splitting** - Vite's automatic code splitting
- **Optimized Builds** - Vite's fast build process
- **Tree Shaking** - Unused code elimination

## 🔧 Development Scripts

```json
{
  "dev": "vite",                    // Start development server
  "build": "tsc && vite build",     // Build for production
  "preview": "vite preview",        // Preview production build
  "lint": "eslint . --ext ts,tsx"   // Lint TypeScript files
}
```

## 🌟 Modern Features Implemented

### Toast Notifications
- Success messages for cart actions
- Error handling with user feedback
- Customizable duration and styling

### Dark Mode
- System preference detection
- Manual toggle in header
- Persistent theme selection

### Animations
- Product card hover effects
- Cart item transitions
- Filter drawer animations
- Loading state animations

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management

## 📊 Cart Functionality

### Features
- **Add/Remove Items** - Quantity management
- **Real-time Totals** - Subtotal, tax, shipping calculations
- **Persistent Storage** - LocalStorage for cart data
- **Toast Notifications** - User feedback for actions
- **Mobile Optimization** - Touch-friendly interface

### Calculations
- **Subtotal**: Sum of all items × quantities
- **Tax**: 7% of subtotal
- **Shipping**: Free over $500, $8.99 otherwise
- **Total**: Subtotal + Tax + Shipping

## 🎨 Customization

### Adding New Products
```typescript
const newProduct: Product = {
  id: 'unique-id',
  name: 'Product Name',
  price: 99.99,
  vendor: 'Vendor Name',
  image: 'image-url',
  description: 'Product description',
  category: 'Category',
  brand: 'Brand',
  inStock: true,
  rating: 4.5,
  reviews: 100
};
```

### Modifying Colors
```javascript
// tailwind.config.js
colors: {
  automotive: {
    orange: '#f97316',  // Change primary color
    dark: '#0f172a',    // Change dark theme color
    // ... other colors
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Vercel will auto-detect Vite configuration
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder
3. Configure build settings if needed

### Traditional Hosting
1. Run `npm run build`
2. Upload contents of `dist` folder
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React 18 features
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For the smooth animations
- **React Icons** - For the comprehensive icon library

---

**Built with ❤️ using React 18, TypeScript, and Tailwind CSS 3** 