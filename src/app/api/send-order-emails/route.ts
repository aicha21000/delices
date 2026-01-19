import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { generateInvoicePDF } from '@/lib/generateInvoice';
import fs from 'fs';
import path from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to generate invoice HTML
function generateInvoiceHTML(orderData: any) {
  const { items, name, email, phone, address, total, sessionId, orderId, orderDate } = orderData;
  const displayOrderId = orderId || sessionId;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981, #06B6D4); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; }
        .order-details { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .total { font-size: 1.5em; font-weight: bold; color: #10B981; text-align: right; margin-top: 20px; }
        .footer { background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${process.env.NEXT_PUBLIC_SITE_URL}/images/delices_logo.png" alt="Les Délices Sucrés" style="max-width: 150px; margin-bottom: 20px;">
          <h1>✅ Commande confirmée !</h1>
          <p>Merci pour votre achat</p>
        </div>
        
        <div class="content">
          <div class="order-details">
            <h2>Détails de la commande</h2>
            <p><strong>Numéro de commande:</strong> ${displayOrderId}</p>
            <p><strong>Date:</strong> ${orderDate}</p>
            <p><strong>Client:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Adresse de livraison:</strong><br>
              ${address.line1}<br>
              ${address.line2 ? address.line2 + '<br>' : ''}
              ${address.city}, ${address.state} ${address.postal_code}<br>
              ${address.country}
            </p>
          </div>
          
          <div class="order-details">
            <h2>Articles commandés</h2>
            ${items.map((item: any) => `
              <div class="item">
                <div>
                  <strong>${item.productName}</strong><br>
                  <small>${item.type === 'unit' ? 'À l\'unité' : item.type === 'box6' ? 'Boîte de 6' : 'Boîte de 15'} × ${item.quantity}</small>
                </div>
                <div>${(item.price * item.quantity).toFixed(2)} €</div>
              </div>
            `).join('')}
            
            <div class="total">
              Total: ${total.toFixed(2)} €
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Merci pour votre confiance !</p>
          <p>Pour toute question, contactez-nous à ${process.env.EMAIL_USER}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper function to generate admin notification HTML
function generateAdminNotificationHTML(orderData: any) {
  const { items, name, email, phone, address, total, sessionId, orderId, orderDate, comments } = orderData;
  const displayOrderId = orderId || sessionId;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 20px; }
        .section { background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
        .item { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .total { font-size: 1.3em; font-weight: bold; color: #ef4444; }
        .alert { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 Nouvelle commande reçue !</h1>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>⚠️ Action requise:</strong> Une nouvelle commande vient d'être passée et payée.
          </div>
          
          <div class="section">
            <h3>Informations client</h3>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Adresse:</strong><br>
              ${address.line1}<br>
              ${address.line2 ? address.line2 + '<br>' : ''}
              ${address.city}, ${address.state} ${address.postal_code}<br>
              ${address.country}
            </p>
            ${comments ? `<p><strong>Commentaires:</strong><br>${comments}</p>` : ''}
          </div>
          
          <div class="section">
            <h3>Détails de la commande</h3>
            <p><strong>N° commande:</strong> ${displayOrderId}</p>
            <p><strong>Date:</strong> ${orderDate}</p>
            
            <h4>Articles:</h4>
            ${items.map((item: any) => `
              <div class="item">
                <strong>${item.productName}</strong> - 
                ${item.type === 'unit' ? 'À l\'unité' : item.type === 'box6' ? 'Boîte de 6' : 'Boîte de 15'} × ${item.quantity} = 
                ${(item.price * item.quantity).toFixed(2)} €
              </div>
            `).join('')}
            
            <p class="total">Total: ${total.toFixed(2)} €</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is missing');
    if (!process.env.EMAIL_USER) throw new Error('EMAIL_USER is missing');
    if (!process.env.EMAIL_PASS) throw new Error('EMAIL_PASS is missing');
    if (!process.env.ADMIN_EMAIL) throw new Error('ADMIN_EMAIL is missing');

    const {
      items,
      name,
      email,
      phone,
      address,
      comments,
      sessionId,
      orderId,
    } = await request.json();

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const orderDate = new Date().toLocaleString('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short'
    });

    const orderData = {
      items,
      name,
      email,
      phone,
      address,
      comments,
      total,
      sessionId,
      orderDate,
      orderId: orderId || sessionId, // Fallback to sessionId if orderId is missing
    };

    // Generate PDF invoice
    const pdfBuffer = await generateInvoicePDF(orderData);

    // Read logo file for embedding in email
    // This allows the image to show even on localhost and prevents blocking
    const logoPath = path.join(process.cwd(), 'public', 'images', 'delices_logo.png');
    const logoContent = fs.existsSync(logoPath) ? fs.readFileSync(logoPath) : null;

    const emailAttachments: any[] = [
      {
        filename: `Facture_${sessionId.substring(0, 15)}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      }
    ];

    // If logo exists, add it to attachments with Content-ID (cid)
    if (logoContent) {
      emailAttachments.push({
        filename: 'logo.png',
        content: logoContent,
        contentType: 'image/png',
        cid: 'logo_delices' // Same as in the HTML src
      });
    }

    // Send invoice to customer with PDF attachment and embedded logo
    await transporter.sendMail({
      from: `"Délices" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Confirmation de commande - ${orderData.orderId}`,
      html: generateInvoiceHTML(orderData).replace(
        // Replace external URL with embedded CID
        /src="[^"]*delices_logo\.png"/,
        'src="cid:logo_delices"'
      ),
      attachments: emailAttachments,
    });

    // Send notification to admin
    await transporter.sendMail({
      from: `"Système Délices" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 Nouvelle commande - ${name} (${orderData.orderId})`,
      html: generateAdminNotificationHTML(orderData),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Email sending error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
