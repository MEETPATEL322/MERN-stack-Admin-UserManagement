import { element } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addData, dltMAnydata, dltdata, updateData } from 'src/components/context/ContextProvider';
import Alert from 'react-bootstrap/Alert';
import { Button, Dropdown, Form } from 'react-bootstrap';
import Tables from 'src/components/tables/tables';
import { deletfunc, exporttocsvfunc, usergetfunc, deletmanyfunc, allstatuschangefunc } from 'src/services/Apis';
import { toast } from 'react-toastify';
import "./List.css"
// import { useGetUserMutation } from 'src/services/AddApi';

const ListData = () => {
  const [userdata, setUserData] = useState([]);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { useradd, setUseradd } = useContext(addData)
  const { update, setUpdate } = useContext(updateData)
  const { deletedata, setDLtdata } = useContext(dltdata);
  const { selectedItems, setSelectedItems } = useContext(dltMAnydata)
  const [statushandle, setstatushandle] = useState({});
  const navigate = useNavigate();

  const adduser = () => {
    navigate("/Add")
  }

  // get user

  const userGet = async () => {
    const response = await usergetfunc(search, gender, status, sort, page,);
    console.log("response123", response);
    if (response.status === 200) {
      setUserData(response.data.userdata)
      setPageCount(response.data.Pagination.pageCount)
    }
    else {
      console.log("error for get user data");
    }
  }


  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank")
    } else {
      toast.error("error !")
    }
  }

  // pagination
  // handle prev btn
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1
    })
  }

  // handle next btn
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1
    })
  }

  // delete user
  const deleteUser = async (id) => {
    const response = await deletfunc(id);

    if (response.status === 200) {
      userGet();
      setDLtdata(response.data)
    } else {
      toast.error("error")
    }
  }
  const deletManyUser = async () => {
    const config = {
      "Content-Type": "application/json",
    }
    console.log("Selected item", selectedItems)
    const response = await deletmanyfunc(selectedItems, config);
    if (response.status === 200) {
      userGet();
      setSelectedItems([]);
    } else {
      toast.error("error")
    }
  }

  const updateManyUser = async (e) => {

    // setstatushandle({ ...statushandle, [e.target.name]: e.target.value })
    // e.preventDefault()
    console.log("Selected item", selectedItems)
    // console.log("handle item", statushandle)
    const response = await allstatuschangefunc(selectedItems, { [e.target.name]: e.target.value });
    if (response.status === 200) {
      toast.success("success")
      userGet();
      setSelectedItems([]);
    } else {
      toast.error("error")
    }
  }
  useEffect(() => {
    userGet();
  }, [search, gender, status, sort, page])
  return (
    <>
      {
        useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()}Successfully  Added..</Alert> : ""
      }
      {
        update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()}Udpdated data Successfully..</Alert> : ""
      }
      {
        deletedata ? <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.fname.toUpperCase()}Record Deleted..</Alert> : ""
      }
      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button style={{ backgroundColor: "#5d87ff", color: "white" }} className='search_btn'>Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button style={{ backgroundColor: "#5d87ff", color: "white" }} onClick={adduser}> <i className="fa-solid fa-plus"></i>&nbsp; Add User</Button>
              {/* <Button style={{ backgroundColor: "#5d87ff", color: "white" }} className='mx-2' onClick={deletManyUser}>Delete All Users</Button> */}
            </div>
          </div>
          {/* export,gender,status */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className='export_btn' onClick={exportuser}>Export To Csv</Button>
              <Button style={{ color: "white" }} className='mx-2 btn-danger' onClick={deletManyUser}>Delete All Users</Button>
              <Button style={{ color: "white" }} className='mx-2 export_btn ' name='status' value={'Active'} onClick={updateManyUser}>Active All Users</Button>
              <Button style={{ color: "white" }} className='mx-2 btn-danger' name='status' value={'InActive'} onClick={updateManyUser}>Inactive All Users</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h5>Filter By Gender</h5>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h5>Filter By Status</h5>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tables
          userdata={userdata}
          deleteUser={deleteUser}
          userGet={userGet}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          page={page}
          pageCount={pageCount}
          setPage={setPage}
          deletManyUser={deletManyUser}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
        />
      </div>
    </>
  );
}
export default ListData;