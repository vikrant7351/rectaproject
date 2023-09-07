import React,{useState} from 'react';
import {Link } from "react-router-dom";
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import '../App.css'






function SignupModal() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

    const [formData,setFormData] = useState({
        email: '',
        name: '',
        dob: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        dob: '',
        password: '',
        confirmPassword: '',
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });

        setErrors({
            ...errors,
            [name]: '',
          });
        };

  const openModal = () => {
    document.getElementById('id01').style.display = 'block';
  };

  const closeModal = () => {
    document.getElementById('id01').style.display = 'none';
  };

  const handleSubmit = async(e) => {
    // Handle form submission here
    e.preventDefault();
    let valid = true;

    if (!formData.email.trim()) {
      setErrors({
        ...errors,
        email: 'Email is required',
      });
      valid = false;
    }

    if (!formData.password.trim()) {
      setErrors({
        ...errors,
        password: 'Password is required',
      });
      valid = false;
    } else if (formData.password.length < 6) {
      setErrors({
        ...errors,
        password: 'Password must be at least 6 characters long',
      });
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: 'Passwords do not match',
        });
        valid = false;
      }

      

    // If all validations pass, you can proceed with form submission
    if (valid) {
      console.log('Form submitted:', formData);
      
  if (valid) {
    try {
      const response = await Axios.post('http://localhost:4000/api/users', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
});

      if (response.status === 201) {
        console.log('User created successfully');
        toast.success('User created successfully'); // Display a success toast
        // Reset form data or close the modal as needed
      } else {
        console.error('Server error');
        toast.error('Server error');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  }
      // Perform your form handling logic here
      // Reset form data or close modal as needed
    }
};
  

  return (
    // <>
    <div>
     <ToastContainer />

     {loggedInUser ? (
      
      <div>
      {/* <h2>Welcome, {loggedInUser.name}!</h2>
      <button onClick={() => setLoggedInUser(null)}>Logout</button> */}
      </div>

     ) :(
      <div>
    <h2>Modal Signup Form</h2>
      <button onClick={openModal} style={{ width: 'auto' }}>
        Sign Up!
      </button>
       {/* <Login onLogin={handleLogin} /> */}

      <div id="id01" className="modal">
        <span onClick={closeModal} className="close" title="Close Modal">
          &times;
        </span>
        <form
          className="modal-content"
          id="signupForm"
          onSubmit={handleSubmit}
        >
          <div className="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              id="emailError"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <p className="error">{errors.email}</p>

            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="dob">
              <b>Date of birth</b>
            </label>
            <input
              type="date"
              placeholder="Enter your DOB"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            /><br />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="passwordError"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <p className="error">{errors.password}</p>

            <label htmlFor="psw-repeat">
              <b>Repeat Password</b>
            </label>
            <input
              type="password"
              id="repasswordError"
              placeholder="Repeat Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
               <p className="error">{errors.confirmPassword}</p>

            <label>
              <input
                type="checkbox"
                defaultChecked
                name="remember"
                style={{ marginBottom: '15px' }}
              />{' '}
              Remember me
            </label>

            <p>
              By creating an account you agree to our{' '}
              <a href="#" style={{ color: 'dodgerblue' }}>
                Terms & Privacy
              </a>
              .
            </p>

            <div className="clearfix">
              <button
                type="button"
                onClick={closeModal}
                className="cancelbtn"
              >
                Cancel
              </button>
              <button type="submit" className="signupbtn">
                Sign Up
              </button>
              <button>
                <Link to = '/Login'> Login</Link>
                </button>
            
            </div>
          </div>
        
        </form>
        
      </div>
      </div>
      )}
      </div>
   
  );
  }
  


export default SignupModal;   // ek file may ak hi component ko defult use kar saktey h
                              // default componet ko kisi bhi name say import kar saketay bss file name same ho

// export {SignupModal,xyz,abc,}    jab multipale component export kar nay ho to
