import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
});

export async function POST(request: Request) {
    try {
        const {
            items,
            name,
            email,
            phone,
            address,
        } = await request.json();

        // Create line items from cart items
        const line_items = items.map((item: any) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: `${item.productName} - ${item.type === 'unit' ? 'À l\'unité' :
                        item.type === 'box6' ? 'Boîte de 6' :
                            'Boîte de 15'
                        }`,
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: item.quantity,
        }));

        // Generate custom order ID: CMD_RANDOM_MM_YYYY
        const date = new Date();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const random = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
        const orderId = `CMD_${random}_${month}_${year}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['FR', 'US', 'CA', 'GB', 'DE'],
            },
            client_reference_id: orderId,
            customer_email: email,
            metadata: {
                order_id: orderId,
                customer_name: name,
                customer_phone: phone,
                address_line1: address.line1,
                address_line2: address.line2 ?? '',
                address_city: address.city,
                address_state: address.state,
                address_postal_code: address.postal_code,
                address_country: address.country,
            },
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
        });

        return NextResponse.json({ url: session.url, orderId });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
