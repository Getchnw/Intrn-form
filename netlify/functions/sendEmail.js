const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // รับข้อมูลจาก request body
  const data = JSON.parse(event.body);

  console.log(data.email);
  console.log(data.firstname);
  console.log(data.lastname);
  console.log(data.position);

  let test;
  if (data.position === 'ux/ui') {
    test = 'ให้น้องออกแบบเว็บขึ้นมา1หน้า';
  }
  if (data.position === 'frontend') {
    test = 'ให้น้องเขียนหาเว็บขึ้นมา1หน้า';
  }
  if (data.position === 'backend') {
    test = 'ให้น้องออกแบบer-diagram ของระบบecommerce';
  }
  if (data.position === 'fullstack') {
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
  `;
  console.log(message);

  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'testnodemailer835@gmail.com',
        pass: 'cxixotcregftrnxv'
      }
    });

    const mail_config = {
      from: 'testnodemailer835@gmail.com',
      to: data.email,
      subject: `ข้อสอบtestตำแหน่ง${data.position}`,
      text: message,
    };

    try {
      transporter.sendMail(mail_config, (error, info) => {
        if (error) {
          reject({ statusCode: 500, body: JSON.stringify({ error: 'Error sending email' }) });
        } else {
          resolve({ statusCode: 200, body: JSON.stringify({ message: 'Email sent successfully!' }) });
        }
      });
    } catch (error) {
      reject({ statusCode: 500, body: JSON.stringify({ error: 'Error sending email' }) });
    }
  });
};
