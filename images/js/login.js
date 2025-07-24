    function handleSubmit(event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const email = document.getElementById("email").value;
      const gender = document.getElementById("gender").value;

      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      const customerID = `CUST${timestamp}${random}`;

      const result = `
        <strong>Customer ID:</strong> ${customerID}<br>
        <strong>Name:</strong> ${name}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>Address:</strong> ${address}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Gender:</strong> ${gender}
      `;

      const outputDiv = document.getElementById("output");
      outputDiv.innerHTML = result;
      outputDiv.style.display = "block";
    }
  


    