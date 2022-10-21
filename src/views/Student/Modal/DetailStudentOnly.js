import React from "react";

const DetailStudentOnly = ({dataModal, BadgeStatus}) => {
    return (
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
    );
};

export default DetailStudentOnly