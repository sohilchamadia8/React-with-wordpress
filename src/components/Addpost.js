import { useFormik } from 'formik'
import Sidebar from './Sidebar'
import Header from './Header'
import { Appconfig } from '../Appconfig'
import axios from 'axios'
import { isUserLoggedIn } from './Common'
import { useState } from 'react'
import Loader from './Loader'
import { Link, Navigate,useNavigate } from 'react-router-dom'

function Addpost() {
  const navigate = useNavigate();
  const addPostlabel = 'Publish'
  const [buttonText, setButtonText] = useState(addPostlabel)
  const initialValues = {
    title: '',
    content: '',
    excerpt: '',
  }

  const onSubmit = values => {
    setButtonText(<Loader />)
    let endpoint = '/wp-json/wp/v2/posts'
    let apiUrl = Appconfig.siteUrl + endpoint
    let authToken = isUserLoggedIn()
    values.status = 'publish';
    axios
      .post(apiUrl, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => {
        setButtonText(addPostlabel)
        navigate('/post');
        //  navigate('/');

      })
      .catch(error => {
        console.log(error)
      })
  }

  const validate = values => {
    const errors = {}

    if (!values.title)
      errors.title = 'Title is required'

    if (!values.excerpt)
      errors.excerpt = 'Excerpt is required'

    if (!values.content)
      errors.content = 'Description is required'

    return errors
  }


  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Add Post</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item">Posts</li>
              <li className="breadcrumb-item active">Add Post</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add Post</h5>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">Title</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" name="title" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} />
                        {(formik.touched.title && formik.errors.title) ? <div className='error'>{formik.errors.title}</div> : ''}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Description</label>
                      <div className="col-sm-10">
                        <textarea className="form-control" style={{ height: "100px" }} name="content" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content} ></textarea>
                        {(formik.touched.content && formik.errors.content) ? <div className='error'>{formik.errors.content}</div> : ''}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Excerpt</label>
                      <div className="col-sm-10">
                        <textarea className="form-control" style={{ height: "40px" }} name="excerpt" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.excerpt}></textarea>
                        {(formik.touched.excerpt && formik.errors.excerpt) ? <div className='error'>{formik.errors.excerpt}</div> : ''}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">{buttonText}</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Addpost;
