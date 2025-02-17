import React, {useEffect,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import EmptyTable from './EmptyTable';
import AdminNavbar from './AdminNavbar';
import './AdminLoanManagement.css'
export default function AdminLoanManagement() {
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const url = `http://localhost:8080/fetchAllLoanTypes`;
    const deleteLoan = loanid => async() => {
        try{
            const response = await axios.get("http://localhost:8080/deleteLoan/"+loanid);
            console.log("http://localhost:8080/deleteLoan/"+loanid);
            alert("Loan Deleted");
//            navigate("/adminLoan");
            window.location.reload(false)
        } catch(err){console.log(err);}
    };
    const fetchData = async() => {
        try{
            const response = await axios(url);
            setLoans(Array.from(response.data));
            console.log(response.data);
        } catch (err) {
            console.log("Error:" + err);
            setErrorMessage("Loan List Empty!");
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    const AddLoan = () => {
        navigate("/AdminAddLoan")
    }
  return (
    <div>
            <AdminNavbar />
        <div className='loan-management-container'>
            <div className='loan-management-header'><h2>Loan Card Details</h2><button className = "btn btn-primary" onClick={AddLoan}>Create New Loan +</button></div>
        
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Loan Id</th>
                <th scope="col">Loan Type</th>
                <th scope="col">Loan Duration</th>
                <th scope="col">Actions</th>
                </tr>
                {errorMessage && 
                    <div className="error-message">
                        {EmptyTable(errorMessage)}
                    </div>
                }
                {
                loans.map((loan,idx)=>(
                    <tr>
                    <td>{loan.loan_id}</td>
                    <td>{loan.loan_type}</td>
                    <td>{loan.duration_in_years}</td>
                    <td>
                        <button className='btn btn-primary text-white'><Link to={"/adminEditLoan/"+loan.loan_id}>Edit</Link></button><br></br>
                        <button className='btn btn-primary' onClick={deleteLoan(loan.loan_id)}>Delete</button>
                    </td>
                    </tr>
                ))
                }

            </thead>
            </table>
            </div>
    </div>
  )
}
