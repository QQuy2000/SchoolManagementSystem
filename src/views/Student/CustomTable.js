import React,{useEffect} from "react";
import WrapTable from "./WrapTable";
import ModalDetail from "./Modal/ModalDetail";
import ModalAdd from "./Modal/ModalAdd";
import ModalEdit from "./Modal/ModalEdit";
import ModalDeleteRow from "./Modal/ModalDeleteRow";
import ModalDeleteSelected from "./Modal/ModalDeleteSelected";
import {  SelectColumnFilter  } from "./WrapTable";
import './CustomTable.css'
// A great library for fuzzy filtering/sorting items
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
function CustomTable() {
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
          // {
          //   Header:"Action",
          //   accessor: 'action',
          //   Filter: () => null,
          //   Cell: row => (
          //   <div style={{display:'flex', justifyContent:'center'}}>
          //      {/* <button onClick={e=> handleEdit(row.row.original)}>...</button> */}
          //      <Button 
          //           onClick={()=>handleDataModal(row.row.original)}
          //           style={{marginRight: '8px', height:'40px', width:'20px', display:'flex', justifyContent:'center'}}
          //           variant="info"
          //       >
          //           <i className="fas fa-info" style={{fontSize:'18px'}}></i>
          //       </Button>
          //       <Button 
          //           onClick={()=>handleEditModal(row.row.original)}
          //           variant="primary"
          //           style={{marginRight: '8px', height:'40px', width:'20px', display:'flex', justifyContent:'center'}}
          //       >
          //           <i className="fas fa-pen-square" style={{fontSize:'18px'}} ></i>
          //       </Button>
          //       <Button 
          //           onClick={()=>handleOpenRowDeleteModal(row.row.original)}
          //           variant="danger"
          //           style={{ height:'40px', width:'20px', display:'flex', justifyContent:'center'}}
          //       >
          //           <i className="fas fa-trash" style={{fontSize:'18px'}}></i>
          //       </Button>
          //   </div>
          //   ),
          // }
        ],
    []
  );
  //Get data
  const [data, setData] = React.useState([])

  //Store data in Modal when select in row(detail and edit question)
  const [dataModal, setDataModal] = React.useState({})

  //Modal Edit question
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const [id, setId] = React.useState(null)
  const [updateQuestion, setUpdateQuestion] = React.useState("")
  const [updateAnswer, setUpdateAnswer] = React.useState("")
  const [updateSkill, setUpdateSkill] = React.useState("")
  const [updateStatus, setUpdateStatus] = React.useState("")
  const [updateLevel, setUpdateLevel] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState([])

// render data
  // function getResource() {
  //   fetch("https://62c7db500f32635590cba090.mockapi.io/resources").then((result) => {
  //       result.json().then((resp)=>{
  //           setData(resp)
  //       })
  //   })
  // }
  function getResource() {
    fetch("https://62c7db500f32635590cba090.mockapi.io/resources").then((result) => {
        result.json().then((resp)=>{
            setData(resp)
        })
    })
  }

  useEffect(() => {
    getResource()
  },[])


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

  //Handle Modal Edit question
  const hideModalEdit = () => {
    setIsOpenEdit(false)
    // setId(null)
    setUpdateQuestion("")
    setUpdateAnswer("")
    setUpdateSkill("")
    setUpdateLevel("")
    setUpdateStatus("")
  }
  const handleEditModal  = (data) => {
    setIsOpenEdit(true)
    setId(data.id)
    setUpdateQuestion(data.question)
    setUpdateAnswer(data.answer)
    setUpdateSkill(data.skill)
    setUpdateLevel(data.level)
    setUpdateStatus(data.status)
  } 
  const onSubmitEdit = () => {
    let item = {
            skill: updateSkill,
            question: updateQuestion,
            answer: updateAnswer,
            status: updateStatus,
            level: updateLevel}
    fetch(`https://62c7db500f32635590cba090.mockapi.io/resources/${id}`,{
        method: 'PUT',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then((result) => {
        result.json().then(()=>{
            getResource()
            setIsOpenEdit(false)
        })
    })
    setId(null)
    setUpdateQuestion("")
    setUpdateAnswer("")
    setUpdateSkill("")
    setUpdateLevel("")
    setUpdateStatus("")
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

{/* Modal row Delete */} 
   const [isOpenRowDeleteModal, setIsOpenRowDeleteModal] = React.useState(false)

   const handleOpenRowDeleteModal = (data) => {
        setIsOpenRowDeleteModal(true);
        setDataModal(data)
        setId(data.id)
   }

   const hideOpenRowDeleteModal = () =>{
        setIsOpenRowDeleteModal(false)
        setDataModal({})
        setId(null)
   }

   function onSumbitDeleteRow(){
    fetch(`https://62c7db500f32635590cba090.mockapi.io/resources/${id}`,{
        method: 'DELETE',
    }).then((result) => {
        result.json().then(()=>{
            getResource()
            setIsOpenRowDeleteModal(false)
        })
    })
    setId(null)
    setDataModal({})
   }

  return (
    <>
    {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRows
            
            },
            null,
            2
          )}
        </code>
      </pre> */}

    <WrapTable columns={columns} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete}/>
     

    {/* Modal Detail Question  */}
    <ModalDetail isOpen={isOpen} hideModal={hideModal} dataModal={dataModal} />

    {/* Modal Add */}
    <ModalAdd 
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

    {/* Modal edit */}
    <ModalEdit
            isOpenEdit = {isOpenEdit}
            hideModalEdit = {hideModalEdit}
            id = {id} 
            updateStatus = {updateStatus}
            setUpdateStatus = {setUpdateStatus}
            updateSkill = {updateSkill} 
            setUpdateSkill = {setUpdateSkill}
            updateLevel = {updateLevel}
            setUpdateLevel = {setUpdateLevel}
            updateQuestion = {updateQuestion}
            setUpdateQuestion = {setUpdateQuestion}
            updateAnswer = {updateAnswer}
            setUpdateAnswer = {setUpdateAnswer}
            onSubmitEdit = {onSubmitEdit}
    />

    {/* Modal Delete Selected Questions*/}  
    <ModalDeleteSelected 
        isOpenDelete={isOpenDelete} 
        hideOpenDelete={hideOpenDelete} 
        selectedRows={selectedRows}
        onSumbitDeleteSelected={onSumbitDeleteSelected}
        />
    
    {/* Delete Each Row  */}
    <ModalDeleteRow 
        isOpenRowDeleteModal = { isOpenRowDeleteModal}
        hideOpenRowDeleteModal = {hideOpenRowDeleteModal}
        dataModal = { dataModal}
        onSumbitDeleteRow = { onSumbitDeleteRow} 
    />
    </>
  );
}

export default CustomTable;
