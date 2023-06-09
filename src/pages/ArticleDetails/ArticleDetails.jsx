// npm modules
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

// css & assets
import styles from './ArticleDetails.module.css'
import articleImgPlaceholder from '../../assets/branding/logo.png'

// services
import * as articleService from '../../services/articleService'
import * as wordService from '../../services/wordService.js'

// pages
import Loading from "../Loading/Loading"

// components
import ArticleHeader from "../../components/ArticleHeader/ArticleHeader"
import ArticleBody from "../../components/ArticleBody/ArticleBody"
import WordLookup from "../../components/WordLookup/WordLookup"
import NewComment from "../../components/NewComment/NewComment"
import Comments from "../../components/Comments/Comments"

const ArticleDetails = (props) => {
  const {articleId} = useParams()
  const [article, setArticle] = useState(null)
  const [translations, setTranslations] = useState([])

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await articleService.show(articleId)
      setArticle(data)
    }
    fetchArticle()
  }, [articleId])

  const handleAddComment = async (commentFormData) => {
    const newComment = await articleService.createComment(articleId, commentFormData)
    setArticle({ ...article, comments: [...article.comments, newComment]})
  }

  const handleDeleteComment = async (articleId, commentId) => {
    await articleService.deleteComment(articleId, commentId)
    setArticle({...article, comments: article.comments.filter(comment => comment._id !== commentId)})
  }

  const handleFetchDefinition = async (query) => {
    const data = await wordService.getTranslationFromAPI(query.toLowerCase())

    if(data[0].hwi) {
      const noAccentQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

      const filteredData = data.filter(element => (element.meta.stems.includes(query.toLowerCase()) || element.meta.stems.includes(noAccentQuery)) && element.meta.lang === 'es')
      
      const newWordTranslations = filteredData.map(entry => {
        const translationInfo = {}
        translationInfo.queryWord = entry.hwi.hw
        translationInfo.partOfSpeech = entry.fl
        translationInfo.translations = entry.shortdef.map(def => def)
        return translationInfo
      })

      setTranslations([...translations, newWordTranslations])
    } else {
      setTranslations([...translations, data])
    }
  }

  if (!article) return <Loading />

  const image_url = article.image_url.slice(0,5) === 'https' ? article.image_url : articleImgPlaceholder

  return (
    <main className={styles.articleDetails}>
      <ArticleHeader 
        title={article.title}
        creator={article.creator} 
        pubDate={article.pubDate} 
        category={article.category}
        image_url={image_url}
      />
      <ArticleBody 
        content={article.content}
        handleFetchDefinition={handleFetchDefinition}
      />
      <WordLookup 
        translations={translations}
        handleAddWord={props.handleAddWord}
        handleDeleteWord={props.handleDeleteWord}
        handleFetchDefinition={handleFetchDefinition}
        dictionary={props.dictionary}
      />
      <section>
        <h1>Comments</h1>
        <NewComment handleAddComment={handleAddComment}/>
        <Comments 
          comments={article.comments} 
          user={props.user} 
          articleId={articleId}
          handleDeleteComment={handleDeleteComment}
        />
      </section>
    </main>
  )
}

export default ArticleDetails