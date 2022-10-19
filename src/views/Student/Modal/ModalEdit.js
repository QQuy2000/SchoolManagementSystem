import React from "react";
import { Button, Form, CloseButton, Modal, Row, Col} from "react-bootstrap";

function ModalEdit( {isOpenEdit,
                    hideModalEdit,
                    id, 
                    updateStatus,
                    setUpdateStatus,
                    updateSkill, 
                    setUpdateSkill,
                    updateLevel,
                    setUpdateLevel,
                    updateQuestion,
                    setUpdateQuestion,
                    updateAnswer,
                    setUpdateAnswer,
                    onSubmitEdit}
    ){
    return (
        <>
            <Modal 
                show={isOpenEdit} 
                onHide={hideModalEdit}
                size="lg"
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title style={{textTransform: 'uppercase', fontWeight: 'bold'}}>Edit Question</Modal.Title>
                <CloseButton onClick={hideModalEdit} ></CloseButton>
                </Modal.Header>
                <Modal.Body style={{ border: '1px solid #ece9ea'}}>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>ID: </b> 
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control plaintext readOnly value={id}/>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>Status:</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                as="select" 
                                value={updateStatus}
                                onChange = {e => setUpdateStatus(e.target.value)}
                            >
                                <option>{updateStatus}</option>
                                <option value="Processing">Processing</option>
                                <option value="Approve">Approve</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicSelect">
                        <Form.Label column sm="2">
                            <b>Skill:</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                as="select" 
                                // defaultValue={dataModal.skill}
                                value={updateSkill}
                                onChange = {e => setUpdateSkill(e.target.value)}
                            >
                                <option>{updateSkill}</option>
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
                                <option>{updateLevel}</option>
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
                    onClick={hideModalEdit}
                    style={{marginRight: '10px'}}
                    className="btn-fill">
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    className="btn-fill"
                    onClick={onSubmitEdit}
                    style={{paddingLeft:'20px', paddingRight: '20px'}}
                    >
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEdit