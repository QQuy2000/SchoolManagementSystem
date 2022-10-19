import React from "react";
import { Button, CloseButton, Modal, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import './ModalDetail.css'
const BadgeStatus = ({ values }) => {
    let color;
    switch (values) {
        case "Active":
            color = "success"
            break;
        case "Inactive":
            color = "danger"
            break;
        case "Trial":
            color = "warning"
            break;
    }
    return (
        <>
          <Badge key={values} bg={color} className="me-1 mb-1" style={{ fontSize: '0.85em' }}>{values}</Badge>
        </>
        
    );
  };
function ModalDetail({isOpen, hideModal, dataModal}){
    return(
        <>
             <Modal 
                show={isOpen} 
                onHide={hideModal}
                size="lg"
                // fullscreen={true}
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-primary"
                >Student</Modal.Title>
                <CloseButton onClick={hideModal} ></CloseButton>
                </Modal.Header>
                <Modal.Body  style={{ border: '1px solid #ece9ea'}} >
                    <div className="image-modal" >
                        <img 
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="image"
                        style={{height:'15vh', margin: '10px 10px 0px 0px'}}
                        />       
                    </div>
                    <div className="student-button-line">
                        <div className="upload-image-line">
                            <a
                                className="btn-outline upload-image-btn"
                                // variant="success"
                            >
                                <FontAwesomeIcon className="circle-plus-icon" icon={faCirclePlus} />
                                Upload Photo 
                            </a>
                        </div>
                        <div className="button-update-line">
                            <div className="button-edit-student">
                            <FontAwesomeIcon className="pencil-icon" icon={faPencilSquare} />
                            </div>
                            <div className="button-delete-student">
                                <FontAwesomeIcon className="trash-icon" icon={faTrashCan} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6" >
                            <div className="row" >
                                <div className="col-md-6">
                                    <p><b>Student ID: </b> </p>
                                    <p><b>Fullname: </b></p>
                                    <p><b>Birth Date: </b></p>
                                    <p><b>Signup Date: </b></p>
                                    <p><b>Family contact: </b></p>
                                    <p><b>Parent email: </b></p>
                                    <p><b>Phone number: </b></p>
                                    <p><b>Student status: </b></p>
                                </div>
                                <div className="col-md-6">
                                    <p>{dataModal.id} </p>
                                    <p>{dataModal.fullname} </p>
                                    <p>{dataModal.birthday} </p>
                                    <p>{dataModal.signupdate} </p>
                                    <p>{dataModal.familycontact} </p>
                                    <p><u>{dataModal.parenemail}</u></p>
                                    <p>{dataModal.phonenumber} </p>
                                    <p><BadgeStatus values={dataModal.status} /> </p>
                                </div>
                            </div>
                            {/* <div style={{maxHeight:'250px', overflowY: 'scroll', border: '1px solid #ece9ea'}}>    
                                <p style={{margin:'0 5px'}}><b>Question: </b><br/>{dataModal.question} </p>
                                
                                <p style={{margin:'0 5px'}}><b>Answer: </b><br/>{dataModal.answer} </p>
                            </div> */}
                        </div>
                        <div className="col-md-6">  
                            <div className="row" style={{display: 'flex', justifyContent:'flex-end'}}>  
                                <div className="col-md-7">
                                    <p><b>Courses Purchased </b> </p>
                                    {dataModal.course && dataModal.course.map((c, i) => ( 
                                        <p key={i} >{c.name} </p>
                                    ))}
                                </div>
                                <div className="col-md-3 text-end">
                                    <p><b>Term </b> </p>
                                    {dataModal.course && dataModal.course.map((c, i) => ( 
                                        <p key={i}>{c.term} </p>
                                    ))}
                                </div>      
                            </div>  
                        </div>
                    </div>      
                </Modal.Body>
                <Modal.Footer style={{display: 'flex', justifyContent: 'flex-end',marginTop: "10px"}}>
                    <div>
                        <Button 
                        variant="primary" 
                        onClick={hideModal}
                        className="btn-fill"
                        >
                            OK
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDetail
