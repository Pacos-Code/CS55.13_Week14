// Import the Layout component to wrap the page content
import Layout from '../../components/layout.js';
// Import the getAllIds and getData helpers for dynamic routes and console content
import { getAllIds, getData } from '../../lib/consoles.js';
import Head from 'next/head';
import Date from '../../components/date.js';
import utilStyles from '../../styles/utils.module.css';

 // Define the Post component that will be rendered on the console detail page
 export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <div className={utilStyles.dateBG}><Date dateString={postData.date} /></div>
          </div>
          <div className={utilStyles.postData}>
            <p className={utilStyles.headingLg}>{postData.manufacturer} {postData.model} ({postData.release_year})</p>
            <p className={utilStyles.headingMd}>Owned: {postData.years_owned} years</p>
            <p>{postData.console_review}</p>
          </div>
        </article>
      </Layout>
    );
  }
// Define getStaticPaths to prerender dynamic routes for all console IDs at build time
export async function getStaticPaths() {
    const paths = await getAllIds();
    return {
      paths,
      fallback: false,
    };
  }


  export async function getStaticProps({ params }) {
    // Fetch the console data for the given ID at build time (or revalidate)
    const postData = await getData(params.id);
   
    return {
      props: {
        postData,
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
  }