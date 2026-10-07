const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'new-arrivals.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add Razorpay script tag before </head> if not exists
if (!html.includes('checkout.razorpay.com')) {
    html = html.replace('</head>', '  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>\n</head>');
}

// 2. Add Razorpay option to payment method select
if (!html.includes('<option value="Online Payment (Razorpay)">Online Payment (Razorpay)</option>')) {
    html = html.replace(
        '<option value="UPI / Online Transfer Enquiry">UPI / Online Transfer Enquiry</option>',
        '<option value="UPI / Online Transfer Enquiry">UPI / Online Transfer Enquiry</option>\n            <option value="Online Payment (Razorpay)">Online Payment (Razorpay)</option>'
    );
}

// 3. Update buyNowBtn click handler
if (html.includes("document.getElementById('buyNowBtn').onclick = () => buyNow(p.title);")) {
    html = html.replace(
        "document.getElementById('buyNowBtn').onclick = () => buyNow(p.title);",
        "document.getElementById('buyNowBtn').onclick = () => buyNow(p.title, p.price);"
    );
}

// 4. Add checkout-product-price hidden input
if (!html.includes('id="checkout-product-price"')) {
    html = html.replace(
        '<input type="hidden" id="checkout-product-name" />',
        '<input type="hidden" id="checkout-product-name" />\n        <input type="hidden" id="checkout-product-price" />'
    );
}

// 5. Update buyNow function signature
if (html.includes("function buyNow(productName) {")) {
    html = html.replace(
        "function buyNow(productName) {",
        "function buyNow(productName, productPrice = '0') {"
    );
    html = html.replace(
        "document.getElementById('checkout-product-name').value = productName;",
        "document.getElementById('checkout-product-name').value = productName;\n  document.getElementById('checkout-product-price').value = productPrice;"
    );
}

// 6. Rewrite submitOrder function to handle Razorpay
const oldSubmitOrder = `function submitOrder(event) {
  event.preventDefault();
  
  const productName = document.getElementById('checkout-product-name').value;
  const name = document.getElementById('cust-name').value;
  const phone = document.getElementById('cust-phone').value;
  const address = document.getElementById('cust-address').value;
  const city = document.getElementById('cust-city').value;
  const pincode = document.getElementById('cust-pincode').value;
  const payment = document.getElementById('cust-payment').value;
  
  const msg = \`*New Order Placed!* 🛍️\\n\` +
              \`-----------------------------------\\n\` +
              \`*Product:* \${productName}\\n\` +
              \`*Price:* Price on Enquiry\\n\\n\` +
              \`*Customer Details:*\\n\` +
              \`• *Name:* \${name}\\n\` +
              \`• *Phone:* \${phone}\\n\\n\` +
              \`*Delivery Address:*\\n\` +
              \`\${address},\\n\` +
              \`\${city} - \${pincode}\\n\\n\` +
              \`*Payment Method:* \${payment}\`;
              
  showToast("Order placed! Opening WhatsApp to share details...");
  
  setTimeout(() => {
    window.open(\`https://wa.me/918667570740?text=\${encodeURIComponent(msg)}\`, '_blank');
    closeCheckoutModal();
  }, 1500);
}`;

const newSubmitOrder = `async function submitOrder(event) {
  event.preventDefault();
  
  const productName = document.getElementById('checkout-product-name').value;
  const productPriceStr = document.getElementById('checkout-product-price').value;
  const name = document.getElementById('cust-name').value;
  const phone = document.getElementById('cust-phone').value;
  const address = document.getElementById('cust-address').value;
  const city = document.getElementById('cust-city').value;
  const pincode = document.getElementById('cust-pincode').value;
  const payment = document.getElementById('cust-payment').value;
  
  // Parse numeric price (e.g. "5500/- + SHIPPING" -> 5500)
  let numericPrice = parseInt(productPriceStr.replace(/\\D/g, ''), 10);
  if (isNaN(numericPrice)) numericPrice = 5000; // Fallback price
  
  if (payment === 'Online Payment (Razorpay)') {
      // 1. Fetch Razorpay Key
      let rzpKey = 'rzp_test_YOUR_KEY_HERE';
      try {
          const keyRes = await fetch('/get-razorpay-key');
          const keyData = await keyRes.json();
          rzpKey = keyData.key;
      } catch (err) { console.error("Could not fetch key", err); }

      // 2. Create Order
      showToast("Initializing Secure Payment...");
      try {
          const orderRes = await fetch('/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: numericPrice, receipt: "rcpt_" + Date.now() })
          });
          const orderData = await orderRes.json();
          
          if (!orderData.id) {
              alert("Failed to create order. Please try again.");
              return;
          }

          // 3. Open Razorpay Checkout
          var options = {
              "key": rzpKey,
              "amount": orderData.amount,
              "currency": orderData.currency,
              "name": "Pavana Silks",
              "description": productName,
              "order_id": orderData.id,
              "handler": async function (response){
                  // 4. Verify Payment
                  try {
                      const verifyRes = await fetch('/verify-payment', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                              razorpay_order_id: response.razorpay_order_id,
                              razorpay_payment_id: response.razorpay_payment_id,
                              razorpay_signature: response.razorpay_signature
                          })
                      });
                      const verifyData = await verifyRes.json();
                      if(verifyData.success) {
                          alert("Payment Successful! Thank you for your order.");
                          closeCheckoutModal();
                      } else {
                          alert("Payment Verification Failed!");
                      }
                  } catch (e) {
                      console.error(e);
                      alert("Error verifying payment.");
                  }
              },
              "prefill": {
                  "name": name,
                  "contact": phone
              },
              "theme": {
                  "color": "#C3A353"
              }
          };
          var rzp1 = new Razorpay(options);
          rzp1.on('payment.failed', function (response){
              alert("Payment Failed: " + response.error.description);
          });
          rzp1.open();
      } catch (err) {
          console.error(err);
          alert("Error initiating payment");
      }
      return;
  }
  
  // WhatsApp Flow (for COD or Manual UPI)
  const msg = \`*New Order Placed!* 🛍️\\n\` +
              \`-----------------------------------\\n\` +
              \`*Product:* \${productName}\\n\` +
              \`*Price:* \${productPriceStr}\\n\\n\` +
              \`*Customer Details:*\\n\` +
              \`• *Name:* \${name}\\n\` +
              \`• *Phone:* \${phone}\\n\\n\` +
              \`*Delivery Address:*\\n\` +
              \`\${address},\\n\` +
              \`\${city} - \${pincode}\\n\\n\` +
              \`*Payment Method:* \${payment}\`;
              
  showToast("Order placed! Opening WhatsApp to share details...");
  
  setTimeout(() => {
    window.open(\`https://wa.me/918667570740?text=\${encodeURIComponent(msg)}\`, '_blank');
    closeCheckoutModal();
  }, 1500);
}`;

if (html.includes(oldSubmitOrder)) {
    html = html.replace(oldSubmitOrder, newSubmitOrder);
} else {
    console.log("Could not find oldSubmitOrder EXACT match. Attempting fallback...");
    // Fallback: replace everything between function submitOrder(event) { and its closing brace before </script>
    const startIdx = html.indexOf("function submitOrder(event) {");
    if (startIdx !== -1) {
        // Just find the end of it safely
        const endStr = "  }, 1500);\n}";
        const endIdx = html.indexOf(endStr, startIdx);
        if (endIdx !== -1) {
            const oldFunc = html.substring(startIdx, endIdx + endStr.length);
            html = html.replace(oldFunc, newSubmitOrder);
        }
    }
}

fs.writeFileSync(filePath, html);
console.log("Done updating new-arrivals.html!");
