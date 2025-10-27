export const welcomeTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Cyrus — Where Coders Thrive</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #2c3e50;
        font-size: 24px;
        margin-bottom: 10px;
      }
      p {
        color: #555;
        font-size: 16px;
        line-height: 1.6;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome aboard, {name} 🎉</h1>
      <p>
        We're excited to welcome you to <strong>Cyrus</strong> — a creative tech field built for coders, learners, and innovators like you.
      </p>
      <p>
        Your account is now active, and you're all set to explore bilingual notes, revision tools, and engaging content designed to make learning easy, fun, and exam-ready.
      </p>
      <p>
        Whether you're debugging your first app or designing scalable systems, Cyrus is here to support your journey with clarity, creativity, and community.
      </p>
      <p>
        If you ever need help, feedback, or just a motivational meme, we're here for you.
      </p>
      <p>Warm regards,<br />Shekhar & Team Cyrus</p>
      <div class="footer">
        This is an automated message. Please do not reply.
      </div>
    </div>
  </body>
</html>
`;
export const verificationTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your Cyrus Verification Code</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #2c3e50;
        font-size: 22px;
        margin-bottom: 10px;
      }
      .code-box {
        background-color: #eaf4ff;
        padding: 15px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        border-radius: 8px;
        letter-spacing: 2px;
        color: #0077cc;
        margin: 20px 0;
      }
      p {
        color: #555;
        font-size: 16px;
        line-height: 1.6;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Verify your account 🔐</h1>
      <p>
        Your verification code for <strong>Cyrus</strong> is below. Enter it in the app to continue:
      </p>
      <div class="code-box">{verificationCode}</div>
      <p>
        This code is valid for 10 minutes. If you didn’t request this, you can safely ignore this email.
      </p>
      <p>Warm regards,<br />Shekhar & Team Cyrus</p>
      <div class="footer">
        This is an automated message. Please do not reply.
      </div>
    </div>
  </body>
</html>
`;
export const resetTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Cyrus Password</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #2c3e50;
        font-size: 22px;
        margin-bottom: 10px;
      }
      .code-box {
        background-color: #fff3cd;
        padding: 15px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        border-radius: 8px;
        letter-spacing: 2px;
        color: #856404;
        margin: 20px 0;
      }
      p {
        color: #555;
        font-size: 16px;
        line-height: 1.6;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset your password 🔐</h1>
      <p>
        You requested to reset your password for <strong>Cyrus</strong>. Use the code below to continue:
      </p>
      <div class="code-box">{resetVerificationCode}</div>
      <p>
        This code is valid for 10 minutes. If you didn’t request this, you can safely ignore this email.
      </p>
      <p>Warm regards,<br />Shekhar & Team Cyrus</p>
      <div class="footer">
        This is an automated message. Please do not reply.
      </div>
    </div>
  </body>
</html>
`;
