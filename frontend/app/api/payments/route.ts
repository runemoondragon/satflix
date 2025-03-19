import { NextRequest, NextResponse } from 'next/server';

// Load environment variables
const btcpayServerUrl = process.env.BTCPAY_SERVER_URL;
const storeId = process.env.BTCPAY_STORE_ID;
const apiKey = process.env.BTCPAY_API_KEY;

export async function POST(req: NextRequest) {
  try {
    if (!btcpayServerUrl || !storeId || !apiKey) {
      console.error('Missing BTCPay configuration:', { btcpayServerUrl, storeId, apiKey });
      return NextResponse.json(
        { error: 'BTCPay Server configuration missing' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { movieId, movieTitle, amount, currency, watchLink } = body;
    
    console.log('Received request body:', body);

    if (!movieId || !movieTitle || !watchLink) {
      console.error('Missing required fields:', { movieId, movieTitle, watchLink });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the watch URL using the watchLink
    const watchUrl = watchLink.replace("/movie/", "/watch-movie/") + "." + movieId;
    console.log('Generated watch URL:', watchUrl);

    // Prepare the invoice data
    const invoiceData = {
      amount: amount || '0.25',
      currency: currency || 'USD',
      metadata: {
        movieId,
        movieTitle,
        orderId: movieId // Include orderId for webhook processing
      },
      checkout: {
        redirectURL: watchUrl,
        redirectAutomatically: true,
        expirationMinutes: 10,
        defaultPaymentMethod: "BTC-LN",
        paymentMethods: ["BTC-LN"],
        monitoringMinutes: 60,
        speedPolicy: "HighSpeed"
      },
      notification: {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/btcpay-webhook`,
        email: null
      }
    };

    console.log('Creating BTCPay invoice with data:', invoiceData);

    // Call BTCPay API
    const response = await fetch(`${btcpayServerUrl}/api/v1/stores/${storeId}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${apiKey}`
      },
      body: JSON.stringify(invoiceData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('BTCPay API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create invoice', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('BTCPay invoice created successfully:', data);
    console.log('Checkout link:', data.checkoutLink);
    
    return NextResponse.json({ checkoutLink: data.checkoutLink });
  } catch (err: any) {
    console.error('BTCPay invoice creation error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
} 
