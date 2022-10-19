import React from "react";
import { Button, CloseButton, Modal} from "react-bootstrap";

function ModalDeleteRow({isOpenRowDeleteModal, hideOpenRowDeleteModal, dataModal, onSumbitDeleteRow}){
    return(
        <>
            <Modal 
                show={isOpenRowDeleteModal} 
                onHide={hideOpenRowDeleteModal}
                size="lg"
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'center'}}>
                <Modal.Title style={{textTransform: 'uppercase', fontWeight: 'bold'}}>Delete question</Modal.Title>
                <CloseButton onClick={hideOpenRowDeleteModal} ></CloseButton>
                </Modal.Header>
                <Modal.Body  style={{ border: '1px solid #ece9ea'}}>
                    <p><b>ID: </b> {dataModal.id} </p>
                    <p><b>Code: </b>{"N"+dataModal.id} <b> - Skill: </b>{dataModal.skill}  </p>
                    <p><b>Level: </b>{dataModal.level} <b> - Status: </b>{dataModal.status}</p>
                    <div style={{maxHeight:'250px', overflowY: 'scroll'}}>    
                        <p style={{margin:'0 5px'}}><b>Question: </b><br/>{dataModal.question} </p>
                        {/* <p style={{margin:'0 5px'}}><b>Answer: </b><br/>{dataModal.answer} </p> */}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{display: 'flex', flexDirection: 'column'}}>
                    <p style={{fontWeight: 'bold'}}>DO YOU WANT TO DELETE ?</p>
                    <div>
                        <Button 
                            variant="danger" 
                            onClick={onSumbitDeleteRow}
                            style={{marginRight: '10px'}}
                            className="btn-fill"
                        >
                            YES
                        </Button>

                        <Button 
                            variant="secondary" 
                            onClick={hideOpenRowDeleteModal}
                            style={{paddingLeft:'20px', paddingRight: '20px'}}
                            className="btn-fill"
                        >
                            NO
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteRow