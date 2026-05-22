import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendJobEmail = async ({to,userName,jobTitle,companyName,}) => {
  try {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: `New Job Match for You - ${jobTitle}`,
        html: `
            <div>
                <h2>Hello ${userName},</h2>
                <p>A new job matching your skills has been posted on <b>JobKhojo</b>.</p>
                <div>
                    <h3>${jobTitle}</h3>
                    <p><b>Company:</b> ${companyName}</p>
                </div>

                <p>Login to JobKhojo and apply now.</p>
                <br/>
                <p>Best Regards,</p>
                <p><b>JobKhojo Team</b></p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email is sending .... ");

    }catch (error) {
        console.log("Email sending error:", error);
    }
};