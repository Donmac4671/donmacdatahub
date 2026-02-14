const bundles = {
  MTN: [
    { name: "1GB", price: 5 },
    { name: "2GB", price: 10 },
    { name: "3GB", price: 15 },
    { name: "4GB", price: 20 },
    { name: "5GB", price: 25 },
    { name: "6GB", price: 30 },
    { name: "7GB", price: 35 },
    { name: "8GB", price: 40 },
    { name: "10GB", price: 46 },
    { name: "15GB", price: 67 },
    { name: "20GB", price: 88 },
    { name: "25GB", price: 109 },
    { name: "30GB", price: 130 },
    { name: "40GB", price: 170 },
    { name: "50GB", price: 210 },
    { name: "100GB", price: 400 }
  ],

  Telecel: [
    { name: "10GB", price: 46 },
    { name: "15GB", price: 67 },
    { name: "20GB", price: 87 },
    { name: "25GB", price: 108 },
    { name: "30GB", price: 129 },
    { name: "40GB", price: 169 },
    { name: "50GB", price: 209 },
    { name: "100GB", price: 400 }
  ]
};

const networkSelect = document.getElementById("network");
const bundleSelect = document.getElementById("bundle");
const form = document.getElementById("paymentForm");

networkSelect.addEventListener("change", () => {
  bundleSelect.innerHTML = `<option value="">-- Select Bundle --</option>`;

  const selectedNetwork = networkSelect.value;
  if (!selectedNetwork) return;

  bundles[selectedNetwork].forEach(bundle => {
    const fee = Math.round(bundle.price * 0.0195 * 100) / 100;
    const totalAmount = bundle.price + fee;

    const option = document.createElement("option");
    option.value = JSON.stringify(bundle);
    option.textContent = `${bundle.name} - ¢${totalAmount.toFixed(2)}`;
    bundleSelect.appendChild(option);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const network = networkSelect.value;
  const bundle = bundleSelect.value ? JSON.parse(bundleSelect.value) : null;

  if (!phone || !network || !bundle) {
    alert("Please complete all fields correctly.");
    return;
  }

  const fee = Math.round(bundle.price * 0.0195 * 100) / 100;
  const totalAmount = bundle.price + fee;

  PaystackPop.setup({
    key: "pk_live_6c14e62b602fe818a0433130f1db628a98731304",
    email: "orders@donmacdatahub.com",
    amount: Math.round(totalAmount * 100),
    currency: "GHS",

    metadata: {
      custom_fields: [
        { display_name: "Network", value: network },
        { display_name: "Data Bundle", value: bundle.name },
        { display_name: "Amount", value: `¢${totalAmount.toFixed(2)}` },
        { display_name: "Send Data To", value: phone }
      ]
    },

    callback: function (response) {
      const order = {
        network: network,
        bundle: bundle.name,
        amount: totalAmount.toFixed(2),
        recipient: phone,
        paymentMethod: "Mobile Money (Paystack)",
        reference: response.reference,
        date: new Date().toLocaleString()
      };

      localStorage.setItem("donmac_order", JSON.stringify(order));
      window.location.href = "order-summary.html";
    },

    onClose: function () {
      alert("Transaction cancelled.");
    }
  }).openIframe();
});
