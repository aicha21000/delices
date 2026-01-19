import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import fs from 'fs';
import path from 'path';

interface InvoiceData {
    items: Array<{
        productName: string;
        type: string;
        quantity: number;
        price: number;
    }>;
    name: string;
    email: string;
    phone: string;
    address: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    comments?: string;
    total: number;
    orderId?: string;
    sessionId: string;
    orderDate: string;
}

export function generateInvoicePDF(orderData: InvoiceData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            // Create new document
            const doc = new jsPDF();

            // Add Logo
            try {
                const logoPath = path.join(process.cwd(), 'public', 'images', 'delices_logo.png');
                if (fs.existsSync(logoPath)) {
                    const logoData = fs.readFileSync(logoPath).toString('base64');
                    // Add image at coordinates (x=14, y=10) with width 25 and height 25
                    doc.addImage(`data:image/png;base64,${logoData}`, 'PNG', 14, 10, 25, 25);
                }
            } catch (err) {
                console.error('Error loading logo for PDF:', err);
            }

            // Company info
            const companyInfo = {
                name: 'Les Délices Sucrés',
                address: '4b avenue Champollion',
                city: '21000 Dijon',
                phone: '+33 6 62 08 11 95',
                email: 'contact@lesdelicessucres.com',
                siret: '84215474200014',
            };

            // Header - Shifted right to accommodate logo if present, but for simplicity let's always shift or check
            // Since we always attempt to load logo, let's position text at x=45 (14 + 25 + margin)
            const textStartX = 45;

            doc.setFontSize(24);
            doc.setTextColor(16, 185, 129); // #10B981
            doc.text(companyInfo.name, textStartX, 20);

            doc.setFontSize(10);
            doc.setTextColor(107, 114, 128); // #6b7280
            doc.text(companyInfo.address, textStartX, 30);
            doc.text(companyInfo.city, textStartX, 35);
            doc.text(`Tél: ${companyInfo.phone}`, textStartX, 40);
            doc.text(`Email: ${companyInfo.email}`, textStartX, 45);
            doc.text(`SIRET: ${companyInfo.siret}`, textStartX, 50);

            // Invoice info
            doc.setFontSize(20);
            doc.setTextColor(31, 41, 55); // #1f2937
            doc.text('FACTURE', 196, 20, { align: 'right' });

            doc.setFontSize(10);
            doc.setTextColor(107, 114, 128);
            // Use custom order ID if available, otherwise truncate session ID
            const displayOrderId = orderData.orderId || orderData.sessionId.substring(0, 15);
            doc.text(`N° ${displayOrderId}`, 196, 30, { align: 'right' });
            doc.text(`Date: ${orderData.orderDate}`, 196, 35, { align: 'right' });

            // Customer info
            doc.setFontSize(12);
            doc.setTextColor(31, 41, 55);
            doc.text('Facturé à:', 14, 70);

            doc.setFontSize(10);
            doc.setTextColor(55, 65, 81); // #374151
            doc.text(orderData.name, 14, 80);
            doc.text(orderData.email, 14, 85);
            doc.text(orderData.phone, 14, 90);
            doc.text(orderData.address.line1, 14, 95);
            if (orderData.address.line2) {
                doc.text(orderData.address.line2, 14, 100);
            }
            const cityY = orderData.address.line2 ? 105 : 100;
            doc.text(`${orderData.address.city}, ${orderData.address.state} ${orderData.address.postal_code}`, 14, cityY);
            doc.text(orderData.address.country, 14, cityY + 5);

            // Table
            const tableData = orderData.items.map(item => [
                item.productName,
                item.type === 'unit' ? 'À l\'unité' : item.type === 'box6' ? 'Boîte de 6' : 'Boîte de 15',
                item.quantity,
                `${item.price.toFixed(2)} €`,
                `${(item.price * item.quantity).toFixed(2)} €`
            ]);

            autoTable(doc, {
                startY: cityY + 20,
                head: [['Article', 'Type', 'Qté', 'Prix unit.', 'Total']],
                body: tableData,
                theme: 'grid',
                headStyles: { fillColor: [16, 185, 129] }, // #10B981
                styles: { fontSize: 9, cellPadding: 3 },
                columnStyles: {
                    0: { cellWidth: 'auto' },
                    4: { halign: 'right' }
                },
            });

            // Total
            // @ts-ignore
            const finalY = doc.lastAutoTable.finalY + 10;

            doc.setFillColor(243, 244, 246); // #f3f4f6
            doc.rect(120, finalY, 76, 12, 'F');

            doc.setFontSize(12);
            doc.setTextColor(31, 41, 55);
            doc.text('TOTAL TTC', 125, finalY + 8);

            doc.setFontSize(12);
            doc.setTextColor(16, 185, 129);
            doc.setFont('', 'bold');
            doc.text(`${orderData.total.toFixed(2)} €`, 190, finalY + 8, { align: 'right' });
            doc.setFont('', 'normal');

            // Comments
            if (orderData.comments) {
                doc.setFontSize(10);
                doc.setTextColor(107, 114, 128);
                doc.text('Commentaires:', 14, finalY + 30);

                doc.setFontSize(9);
                doc.setTextColor(55, 65, 81);
                doc.text(orderData.comments, 14, finalY + 37, { maxWidth: 180 });
            }

            // Footer
            const footerY = 280;
            doc.setFontSize(8);
            doc.setTextColor(156, 163, 175); // #9ca3af
            doc.text('Merci pour votre confiance ! Pour toute question, contactez-nous.', 105, footerY, { align: 'center' });

            // Return buffer
            const buffer = Buffer.from(doc.output('arraybuffer'));
            resolve(buffer);

        } catch (error) {
            reject(error);
        }
    });
}
