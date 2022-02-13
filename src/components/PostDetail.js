import axios from 'axios'
import { Appconfig } from '../Appconfig'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import Moment from 'moment'
import { Link, Navigate } from "react-router-dom"

function PostDetail() {
  let { id } = useParams()
  const [post, setPost] = useState({});
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    let endpoint = `/wp-json/wp/v2/posts/${id}?_embed`
    let apiUrl = Appconfig.siteUrl + endpoint
    axios
      .get(apiUrl)
      .then(response => {  
        setPost(response.data)
        setLoader(false)
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
          <h1>Post</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item">Post</li>
              <li className="breadcrumb-item active">Details</li>
            </ol>
          </nav>
        </div>

        <section className="section profile">
          {(loading ? <Loader /> :
            <div className="row">
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-body profile-card pt-4 d-flex flex-column">
                    <img src={post.featured_media ? post._embedded['wp:featuredmedia'][0].source_url : '/assets/img/card.jpg'} alt="Post" className="rd-circle feat-img" />
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="card">
                  <div className="card-body pt-3">
                    <div className="tab-content pt-2">
                      <div className="tab-pane fade show active profile-overview" id="profile-overview">
                        <h5 className="card-title">Description</h5>
                        {(post.content.rendered) ? <p className="small fst-italic" dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> : <p className="small fst-italic">-</p>}
                        <h5 className="card-title">Post Data</h5>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label ">Title</div>
                          <div className="col-lg-9 col-md-8">{post.title.rendered}</div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">Summary</div>
                          <div className="col-lg-9 col-md-8" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">Created</div>
                          <div className="col-lg-9 col-md-8">{Moment(post.date).format('Do, MMMM YYYY')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default PostDetail;
