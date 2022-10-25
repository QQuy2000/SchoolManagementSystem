import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from 'redux/loginSlice';
import { isLoginStage, isLoadingLogin } from 'redux/selectors/loginSelector/loginSelector';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Button, Spinner } from 'react-bootstrap';

function Login() {
  const dispatch = useDispatch();
  const isLoginIn = useSelector(isLoginStage);
  const isLoading = useSelector(isLoadingLogin);
  const history = useHistory();
  useEffect(() =>{
    if (isLoginIn) history.push("/admin");
  })

  const [dataLogin, setDataLogin] = useState( {
    username: "",
    password: "",
  })

const handleDataLoginChange = (event) => {
  event.preventDefault();

  const fieldName = event.target.getAttribute("name");
  const fieldValue = event.target.value;

  const newFormData = {...dataLogin};
  newFormData[fieldName] = fieldValue;
  setDataLogin(newFormData);
}

const handleSubmitLogin = () => {
  // console.log(dataLogin);
  dispatch(fetchLogin({data:dataLogin}))
}
  return (
    <MDBContainer fluid className="p-3 my-5" >
      { isLoading ? ( 
      <div 
            className="d-flex flex-column justify-content-center align-items-center"
            style={{height: '100px', marginBottom: '20px'}}
          >
          <Spinner
            variant="primary"
            animation="border"
            role="status"
            className="position-absolute"
            style={{ height: "60px", width: "60px" }}
          ></Spinner>
        </div>):
      (<MDBRow style={{display:'flex', justifyContent: 'center', marginTop: '5vh'}}>

        <MDBCol col='10' md='6'className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            School Management <br />
            <span className="text-primary">System</span>
          </h1>

          

        </MDBCol>

        <MDBCol col='4' md='4' style={{paddingRight: '50px'}}>
          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center text-primary">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput 
                wrapperClass='mb-4 w-100' 
                placeholder='Enter your username...' 
                label='username'  
                name='username'
                onChange={(e) => handleDataLoginChange(e)}
                type='text' 
                size="lg"
              />
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                placeholder='Enter your password...' 
                label='Password'  
                name='password'
                onChange={(e) => handleDataLoginChange(e)}
                type='password' 
                size="lg"
              />

              {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}

              <Button 
                className="btn-fill" 
                size='lg'
                onClick={handleSubmitLogin}
              >
                Login
              </Button>

            </MDBCardBody>
          </MDBCard>
          </MDBCol> 
      </MDBRow>
    )}
    </MDBContainer>
  );
}

export default Login;