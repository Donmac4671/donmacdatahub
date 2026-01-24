const bundles = {
  MTN: [
    { label: "1GB - ¢5", amount: 5 },
    { label: "2GB - ¢10", amount: 10 },
    { label: "3GB - ¢15", amount: 15 },
    { label: "4GB - ¢20", amount: 20 },
    { label: "5GB - ¢25", amount: 25 },
    { label: "6GB - ¢30", amount: 30 },
    { label: "7GB - ¢35", amount: 35 },
    { label: "8GB - ¢40", amount: 40 },
    { label: "10GB - ¢46", amount: 46 },
    { label: "15GB - ¢67", amount: 67 },
    { label: "20GB - ¢88", amount: 88 },
    { label: "25GB - ¢109", amount: 109 },
    { label: "30GB - ¢130", amount: 130 },
    { label: "40GB - ¢170", amount: 170 },
    { label: "50GB - ¢210", amount: 210 },
    { label: "100GB - ¢400", amount: 400 }
  ],
  Telecel: [
    { label: "10GB - ¢46", amount: 46 },
    { label: "15GB - ¢67", amount: 67 },
    { label: "20GB - ¢87", amount: 87 },
    { label: "25GB - ¢108", amount: 108 },
    { label: "30GB - ¢129", amount: 129 },
    { label: "40GB - ¢169", amount: 169 },
    { label: "50GB - ¢209", amount: 209 },
    { label: "100GB - ¢400", amount: 400 }
  ]
};

const networkSelect = document.getElementById("network");
const bundleSelect = document.getElementById("bundle");

networkSelect.addEventListener("change", function () {
  bundleSelect.innerHTML = '<option value="">-- Select Bundle --</option>';

  const selectedNetwork = this.value;
  if (!bundles[selectedNetwork]) return;

  bundles[selectedNetwork].forEach(bundle => {
    const option = document.createElement("option");
    option.value = bundle.amount;
    option.textContent = bundle.label;
    bundleSelect.appendChild(option);
  });
});

document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const network = networkSelect.value;
  const amount = bundleSelect.value;

  if (!network || !amount) {
    alert("Please select network and bundle");
    return;
  }

  PaystackPop.setup({
    key: "pk_live_6c14e62b602fe818a0433130f1db628a98731304",
    email: "customer@donmacdatahub.com",
    amount: amount * 400,
    currency: "GHS",
    ref: "DONMAC_" + Math.floor(Math.random() * 1000000000),

    metadata: {
      custom_fields: [
        { display_name: "Phone Number", value: phone },
        { display_name: "Network", value: network }
      ]
    },

    callback: function (response) {
      alert(
        "Payment successful!\n" +
        "Reference: " + response.reference +
        "\nYour data will be sent shortly."
      );
    },

    onClose: function () {
      alert("Payment cancelled");
    }
  }).openIframe();
});