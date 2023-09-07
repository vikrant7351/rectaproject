import React, { useState } from 'react';
import Axios from 'axios';
import '../App.css'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setEmailExists(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendVerification = async (e) => {
    e.preventDefault();

    try {
      const checkEmailResponse = await Axios.post(
        'http://localhost:4000/api/check-email-exists',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (checkEmailResponse.status === 200 && checkEmailResponse.data.exists) {
        const response = await Axios.post(
          'http://localhost:4000/api/reset-password',
          { email },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setVerificationSent(true);
        } else {
          setEmailError('Invalid email address');
        }
      } else {
        setEmailError('Email not found');
      }
    } catch (error) {
      console.error(error);
      setEmailError('Server error');
    }
  };


  
  const handleResetPassword = async () => {
    try {
      const response = await Axios.post(
        'http://localhost:4000/api/reset-password-manually',
        { email, newPassword: password, otp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setResetPasswordSuccess(true);
      } else {
        // Handle password reset failure
      }
    } catch (error) {
      console.error(error);
      // Handle password reset failure
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {!verificationSent ? (
        <form onSubmit={handleSendVerification}>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <p className="error">{emailError}</p>
          <button type="submit">Send Verification</button>
        </form>
      ) : resetPasswordSuccess ? (
        <div>
          <p>Password reset successfully.</p>
          {/* Display a success message or redirect to login */}
        </div>
      ) : (
        <div>
          <label htmlFor="otp">
            <b>Verification Code</b>
          </label>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
            required
          />
          <label htmlFor="password">
            <b>New Password</b>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
