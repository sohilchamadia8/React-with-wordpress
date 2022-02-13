import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios'
import { Appconfig } from '../Appconfig'
import { useEffect, useState } from 'react'
import { Link, Navigate } from "react-router-dom"

function Dashboard() {

  const [countPost, setPostCount] = useState(0)
  const [countUser, setUserCount] = useState(0)

  useEffect(() => {
    let postEndpoint = '/wp-json/wp/v2/posts'
    let postApiUrl = Appconfig.siteUrl + postEndpoint
    let userEndpoint = '/wp-json/wp/v2/users'
    let userApiUrl = Appconfig.siteUrl + userEndpoint

    axios
      .get(postApiUrl)
      .then(response => {
        setPostCount(response.data.length)
      })
      .catch(error => {
        console.log(error)
      })

    axios
      .get(userApiUrl)
      .then(response => {
        setUserCount(response.data.length)
      })
      .catch(error => {
        console.log(error)
      })

  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="Dashboard">
        <main id="main" className="main">

          <div className="pagetitle">
            <h1>Dashboard</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </nav>
          </div>

          <section className="section dashboard">
            <div className="row">


              <div className="col-lg-12">
                <div className="row">


                  <div className="col-xxl-4 col-md-6">
                    <div className="card info-card sales-card">


                      <div className="card-body">
                        <h5 className="card-title">Posts</h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-file-earmark-post"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{countPost}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-4 col-xl-6">
                    <div className="card info-card customers-card">
                      <div className="card-body">
                        <h5 className="card-title">Users</h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{countUser}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
