import React, {useState} from "react";
import { Button, CloseButton, Modal, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan, faPencilSquare, faSquareCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import DetailStudentOnly from "./DetailStudentOnly";
import EditStudent from "./EditStudent";
import 'views/Student/Modal/css/DetailStudentModal.css'
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
function DetailStudentModal({isOpen, hideModal, dataModal}){
    const [editStudent, setEditStudent] = useState(false);
    const [editFormData, setEditFormData] = useState({
        fullName: "",
        dob: "",
        signupDate: "",
        phoneNum: "",
        familyContact: "",
        parentEmail: "",
        status: "",
    })
    const hanleClickEditBtn = () => {
        setEditStudent(true)
        document.getElementsByClassName("pencil-icon")[0].style.display = 'none';
        document.getElementsByClassName("trash-icon")[0].style.display = 'none';
        document.getElementsByClassName("check-icon")[0].style.display = 'inline-block';
        document.getElementsByClassName("xmark-icon")[0].style.display = 'inline-block';
        const formValues = {
            fullName: dataModal.fullName,
            dob: dataModal.dob,
            signupDate: dataModal.signupDate,
            phoneNum: dataModal.phoneNum,
            familyContact: dataModal.familyContact,
            parentEmail: dataModal.parentEmail,
            status: dataModal.status,
        }
        setEditFormData(formValues);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditSubmit = () =>{
        setEditStudent(false)
        document.getElementsByClassName("check-icon")[0].style.display = 'none';
        document.getElementsByClassName("xmark-icon")[0].style.display = 'none';
        document.getElementsByClassName("pencil-icon")[0].style.display = 'inline-block';
        document.getElementsByClassName("trash-icon")[0].style.display = 'inline-block';
    }

    const handleCancelEdit = () => {
        setEditStudent(false)
        document.getElementsByClassName("check-icon")[0].style.display = 'none';
        document.getElementsByClassName("xmark-icon")[0].style.display = 'none';
        document.getElementsByClassName("pencil-icon")[0].style.display = 'inline-block';
        document.getElementsByClassName("trash-icon")[0].style.display = 'inline-block';
        const formValues = {
            fullName: "",
            dob: "",
            signupDate: "",
            phoneNum: "",
            familyContact: "",
            parentEmail: "",
            status: "",
        }
        setEditFormData(formValues);
    }

    return(
        <>
             <Modal 
                show={isOpen} 
                onHide={hideModal}
                size="xl"
                // fullscreen={true}
                className="detail-student-modal"
                >
                <Modal.Header className="detail-student-modal-header">
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-primary detail-student-modal-title"
                >Student</Modal.Title>
                <CloseButton onClick={hideModal} ></CloseButton>
                </Modal.Header>
                <Modal.Body  className="detail-student-modal-body">
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
                            <FontAwesomeIcon onClick={hanleClickEditBtn} className="pencil-icon" icon={faPencilSquare} />
                            <FontAwesomeIcon onClick={handleEditSubmit} className="check-icon" icon={faSquareCheck} />
                            </div>
                            <div className="button-delete-student">
                                <FontAwesomeIcon className="trash-icon" icon={faTrashCan} />
                                <FontAwesomeIcon onClick={handleCancelEdit} className="xmark-icon" icon={faSquareXmark} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6" >
                            
                            {
                                editStudent ? (<EditStudent dataModal={dataModal} editFormData={editFormData} handleEditFormChange={handleEditFormChange}/>) : (
                                    <DetailStudentOnly dataModal={dataModal} BadgeStatus={BadgeStatus}/>  
                                )
                            }
                            
                            
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
                    {/* <div>
                        <Button 
                        variant="primary" 
                        onClick={hideModal}
                        className="btn-fill"
                        >
                            OK
                        </Button>
                    </div> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailStudentModal
