import React, { useState } from 'react';
import "./table.css"
import { Badge, Card, Dropdown, Row, Table, Button } from 'react-bootstrap';
import { element } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from 'src/services/helper';
import { statuschangefunc, deletmanyfunc } from 'src/services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginations from '../pagination/Pagination';
import { useEffect } from 'react';
import { values } from 'lodash';
const Tables = ({ userdata, deleteUser, setSelectedItems, selectedItems, deletManyUser, userGet, handlePrevious, handleNext, page, pageCount, setPage }) => {
  // const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    const getData = async () => {
      // const resData = fetch("http://localhost:8000/data/list?search=&gender=All&status=All")
    }
    getData();
  })

  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);
    if (response.status === 200) {
      userGet();
      toast.success("Status Updated")
    } else {
      toast.error("error ")
    }
  }

  return (
    <>
      <div className="container">

        <Row>

          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead>
                  <tr style={{ backgroundColor: "#5d87ff", color: "white" }}>
                    <th>
                      {/* <input type="checkbox" /> */}
                      <input
                        type="checkbox"
                        checked={selectedItems.length === userdata.length}
                        onChange={() => {
                          if (selectedItems.length === userdata.length) {
                            setSelectedItems([]);
                          } else {
                            setSelectedItems(userdata.map((item) => item._id));
                          }
                        }}
                      />
                    </th>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>hobbie</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(element._id)}
                                onChange={() => {
                                  if (selectedItems.includes(element._id)) {
                                    setSelectedItems(selectedItems.filter((id) => id !== element._id));
                                  } else {
                                    setSelectedItems([...selectedItems, element._id]);
                                  }
                                }}
                              />
                            </th>
                            <td>{index + 1}</td>
                            <td>{element.fname + element.lname}</td>
                            <td>{element.email}</td>
                            <td>{element.hobbie}</td>
                            <td>{element.gender == "Male" ? "M" : "F"}</td>
                            <td className='d-flex align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                  <Badge bg={element.status == "Active" ? "primary" : "danger"}>
                                    {element.status} <i className="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className='img_parent'>
                              <img src={`${BASE_URL}/uploads/${element.image}`} alt="img" />
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    <NavLink to={`/read/${element._id}`} className="text-decoration-none">
                                      <i className="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                      <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <div onClick={() => deleteUser(element._id)}>
                                      <i className="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>No-data Found</div>
                  }
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div >
    </>
  );
}

export default Tables;
