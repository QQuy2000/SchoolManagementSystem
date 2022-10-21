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
                <p>{dataModal.fullName} </p>
                <p>{dataModal.dob} </p>
                <p>{dataModal.signupDate} </p>
                <p>{dataModal.familyContact} </p>
                <p><u>{dataModal.parentEmail}</u></p>
                <p>{dataModal.phoneNum} </p>
                <p><BadgeStatus values={dataModal.status} /> </p>
            </div>
        </div>
    );
};

export default DetailStudentOnly