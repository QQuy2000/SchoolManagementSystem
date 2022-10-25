import React, {useState} from "react";
import { Button, Form, CloseButton, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "redux/studentSlice";
import { addFormStudent, errorsStudent } from "redux/selectors/studentSelector/studentSelector";
import { addFormDataChange, errorsChange } from "redux/studentSlice";
import Validation from "../Validation";
function AddStudentModal({ isOpenAdd, 
                    hideOpenAdd, 
                    setIsOenAdd,
                    notify
                    }){
    const dispatch = useDispatch();
    const moduleList = ["active", "inactive", "trial"]

    const addFormData = useSelector(addFormStudent);
    const errorsForm = useSelector(errorsStudent);
    const handChange = (e) => {
        dispatch(addFormDataChange({
            ...addFormData,
            [e.target.name]: e.target.value}))

        dispatch(errorsChange({
            ...errorsForm,
            [e.target.name]: null
        }))
      }

    const handleSubmitAdd = (event) => {
        event.preventDefault()
        const newErrors = Validation(addFormData);
        if (Object.keys(newErrors).length > 0) {
            dispatch(errorsChange(newErrors))
        }else{
            // console.log(addFormData)
            dispatch(createStudent({data: addFormData, notify: notify}))
        } 
        hanldeClose();
    }

    const hanldeClose = () => {
        dispatch(addFormDataChange({
            fullName: "",
            dob: "",
            signupDate: "",
            phoneNum: "",
            familyContact: "",
            parentEmail: "",
            status: "",
            avatar: null,
        }))
        dispatch(errorsChange({}))
        setIsOenAdd(false)
    }
    return (
        <>
            <Modal 
                show={isOpenAdd} 
                onHide={hanldeClose}
                size="xl"
                // fullscreen={true}
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-primary"
                >ADD STUDENTS</Modal.Title>
                <CloseButton onClick={hanldeClose} ></CloseButton>
                </Modal.Header>
                <Modal.Body style={{ border: '1px solid #ece9ea'}}>
                <div className="row">
                        <div className="col-md-6" >
                        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                            <Form.Label column sm="4">
                                <b>Student ID:</b>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control plaintext readOnly defaultValue={" "}/>
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
                                    onChange = {(e) => handChange(e)} 
                                    isInvalid={!!errorsForm.fullName}                        
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errorsForm.fullName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                            <Form.Label column sm="4">
                                <b>Birth Date:</b>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    required
                                    type="date" 
                                    placeholder="Enter birthday..." 
                                    value={addFormData.dob}
                                    name="dob"
                                    onChange = {(e) => handChange(e)} 
                                    isInvalid={!!errorsForm.dob}                        
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errorsForm.dob}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                            <Form.Label column sm="4">
                                <b>Signup Date:</b>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    required
                                    type="date" 
                                    placeholder="Enter signupdate..." 
                                    value={addFormData.signupDate}
                                    name="signupDate"
                                    onChange = {(e) => handChange(e)} 
                                    isInvalid={!!errorsForm.signupDate}                        
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errorsForm.signupDate}
                                </Form.Control.Feedback>
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
                                    onChange = {(e) => handChange(e)} 
                                    isInvalid={!!errorsForm.familyContact}                        
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errorsForm.familyContact}
                                </Form.Control.Feedback>
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
                                    onChange = {(e) => handChange(e)} 
                                    isInvalid={!!errorsForm.parentEmail}                        
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errorsForm.parentEmail}
                                </Form.Control.Feedback>
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
                                    onChange = {(e) => handChange(e)} 
                                    isInvalid={!!errorsForm.phoneNum}                        
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errorsForm.phoneNum}
                                </Form.Control.Feedback>
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
                                    onChange = {(e) => handChange(e)}
                                    isInvalid={!!errorsForm.status}
                                    >
                                    <option key='blankChoice' hidden value>-- Select Status --</option>
                                    {moduleList.map((module , key ) => (
                                            <option key={key} value={module}>{module}</option>
                                    ))}
                                </Form.Control>
                                <div style={{ width: '100%', fontSize: '.875em', marginTop: '.25rem', color: '#dc3545' }}>{errorsForm.status}</div>
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
                    onClick={handleSubmitAdd}
                    style={{marginRight: '10px', paddingLeft:'22px', paddingRight: '22px'}}
                    >
                    Add
                </Button>
                <Button 
                    variant="secondary" 
                    onClick={hanldeClose}
                    className="btn-fill">
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddStudentModal