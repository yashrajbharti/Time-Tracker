export const mailTemplate = (mail, inviteLink, email) => {
  const mailOptions = {
    from: `"Contracts @ Mercor" <${mail}>`,
    to: email,
    subject: "You're Invited to Join a Project 🚀",
    html: `
<body style="margin: 0; padding: 0;">
  <div style="text-align: center; font-family: 'Roboto', sans-serif; padding: 20px;">
    <div style="margin-top: 20px;">
      <img src="cid:invitation" width="auto" height="200px" alt="Invitation" role="presentation">
    </div>

    <br>

    <h1 style="color: #323232;">Mercor Invitation</h1>
    <p style="font-size: 18px; color: #323232;">You have been invited to join a project on Mercor.</p>

    <a href="${inviteLink}" style="text-decoration: none;">
      <button
        style="cursor: pointer; padding: 15px 45px; background-color: #212121; color: #F3F3F3; border: none; border-radius: 10px; font-size: 16px;">
        Accept Invitation
      </button>
    </a>

    <br><br>

    <footer>
      <div style="text-align: center; font-family: 'Roboto', sans-serif;">
        <p style="font-size: 15px; color: #676767;">For more information, visit <a href="https://mercor.com" target="_blank" style="color: #557FFE; text-decoration: none;">Mercor</a></p>
        
        <p style="color: #676767;">Connect with us:</p>

        <div style="margin-bottom: 20px;">
          <a href="https://www.facebook.com/MercorSoftware/" target="_blank"><img src="cid:facebook" width="auto" height="30px" style="margin-right: 10px;" alt="Facebook"></a>
          <a href="https://www.linkedin.com/company/mercor-ai/" target="_blank"><img src="cid:linkedin" width="auto" height="30px" style="margin-right: 10px;" alt="LinkedIn"></a>
          <a href="https://www.instagram.com/mercor_ai/?hl=en" target="_blank"><img src="cid:instagram" width="auto" height="30px" style="margin-right: 10px;" alt="Instagram"></a>
          <a href="https://x.com/mercor_ai" target="_blank"><img src="cid:twitter" width="auto" height="30px;" alt="Twitter"></a>
        </div>

        <div style="max-width: 600px; margin: 0 auto;">
          <p style="font-size: 13px; color: #676767; font-weight: 300; padding: 0 15px;">
            This message was sent to you because you were invited to participate in a project opportunity at Mercor. If you are not interested, you may safely ignore this email.
          </p>

          <p style="font-size: 13px; color: #676767; font-weight: 300; padding: 0 15px;">
            &copy; ${new Date().getFullYear()} Mercor. All Rights Reserved.
          </p>

          <div style="margin-top: 10px;">
            <a href="https://mercor.com/blog/" target="_blank" style="color: #676767; text-decoration: none; font-weight: 300; margin: 0 5px;">Blog</a> |
            <a href="https://mercor.com/docs/why-humans-are-needed/" target="_blank" style="color: #676767; text-decoration: none; font-weight: 300; margin: 0 5px;">Docs</a> |
            <a href="https://mercor.com/privacy-policy/" target="_blank" style="color: #676767; text-decoration: none; font-weight: 300; margin: 0 5px;">Privacy</a> |
            <a href="https://mercor.com/worker-terms/" target="_blank" style="color: #676767; text-decoration: none; font-weight: 300; margin: 0 5px;">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</body>
          `,
    attachments: [
      {
        filename: "invitation.png",
        path: "./assets/invitation.png",
        cid: "invitation",
      },
      {
        filename: "facebook.png",
        path: "./assets/facebook.png",
        cid: "facebook",
      },
      {
        filename: "linkedin.png",
        path: "./assets/linkedin.png",
        cid: "linkedin",
      },
      {
        filename: "instagram.png",
        path: "./assets/instagram.png",
        cid: "instagram",
      },
      {
        filename: "twitter.png",
        path: "./assets/twitter.png",
        cid: "twitter",
      },
    ],
  };
  return mailOptions;
};
