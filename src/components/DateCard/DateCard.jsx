
// css
import styles from './DateCard.module.css'

const DateCard = ({ createdAt }) => {
  const date = new Date(createdAt).toLocaleDateString()
  return (
    <div className={styles.dateCard}>
      <h5>{date}</h5>
    </div>
  )
}

export default DateCard
