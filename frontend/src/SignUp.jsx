import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
function SignUp(){
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [validated, setValidated] = useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!name || !email || !password) {
      setValidated(true); // show errors
      return;
    }
    setValidated(false);
        axios.post('',{name,email,password}).then(result=>console.log(result)).catch(err=>console.log(err));


    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            onChange={(e)=>setName(e.target.value)}
                             className={`form-control rounded ${validated && !name ? "is-invalid" : ""}`}
                            required
                        />
                        <div className="invalid-feedback">Please enter your Name</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                             onChange={(e)=>setEmail(e.target.value)}
                             className={`form-control rounded ${validated && !email ? "is-invalid" : ""}`}
                            required
                        />
                        <div className="invalid-feedback">Please enter your Email</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            name="password"
                             onChange={(e)=>setPassword(e.target.value)}
                            className={`form-control rounded ${validated && !password ? "is-invalid" : ""}`}
                            required
                        />
                        <div className="invalid-feedback">Please enter your Password</div>
                       
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded">Register</button>
                    <p>Already Have an Account</p>
                    <Link to='/' className="btn btn-default border w-100 bg-light rounded text-decoration-none">Login</Link>
                </form>

            </div>
             
        </div>
    )
}

export default SignUp;