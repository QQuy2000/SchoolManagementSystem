import React, {useState} from "react";
import { Button, CloseButton, Modal, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan, faPencilSquare, faSquareCheck, faSquareXmark, fas } from "@fortawesome/free-solid-svg-icons";
import DetailStudentOnly from "./DetailStudentOnly";
import EditStudent from "./EditStudent";
import 'views/Student/Modal/css/DetailStudentModal.css'
import { UpdateStudent, deleteOneStudent } from "redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { editFormStudent, errorsStudent, idDeleteStudent } from "redux/selectors/studentSelector/studentSelector";
import { editFormDataChange, errorsChange, idDeleteChange} from "redux/studentSlice";
import Validation from "../Validation";
const BadgeStatus = ({ values }) => {
    let color;
    switch (values) {
        case "active":
            color = "success"
            break;
        case "inactive":
            color = "danger"
            break;
        case "trial":
            color = "warning"
            break;
    }
    return (
        <>
          <Badge key={values} bg={color} className="me-1 mb-1" style={{ fontSize: '0.85em' }}>{values}</Badge>
        </>
        
    );
  };
function DetailStudentModal({isOpen, hideModal, dataModal, notify, setIsOpen}){
    const dispatch = useDispatch();
    const [editStudent, setEditStudent] = useState(false);
    const  editFormData = useSelector(editFormStudent);
    const errorsForm = useSelector(errorsStudent);
    const [isDelete, setIsDelete] = useState(false);
    const hanleClickEditBtn = () => {
        setEditStudent(true)
        document.getElementsByClassName("pencil-icon")[0].style.display = 'none';
        document.getElementsByClassName("trash-icon")[0].style.display = 'none';
        document.getElementsByClassName("check-icon")[0].style.display = 'inline-block';
        document.getElementsByClassName("xmark-icon")[0].style.display = 'inline-block';
    }

    const handleEditFormChange = (e) => {
        dispatch(editFormDataChange({
            ...editFormData,
            [e.target.name]: e.target.value}))

        dispatch(errorsChange({
            ...errorsForm,
            [e.target.name]: null
        }))
      }

    const handleEditSubmit = () =>{
        const newErrors = Validation(editFormData);
        if (Object.keys(newErrors).length > 0) {
            dispatch(errorsChange(newErrors))
        }else{
            setEditStudent(false)
            document.getElementsByClassName("check-icon")[0].style.display = 'none';
            document.getElementsByClassName("xmark-icon")[0].style.display = 'none';
            document.getElementsByClassName("pencil-icon")[0].style.display = 'inline-block';
            document.getElementsByClassName("trash-icon")[0].style.display = 'inline-block';
            // console.log(editFormData)
            dispatch(UpdateStudent({data: editFormData, notify: notify}));
            // dispatch(editFormDataChange(editFormData));
            setIsOpen(false)
        } 
        
    }

    const handleCancelEdit = () => {
        setEditStudent(false)
        document.getElementsByClassName("check-icon")[0].style.display = 'none';
        document.getElementsByClassName("xmark-icon")[0].style.display = 'none';
        document.getElementsByClassName("pencil-icon")[0].style.display = 'inline-block';
        document.getElementsByClassName("trash-icon")[0].style.display = 'inline-block';
    }

    const hanleSubmitDeleteOne = () => {
        dispatch(deleteOneStudent({data: dataModal.id, notify: notify}))
        setIsDelete(false)
        setIsOpen(false)
    }
    const hanldeCancelDelete = () => {
        setIsDelete(false)
    }

    return(
        <>

                <Modal 
                    show={isDelete} 
                    onHide={hanldeCancelDelete}
                    size="sm"              
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-danger"
                >ARE YOU SURE TO DELETE STUDENT?</Modal.Title>
                {/* <CloseButton onClick={hanldeCancelDelete} ></CloseButton> */}
                </Modal.Header>
                
                <Modal.Footer style={{display: 'flex', flexDirection: 'column'}}>
                    <p style={{fontWeight: 'bold'}}>DO YOU WANT TO DELETE ?</p>
                    <div>
                        <Button 
                            variant="danger" 
                            onClick={hanleSubmitDeleteOne}
                            style={{marginRight: '10px'}}
                            className="btn-fill"
                        >
                            YES
                        </Button>

                        <Button 
                            variant="secondary" 
                            onClick={hanldeCancelDelete}
                            style={{paddingLeft:'20px', paddingRight: '20px'}}
                            className="btn-fill"
                        >
                            NO
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>


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
                                <FontAwesomeIcon 
                                    onClick={() => {setIsDelete(true)
                                                   }} 
                                    className="trash-icon"
                                    icon={faTrashCan} />
                                <FontAwesomeIcon onClick={handleCancelEdit} className="xmark-icon" icon={faSquareXmark} />
                            </div>
                        </div>
                    </div>
                        {
                            editStudent ? (<EditStudent dataModal={dataModal} editFormData={editFormData} handleEditFormChange={handleEditFormChange} errorsForm={errorsForm}/>) : (
                                <DetailStudentOnly dataModal={dataModal} BadgeStatus={BadgeStatus}/>  
                            )
                        }
                </Modal.Body>
                <Modal.Footer style={{display: 'flex', justifyContent: 'flex-end',marginTop: "10px"}}>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailStudentModal
