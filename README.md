# Shoes E-commerce Web Application

This README provides a detailed overview of the directory structure, components, and various configurations of the Shoes
E-commerce web application.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Directory and File Descriptions](#directory-and-file-descriptions)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Building for Production](#building-for-production)
6. [Linting and Formatting](#linting-and-formatting)
7. [Configuration](#configuration)
8. [Vercel Deployment](#vercel-deployment)

## Project Structure

```
shoes
├── dist
├── assets
├── index.html
├── vite.svg
├── node_modules
├── public
│   ├── vite.svg
├── src
│   ├── assets
│   ├── components
│   │   ├── footer
│   │   │   ├── Footer.tsx
│   │   │   ├── FooterLinks.tsx
│   │   │   ├── FooterSocials.tsx
│   │   │   ├── Newsletter.tsx
│   │   ├── navbar
│   │   │   ├── Logo.tsx
│   │   │   ├── MobileView.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── NavItems.tsx
│   │   │   ├── routeContants.tsx
│   │   │   ├── SearchResults.tsx
│   │   ├── products
│   │   │   ├── ProductCard.tsx
│   │   │   ├── productData.ts
│   │   │   ├── Products.tsx
│   │   ├── ui
│   │   │   ├── button.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── textarea.tsx
│   │   ├── AboutComponent.tsx
│   │   ├── ComingSoon.tsx
│   │   ├── CustomersReview.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LazyImage.tsx
│   │   ├── Loader.tsx
│   │   ├── Pagination.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── ProductDetailsComponent.tsx
│   │   ├── ProgressSteps.tsx
│   │   ├── ReviewsCarousel.tsx
│   │   ├── toastConfig.ts
│   │   ├── TrackOrderProgressSteps.tsx
│   ├── lib
│   │   ├── utils.ts
│   ├── pages
│   │   ├── about
│   │   │   ├── AboutHero.tsx
│   │   │   ├── AboutMain.tsx
│   │   │   ├── ActionPurpose.tsx
│   │   │   ├── GlobalReach.tsx
│   │   │   ├── OurLeader.tsx
│   │   │   ├── SectionAfterHero.tsx
│   │   │   ├── SmallAboutNav.tsx
│   │   │   ├── Technologies.tsx
│   │   ├── admin
│   │   │   ├── AddProduct.tsx
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── EditProductModal.tsx
│   │   │   ├── ProductList.tsx
│   │   ├── auth
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   ├── cart
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   ├── order
│   │   │   ├── OrderDetails.tsx
│   │   │   ├── PaymentSuccessConfetti.tsx
│   │   │   ├── SuccessMessage.tsx
│   │   ├── products
│   │   │   ├── ProductDesc.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── ProductReview.tsx
│   │   │   ├── SimilarProducts.tsx
│   │   │   ├── SmallNav.tsx
│   │   ├── users
│   │   │   ├── Profile.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Favorites.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Shop.tsx
│   ├── redux
│   │   ├── api
│   │   │   ├── apiSlice.ts
│   │   │   ├── cartApiSlice.ts
│   │   │   ├── paymentApiSlice.ts
│   │   │   ├── productApiSlice.ts
│   │   │   ├── userApiSlice.ts
│   │   ├── features
│   │   │   ├── authSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   ├── favoriteSlice.ts
│   │   ├── store.ts
│   ├── types
│   │   ├── Cart.ts
│   │   ├── Product.ts
│   ├── utils
│   │   ├── cartUtils.ts
│   │   ├── constants.ts
│   │   ├── localStorage.ts
│   ├── App.tsx
│   ├── Container.tsx
│   ├── ErrorPage.tsx
│   ├── index.css
│   ├── Layout.tsx
│   ├── main.tsx
│   ├── Routes.tsx
│   ├── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── components.json
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
```

## Directory and File Descriptions

### Root Directory

- **dist**: Compiled files ready for production deployment.
- **assets**: Static assets like images, fonts, etc.
- **index.html**: Main HTML file for the application.
- **vite.svg**: SVG logo for Vite.
- **node_modules**: Contains all the npm packages.

### `public` Directory

Contains public assets.

- **vite.svg**: SVG logo for Vite.

### `src` Directory

Contains the source code of the application.

- **assets**: Static assets like images, fonts, etc.
- **components**: Contains all reusable UI components.

#### `components` Subdirectories

- **footer**: Components related to the footer section.
    - `Footer.tsx`: Main footer component.
    - `FooterLinks.tsx`: Component for footer links.
    - `FooterSocials.tsx`: Component for footer social media links.
    - `Newsletter.tsx`: Newsletter subscription component.

- **navbar**: Components related to the navigation bar.
    - `Logo.tsx`: Logo component.
    - `MobileView.tsx`: Navigation for mobile view.
    - `Navigation.tsx`: Main navigation component.
    - `NavItems.tsx`: Navigation items component.
    - `routeContants.tsx`: Route constants for navigation.
    - `SearchResults.tsx`: Component for search results.

- **products**: Components related to product display.
    - `ProductCard.tsx`: Component for displaying individual product cards.
    - `productData.ts`: File containing product data.
    - `Products.tsx`: Component for displaying a list of products.

- **ui**: General UI components.
    - `button.tsx`: Button component.
    - `carousel.tsx`: Carousel component.
    - `checkbox.tsx`: Checkbox component.
    - `dialog.tsx`: Dialog component.
    - `dropdown-menu.tsx`: Dropdown menu component.
    - `input.tsx`: Input field component.
    - `label.tsx`: Label component.
    - `pagination.tsx`: Pagination component.
    - `radio-group.tsx`: Radio

group component.

- `select.tsx`: Select dropdown component.
- `separator.tsx`: Separator component.
- `sheet.tsx`: Sheet component.
- `skeleton.tsx`: Skeleton loading component.
- `textarea.tsx`: Textarea component.

- **AboutComponent.tsx**: Component for the "About Us" section.
- **ComingSoon.tsx**: Component for "Coming Soon" page.
- **CustomersReview.tsx**: Component for customer reviews.
- **HeroSection.tsx**: Hero section component.
- **LazyImage.tsx**: Lazy loading image component.
- **Loader.tsx**: Loading spinner component.
- **Pagination.tsx**: Pagination component.
- **PrivateRoute.tsx**: Component for handling private routes.
- **ProductDetailsComponent.tsx**: Component for product details.
- **ProgressSteps.tsx**: Component for progress steps.
- **ReviewsCarousel.tsx**: Carousel component for reviews.
- **toastConfig.ts**: Configuration for toast notifications.
- **TrackOrderProgressSteps.tsx**: Component for tracking order progress steps.

### `lib` Directory

Contains library files and utilities.

- `utils.ts`: Utility functions.

### `pages` Directory

Contains components for different pages of the application.

- **about**: Components for the about page.
    - `AboutHero.tsx`: Hero section of the about page.
    - `AboutMain.tsx`: Main content of the about page.
    - `ActionPurpose.tsx`: Section about the action purpose.
    - `GlobalReach.tsx`: Section about global reach.
    - `OurLeader.tsx`: Section about the leadership.
    - `SectionAfterHero.tsx`: Section after the hero section.
    - `SmallAboutNav.tsx`: Small navigation component for the about page.
    - `Technologies.tsx`: Section about technologies used.

- **admin**: Components for admin functionalities.
    - `AddProduct.tsx`: Component for adding a new product.
    - `AdminRoute.tsx`: Component for handling admin routes.
    - `EditProductModal.tsx`: Modal component for editing a product.
    - `ProductList.tsx`: Component for displaying a list of products.

- **auth**: Components related to authentication.
    - `Login.tsx`: Login component.
    - `Register.tsx`: Register component.

- **cart**: Components related to the shopping cart.
    - `Cart.tsx`: Main cart component.
    - `Checkout.tsx`: Checkout component.

- **order**: Components related to orders.
    - `OrderDetails.tsx`: Order details component.
    - `PaymentSuccessConfetti.tsx`: Confetti animation for successful payment.
    - `SuccessMessage.tsx`: Success message component.

- **products**: Components related to products.
    - `ProductDesc.tsx`: Product description component.
    - `ProductDetails.tsx`: Product details component.
    - `ProductReview.tsx`: Product review component.
    - `SimilarProducts.tsx`: Similar products component.
    - `SmallNav.tsx`: Small navigation component.

- **users**: Components related to user accounts.
    - `Profile.tsx`: User profile component.
    - `Contact.tsx`: Contact information component.
    - `Favorites.tsx`: Favorites component.
    - `Home.tsx`: Home page component.
    - `Shop.tsx`: Shop page component.

### `redux` Directory

Contains Redux setup files.

- **api**: API slices.
    - `apiSlice.ts`: Main API slice.
    - `cartApiSlice.ts`: API slice for the cart.
    - `paymentApiSlice.ts`: API slice for payment.
    - `productApiSlice.ts`: API slice for products.
    - `userApiSlice.ts`: API slice for users.

- **features**: Redux features.
    - `authSlice.ts`: Slice for authentication state.
    - `cartSlice.ts`: Slice for cart state.
    - `favoriteSlice.ts`: Slice for favorite products state.

- **store.ts**: Redux store setup.

### `types` Directory

Contains TypeScript type definitions.

- `Cart.ts`: Type definitions for the cart.
- `Product.ts`: Type definitions for products.

### `utils` Directory

Contains utility functions and constants.

- `cartUtils.ts`: Utility functions for the cart.
- `constants.ts`: Application constants.
- `localStorage.ts`: Utility functions for local storage.

### Main Application Files

- **App.tsx**: Main application component.
- **Container.tsx**: Container component.
- **ErrorPage.tsx**: Error page component.
- **index.css**: Main stylesheet.
- **Layout.tsx**: Layout component.
- **main.tsx**: Main entry point.
- **Routes.tsx**: Routes configuration.
- **vite-env.d.ts**: TypeScript declarations for Vite.

### Configuration Files

- **.eslintrc.cjs**: ESLint configuration.
- **.gitignore**: Git ignore file.
- **components.json**: JSON file listing components.
- **index.html**: Main HTML file.
- **package.json**: NPM package configuration.
- **package-lock.json**: NPM lock file.
- **postcss.config.js**: PostCSS configuration.
- **README.md**: This README file.
- **tailwind.config.js**: Tailwind CSS configuration.
- **tsconfig.json**: TypeScript configuration.
- **tsconfig.node.json**: TypeScript configuration for Node.
- **vercel.json**: Vercel deployment configuration.
- **vite.config.ts**: Vite configuration.

## Installation

To install the necessary dependencies for the application, run the following command:

```sh
npm install
```

## Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To build the application for production, run the following command:

```sh
npm run build
```

The built files will be in the `dist` directory.

## Linting and Formatting

To lint the code using ESLint, run the following command:

```sh
npm run lint
```

To format the code using Prettier, run the following command:

```sh
npm run format
```

## Configuration

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.js`. You can customize the design system by modifying this file.

### TypeScript

TypeScript configuration files are `tsconfig.json` and `tsconfig.node.json`.

### Vite

Vite is used as the build tool. The configuration file is `vite.config.ts`.

## Vercel Deployment

To deploy the application on Vercel, use the provided `vercel.json` configuration file. You can deploy the application
by running the following command:

```sh
vercel
```

Ensure you have the Vercel CLI installed and configured with your account.

## Live Deployed URL

https://shoes-jet.vercel.app/

---

This README provides a comprehensive overview of the Shoes E-commerce web application, detailing its structure,
components, and configurations to help you set up, develop, and deploy the application efficiently.
