// Import the Layout component to wrap the page content
import Layout from '../../components/layout.js';
// Import the getAllIds and getData helpers for dynamic routes and game content
import { getAllIds, getData } from '../../lib/games.js';
import Head from 'next/head';
import Date from '../../components/date.js';
import utilStyles from '../../styles/utils.module.css';
import Image from 'next/image';

 // Define the Post component that will be rendered on the game detail page
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
            {postData.image_url ? (
              <Image src={postData.image_url} alt={postData.game_title} width={1024} height={576} />
            ) : null}
            <p>Game Title: {postData.game_title}</p>
            <p>Developer: {postData.developer}</p>
            <p>Release Year: {postData.release_year}</p>
            <p>Genre: {postData.genre}</p>
            <p>{postData.game_review}</p>
          </div>
        </article>
      </Layout>
    );
  }
// Define getStaticPaths to prerender dynamic routes for all game IDs at build time
export async function getStaticPaths() {
    const paths = await getAllIds();
    return {
      paths,
      fallback: false,
    };
  }


  export async function getStaticProps({ params }) {
    // Fetch the game data for the given ID at build time (or revalidate)
    const postData = await getData(params.id);
   
    return {
      props: {
        postData,
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
  }