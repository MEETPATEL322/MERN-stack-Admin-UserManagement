import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { useAddUserdbMutation } from 'src/services/AddApi';
import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Button, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import "../User/Add.css"
import { Country, State, City } from "country-state-city";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { adddata } from './context/ContextProvider';
import { Card } from '@mui/material';

import { registerfunc } from 'src/services/Apis';
import { addData } from 'src/components/context/ContextProvider';

const AddData = () => {
  const mystyle = {
    width: "275px",
    // position: "absolute",
    // margin: "-12px 300px"
  }

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
    country: "",
    state: "",
    city: ""
  });

  console.log(inputdata);

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [hobbie, setHobbie] = useState([])


  //state handler for country city and state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  console.log("selected company", selectedCountry)
  console.log("selected state", selectedState)
  console.log("selected city", selectedCity)

  // Multi Checkbox
  const getPjl = (e) => {

    const { value, checked } = e.target
    console.log(`${value} is ${checked}`);

    if (checked) {
      setHobbie([...hobbie, value])
    }
    else {
      setHobbie(hobbie.filter((e) => e !== value))
    }
  }
  //   let data = pjl
  //   data.push(e.target.value)
  //   setPjl(data)
  // }

  // status option
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // status set
  const setStatusValue = (e) => {
    // console.log(e);
    setStatus(e.value)
  }
  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      //   setShowSpin(false)
    }, 1200)
  }, [image])
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const { useradd, setUseradd } = useContext(addData)
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
    } else if (selectedCountry === null) {
      toast.error("Country is Required !")
    } else if (selectedState === null) {
      toast.error("State is Required !")
    } else if (selectedCity === null) {
      toast.error("City is Required !")
    } else if (image === "") {
      toast.error("Image is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {
      toast.success("Registartion is succesfully");
      const data = new FormData();
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      data.append("user_profile", image)
      data.append("location", location)
      data.append("hobbie", hobbie)
      data.append("country", selectedCountry.name)
      data.append("state", selectedState.name)
      data.append("city", selectedCity.name)
      data.append("countryisocode", selectedCountry.isoCode)
      data.append("stateisocode", selectedState.isoCode)
      const config = {
        "Content-Type": "multipart/form-data"
      }
      const response = await registerfunc(data, config);
      console.log("response", response);
      if (response.status === 200) {
        setInputData({
          ...inputdata,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
          country: "",
          state: "",
          city: ""
        });
        setStatus("");
        setImage("")
        setUseradd(response.data)
        navigate("/List");

      } else {
        toast.error("Error!")
      }

    }

  }
  return (
    <>
      <div className="container">
        <h1>Add page</h1>
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
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Status</Form.Label>
                <Select options={options} onChange={setStatusValue} />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Country</Form.Label>

                <Select
                  options={Country.getAllCountries()}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedCountry}
                  onChange={(item) => {
                    setSelectedCountry(item);
                  }}
                />
              </Form.Group> <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your State</Form.Label>
                {/* <Select options={options} onChange={setStatusValue} /> */}

                <Select
                  options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedState}
                  onChange={(item) => {
                    setSelectedState(item);
                  }}
                />
              </Form.Group> <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your City</Form.Label>
                {/* <Select options={options} onChange={setStatusValue} /> */}
                <Select
                  options={City.getCitiesOfState(
                    selectedState?.countryCode,
                    selectedState?.isoCode
                  )}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedCity}
                  onChange={(item) => {
                    setSelectedCity(item);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control type="text" name='location' value={inputdata.location} onChange={setInputValue} placeholder='Enter Your Location' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <div className="profile_div text-center">
                  <img src={preview ? preview : "/man.png"} alt="img" />
                </div>
                <Form.Control type="file" name='user_profile' style={mystyle} onChange={setProfile} placeholder='Select Your Profile' />
              </Form.Group>
              <FormControl component='fieldset' fullWidth margin='normal'>
                <FormLabel component='legend'>Hobbie </FormLabel>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label="Cricket" value="Cricket" onChange={(e) => getPjl(e)} />
                  <FormControlLabel control={<Checkbox />} label="Vollyball" value="Vollyball" onChange={(e) => getPjl(e)} />
                  <FormControlLabel control={<Checkbox />} label="Music" value="Music" onChange={(e) => getPjl(e)} />
                  <FormControlLabel control={<Checkbox />} label="Travelling" value="Travelling" onChange={(e) => getPjl(e)} />
                  <FormControlLabel control={<Checkbox />} label="Reading" value="Reading" onChange={(e) => getPjl(e)} />
                </FormGroup>
              </FormControl>
              <Button style={{ backgroundColor: "#5d87ff", color: "white" }} type="submit" onClick={submitUserData} >
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
export default AddData;


