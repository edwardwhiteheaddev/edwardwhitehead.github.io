import { Handler, HandlerResponse } from '@netlify/functions';
import { Resend } from 'resend';

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

    const { email } = JSON.parse(event.body);

    // Basic email validation
    if (!email || !email.includes('@')) {
      return createResponse(400, JSON.stringify({
        error: 'Please provide a valid email address'
      }));
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return createResponse(500, JSON.stringify({
        error: 'Email service not configured. Please try again later.'
      }));
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log('Sending emails via Resend to:', email);

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'Edward Whitehead <noreply@edwardwhitehead.dev>',
      to: email,
      subject: 'Thank you for your interest in The Comeback Build!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF575F;">Thank You!</h2>
          <p>Hi there,</p>
          <p>Thank you for your interest in <strong>The Comeback Build</strong>! I've received your email address and will be in touch soon to discuss how we can work together.</p>
          <p>I'm excited to help you build something amazing!</p>
          <p>Best regards,<br><strong>Edward Whitehead</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            This email was sent because you submitted your email address on edwardwhitehead.dev/the-comeback-build
          </p>
        </div>
      `,
    });

    // Send notification email to yourself
    const adminEmailResult = await resend.emails.send({
      from: 'The Comeback Build <noreply@edwardwhitehead.dev>',
      to: 'ed.surreal@gmail.com',
      subject: 'New Email Submission - The Comeback Build',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF575F;">New Contact Request</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Source:</strong> The Comeback Build landing page</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p>Time to reach out and start building something amazing! 🚀</p>
        </div>
      `,
    });

    console.log('Emails sent successfully via Resend');
    console.log('User email result:', userEmailResult);
    console.log('Admin email result:', adminEmailResult);

    return createResponse(200, JSON.stringify({
      success: true,
      message: 'Thank you! I\'ve sent you a confirmation email and will be in touch soon.',
      email: email
    }));

  } catch (error) {
    console.error('Error processing email submission:', error);
    return createResponse(500, JSON.stringify({
      error: 'Something went wrong. Please try again.'
    }));
  }
};
