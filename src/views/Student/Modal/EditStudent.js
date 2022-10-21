import React from "react";
import { Button, Form, CloseButton, Modal, Row, Col } from "react-bootstrap";

const EditStudent = ({dataModal, editFormData, handleEditFormChange}) => {
    const moduleList = ["Active", "Inactive", "Trial"]
    return(
        <div className="row" >
            
            {/* <p style={{marginBottom: '0px'}}><b>Student ID: </b> </p>
            <input
                type='text'
                required='required'
                placeholder=""
                name="id"
                value={dataModal.id}
                disabled
                style={{margin: '0px 0px 7px 12px'}}
            ></input> */}
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
                        value={editFormData.fullname}
                        name="fullname"
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
                        value={editFormData.birthday}
                        name="birthday"
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
                        value={editFormData.signupdate}
                        name="signupdate"
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
                        value={editFormData.familycontact}
                        name="familycontact"
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
                        value={editFormData.parenemail}
                        name="parenemail"
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
                        value={editFormData.phonenumber}
                        name="phonenumber"
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
    )
}

export default EditStudent;