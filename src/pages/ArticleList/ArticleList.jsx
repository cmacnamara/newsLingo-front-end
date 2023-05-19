// components
import ArticleCategory from "../../components/ArticleCategory/ArticleCategory"

const ArticleList = (props) => {
  let articlesWithImages = props.articles.filter(article => (
    !!article.image_url
  ))

  articlesWithImages = articlesWithImages.filter((article, index, self) =>
    index === self.findIndex((t) => (
      t.title === article.title
    ))
  )

  const categorizedArticles = {}
  articlesWithImages.forEach(article => {
    if(categorizedArticles[article.category[0]]) 
      categorizedArticles[article.category[0]].push(article)
    else
      categorizedArticles[article.category[0]] = [article]
  })

  const categories = Object.keys(categorizedArticles)

  if(categories.includes('top')){
    const topCategory = categories.splice(categories.indexOf('top'), categories.indexOf('top'))
    categories.unshift(topCategory[0])
  }   

  if(!props.articles) return <h1>LOADING...</h1>

  return (
    <>
      {categories.map((category, idx) => (
        <ArticleCategory 
          key={idx} 
          category={category}
          articles={categorizedArticles[category]}
        />
      ))}
    </>
  )
}

export default ArticleList