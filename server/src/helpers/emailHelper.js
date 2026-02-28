import transporter from "../configs/email";

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

export const sendDoctorApprovalEmail = async (email, doctorName) => {
  const subject = "Doctor Registration Approved - eDermaCare";
  const html = `<h2>Congratulations, ${doctorName}!</h2>
        <p>Your doctor registration has been approved.</p>
        <p>You can now log in to your dashboard and start using the platform.</p>
        <br/>
        <p>Thank you for joining us!</p>`;

  try {
    return await sendEmail(userEmail, subject, html);
  } catch (error) {
    console.error("Failed to send approval email:", error.message);
  }
};
