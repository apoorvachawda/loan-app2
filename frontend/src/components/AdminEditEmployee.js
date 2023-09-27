import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate, useParams } from 'react-router';
import './Register.css'

export default function AdminEditEmployee() {
    const {employeeID} = useParams(); 
    const [employee, setEmployee] = useState({
        employee_id: "",
        first_name:"",
        last_name:"",
        home_add:"", 
        email_id:"", 
        phone_num:"", 
        employee_id:"",     
        dept:"",
        designation:"",
        gender:"",
        dob:"",
        doj:"",
        password: ""
    });
    const navigate = useNavigate();
    const url = `http://localhost:8080/employees/${employeeID}`;

    const fetchData = async() => {
        try{
            const response = await axios(url);
            setEmployee(response.data);
            console.log(response.data);
        } catch (err) {
            console.log("Error:" + err);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEmployee({...employee, [name] : value});
        console.log(e.target.name);
        console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8080/updateEmployee/"+employee.employee_id, {
                ...employee
            }).then((res) => {
                alert("Employee Updated Successfully")
                console.log(res.data);
                navigate("/adminEmployee");
            }, fail => {
                console.error(fail); // Error!
            });
        } catch (err) {
            alert(err);
        }   
    }
    return (
        <div className= "register-wrapper">
            
            <div className='register-form'>
            <h2 className='pb-3'>Loan Management Application</h2>
            <h3 className='pb-3'>Edit Employee Details</h3>
            <form action="" onSubmit={handleSubmit}>
                                
                <div className='form-group'>
                    <label for="employee_id">Employee ID:</label>
                    <input type="text" className = "form-control" name="employee_id" value={employee.employee_id} onChange={handleInput} disabled/>
                    <br/>
                </div>

                <div className='form-group'>
                    <label for="first_name" >First name:</label>
                    <input type="text" className = "form-control" name="first_name" value={employee.first_name} onChange={handleInput}/>
                    <br/>
                </div>
                
                <div className='form-group'><label for="last_name" >Last name:</label>
                <input type="text" className = "form-control" name="last_name" value={employee.last_name} onChange={handleInput}/>
                <br/></div>
                
                <div className='form-group'><label for="home_add">Home address:</label>
                <textarea name="home_add"className = "form-control" value={employee.home_add} onChange={handleInput}/>
                <br></br></div>
                
                <div className='form-group'>
                    <label for="email_id">Email:</label>
                    <input type="text" className = "form-control" value={employee.email_id} onChange={handleInput} name="email_id"/>
                    <br></br>
                </div>
                
                <div className='form-group'><label for="phone_num">Contact Number:</label>
                <input type="number" className = "form-control" maxLength={10} minLength={10} name="phone_num" value={employee.phone_num} onChange={handleInput}/>
                <br></br></div>
                
                <div className='form-group'>
                    <label for="password">Password:</label>
                    <input type="password" className = "form-control" name="password" onChange = {handleInput} value={employee.password} disabled/>
                    <br/>
                </div>               
               
                <div className='form-group'>
                    <label for="dept">Select department:</label>
                    <select name="dept" className = "form-control" value={employee.dept} onChange={handleInput}>
                        <option disabled value="">Select</option>
                        <option value="sales">Sales</option>
                        <option value="hr">Human Resources</option>
                        <option value="accounting">Accounting</option>
                        <option value="technical">Technical</option>
                    </select>
                </div>
                <br>
                </br>
                <div className='form-group'>
                    <label for="designation">Select Designation:</label>
                    <select className = "form-control" name="designation" value={employee.designation} onChange={handleInput}>
                        <option disabled value="">Select</option>
                        <option value="manager">Manager</option>
                        <option value="associate">Associate</option>
                        <option value="support">Support</option>
                    </select>
                </div>
                <br>
                </br>
                <div className='form-group'>
                    <label for="gender">Select Gender:</label>
                    <select className = "form-control" name="gender" value={employee.gender} onChange={handleInput}>
                        <option disabled value="">Select</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        <option value="o">Other</option>
                    </select>
                </div>
                <br></br>
                <div className='form-group'>
                <label for="dob">Date of Birth:</label>
                <input className = "form-control" type="date" name="dob" value={employee.dob} onChange={handleInput}/>
                <br></br>
                </div>
                <div className='form-group'>
                    <label for="doj">Date of Joining:</label>
                    <input className = "form-control" type="date" name="doj" value={employee.doj} onChange={handleInput}/>
                    <br></br>
                </div>
   
                <button type="submit" className= "btn btn-primary d-block w-100">Update Employee</button>.
                <button type="submit" className= "btn btn-primary d-block w-100" onClick={()=>navigate("/adminEmployee")}>Cancel</button>
            </form>
            </div>
            
        </div>
    )
}
