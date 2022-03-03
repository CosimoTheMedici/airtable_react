import React, { useState ,useEffect } from 'react';
import { ImageShow, TextInputCheckBox, TextInputIndex ,TextInputIndex1, TextInputIndexDate, TextInputIndexnumber } from '../Components/CustomComponents/TextInput';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import { errorNotification, successNotification, warningNotification } from '../Components/Notifications';
import Search from '../Components/Search';
import { fetchAllClients, fetchAllProjects, fetchAllTasks, fetchClientsByID, fetchTasksByID, patchClientRecord, patchProjectRecord, patchTaskRecord } from '../Services/airtableServices';
import { FaCheck } from 'react-icons/fa';
import { TextAreaIndex } from '../Components/CustomComponents/TextArea';

const Inputin = () => {return (
    <><input type = "text"/></>
)}
const AirTable = () => {
    const [dispLoader, setDispLoader] = useState("none");
    const [projectData, setProjectData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [clientDataID, setClientDataID] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const [taskDataID, setTaskDataID] = useState([]);
    const [inputBox, setInputBox] = useState(null);
    const [CurrentViewRecord, setCurrentViewRecord] = useState({});
    const [editContactId, setEditContactId] = useState(null);
    const [editColumn, setEditColumn] = useState(null); 
    const [checkBoxStatus, setCheckBoxStatus] = useState(false);
    const [checkBoxStatus2, setCheckBoxStatus2] = useState(false);  
  
    const handleRowEdit = (item,index,col) => {
        setEditContactId(index);
        setCurrentViewRecord(item);
        setEditColumn(col);
        

        
    };
    const handleRowEditClose = () => { 
        setEditContactId(null);
    }

    const [projectDetails, setProjectDetails] = useState({
        projectName: "",
        projectCategory: "",
        projectComplete: "",
        projectImages: "",
        projectLead: "",
        projectTeam: "",
        projectKickOff: "",
        projectDueDate: "",
        projectNotes: "",
      });

      const [clientDetails, setClientDetails] = useState({
        clientName: "",
        clientLogo: "",
        clientAbout: "",
        
      });

      const [taskDetails, setTaskDetails] = useState({
        taskName: "",
        subTasks: "",
        taskComplete: "",
        username: "",
        assignee: "",
        timeEstimate: "",
        
      });

    const headersFields =[
        { name : "Id",
          field: projectData.ID
        },
        { name : "project name",
          field: projectData.Name
        },
        { name : "category",
          field: ""
        },
       
        { name : "complete",
          field: ""
        },
        { name : "Kickoff date",
        field: ""
        },
        { name : "due date",
            field: ""
        },
        { name : "notes",
          field: ""
        },
        { name : "task name",
          field: ""
        },
        { name : "task complete",
          field: ""
        },
        { name : "asignee",
          field: ""
        },
        { name : "time estimate",
          field: ""
        },
        { name : "subtasks",
          field: ""
        },
        { name : "client",
          field: ""
        },
        { name : "about client",
          field: ""
        },
        { name : "client logo",
          field: ""
        },
        


    ]; 

    const handleProjectLead= (projectLead) => { 
        const {id:projectLeadId,email:projectLeadEmail,name:projectLeadName}=projectLead;

        let projectLeadData = {
            projectLeadId,projectLeadEmail,projectLeadName
        }
        return projectLeadData;

    }
    const handleProjectLeadNoData= () => { 
        let projectLeadId="";
        let projectLeadEmail ="";
        let projectLeadName="";


        let projectLeadData = {
            projectLeadId,projectLeadEmail,projectLeadName
        }
        return projectLeadData;

    }

     async function fetchClientListByID(cid) {
        setDispLoader("block")
        try {
            const fetchDataResponses =  await fetchClientsByID(cid);
            const {data:fetchDataRes,status} = fetchDataResponses
            //const {records:fetchDataResponses} = fetchDataRes;

          //console.log("destructure",fetchDataRes)
          if (fetchDataRes) {
    
            
                const {createdTime,fields,id:ClientIdentities} = fetchDataRes;
                const {Name:Clientnamess,About:clientabouts,Logo} = fields;
                // //const clientsname = fields.Name;
                
                const LOGO = Logo!== undefined? Logo[0]:""
                
                    const logodata = LOGO
                    const{id:logoids,url:logolink} = logodata; 
                
                    const logoID = logoids!== undefined?logoids :"";
                    const logoUrl = logolink!== undefined?logolink :"";
                    const clientabout = clientabouts!== undefined?clientabouts :"";
                    const Clientnames = Clientnamess!== undefined?Clientnamess :"";
                    const ClientIdentityi = ClientIdentities!== undefined?ClientIdentities :"";
                 
                let datas = {
                    logoID,
                    logoUrl,
                    clientabout,
                    Clientnames,
                    ClientIdentityi,          
                
                };
          //console.log("setClientDataID",datas)
               setClientDataID(datas);
             setDispLoader("none");
             return datas;
          } else {
            
          }
        } catch (ex) {
          console.log({ ex });
          
        }
        
    }
     

    async function fetchClientList() {
        setDispLoader("block")
        try {
            const { data: fetchDataRes,status } = await fetchAllClients();
            const {records:fetchDataResponses} = fetchDataRes;

          //console.log("countries",fetchDataResponses,status)
          if (fetchDataResponses) {
    
            const dataar = [];
            
            
              let x = 0;
      
              fetchDataResponses.forEach((fetchDataResponse) => {
                const {createdTime,fields,id:ClientIdentities} = fetchDataResponse;
                const {Name:Clientnamess,About:clientabouts,Logo} = fields;
                // //const clientsname = fields.Name;
                
                const LOGO = Logo!== undefined? Logo[0]:""
                
                    const logodata = LOGO
                    const{id:logoids,url:logolink} = logodata; 
                
                    const logoID = logoids!== undefined?logoids :"";
                    const logoUrl = logolink!== undefined?logolink :"";
                    const clientabout = clientabouts!== undefined?clientabouts :"";
                    const Clientnames = Clientnamess!== undefined?Clientnamess :"";
                    const ClientIdentityi = ClientIdentities!== undefined?ClientIdentities :"";
                 
                const datas = {
                    logoID,
                    logoUrl,
                    clientabout,
                    Clientnames,
                    ClientIdentityi,          
                
                };
                
                dataar.push(datas);
                x++;
                
              });
               //console.log("data",dataar)
               console.log("data//////",dataar)

              
            setClientData(dataar);
             setDispLoader("none");
          } else {
            
          }
        } catch (ex) {
          console.log({ ex });
          
        }
        
    }

    async function fetchTasksList() {
        try {
          const { data: fetchDataRes,status } = await fetchAllTasks();
          const {records:fetchDataResponses} = fetchDataRes;
          //console.log("tasks rendered",fetchDataResponses)
          if (fetchDataResponses) {
          let datacl = [];
          
          let x=0
          fetchDataResponses.forEach((fetchDataResponse) => {
            const {createdTime,fields,id:taskidentity} = fetchDataResponse;
            const estimated = "Time estimate (days)";
            const {Name:Taskname,Assignee:taskassignee,subtasks,Completed:taskcomplete,[estimated]:estimateddays} = fields;
            const Tasknames = Taskname!== undefined?Taskname :"";
            const TaskIdentity = taskidentity!== undefined?taskidentity :"";
            const Taskassignee = taskassignee!== undefined?taskassignee :"";
            const Subtasks = subtasks!== undefined?subtasks :"";
            const Taskcomplete = taskcomplete!== undefined?taskcomplete :"";
            const estimatedDays = estimateddays!== undefined?estimateddays :"";
            const AssigneeID = Taskassignee.id!== undefined?Taskassignee.id :"";
            const AssigneeEmail = Taskassignee.email!== undefined?Taskassignee.email :"";
            const AssigneeName = Taskassignee.name!== undefined?Taskassignee.name :"";
            


            

             let datas = {
                            Tasknames,
                            TaskIdentity,
                            AssigneeID,
                            AssigneeEmail,
                            AssigneeName,
                            Subtasks,
                            Taskcomplete,
                            estimatedDays
            };
                     

                     datacl.push(datas);
                     x++;
         });
         
          
             setTaskData(datacl);
            
          } else {
            //errorNotification("Unable to Partner Tarrrifs list");
          }
        } catch (ex) {
          console.log("error",{ ex });
          //errorNotification("Unable to fetch Biller list");
        }
      }

      async function fetchTasksListByID(task) {
        try {
          const { data: fetchDataRes,status } = await fetchTasksByID(task);
          //const {records:fetchDataResponses} = fetchDataRes;
          //console.log("tasks rendered",fetchDataResponses)
          if (fetchDataRes) {
          
            const {createdTime,fields,id:taskidentity} = fetchDataRes;
            const estimated = "Time estimate (days)";
            const {Name:Taskname,Assignee:taskassignee,subtasks,Completed:taskcomplete,[estimated]:estimateddays} = fields;
            const Tasknames = Taskname!== undefined?Taskname :"";
            const TaskIdentity = taskidentity!== undefined?taskidentity :"";
            const Taskassignee = taskassignee!== undefined?taskassignee :"";
            const Subtasks = subtasks!== undefined?subtasks :"";
            const Taskcomplete = taskcomplete!== undefined?taskcomplete :"";
            const estimatedDays = estimateddays!== undefined?estimateddays :"";
            const AssigneeID = Taskassignee.id!== undefined?Taskassignee.id :"";
            const AssigneeEmail = Taskassignee.email!== undefined?Taskassignee.email :"";
            const AssigneeName = Taskassignee.name!== undefined?Taskassignee.name :"";
            


            

             let datas = {
                            Tasknames,
                            TaskIdentity,
                            AssigneeID,
                            AssigneeEmail,
                            AssigneeName,
                            Subtasks,
                            Taskcomplete,
                            estimatedDays
            };
                     

          
         
          
             setTaskDataID(datas);
            return datas;
          } else {
            //errorNotification("Unable to Partner Tarrrifs list");
          }
        } catch (ex) {
          console.log("error",{ ex });
          //errorNotification("Unable to fetch Biller list");
        }
      }

    


    async function  fetchProjectsList() {
        setDispLoader("block")
        try {
          const { data: fetchDataRes,status } = await fetchAllProjects();
         const {records:fetchDataResponses} = fetchDataRes;

          //console.log("countries",fetchDataResponses,status)
          if (fetchDataResponses) {
    
            let data = [];
            console.log("datareal ting",typeof data)
            
              let x = 1;
      
              fetchDataResponses.forEach((fetchDataResponse) => {
                const {id:ID,fields,createdTime} = fetchDataResponse;
                const kickof = "Kickoff date";
                const projectImage = "Project images";
                const duedate = "Due date";
                const projectteam = "Project team";
                const projectlead = "Project lead";
                const{[kickof]:kickoff,Name,[projectImage]:projectImages,Client,Tasks,[duedate]:dueDate,[projectteam]:projectTeam,[projectlead]:projectLead,Notes,Category,Complete} = fields;
                //console.log("projectlead",projectLead);
                const dataProjectLead = projectLead !== undefined ? handleProjectLead(projectLead) : handleProjectLeadNoData()

                const fete = fetchClientListByID(Client[0])
                //console.log("clientDataID", clientDataID);
                let objClient =clientDataID;
                 // let objClient = clientData.find((v) => v.ClientIdentity == Client);
                 //console.log("typeof",Tasks); taskDataID


                const enquireTasks = Tasks!== undefined? Tasks[0] :null;
               
                
                const objTask = enquireTasks!== null? fetchTasksListByID(enquireTasks)  :{AssigneeEmail: "",AssigneeID: "", AssigneeName: "", Subtasks: "", TaskIdentity: "", Taskcomplete: "",Tasknames: "",estimatedDays: ""};
                

                //let objTask = taskData.find((v) => v.TaskIdentity == enquireTasks);
                // let objTask = taskData.find((v) => v.TaskIdentity == Tasks);
                console.log("here is the data for all task",fete )

    

                // const taskDatas = Tasks !== undefined ? Tasks:
                // taskDatas.forEach((taskData) => {
                //     const tas = getTaskData(taskData);
                //     //console.log("task output",tas)
                // })
                
       
               //const verifiedDate =  verifiedOn != null ? new Date(verifiedOn).toLocaleDateString("en-GB") : "Unverified";
               
                //const dataps={lable:ID,value:channelName}

                const countID=x;      
                const datas = {
                  countID,
                  ID,
                  ClientIdentity:objClient.ClientIdentityi,
                  Clientnames:objClient.Clientnames,
                  clientabout:objClient.clientabout,
                  logoID:objClient.logoID,
                  logoUrl:objClient.logoUrl,

                  AssigneeEmail:objTask.AssigneeEmail,
                  AssigneeID:objTask.AssigneeID,
                  AssigneeName:objTask.AssigneeName,
                  Subtasks:objTask.Subtasks,
                  TaskIdentity:objTask.TaskIdentity,
                  Taskcomplete:objTask.Taskcomplete,
                  Tasknames:objTask.Tasknames,
                  estimatedDays:objTask.estimatedDays,

                  kickoff,
                  Name,
                  Client,
                  dueDate,
                  projectTeam,
                  Notes,
                  Category,
                  Complete,
                  projectLeadId:dataProjectLead.projectLeadId,
                  projectLeadEmail:dataProjectLead.projectLeadEmail,
                  projectLeadName:dataProjectLead.projectLeadName,
                  createdTime,           
                
                };
                //dropData.push(dataps);
                data.push(datas);
                //console.log("data...here we are" , data)
                x++;
              });

              
            setProjectData(data);
            console.log("data...projectData" , data)
            setDispLoader("none");
          } else {
            //errorNotification("Unable to Partner Tarrrifs list");
          }
        } catch (ex) {
          console.log({ ex });
          //errorNotification("Unable to fetch Biller list");
        }
      }
    useEffect(() => {
        fetchClientList();
        fetchProjectsList();
        fetchClientList();
        fetchTasksList();   
      }, []);

      const handleChangeProjects = ({ currentTarget: input }) => {
        let name = input.id;
        let value = input.value;

        setProjectDetails({
          ...projectDetails,
          [name]: value,
        });
      };
      const handleChangeClient= ({ currentTarget: input }) => {
        let name = input.id;
        let value = input.value;

        setClientDetails({
          ...clientDetails,
          [name]: value,
        });
      };
      const handleChangeTasks = ({ currentTarget: input }) => {
        let name = input.id;
        let value = input.value;

        setTaskDetails({
          ...taskDetails,
          [name]: value,
        });
      };

      const handleOnChange = ({ currentTarget: input }) => {
        setCheckBoxStatus(!checkBoxStatus)
        console.log("checkBoxStatus. ..", checkBoxStatus)
        let name = input.id;
        setProjectDetails({
            ...projectDetails,
            [name]: checkBoxStatus,
          });
         // setCheckBoxStatus("")
         //true is a new 
         //false is old 
          
        
    }
    const handleOnChange2 = ({ currentTarget: input }) => {
        setCheckBoxStatus2(!checkBoxStatus2)
        console.log("checkBoxStatus. ..", checkBoxStatus2)
        let name = input.id;
        setProjectDetails({
            ...projectDetails,
            [name]: checkBoxStatus2,
          });
         // setCheckBoxStatus("")
         //true is a new 
         //false is old 
          
        
    }

      const updateProjectsName = async( input ) => {
        setDispLoader("block")
        setEditContactId(null)
          console.log("this is input",CurrentViewRecord)
          console.log("this is projectdetails",projectDetails)

          let payload = {
            "records": [
                {
                    id: CurrentViewRecord.ID,
                    fields: {
                        Name:projectDetails.projectName,
                        
                    }
                   
                }
            ]
        }
        console.log("payload...",payload)
        

        try {
            const { data: patchDataRes,status } = await patchProjectRecord(payload);
            console.log("status",status)
            //console.log("createPartnerResponse",createPartnerResponse)
            
    
            if (status === 200) {
    
              successNotification("Updated successfully");
              fetchProjectsList();
            } else {
              errorNotification("Not updated successfully");
            }
          } catch (ex) {
            //errorNotification("Error creating Partner " + ex);
          }


        setDispLoader("none")
      }

      const updateProjectsComplete = async() => {
          console.log("projectDetails. ..", projectDetails)

          setDispLoader("block")
          console.log("this is input",CurrentViewRecord)
          console.log("this is projectdetails",projectDetails)

          let payload = {
            "records": [
                {
                    id: CurrentViewRecord.ID,
                    fields: {
                       
                        Complete:projectDetails.projectComplete,
                        
                    }
                   
                }
            ]
        }
        console.log("payload...",payload)
        

        try {
            const { data: patchDataRes,status } = await patchProjectRecord(payload);
            console.log("status",status);
            //console.log("createPartnerResponse",createPartnerResponse)
            
    
            if (status === 200) {
    
              successNotification("Updated successfully");
              fetchProjectsList();
            } else {
              errorNotification("Not updated successfully");
            }
          } catch (ex) {
            //errorNotification("Error creating Partner " + ex);
          }

            // setCheckBoxStatus(true);
            // setCheckBoxStatus2(true);

            setDispLoader("none");

      }
      const updateProjectsKickOffDate = async(project ) => {
        setDispLoader("block")
        setEditContactId(null)
        console.log("project. ..", project);
        //const vale = project==="Kickoff date"?"projectKickOff":"projectDueDate"

        console.log("this is input",CurrentViewRecord)
        console.log("this is projectdetails",projectDetails)


            const payload = {
                "records": [
                    {
                        id: CurrentViewRecord.ID,
                        fields: {
                           
                            "Kickoff date":projectDetails.projectKickOff,
                            
                        }
                       
                    }
                ]
            }
        

        
      console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchProjectRecord(payload);
          console.log("status",status);
          //console.log("createPartnerResponse",createPartnerResponse)
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchProjectsList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }

          

          setDispLoader("none");

      }

      const updateProjectsDueDate = async(project ) => {
        setDispLoader("block")
        setEditContactId(null)
        console.log("project. ..", project);
        //const vale = project==="Kickoff date"?"projectKickOff":"projectDueDate"

        console.log("this is input",CurrentViewRecord)
        console.log("this is projectdetails",projectDetails)


            const payload = {
                "records": [
                    {
                        id: CurrentViewRecord.ID,
                        fields: {
                           
                            "Due date":projectDetails.projectDueDate,
                            
                        }
                       
                    }
                ]
            }
        

        
      //console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchProjectRecord(payload);
          console.log("status",status);
          //console.log("createPartnerResponse",createPartnerResponse)
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchProjectsList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }

          

          setDispLoader("none");

      }

      const updateProjectsNotes = async(project ) => {
        setDispLoader("block")
        setEditContactId(null)
        console.log("project. ..", project);
        //const vale = project==="Kickoff date"?"projectKickOff":"projectDueDate"

        console.log("this is input",CurrentViewRecord)
        console.log("this is projectdetails",projectDetails)


            const payload = {
                "records": [
                    {
                        id: CurrentViewRecord.ID,
                        fields: {
                           
                            "Notes":projectDetails.projectNotes,
                            
                        }
                       
                    }
                ]
            }
        

        
      //console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchProjectRecord(payload);
          console.log("status",status);
          //console.log("createPartnerResponse",createPartnerResponse)
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchProjectsList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }

          

          setDispLoader("none");

      }

      const updateClientName = async( ) => {
        setDispLoader("block")
        setEditContactId(null)
        
        console.log("this is input",CurrentViewRecord)
        console.log("this is taskDetails",clientDetails)




            const payload = {
                "records": [
                    {
                        id: CurrentViewRecord.ClientIdentity,
                        fields: {
                           
                            "Name":clientDetails.clientName,
                            
                        }
                       
                    }
                ]
            }
        

        
      console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchClientRecord(payload);
          console.log("status",status);
          //console.log("createPartnerResponse",createPartnerResponse)
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchProjectsList();
            //fetchClientList();

          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }

          setDispLoader("none");
      }


      const updateProjectsName1 = async(  ) => {
        console.log("projectDetails. ..", projectDetails);
        //console.log("projectDetails. ..",checkBoxStatus);
    }
      

    
  return (
    <>
    <div style={{display:dispLoader}}><Loader/></div>
    
    {/* <Header title="Building some table"/> */}

    <div className='row w-100'>
        <div className='col mb-3 col-12 text-center'>
            <div className='row'>
                <div className='col-md-6'>
                    pagging
                </div>
                <div className='col-md-6 d-flex flex-row-reverse'>
                    <Search/>
                </div>
            </div>

            <table className='table  table-striped  table-bordered table-hover'>
                <Header headers={headersFields}/>
                <tbody>
                
                    {projectData.map((item,index) => (<tr key ={index}>
                        <th >{item.countID}</th>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 1)} scope="1">{editContactId === index && editColumn===1 ? <TextInputIndex id="projectName" placeHolder={item.Name} onChange={handleChangeProjects} onBlur={(e) => updateProjectsName("projectName")}/>:item.Name}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 2)} scope="1">{editContactId === index && editColumn===2 ? <TextInputIndex1 id="projectCategory" placeHolder={item.Category} onChange={handleChangeProjects} onBlur={(e) => updateProjectsName1("Category")}/>:item.Category}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 3)} scope="1">{editContactId === index && editColumn===3 ? (item.Complete ===true ? <TextInputCheckBox id="projectComplete"   defaultChecked="checked"  onChange={handleOnChange} onBlur={(e) => updateProjectsComplete("projectComplete")}/>:<TextInputCheckBox id="projectComplete" onChange={handleOnChange2}  onBlur={(e) => updateProjectsComplete("projectComplete")}/>) :item.Complete===true ?<FaCheck/>:""}</td>
                        {/* <td  onClick={() => handleRowEdit(item,index, 3)} scope="1">{editContactId === index && editColumn===3 ? (item.Complete ===true ? setCheckBoxStatus(true) :setCheckBoxStatus(false); <TextInputCheckBox id="projectComplete"  onChange={setCheckBoxStatus(!true)} check={checkBoxStatus}  onBlur={(e) => updateProjectsName1("Complete")}/>) :item.Complete===true ?<FaCheck/>:""}</td> */}

                        {/* <td  onClick={() => handleRowEdit(item,index, 4)} scope="1">{editContactId === index && editColumn===4 ? <TextInputIndex1 id="projectComplete" placeHolder={item.Category} onChange={handleChangeProjects} onBlur={(e) => updateProjectsName1("Client")}/>:item.Client}</td> */}
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 5)} scope="1">{editContactId === index && editColumn===5 ? <TextInputIndexDate id="projectKickOff" placeHolder={item.kickoff} onChange={handleChangeProjects} onBlur={(e) => updateProjectsKickOffDate("Kickoff date")}/>:item.kickoff}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 6)} scope="1">{editContactId === index && editColumn===6 ? <TextInputIndexDate id="projectDueDate" placeHolder={item.dueDate} onChange={handleChangeProjects} onBlur={(e) => updateProjectsDueDate("Due date")}/>:item.dueDate}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onDoubleClick={() => handleRowEdit(item,index, 7)} scope="1">{editContactId === index && editColumn===7 ? <TextAreaIndex id="projectNotes" rows="6" placeHolder={item.Notes} onChange={handleChangeProjects} onBlur={(e) => updateProjectsNotes("Notes")}/>:item.Notes}</td>

                        {/* AssigneeEmail,AssigneeID,AssigneeName,Subtasks,TaskIdentity,Taskcomplete,Tasknames,estimatedDays */}

                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 8)} scope="1">{editContactId === index && editColumn===8 ? <TextInputIndex  id="taskName" placeHolder={item.Tasknames} onChange={handleChangeTasks} onBlur={(e) => updateProjectsName1("taskName")}/>:item.Tasknames}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 9)} scope="1">{editContactId === index && editColumn===9 ? (item.Taskcomplete ===true ? <TextInputCheckBox id="taskComplete"   defaultChecked="checked"  onChange={handleOnChange} onBlur={(e) => updateProjectsName1("projectComplete")}/>:<TextInputCheckBox id="taskComplete" onChange={handleOnChange2}  onBlur={(e) => updateProjectsName1("projectComplete")}/>) :item.Taskcomplete===true ?<FaCheck/>:""}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 10)} scope="1">{editContactId === index && editColumn===10 ? <TextAreaIndex id="assignee" placeHolder={item.AssigneeName} onChange={handleChangeTasks} onBlur={(e) => updateProjectsName1("Due date")}/>:item.AssigneeName}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 11)} scope="1">{editContactId === index && editColumn===11 ? <TextInputIndex  inputType= "number" id="timeEstimate" placeHolder={item.estimatedDays} onChange={handleChangeTasks} onBlur={(e) => updateProjectsName1("Due date")}/>:item.estimatedDays}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 12)} scope="1">{editContactId === index && editColumn===12 ? <TextAreaIndex id="subTasks" placeHolder={item.Subtasks} onChange={handleChangeTasks} onBlur={(e) => updateProjectsName1("Due date")}/>:item.Subtasks}</td>

                        {/* Clientnames clientabout logoUrl */}
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 13)} scope="1">{editContactId === index && editColumn===13 ? <TextInputIndex id="clientName" placeHolder={item.Clientnames} onChange={handleChangeClient} onBlur={(e) => updateClientName("Due date")}/>:item.Clientnames}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 14)} scope="1">{editContactId === index && editColumn===14 ? <TextAreaIndex id="clientAbout" placeHolder={item.clientabout} onChange={handleChangeClient} onBlur={(e) => updateProjectsName1("Due date")}/>:item.clientabout}</td>
                        <td  onClickOutside={() =>handleRowEditClose()} onClick={() => handleRowEdit(item,index, 15)} scope="1">{editContactId === index && editColumn===15 ? <TextInputIndex id="clientLogo" placeHolder={item.logoUrl} onChange={handleChangeClient} onBlur={(e) => updateProjectsName1("Due date")}/>:<ImageShow source={item.logoUrl} imgWidth={"50px"} imgheight={"50px"}/>}</td>

      



                        
                    </tr>))}
                   

                </tbody>

            </table>
        </div>
    </div>
    </>
  )
}

export default AirTable