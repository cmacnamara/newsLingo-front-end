// css
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      For this demo, you can view articles dating from May 18, 2023 to Nov 23, 2023. Select
      an article to read and to add to your dictionary of spanish words!
    </div>
  );
}

export default Banner