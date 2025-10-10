import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Basic email validation
        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Check if using Resend (recommended)
        if (process.env.RESEND_API_KEY) {
            return await sendWithResend(email);
        }

        // Fallback to SMTP (Gmail, etc.)
        return await sendWithSMTP(email);

    } catch (error) {
        console.error('Error processing email submission:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}

async function sendWithResend(email: string) {
    try {
        // For Resend, you'd install @resend/node and use their API
        // This is a placeholder - you'd need to install and configure Resend
        console.log('Would send with Resend to:', email);
        return NextResponse.json({
            success: true,
            message: 'Thank you! I\'ll be in touch soon.',
            email: email
        });
    } catch (error) {
        console.error('Resend error:', error);
        throw error;
    }
}

async function sendWithSMTP(email: string) {
    // Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Verify transporter configuration
    try {
        await transporter.verify();
        console.log('SMTP server connection successful');
    } catch (error) {
        console.error('SMTP server connection failed:', error);
        return NextResponse.json(
            { error: 'Email service temporarily unavailable. Please try again later.' },
            { status: 500 }
        );
    }

    // Send confirmation email to user
    const userMailOptions = {
        from: `"Edward Whitehead" <${process.env.SMTP_USER}>`,
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
    };

    // Send notification email to yourself
    const adminMailOptions = {
        from: `"The Comeback Build" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
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
    };

    // Send both emails
    try {
        await Promise.all([
            transporter.sendMail(userMailOptions),
            transporter.sendMail(adminMailOptions)
        ]);

        console.log('Emails sent successfully to:', email, 'and admin');

    } catch (emailError) {
        console.error('Error sending emails:', emailError);
        return NextResponse.json(
            { error: 'Failed to send confirmation email. Please try again.' },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        message: 'Thank you! I\'ve sent you a confirmation email and will be in touch soon.',
        email: email
    });
}