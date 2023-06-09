// css
import styles from './WordLookup.module.css'

// components
import TranslationCard from '../TranslationCard/TranslationCard'

const WordLookup = (props) => {
  return (
    <aside className={styles.wordLookup}>
      {props.translations.map((translation, idx) =>
        <TranslationCard 
          key={idx} 
          translation={translation}
          handleAddWord={props.handleAddWord}
          handleDeleteWord={props.handleDeleteWord}
          handleFetchDefinition={props.handleFetchDefinition}
          dictionary={props.dictionary}
        />
      )}
    </aside>
  )
}

export default WordLookup