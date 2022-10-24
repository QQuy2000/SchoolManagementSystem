import React from "react";
import { Button, Form, CloseButton, Modal, Row, Col } from "react-bootstrap";

const EditStudent = ({dataModal, editFormData, handleEditFormChange}) => {
    const moduleList = ["Active", "Inactive", "Trial"]
    return(

        <div className="row" >
            <div className="col-md-6" >
                <div className="row" >
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="4">
                            <b>Student ID:</b>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={dataModal.id}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="4">
                            <b>Fullname:</b>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Enter fullname..." 
                                value={editFormData.fullName}
                                name="fullName"
                                onChange = {handleEditFormChange}                         
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="4">
                            <b>Birth Date:</b>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Enter birthday..." 
                                value={editFormData.dob}
                                name="dob"
                                onChange = {handleEditFormChange}                         
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="4">
                            <b>Signup Date:</b>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Enter signupdate..." 
                                value={editFormData.signupDate}
                                name="signupDate"
                                onChange = {handleEditFormChange}                         
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="4">
                            <b>Family contact:</b>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Enter familycontact..." 
                                value={editFormData.familyContact}
                                name="familyContact"
                                onChange = {handleEditFormChange}                         
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="4">
                            <b>Parent email:</b>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Enter parentemail..." 
                                value={editFormData.parentEmail}
                                name="parentEmail"
                                onChange = {handleEditFormChange}                         
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="4">
                            <b>Phone number:</b>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Enter phonenumber..." 
                                value={editFormData.phoneNum}
                                name="phoneNum"
                                onChange = {handleEditFormChange}                         
                            />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            <b>Student status:</b>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control 
                                required
                                as="select"
                                name="status"
                                >
                                {moduleList.map((module , key ) => (
                                        <option key={key} value={module}>{module}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group> 
                </div>
            </div>
            <div className="col-md-6">  
                <div className="row" style={{display: 'flex', justifyContent:'flex-end'}}>  
                    <div className="col-md-7">
                        <p><b>Courses Purchased </b> </p>
                        {dataModal.listCourse && dataModal.listCourse.map((c, i) => ( 
                            <p key={i} >{c.courseName} </p>
                        ))}
                    </div>
                    <div className="col-md-3 text-end">
                        <p><b>Term </b> </p>
                        {dataModal.listCourse && dataModal.listCourse.map((c, i) => ( 
                            <p key={i}>{c.termNumber} </p>
                        ))}
                    </div>      
                </div>  
            </div> 
    </div>
       
    )
}

export default EditStudent;