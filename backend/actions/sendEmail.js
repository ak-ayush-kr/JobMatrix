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
                <p>A new job matching your skills has been posted on <b>JobMatrix</b>.</p>
                <div>
                    <h3>${jobTitle}</h3>
                    <p><b>Company:</b> ${companyName}</p>
                </div>

                <p>Login to JobKhojo and apply now.</p>
                <br/>
                <p>Best Regards,</p>
                <p><b>JobMatrix Team</b></p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email is sending .... ");

    }catch (error) {
        console.log("Email sending error:", error);
    }
};

export const sendApplicationStatusEmail = async ({
    to,
    userName,
    companyName,
    jobTitle,
    status
}) => {

    try {

        let message = "";

        if(status === "shortlisted"){
            message = `
                Congratulations!
                You have been shortlisted for ${jobTitle}
                at ${companyName}.
            `;
        }

        else if(status === "rejected"){
            message = `
                We are sorry.
                You were not selected for ${jobTitle}
                at ${companyName}.
            `;
        }

        else if(status === "accepted"){
            message = `
                Congratulations!
                You are selected for ${jobTitle}
                at ${companyName}.
            `;
        }
        else if(status === "interview_scheduled"){
            message = `
                Your interview has been scheduled.
                Please login to JobMatrix to check details.
            `;
        }
        const mailOptions = {
            from : process.env.EMAIL_USER,
            to,
            subject : `Application Update - ${jobTitle}`,
            html : `
                <div>
                    <h2>Hello ${userName}</h2>

                    <p>${message}</p>

                    <br/>

                    <p>
                        Regards,
                        <br/>
                        JobMatrix Team
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {

        console.log(error);
    }
};
export { transporter };