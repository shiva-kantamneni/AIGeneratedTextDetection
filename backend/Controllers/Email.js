const nodemailer=require('nodemailer');

const SendEmail=async(email,subject,text)=>{
        let transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                user:process.env.Email_user,
                pass:process.env.Email_pass
            }
        });

        const info= await transporter.sendMail({
            from:'1730159shivaram@gmail.com',
            to:email,
            subject:subject,
            text:text
        });
        console.log(info.messageId);
}
module.exports=SendEmail;
