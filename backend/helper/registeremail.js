import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const mailOptions = (name, email, otp) => ({
  from: `"Your Website" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Verify your account - OTP",
  html: `
        <h2>Hello ${name},</h2>
        <p>Your OTP for account verification is:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
      `,
});

export const resetPasswordMailOptions = (name, email, otp) => ({
  from: `"Your Website" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Reset your password - OTP",
  html: `
        <h2>Hello ${name},</h2>
        <p>Your OTP for password reset is:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
});

// interviews

export const interviewMailOptions = (
  candidateName,
  candidateEmail,
  interviewername,
  date,
  time,
  meetingurl,
  notes
) => ({
  from: `"Job Portal" <${process.env.EMAIL_USER}>`,
  to: candidateEmail,
  subject: "Interview Scheduled - Job Portal",
  html: `
    <h2>Hello ${candidateName},</h2>
    <p>We are pleased to inform you that your interview has been scheduled.</p>
    <ul>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
      <li><strong>Interviewer Name:</strong> ${interviewername}</li>
      <li><strong>Meeting Link:</strong> <a href="${meetingurl}" target="_blank">Join Meeting</a></li>
    </ul>
    <p><strong>Additional Notes:</strong></p>
    <p>${notes}</p>
    <br/>
    <p>Best of luck for your interview!</p>
    <p>– Job Portal Team</p>
  `,
});

export const applicationMailOptions = (
  jobTitle,
  seekerName,
  employerEmail,
  coverLetter
) => ({
  from: `"Job Portal" <${process.env.EMAIL_USER}>`,
  to: employerEmail, // employer's email
  subject: `New Job Application - ${jobTitle}`,
  html: `
    <h2>New Application for ${jobTitle}</h2>
    <p><strong>Applicant:</strong> ${seekerName}</p>
    <p><strong>Cover Letter:</strong></p>
    <p>${coverLetter || "No cover letter provided."}</p>
    <p>Log in to your dashboard to view full application details.</p>
  `,
});

// Dynamic mail options
// export const mailOptions = (email, name) => ({
//   from: `"Your Website" <${process.env.EMAIL_USER}>`,
//   to: email,
//   subject: "Welcome to Our Website!",
//   html: `
//     <h2>Hello ${name},</h2>
//     <p>Thank you for registering on our website.</p>
//     <p>We're excited to have you on board! 🎉</p>
//   `,
// });
