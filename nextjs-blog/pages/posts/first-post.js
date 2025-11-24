// Import Next.js Head component for managing document head elements (title, meta tags, etc.)
import Head from 'next/head';   
// Import Next.js Link component for client-side navigation between pages
import Link from 'next/link';
// Import Next.js Script component for loading third-party scripts with optimization
//import Script from 'next/script';
// Import the Layout component to wrap the page content
import Layout from '../../components/layout';
 
// Define the FirstPost component that will be rendered on the first post page
export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        {/* Link to the home page */}
        <Link href="/">← Back to home</Link>
      </h2>
    </Layout>
  );  
}