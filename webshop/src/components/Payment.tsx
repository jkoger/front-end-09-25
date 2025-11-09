interface PaymentInterface {
  isDisabled: boolean;
  sum: number;
}

function Payment(props: PaymentInterface) {
  function pay() {
    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const payload = {
      account_name: "EUR3D1",
      nonce: "165784ab" + Math.random() * 999999,
      timestamp: new Date(),
      amount: props.sum,
      order_reference: "840" + Math.random() * 999999,
      customer_url: "https://err.ee",
      api_username: "e36eb40f5ec87fa2",
    };

    const headers = {
      Authorisation:
        "Basic ZTM2ZWI0MGY1ZWM4N2ZhMjo3YjkxYTNiOWUxYjc0NTI0YzJlOWZjMjgyZjhhYzhjZA==",
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headers,
    })
      .then((res) => res.json())
      .then((json) => (window.location.href = json.payment_link));
  }

  return (
    <button disabled={props.isDisabled} onClick={() => pay()}>
      Maksa
    </button>
  );
}
export default Payment;
