import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router';
import { useAddUserdbMutation } from 'src/services/AddApi';
import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Button, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import "../User/Add.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { adddata } from './context/ContextProvider';
import { Card } from '@mui/material';
import { editfunc, singleUsergetfunc } from 'src/services/Apis';
import { updateData } from 'src/components/context/ContextProvider';
import { BASE_URL } from 'src/services/helper';

const Edit = () => {
  const mystyle = {
    width: "275px",
    // position: "absolute",
    // margin: "-12px 300px"
  }

  const [userprofile, setUserProfile] = useState({});
  const { id } = useParams();
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
    hobbie: ""
  });

  console.log("Input data in update".inputdata);

  const [status, setStatus] = useState("Active");
  const [imgdata, setImgdata] = useState("");
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [hobbie, setHobbie] = useState('');
  // console.log("hobbie", hobbie);
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setHobbie(hobbie + ',' + value);

    } else {
      setHobbie(hobbie.replace(value + ',', ''));
    }
  };
  // console.log("Input data in update2", inputdata)

  const { update, setUpdate } = useContext(updateData)

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    // console.log("response======>>>>>>>>>>>", response);

    if (response.status === 200) {
      // console.log("resp",response.data.hobbie);
      setInputData(response.data)
      setStatus(response.data.status)
      setImgdata(response.data.image)
      setHobbie(response.data.hobbie)
    } else {
      console.log("error");
    }
  }
  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }
  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }
  // status set
  const setStatusValue = (e) => {
    // console.log("status", e);
    setStatus(e.target.value)
  }
  // console.log("checkedvalues",hobbie);
  useEffect(() => {
    userProfileGet()
  }, [id])

  useEffect(() => {
    if (image) {
      setImgdata("")
      setPreview(URL.createObjectURL(image))
    }
    userProfileGet()
    setTimeout(() => {
    }, 1200)
  }, [image]);


  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const navigate = useNavigate();

  //submit userdata
  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;
    if (fname === "") {
      toast.error("First name is Required !")
    } else if (lname === "") {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {
      const data = new FormData();
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      data.append("user_profile", image || imgdata)
      data.append("location", location)
      data.append("hobbie", hobbie)

      const config = {
        "Content-Type": "multipart/form-data"
      }

      const response = await editfunc(id, data, config)
      console.log("response", response);

      if (response.status === 200) {
        setUpdate(response.data)
        navigate("/List")
      }
    }
  }
  return (
    <>
      <div className="container">
        <h1>Update Your Data value..</h1>
        <NavLink className='btn' style={{ backgroundColor: "#5d87ff", color: "white" }} to="/">Dashboard</NavLink>
        <Card className='shadow mt-3 p-3'>
          {/* <div className="profile_div text-center">
                <img src={preview ? preview : "/man.png"} alt="img" />
                </div> */}
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" name='fname' value={inputdata.fname} onChange={setInputValue} placeholder='Enter FirstName' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setInputValue} placeholder='Enter LastName' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={`Male`}
                  name="gender"
                  value={"Male"}
                  onChange={setInputValue}
                  checked={inputdata.gender == "Male" ? true : false}
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                  checked={inputdata.gender == "Female" ? true : false}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Status</Form.Label>

                <select name="status" value={status} className={` form-select`} onChange={setStatusValue}>
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </select>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <div className="profile_div text-center">
                  <img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`} alt="img" />
                </div>
                <Form.Control type="file" name='user_profile' style={mystyle} onChange={setProfile} placeholder='Select Your Profile' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control type="text" name='location' value={inputdata.location} onChange={setInputValue} placeholder='Enter Your Location' />
              </Form.Group>
              <FormControl component='fieldset' fullWidth margin='normal'>
                <FormLabel component='legend'>Hobbie </FormLabel>

                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} name='hobbie' checked={hobbie.includes("Cricket")} label="Cricket" value="Cricket" onChange={handleCheckboxChange} />
                  <FormControlLabel control={<Checkbox />} name='hobbie' checked={hobbie.includes("Vollyball")} label="Vollyball" value="Vollyball" onChange={handleCheckboxChange} />
                  <FormControlLabel control={<Checkbox />} name='hobbie' checked={hobbie.includes("Music")} label="Music" value="Music" onChange={handleCheckboxChange} />
                  <FormControlLabel control={<Checkbox />} name='hobbie' checked={hobbie.includes("Travelling")} label="Travelling" value="Travelling" onChange={handleCheckboxChange} />
                  <FormControlLabel control={<Checkbox />} name='hobbie' checked={hobbie.includes("Reading")} label="Reading" value="Reading" onChange={handleCheckboxChange} />
                </FormGroup>
              </FormControl>
              <Button style={{ backgroundColor: "#5d87ff", color: "white" }} variant="primary" type="submit" onClick={submitUserData} >
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
        <ToastContainer position="top-right" />
      </div>
    </>
  )
}
export default Edit;