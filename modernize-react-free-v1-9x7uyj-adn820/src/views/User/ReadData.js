import React, { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row'
import { useParams } from 'react-router-dom'
import { singleUsergetfunc } from 'src/services/Apis'
// import Spiner from "../../components/Spiner/Spiner"
// import {singleUsergetfunc} from "../../services/Apis"
// import { BASE_URL } from '../../services/helper'
// import moment from "moment"
import "./profile.css"
import { BASE_URL } from 'src/services/helper'

const ReadData = () => {

  const [userprofile, setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams();

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    console.log("response======>>>>>>>>>>>", response);

    if (response.status === 200) {
      setUserProfile(response.data)
    } else {
      console.log("error");
    }
  }
  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id])
  return (
    <>
      <div className="container">
        <Card className='card-profile shadow col-lg-12 mx-auto mt-5'>
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <img src={`${BASE_URL}/uploads/${userprofile.image}`} alt="" />
                </div>
              </div>
            </Row>
            <div className='text-center'>
              <h3><i class="fa-solid fa-circle-info"></i>{userprofile.fname + userprofile.lname}</h3>
              <h4><i className="fa-solid fa-envelope email"></i>&nbsp;  <span>{userprofile.email}</span> </h4>
              <h5><i className="fa-solid fa-mobile"></i>&nbsp;  <span>{userprofile.mobile}</span> </h5>
              <h4><i className="fa-solid fa-person"></i>&nbsp;  <span>{userprofile.gender}</span> </h4>
              <h4><i className="fa-solid fa-location-pin location"></i>&nbsp;  <span>{userprofile.location}</span> </h4>
              <h4>Country&nbsp; : <span>{userprofile.country}</span> </h4>
              <h4>State&nbsp; : <span>{userprofile.state}</span> </h4>
              <h4>City&nbsp; : <span>{userprofile.city}</span> </h4>
              <h4>Status&nbsp; : <span>{userprofile.status}</span> </h4>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default ReadData