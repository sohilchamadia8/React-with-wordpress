import { useFormik } from 'formik'
import { Appconfig } from '../Appconfig'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from './Common'
import Loader from './Loader'

function Login() {

  const navigate = useNavigate();
  const loginText = 'Login'
  const [buttonText, setButtonText] = useState(loginText)

  useEffect(() => {
    if (isUserLoggedIn() != null) {
      navigate('/')
    }
  })
  const initialValues = {
    username: '',
    password: '',
  }

  const onSubmit = (values) => {
    let endpoint = '/wp-json/jwt-auth/v1/token'
    let apiUrl = Appconfig.siteUrl + endpoint
    setButtonText(<Loader />)
    axios
      .post(apiUrl, values)
      .then(response => {
        setLoginData({ ...loginData, isLogin: true, error: '' })
        // Set Login User data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_name', response.data.user_display_name);
        localStorage.setItem('user_email', response.data.user_email);
        
        navigate('/');

      })
      .catch(error => {
        setLoginData({ ...loginData, isLogin: false, error: 'Username or Password is wrong!' })
        setButtonText(loginText)
        console.log(error)
      })
  }

  const validate = values => {
    let errors = {}
    if (!values.username) {
      errors.username = 'Field is Required'
    }

    if (!values.password) {
      errors.password = 'Field is Required'
    }
    return errors
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  })

  const [loginData, setLoginData] = useState({
    isLogin: true,
    error: '',
  })
  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p className="text-center small">Enter your username & password to login</p>
                    </div>

                    <form className="row g-3 needs-validation" onSubmit={formik.handleSubmit}>

                      <div className="col-12">
                        <label htmlFor="username" className="form-label">Email-ID/Username</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" name="username" className="form-control" id="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                          {(formik.touched.username && formik.errors.username) ? <div className="error">{formik.errors.username}</div> : null}
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {(formik.touched.password && formik.errors.password) ? <div className="error">{formik.errors.password}</div> : null}
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                          <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">{buttonText}</button>
                      </div>
                      <div className="col-12">
                        {(!loginData.isLogin) ? <div className='small mb-0 error'>{loginData.error}</div> : null}
                      </div>
                    </form>

                  </div>
                </div>

                <div className="credits">
                  Developed by <a href="https://sohilchamadia8.wordpress.com/" target="_blank">Sohil Chamadia</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login