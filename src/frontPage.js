import React, { useState, useEffect } from 'react'
import moment from 'moment'
const NYT_API_KEY = `${process.env.REACT_APP_NYT_API_KEY}`

// console.log('FRONTPAGE.JS API KEY: ', NYT_API_KEY)
// https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=pub_date:1995-10-11&page=1&api-key=TTrmfkYkTYzxsC69bFfwIWViFywZOdXV

export default function FrontPage() {

  let today = moment().format()
  today = today.substring(0, today.indexOf('T'))

  // let today = new Date().toISOString()
  // today = today.substring(0, today.indexOf('T'))
  // console.log(today)

  const [articles, setArticles] = useState([])
  const [date, setDate] = useState(today)
  const [page, setPage] = useState(1)

  useEffect(() => {
    console.log('useeffect ran')
    const getArticles = async () => {
      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=pub_date:${date}&page=${page}&api-key=${NYT_API_KEY}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const articleData = data.response.docs
        if (page === 1) {
          setArticles(articleData)
          console.log('page === 1 hit')

        } else if (page !== 1) {
          setArticles(articles.concat(articleData))
          console.log("loading extra page")
        }
      } else {
        console.log('Loading...')
      }
    }

    getArticles()

  }, [date, page])


  function handleSubmit(event) {
    console.log('submitted')
    event.preventDefault()
    let inputDate = document.querySelector('#inputDate').value
    setArticles([])
    setPage(1)
    setDate(inputDate)
  }

  // const changeHandler = e => {
  //   let iso = new Date(e.target.value).toISOString()
  //   iso = iso.substring(0, iso.indexOf('T'))
  //   setDate(iso)
  //   // console.log(iso)
  // }

  if (articles.length !== 0) {
    return (
      <div>
        <div className='container'>
          {/* <div className='card mt-5'> */}
          <div className='container mb-5'>
            <div className='container'>
              <div className='title-card logo-border'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/NewYorkTimes.svg/2560px-NewYorkTimes.svg.png' className='m-5' alt='' />
                <div className='logo-border'></div>
                <div className='header-div justify-content-center'>
                  <div className='mr-3 mt-5 headline'> Top headlines on </div>
                  <form className='form-floating form-inline mt-5'>
                    <input type='date' id='inputDate' name='date' className='form-control form-control-lg' />
                    {/* <input type="submit" onSubmit={handleSubmit} className='btn btn-lg btn-outline-dark mx-3' /> */}
                    <button onClick={handleSubmit} type='submit' className=' mx-3 btn btn-lg btn-outline-dark'> Submit </button>
                  </form>
                </div>

              </div>
              <div className="row">
                {articles.map((article, index) => {
                  return (
                    <div className='col-md-4 mt-3 mb-3' key={index}>
                      <div className='newspaper-card mb-3 shadow h-100 pointer' onClick={() => window.open(`${article.web_url}`)}>
                        <img
                          src={article.multimedia[0]?.url ? `https://www.nytimes.com/${article.multimedia[0]?.url}` : `https://static01.nyt.com/newsgraphics/images/icons/defaultPromoCrop.png`}
                          className='article-image'
                          alt=''
                        />
                        <div className='newspaper-body'>
                          <h5 className='card-title'>{article.headline.main}</h5>
                          <p>
                            <small>{article.byline.original}</small>
                          </p>
                          <p className='card-text'>
                            {article.abstract}
                          </p>
                        </div>
                        <div className='newspaper-footer'>
                          <p className='tag'> {article.section_name} </p>
                          {/* <p className='tag'>{new Date(article.pub_date).toLocaleDateString()}</p> */}
                          {/* <p classname='tag'> {today} </p> */}
 
                        </div>
                      </div>
                    </div>
                  )
                })
                }
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-outline-dark btn-lg' onClick={() => setPage(page + 1)}>
            Load more...
          </button>
        </div>
        <div className='nyt-logo'>
          <img src='https://developer.nytimes.com/files/poweredby_nytimes_30a.png?v=1583354208339' alt='' />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    )
  }
}