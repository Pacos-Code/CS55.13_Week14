// Import Next.js Head component for managing document head elements (title, meta tags, etc.)
import Head from 'next/head';
// Import the Layout component and siteTitle constant from the layout component
import Layout, { siteTitle } from '../components/layout';
// Import CSS module styles for utility classes
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';


// Define the Home component that will be rendered on the home page and pass the allPostsData as a prop
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingXl}>
        <p>Hello, I'm Francisco. I am a Full Stack Web Dev student.</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Learn some random stuff about me below:</h2>
        <ul className={`${utilStyles.list} ${utilStyles.formatList}`}>
          <li className={utilStyles.listItem}>
            <Link href={`/cars`}>Owned Cars</Link>
            <br />
          </li>
          <li className={utilStyles.listItem}>
            <Link href={`/consoles`}>Owned Consoles</Link>
            <br />
          </li>
          <li className={utilStyles.listItem}>
            <Link href={`/games`}>Favorite Games</Link>
            <br />
          </li>
        </ul>
      </section>
    </Layout>
  );
}