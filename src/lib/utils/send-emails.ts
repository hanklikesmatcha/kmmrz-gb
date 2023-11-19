import { BREVO_API_KEY } from "$env/static/private";

export const sendEmails = async (
  recipient: { email: string; name: string },
  options: any
) => {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      name: "Order confirmation",
      subject: "Congrats! You are in the group purchase",
      sender: { name: "Kmmrz", email: "szuhan.eng@gmail.com" },
      type: "classic",
      to: [
        {
          email: recipient.email,
          name: recipient.name,
        },
      ],
      htmlContent: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Kmmrz</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f8bbd0; /* Light pink background */
              }
      
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 15px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              
              h1, p, .signature {
                  text-align: left;
                  color: #e91e63; /* Dark pink text color */
              }
      
              .signature {
                  margin-top: 20px;
              }
      
              .logo {
                  display: block;
                  margin: 0 auto; /* Center-align the logo */
                  height: auto;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class=""logo">
              <img alt="kmmrz-logo" src="https://drive.google.com/uc?export=view&id=18Z29DeTNxKkLITfiomMfLuGWTNLWPpLN" />
          </div>
              <h1>Hello, ${recipient.name}</h1>
              <!-- Include any additional personalized content or instructions here -->
              <p>We're thrilled to have you join our merry band of bargain hunters. </p>
              <p>Together, we'll embark on a journey to snag the best deals on the planet.</p>
      
              <p>Got questions? Need a helping hand? Our group leader is just a shout away.</p>
              <div class="signature">
                  Cheers,<br>
                  The Kmmrz Team
              </div>
          </div>
      </body>
      </html>              
        `,
    }),
  });
  const data = await res.json();
  return data;
};
