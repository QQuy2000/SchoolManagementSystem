import React,{useEffect} from "react";
import TableStudent from "./TableStudent";
import DetailStudentModal from "./Modal/DetailStudentModal";
import AddStudentModal from "./Modal/AddStudentModal";
import DeleteStudentModal from "./Modal/DeleteStudentModal";
import './Student.css'
import { Button,Badge } from "react-bootstrap";
function handleNameClick(e){

}
const BadgeSkill = ({ values }) => {
  return (
      <>
          {values.map((course, id) => {
              return (
                  <Badge key={id} bg="secondary" className="me-1 mb-1" style={{ fontSize: '0.85em' }}>{course.name} {' '}</Badge>
              );
          })}
      </>
  );
};
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
function Student() {
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
            accessor: "fullname",
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
            accessor: "course",
            Filter: () => null,
            Cell: ({ cell: { value } }) => <BadgeSkill values={value} />,
            width: '35%',

          },
        ],
    []
  );
  //Get data
  const [data, setData] = React.useState([])

  //Store data in Modal when select in row(detail and edit question)
  const [dataModal, setDataModal] = React.useState({})

  //Modal Edit question
  const [id, setId] = React.useState(null)
  const [updateQuestion, setUpdateQuestion] = React.useState("")
  const [updateAnswer, setUpdateAnswer] = React.useState("")
  const [updateSkill, setUpdateSkill] = React.useState("")
  const [updateStatus, setUpdateStatus] = React.useState("")
  const [updateLevel, setUpdateLevel] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState([])


  function getResource() {
    fetch("https://62c7db500f32635590cba090.mockapi.io/resources").then((result) => {
        result.json().then((resp)=>{
            setData(resp)
        })
    })
  }

  useEffect(() => {
    getResource()
  },[data])


  //Modal detail question
  const [isOpen, setIsOpen] = React.useState(false);
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
      setUpdateStatus("Processing")
      const newID = ~~data[data.length - 1].id + 1;
      setId(newID)

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

    <TableStudent columns={columns} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete}/>
     

    {/* Modal Detail Question  */}
    <DetailStudentModal isOpen={isOpen} hideModal={hideModal} dataModal={dataModal} />

    {/* Modal Add */}
    <AddStudentModal 
        isOpenAdd = {isOpenAdd} 
        hideOpenAdd = {hideOpenAdd} 
        id = {id} 
        updateSkill = {updateSkill} 
        setUpdateSkill = {setUpdateSkill}
        updateLevel = {updateLevel}
        setUpdateLevel = {setUpdateLevel}
        updateQuestion = {updateQuestion}
        setUpdateQuestion = {setUpdateQuestion}
        updateAnswer = {updateAnswer}
        setUpdateAnswer = {setUpdateAnswer}
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
