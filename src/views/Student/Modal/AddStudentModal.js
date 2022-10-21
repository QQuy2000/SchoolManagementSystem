import React, {useState} from "react";
import { Button, Form, CloseButton, Modal, Row, Col } from "react-bootstrap";

function AddStudentModal({ isOpenAdd, 
                    hideOpenAdd, 
                    onSubmitAdd
                    }){
    const moduleList = ["Active", "Inactive", "Trial"]
    const [addFormData, setAddFormData] = useState({
        fullname: "",
        birthday: "",
        signupdate: "",
        familycontact: "",
        parenemail: "",
        phonenumber: "",
    })
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData) 
    }
    return (
        <>
            <Modal 
                show={isOpenAdd} 
                onHide={hideOpenAdd}
                size="xl"
                // fullscreen={true}
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-primary"
                >ADD STUDENTS</Modal.Title>
                <CloseButton onClick={hideOpenAdd} ></CloseButton>
                </Modal.Header>
                <Modal.Body style={{ border: '1px solid #ece9ea'}}>
                <div className="row">
                        <div className="col-md-6" >
                        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                            <Form.Label column sm="4">
                                <b>Student ID:</b>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control plaintext readOnly defaultValue={"id"}/>
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
                                    value={addFormData.fullName}
                                    name="fullName"
                                    onChange = {handleAddFormChange}                         
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
                                    value={addFormData.dob}
                                    name="dob"
                                    onChange = {handleAddFormChange}                         
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
                                    value={addFormData.signupDate}
                                    name="signupDate"
                                    onChange = {handleAddFormChange}                         
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
                                    value={addFormData.familyContact}
                                    name="familyContact"
                                    onChange = {handleAddFormChange}                         
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
                                    value={addFormData.parentEmail}
                                    name="parentEmail"
                                    onChange = {handleAddFormChange}                         
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
                                    value={addFormData.phoneNum}
                                    name="phoneNum"
                                    onChange = {handleAddFormChange}                         
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
                                    <option key='blankChoice' hidden value>-- Select Status --</option>
                                    {moduleList.map((module , key ) => (
                                            <option key={key} value={module}>{module}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group> 
                                    </div>
                                    <div className="col-md-6">  
                                        <div className="row" style={{display: 'flex', justifyContent:'flex-end'}}>  
                                            <div className="col-md-7">
                                                <p><b>Courses Purchased </b> </p>
                                                
                                            </div>
                                            <div className="col-md-3 text-end">
                                                <p><b>Term </b> </p>
                                                
                                            </div>      
                                        </div>  
                                    </div>
                    </div>    
                </Modal.Body>
                <Modal.Footer style={{display: "flex",justifyContent: 'flex-end', marginTop: "10px"}}>
                <Button 
                    variant="primary" 
                    className="btn-fill"
                    onClick={onSubmitAdd}
                    style={{marginRight: '10px', paddingLeft:'22px', paddingRight: '22px'}}
                    >
                    Add
                </Button>
                <Button 
                    variant="secondary" 
                    onClick={hideOpenAdd}
                    className="btn-fill">
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddStudentModal