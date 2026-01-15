import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, phone, message } = await request.json();

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing email vars');
            return NextResponse.json({ success: false, message: 'Configuration email manquante. Redémarrez le serveur.' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            replyTo: email,
            subject: `Nouveau message de ${name} (Les Délices Sucrés)`,
            text: `
        Nom: ${name}
        Email: ${email}
        Téléphone: ${phone}
        
        Message:
        ${message}
      `,
            html: `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, message: 'Erreur lors de l\'envoi du message' }, { status: 500 });
    }
}
