import React,{useEffect} from "react";
import TableStudent from "./TableStudent";
import DetailStudentModal from "./Modal/DetailStudentModal";
import AddStudentModal from "./Modal/AddStudentModal";
import DeleteStudentModal from "./Modal/DeleteStudentModal";
import './Student.css'
import { Button,Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { fetchStudentList } from "redux/studentSlice";
import { listStudent } from "redux/selectors/studentSelector/studentSelector";
function handleNameClick(e){

}
const BadgeSkill = ({ values }) => {
  return (
      <>
          {values ?  ( values.map((course, id) => {
              return (
                  <Badge key={id} bg="secondary" className="me-1 mb-1" style={{ fontSize: '0.85em' }}>{course.courseName} {' '}</Badge>
              );
          })) : (<p>null</p>)} 
          
      </>
  );
};
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
function Student() {
  const dispatch = useDispatch()
  const columns = React.useMemo(
    () => [
          {
            Header: "ID",
            Filter: () => null,
            accessor: (row) => {return row.id},
            width: '5%',
          },
          {
            Header: " ",
            Filter: () => null,
            Cell: row => (
            <div style={{display:'flex', justifyContent:'center'}}>
                <img 
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="image"
                  style={{height:'40px'}}
                />
               
            </div>
            ),
            width: '10%',
          },
          {
            Header: "Status",
            accessor: "status",
            Filter: () => null,
            Cell: ({ cell: { value } }) => <BadgeStatus values={value} />,
            width: '10%',
          },
          {
            Header: "Name",
            accessor: "fullName",
            Filter: () => null,
            Cell: row => (
              <div style={{display:'flex', justifyContent:'center'}}>
                 <a className='detail-student' onClick={() =>handleDataModal(row.row.original)}> 
                    {row.value}
                 </a>
              </div>
              ),
            width: '35%',
          },
          {
            Header: "Course",
            accessor: "listCourse",
            Filter: () => null,
            Cell: ({ cell: { value } }) => <BadgeSkill values={value} />,
            // Cell: row => (
            //   <div style={{display:'flex', justifyContent:'center'}}>
                 
            //   </div>
            //   ),
            width: '35%',

          },
        ],
    []
  );

  const notificationAlertRef = React.useRef(null);
  const notify = (place, message, type, icon) => {
    let notifyoptions = {};
    notifyoptions = {
        place: place,
        message: message,
        type: type,
        icon: icon,
        autoDismiss: 4,
    };
    notificationAlertRef.current.notificationAlert(notifyoptions);
  };

  const studentList = useSelector(listStudent)
  

  //Get data
  const [data, setData] = React.useState([])

  //Store data in Modal when select in row(detail and edit question)
  const [dataModal, setDataModal] = React.useState({})
  const [localData, setLocalData] = React.useState([])
  //Modal Edit question
  const [id, setId] = React.useState(null)
  const [updateQuestion, setUpdateQuestion] = React.useState("")
  const [updateAnswer, setUpdateAnswer] = React.useState("")
  const [updateSkill, setUpdateSkill] = React.useState("")
  const [updateStatus, setUpdateStatus] = React.useState("")
  const [updateLevel, setUpdateLevel] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(false);

  function getLocal() {
    fetch("http://localhost:8081/students").then((result) => {
        result.json().then((resp)=>{
          setLocalData(resp)
        })
    })
  }
  function getResource() {
    fetch("https://62c7db500f32635590cba090.mockapi.io/resources").then((result) => {
        result.json().then((resp)=>{
            setData(resp)
        })
    })
  }

  useEffect(() => {
    getResource()
    getLocal()
    dispatch(fetchStudentList())
  },[])


  //Modal detail question
  
//Handle Modal Detail question
  const hideModal = () => {
    setIsOpen(false);
    setDataModal({})
  };
  const handleDataModal = (data) => {
    setIsOpen(true)
    setDataModal(data)
  }

  {/* Modal Add */}
  const [isOpenAdd, setIsOenAdd] = React.useState(false)
  const handleOpenAdd = () => {
      setIsOenAdd(true)
      // const newID = ~~data[data.length - 1].id + 1;
      // setId(newID)

  }
  const hideOpenAdd = () => {
      setIsOenAdd(false)
      setId(null)
      setUpdateQuestion("")
      setUpdateAnswer("")
      setUpdateSkill("")
      setUpdateLevel("")
      setUpdateStatus("")
  }

  function onSubmitAdd(){
    let item = {
        skill: updateSkill,
        question: updateQuestion,
        answer: updateAnswer,
        status: updateStatus,
        level: updateLevel}
    fetch("https://62c7db500f32635590cba090.mockapi.io/resources",{
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then((result) => {
        result.json().then(()=>{
            getResource()
            setIsOenAdd(false)
        })
    })
    setId(null)
    setUpdateQuestion("")
    setUpdateAnswer("")
    setUpdateSkill("")
    setUpdateLevel("")
    setUpdateStatus("")
  }
  
  {/* Modal Delete */}    
  const [isOpenDelete, setIsOenDelete] = React.useState(false)
  const handleOpenDelete = () => {
      if(selectedRows.length){
          setIsOenDelete(true)
      }
      else{
          window.alert('Choose questions to delete')
      }
  }
  const hideOpenDelete = () => {
      setIsOenDelete(false)
      setId(null)
      setUpdateQuestion("")
      setUpdateAnswer("")
      setUpdateSkill("")
      setUpdateLevel("")
      setUpdateStatus("")
  }

  function onSumbitDeleteSelected(){
    const idsItem = selectedRows.join(",");
    console.log(idsItem)
    console.log(typeof idsItem)
    fetch(`https://62c7db500f32635590cba090.mockapi.io/resources/composite/sobjects?ids=9,10`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
      },
    }).then((result) => {
        result.json().then((resp)=>{
          console.log(resp)
            getResource()
            setIsOenDelete(false)
        })
    }).catch(error => console.log(error))
    setSelectedRows([])
  }



  return (
    <>

    <TableStudent columns={columns} data={studentList} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete}/>
     

    {/* Modal Detail Question  */}
    <DetailStudentModal isOpen={isOpen} hideModal={hideModal} dataModal={dataModal} />

    {/* Modal Add */}
    <AddStudentModal 
        isOpenAdd = {isOpenAdd} 
        hideOpenAdd = {hideOpenAdd} 
        onSubmitAdd = {onSubmitAdd}
    />

    {/* Modal Delete Selected Questions*/}  
    <DeleteStudentModal 
        isOpenDelete={isOpenDelete} 
        hideOpenDelete={hideOpenDelete} 
        selectedRows={selectedRows}
        onSumbitDeleteSelected={onSumbitDeleteSelected}
        />
    
    </>
  );
}

export default Student;
