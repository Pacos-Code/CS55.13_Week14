// `pages/_app.js`
// Import global CSS styles that will be applied to all pages in the application
import '../styles/global.css';
// Define the App component that will be rendered on all pages in the application
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}