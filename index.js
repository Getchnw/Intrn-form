import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express(); // appแทนการใช้express
const PORT = 4000;

//setting
app.use(express.json());  // สำหรับ JSON data
app.use(express.urlencoded({ extended: true }));  // สำหรับ form data
app.use(cors());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});


//ฟังก์ชันส่งเมล
const sendEmail = async (data) => {
    console.log(data.email);
    console.log(data.firstname);
    console.log(data.lastname);
    console.log(data.position);
    let test;
    if(data.position === 'ux/ui'){
        test = 'ให้น้องออกแบบเว็บขึ้นมา1หน้า';
    }
    if(data.position === 'frontend'){
        test = 'ให้น้องเขียนหาเว็บขึ้นมา1หน้า';
    }
    if(data.position === 'backend'){
        test = 'ให้น้องออกแบบer-diagram ของระบบecommerce';
    }
    if(data.position === 'fullstack'){
        test = 'ให้น้องเขียนหาเว็บขึ้นมา1เว็บ โดยมีการออกแบบระบบฐานข้อมูลและดึงข้อมูลออกมาแสดง';
    }
    console.log(test);
    const message = `
    เรียน คุณ${data.firstname} ${data.lastname}

    ขอบคุณที่สนใจสมัครฝึกงานในตำแหน่ง ${data.position} กับบริษัทของเรา

    กรุณาทำแบบทดสอบต่อไปนี้:
    ${test}

    กำหนดส่ง: วันที่ xx กุมภาพันธ์ 2568 เวลา 15.00 น.

    ขอแสดงความนับถือ
    ฝ่ายรับสมัครนักศึกษาฝึกงาน
    
    `
    console.log(message);

    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : 'testnodemailer835@gmail.com',
                pass : 'cxixotcregftrnxv'
            }
        });

        const mail_config = {
            from : 'testnodemailer835@gmail.com',
            to : data.email,
            subject :`ข้อสอบtestตำแหน่ง${data.position}` ,
            text : message,
        };

        try {
             transporter.sendMail(mail_config);
            return { message: 'Email sent successfully!' };
          } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Error sending email'); 
          }
});
        
}

//API
app.post("/", (req, res) => {
    console.log(req.body)
    sendEmail(req.body)
        .then((result) => { res.send(result.message); })
        .catch((error) => { res.send(error.message); });
});


app.listen(PORT, () =>{
    console.log('connect susscess in port 3000');
});
