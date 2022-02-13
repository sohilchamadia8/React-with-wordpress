import { getUserName, getUserEmail } from './Common'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Appconfig } from '../Appconfig'
import Sidebar from './Sidebar'
import Header from './Header'
import Loader from './Loader'
import { Link, Navigate } from "react-router-dom"

function UserProfile() {

  const [user, setUser] = useState(null)
  const [loading, setLoader] = useState(true)

  useEffect(() => {
    setLoader(true)
    let user_email = getUserName()
    let endpoint = '/wp-json/wp/v2/users/?username=' + user_email
    let apiUrl = Appconfig.siteUrl + endpoint
    axios
      .get(apiUrl)
      .then(response => {
        setUser(response.data[0])
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
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item">Users</li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>

        {(loading) ? <Loader /> :
          <section className="section profile">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body pt-3">
                    <div className="text-center">
                      <img src={user.avatar_urls[96]} alt="Profile" className="rounded-circle" />
                    </div>
                    <div className="tab-content pt-2">
                      <div className="tab-pane fade show active profile-overview" id="profile-overview">
                        <h5 className="card-title">About</h5>
                        <p className="small fst-italic">{(user.description != '') ? user.description : '--'}</p>
                        <h5 className="card-title">Profile Details</h5>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label ">Full Name</div>
                          <div className="col-lg-9 col-md-8">{user.name}</div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">Email</div>
                          <div className="col-lg-9 col-md-8">{getUserEmail()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      </main>
    </>
  );
}

export default UserProfile;
