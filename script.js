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
    { name: "10GB", price: 46 }
  ],
  Telecel: [
    { name: "10GB", price: 46 },
    { name: "15GB", price: 67 },
    { name: "20GB", price: 87 }
  ]
};

const networkSelect = document.getElementById("network");
const bundleSelect = document.getElementById("bundle");
const form = document.getElementById("paymentForm");

networkSelect.addEventListener("change", () => {
  bundleSelect.innerHTML = `<option value="">-- Select Bundle --</option>`;
  const selected = networkSelect.value;
  if (!selected) return;

  bundles[selected].forEach(b => {
    const opt = document.createElement("option");
    opt.value = JSON.stringify(b);
    opt.textContent = `${b.name} - ¢${b.price}`;
    bundleSelect.appendChild(opt);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const network = networkSelect.value;
  const bundle = JSON.parse(bundleSelect.value);

  if (!phone || !network || !bundle) {
    alert("Please complete all fields");
    return;
  }

  PaystackPop.setup({
    key: "pk_live_6c14e62b602fe818a0433130f1db628a98731304",
    email: "orders@donmacdatahub.com",
    amount: bundle.price * 100,
    currency: "GHS",
    metadata: {
      custom_fields: [
        { display_name: "Network", value: network },
        { display_name: "Data Bundle", value: bundle.name },
        { display_name: "Send Data To", value: phone }
      ]
    },
    callback: function (response) {

      const order = {
        network: network,
        bundle: bundle.name,
        amount: bundle.price,
        recipient: phone,
        paymentMethod: "Mobile Money (Paystack)",
        reference: response.reference,
        date: new Date().toLocaleString()
      };

      localStorage.setItem("donmac_order", JSON.stringify(order));
      window.location.href = "order-summary.html";
    }
  }).openIframe();
});

