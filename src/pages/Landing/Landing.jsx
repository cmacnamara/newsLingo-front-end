// css
import styles from './Landing.module.css'
import logo from '../../assets/branding/logo.png'

const Landing = () => {
  return (
    <>
      <main className={styles.landingContainer}>
        <section className={styles.splash}>
          <img src={logo} alt="NewsLingo" />
        </section>

        <section className={styles.about}>
          <header>
            <h1>What does NewsLingo solve?</h1>
          </header>
          <article>
            <p>
              News articles are a great source for practicing a new language and learning about the cultures of those who speak it. For novice and intermediate-level language learners, news articles can be challenging to interpret.
            </p>
          </article>
        </section>

        <section className={styles.summary}>
          <header>
            <h1>How is NewsLingo different from the rest?</h1>
          </header>
          <article>
            <ul>
              <li>NewsLingo scaffolds learners’ interpretive reading with convenient word-to-word translations within authentic, up-to-date news articles.</li>
              <li>It boosts learners’ language acquisition with  a personal dictionary to keep track of newly learned vocabulary. </li>
              <li>It allows learners to interact with a community of language learners via a comment section on each article.</li>
            </ul>
          </article>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2023 NEWSLINGO ALL RIGHTS RESERVED</p>
      </footer>
    </>
  )
}

export default Landing