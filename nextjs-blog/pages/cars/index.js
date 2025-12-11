
// Import Next.js Head component for managing document head elements (title, meta tags, etc.)
import Head from 'next/head';
// Import the Layout component and siteTitle constant from the layout component
import Layout from '../../components/layout';
// Import CSS module styles for utility classes
import utilStyles from '../../styles/utils.module.css';
// Import the getSortedList function from the cars.js file
import { getSortedList } from '../../lib/cars.js';
import Link from 'next/link';
import Date from '../../components/date';
// Define the getStaticProps function that will be called at build time to get the allPostsData
export async function getStaticProps() {
  // Get the allPostsData from the cars.js file to pass it to the CarsPage component
  const allPostsData = await getSortedList();
  return {
    props: {
      allPostsData,
    },
    revalidate: 60 // Revalidate every 60 seconds
  };
}

// Define the CarsPage component that will be rendered on the cars index page and pass the allPostsData as a prop
export default function CarsPage({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Owned Cars</title>
      </Head>
      <section className={utilStyles.headingXl}>
        <p>Here are the cars I have owned:</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Owned Cars</h2>
        <ul className={`${utilStyles.list} ${utilStyles.formatList}`}>
          {allPostsData.map(({ id, title, date }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/cars/${id}`}>{title}</Link>
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