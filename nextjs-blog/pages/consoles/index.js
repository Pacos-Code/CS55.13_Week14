
// Import Next.js Head component for managing document head elements (title, meta tags, etc.)
import Head from 'next/head';
// Import the Layout component and siteTitle constant from the layout component
import Layout from '../../components/layout';
// Import CSS module styles for utility classes
import utilStyles from '../../styles/utils.module.css';
// Import the getSortedList function from the consoles.js file
import { getSortedList } from '../../lib/consoles.js';
import Link from 'next/link';
import Date from '../../components/date';
// Define the getStaticProps function that will be called at build time to get the allPostsData
export async function getStaticProps() {
  // Get the allPostsData from the consoles.js file to pass it to the ConsolesPage component
  const allPostsData = await getSortedList();
  return {
    props: {
      allPostsData,
    },
    revalidate: 60 // Revalidate every 60 seconds
  };
}

// Define the ConsolesPage component that will be rendered on the consoles index page and pass the allPostsData as a prop
export default function ConsolesPage({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Owned Consoles</title>
      </Head>
      <section className={utilStyles.headingXl}>
        <p>Here are the consoles I have owned:</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Owned Consoles</h2>
        <ul className={`${utilStyles.list} ${utilStyles.formatList}`}>
          {allPostsData.map(({ id, title, date }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/consoles/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}