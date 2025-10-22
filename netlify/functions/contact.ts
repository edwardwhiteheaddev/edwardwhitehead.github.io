import { Handler, HandlerResponse } from '@netlify/functions';
import nodemailer from 'nodemailer';

const createResponse = (
    statusCode: number,
    body: string,
    contentType: string = 'application/json'
): HandlerResponse => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': contentType,
    },
    body,
});

const createCorsResponse = (): HandlerResponse => ({
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'text/plain',
    },
    body: '',
});

export const handler: Handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return createCorsResponse();
    }

    if (event.httpMethod !== 'POST') {
        return createResponse(405, JSON.stringify({ error: 'Method not allowed' }));
    }

    try {
        if (!event.body) {
            return createResponse(400, JSON.stringify({ error: 'Missing request body' }));
        }

        const { name, email, message } = JSON.parse(event.body);

        // Basic validation
        if (!name || !email || !message) {
            return createResponse(400, JSON.stringify({ error: 'Missing required fields' }));
        }

        // Nodemailer transport configuration
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: (process.env.SMTP_SECURE === 'true'),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
            to: "ed.surreal@gmail.com",
            replyTo: email,
            subject: `New message from ${name}`,
            text: message,
            html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
        };

        // Verify transporter configuration
        await transporter.verify();

        // Send the email
        await transporter.sendMail(mailOptions);

        return createResponse(200, JSON.stringify({ success: true }));

    } catch (error) {
        console.error("Failed to send email:", error);
        return createResponse(500, JSON.stringify({
            error: "Failed to send message. Please check server configuration."
        }));
    }
};
