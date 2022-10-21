import React from "react";
import { Button, CloseButton, Modal} from "react-bootstrap";

function DeleteStudentModal({isOpenDelete, hideOpenDelete, selectedRows, onSumbitDeleteSelected}){
    return (
        <>
            <Modal 
                show={isOpenDelete} 
                onHide={hideOpenDelete}
                size="lg"
                // fullscreen={true}
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-danger"
                >Delete Students</Modal.Title>
                <CloseButton onClick={hideOpenDelete} ></CloseButton>
                </Modal.Header>
                <Modal.Body style={{ border: '1px solid #ece9ea'}}>
                    <p><b>Number student: </b>{selectedRows.length} </p>
                    <p style={{fontWeight: 'bold'}}>Student IDs: </p>
                    <div style={{maxHeight:'250px', overflowY: 'scroll', border: '1px solid #ece9ea'}}>  
                    <ol>{selectedRows.map(a=>(<li key={a}>{"N"+a}</li>))}</ol>
                    </div>

                </Modal.Body>
                <Modal.Footer style={{display: 'flex', flexDirection: 'column'}}>
                    <p style={{fontWeight: 'bold'}}>DO YOU WANT TO DELETE ?</p>
                    <div>
                        <Button 
                            variant="danger" 
                            onClick={onSumbitDeleteSelected}
                            style={{marginRight: '10px'}}
                            className="btn-fill"
                        >
                            YES
                        </Button>

                        <Button 
                            variant="secondary" 
                            onClick={hideOpenDelete}
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
export default DeleteStudentModal