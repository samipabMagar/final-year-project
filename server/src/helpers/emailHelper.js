import transporter from "../configs/email.js";

// Helper function to send email
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `${process.env.APP_NAME} <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Function to send doctor approval email
export const sendDoctorApprovalEmail = async (email, doctorName) => {
  const subject = "Doctor Registration Approved - eDermaCare";
  const html = `<h2>Congratulations, ${doctorName}!</h2>
        <p>Your doctor registration has been approved.</p>
        <p>You can now log in to your dashboard and start using the platform.</p>
        <br/>
        <p>Thank you for joining us!</p>`;

  return await sendEmail(email, subject, html);
};

// Function to send doctor rejection email
export const sendDoctorRejectionEmail = async (email, doctorName, reason) => {
  const subject = "Doctor Registration Rejected - eDermaCare";
  const html = `<h2>Dear ${doctorName},</h2>
        <p>We regret to inform you that your doctor registration has been rejected.</p>
        <p>Reason for rejection: ${reason}</p>
        <p>If you have any questions or would like ँto reapply, please contact our support team.</p>
        <br/>
        <p>Thank you for your interest in joining eDermaCare.</p>`;
  return await sendEmail(email, subject, html);
};
