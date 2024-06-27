// npm modules
import { useState } from 'react'

// css
import styles from './WordCard.module.css'

// components
import Icon from '../Icon/Icon'

const WordCard = ({word, handleDeleteWord}) => {
  const [showDefinition, setShowDefinition] = useState(false)
  const [flipCard, setFlipCard] = useState(false)

  const triggerAnimation = () => {
    setFlipCard(true)
    setTimeout(() => {
      setFlipCard(false)
    }, 500)
  }

  const handleWordCardClick = () => {
    triggerAnimation()
    setShowDefinition(!showDefinition)
  }

  const partOfSpeechArr = word.partOfSpeech.map((part => part))
  const wordObj = word.translation.map((translation, idx) => {
    return {
      translation: translation,
      partOfSpeech: partOfSpeechArr[idx]
    }
  })

  return (
    <div
      className={styles.wordContainer}
      id={flipCard ? styles.flip : ""}
      onClick={handleWordCardClick}
    >
      <button
        onClick={() => {
          handleDeleteWord(word._id);
          setFlipCard(false);
        }}
      >
        <Icon category={"Close"} />
      </button>
      {showDefinition ? (
        <>
          {wordObj.map((wordEl) => (
            <>
              <h3>
                {wordEl.translation} ({wordEl.partOfSpeech})
              </h3>
            </>
          ))}
        </>
      ) : (
        <h1>{word.word}</h1>
      )}

      <Icon category={"Show"} />
    </div>
  );
}

export default WordCard