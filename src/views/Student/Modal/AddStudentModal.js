import React from "react";
import { Button, Form, CloseButton, Modal, Row, Col } from "react-bootstrap";

function AddStudentModal({ isOpenAdd, 
                    hideOpenAdd, 
                    id, 
                    updateSkill, 
                    setUpdateSkill,
                    updateLevel,
                    setUpdateLevel,
                    updateQuestion,
                    setUpdateQuestion,
                    updateAnswer,
                    setUpdateAnswer,
                    onSubmitAdd
                    }){
    return (
        <>
            <Modal 
                show={isOpenAdd} 
                onHide={hideOpenAdd}
                size="lg"
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
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>ID: </b> 
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={id}/>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>Status:</b>
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={"Processing"} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicSelect">
                        <Form.Label column sm="2">
                            <b>Skill:</b>
                        </Form.Label>
                        <Col sm="10">
                    
                            <Form.Control 
                                as="select"
                                value={updateSkill}
                                onChange = {e => setUpdateSkill(e.target.value)}
                                >
                                <option>-- Select Skill --</option>
                                <option value="React">React</option>
                                <option value="Java">Java</option>
                                <option value="NodeJS">NodeJS</option>
                                <option value=".NET">.NET</option>
                                <option value="C#">C#</option>
                                <option value="General">General</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicSelect">
                        <Form.Label column sm="2">
                            <b>Level:</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                as="select"
                                value={updateLevel}
                                onChange = {e => setUpdateLevel(e.target.value)}
                                >
                                <option>-- Select Level --</option>
                                <option value="Remember - Understand">Remember - Understand</option>
                                <option value="Apply">Apply</option>
                                <option value="Analysis - Avaluation">Analysis - Avaluation</option>
                                <option value="Creation">Creation</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="2">
                            <b>Question:</b>
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter question..." 
                            value={updateQuestion}
                            onChange = {e => setUpdateQuestion(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="2">
                            <b>Answer:</b>
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Answer..."
                            value={updateAnswer} 
                            onChange = {e => setUpdateAnswer(e.target.value)}
                        />
                    </Form.Group>

                
                </Form>
                </Modal.Body>
                <Modal.Footer style={{display: "flex",justifyContent: 'flex-end', marginTop: "10px"}}>
                <Button 
                    variant="secondary" 
                    onClick={hideOpenAdd}
                    style={{marginRight: '10px'}}
                    className="btn-fill">
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    className="btn-fill"
                    onClick={onSubmitAdd}
                    style={{paddingLeft:'22px', paddingRight: '22px'}}
                    >
                    Add
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddStudentModal