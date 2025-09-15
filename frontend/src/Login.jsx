import { useState } from "react";
import { Link } from "react-router-dom";
function Login(){
     const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [validated, setValidated] = useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if ( !email || !password) {
      setValidated(true); // show errors
      return;
    }
    setValidated(false);
        axios.post('',{email,password}).then(result=>console.log(result)).catch(err=>console.log(err));


    }
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Welcome Back</h2>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}

                           className={`form-control rounded ${validated && !email ? "is-invalid" : ""}`}
                            required
                        />
                        <div className="invalid-feedback">Please enter your Email</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                             onChange={(e)=>setPassword(e.target.value)}
                            className={`form-control rounded ${validated && !password ? "is-invalid" : ""}`}
                            required
                        />
                         <div className="invalid-feedback">Please enter your password</div>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                    <p>Don't Have an Account</p>
                    <Link to='/Signup' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</Link>
                </form>

            </div>
             
        </div>
    )
}

export default Login;