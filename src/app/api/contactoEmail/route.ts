import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer';
import { servicioTemplate } from '@/utils';


export async function POST(request: Request) { 

    const { SMTP_EMAIL, SMTP_PASSWORD, EMAIL_SEND } = process.env;
    const { name, email, phone ="", service, message } = await request.json();

    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: SMTP_EMAIL,
          pass: SMTP_PASSWORD,
        },
      });
    
      try {
        await new Promise((resolve, reject) => {
          transport.verify((error, success) => {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              console.log("Server is ready to take our messages");
              resolve(success);
            }
          });
        });
    
        const mailData = {
          from: SMTP_EMAIL,
          to: EMAIL_SEND, //Cambiar por EMAIL_SEND
            subject: `Cotización Para ${ service } ${ name.toUpperCase() }`,
            html: servicioTemplate( 
                    name,
                    email,
                    phone,
                    service,
                    message
                 ),
        };
    
        await new Promise((resolve, reject) => {
          transport.sendMail(mailData, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log(info);
              resolve(info);
            }
          });
        });
    
        return NextResponse.json({
          success: true,
        }, { status: 200 });
    
      } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({
          success: false,
          message: error
        }, { status: 500 });
      }
  }