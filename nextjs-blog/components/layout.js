// Import Next.js Head component for managing document head elements (title, meta tags, etc.)
import Head from 'next/head';
// Import Next.js optimized Image component for better performance and automatic optimization
import Image from 'next/image';
// Import CSS module styles specific to this layout component
import styles from './layout.module.css';
// Import CSS module styles for utility classes
import utilStyles from '../styles/utils.module.css';
// Import Next.js Link component for client-side navigation between pages
import Link from 'next/link';

// Define the name of the site and the title of the site
const name = 'Francisco';
export const siteTitle = 'Headless CMS-Powered App';
 
export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Bevan:ital@0;1&family=Germania+One&family=Newsreader:opsz,wght@6..72,688&display=swap" rel="stylesheet"/>
        <meta
          name="description"
          content="A headless CMS-powered app blog about things I have owned"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {siteTitle}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}