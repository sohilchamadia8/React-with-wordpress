import axios from 'axios'
import { Appconfig } from '../Appconfig'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Loader from './Loader'
import { Link, Navigate } from "react-router-dom"

function Post() {

  const [posts, setPosts] = useState({});
  const [loading, setLoader] = useState(false);

  useEffect(() => {
    let endpoint = '/wp-json/wp/v2/posts?_embed'
    let apiUrl = Appconfig.siteUrl + endpoint
    setLoader(true)
    axios
      .get(apiUrl)
      .then(response => {
        setLoader(false)
        setPosts(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">

        <div className="pagetitle">
          <h1>Posts</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item">Posts</li>
              <li className="breadcrumb-item active">List</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row align-items-top">

            {(loading) ? <Loader /> : (posts.length > 0 ? posts.map(post => (
              <div className="col-lg-4" key={post.id}>
                <div className="card">
                  <img src={post.featured_media ? post._embedded['wp:featuredmedia'][0].source_url : 'assets/img/card.jpg'} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{post.title.rendered}</h5>
                    {(post.excerpt.rendered) ? <p className="card-text" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} /> : '-'}
                  </div>
                  <div className="card-footer mt-auto">
                    <Link to={`/SinglePost/${post.id}`} className="btn btn-primary">View Post</Link>
                  </div>
                </div>
              </div>
            )) : <h2 className="text-primary fw-bold align-text">No post found</h2>)}

          </div>
        </section>
      </main>
    </>
  );
}

export default Post;
