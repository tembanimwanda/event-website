
/* LOAD BOOTH */
const selectedBooth = sessionStorage.getItem("selectedBooth");
const booths = JSON.parse(localStorage.getItem("booths") || "[]");
const booth = booths.find(b => b.booth_number == selectedBooth);

if(!selectedBooth || !booth || booth.status !== "Available"){
  alert("Booth not available or not selected.");
  location.href="index.html";
}

boothNumber.value = booth.booth_number;
boothLocation.value = booth.location || "Not specified";
boothSize.value = booth.size;
boothPrice.value = booth.price;
paymentAmount.value = booth.price;

/* PAYMENT MODE */
function togglePaymentFields(){
  const mode = paymentMode.value;
  referenceBox.style.display = (mode==="Mobile Money" || mode==="Bank Transfer") ? "block":"none";
  networkBox.style.display = (mode==="Mobile Money") ? "block":"none";
  mobileNetwork.value="";
}

/* AUTO DETECT NETWORK */
phone.addEventListener("input", function(){
  if(paymentMode.value !== "Mobile Money") return;
  const prefix = phone.value.replace(/\s+/g,"").substring(0,3);
  if(prefix==="096"||prefix==="076") mobileNetwork.value="MTN Mobile Money";
  else if(prefix==="097"||prefix==="077") mobileNetwork.value="Airtel Money";
  else if(prefix==="095"||prefix==="075") mobileNetwork.value="Zamtel Kwacha";
  else mobileNetwork.value="Unknown Network";
});

/* DUPLICATE CHECK */
function hasDuplicateApplication(){
  const apps = JSON.parse(localStorage.getItem("applications") || "[]");
  return apps.find(app =>
    app.phone === phone.value ||
    app.email === email.value ||
    app.nrc === nrc.value ||
    app.booth_number === booth.booth_number
  );
}

/* VALIDATE FORM */
function validateForm(){
  if(!vendorName.value.trim() || !businessName.value.trim() || !phone.value.trim() ||
     !email.value.trim() || !nrc.value.trim() || !paymentMode.value || !paymentAmount.value){
    alert("Fill in all neccessary fields.");
    return false;
  }

  if(paymentMode.value==="Mobile Money"){
    if(mobileNetwork.value==="Unknown Network" || !mobileNetwork.value){
      alert("Invalid or missing mobile money network.");
      return false;
    }
    if(!paymentRef.value.trim()){
      alert("Please provide Mobile Money transaction reference.");
      return false;
    }
  }

  if(paymentMode.value==="Bank Transfer" && !paymentRef.value.trim()){
    alert("Please provide Bank Transfer transaction reference.");
    return false;
  }

  return true;
}

/* SUBMIT */
function submitApplication(){
  if(!validateForm()) return;
  if(hasDuplicateApplication()){
    alert("Duplicate application detected. This vendor or booth already has an application.");
    return;
  }

  paymentOverlay.classList.add("active");

  setTimeout(()=>{
    paymentOverlay.classList.remove("active");

    const application = {
      booth_number: booth.booth_number,
      location: booth.location,
      size: booth.size,
      price: booth.price,
      payment_amount: paymentAmount.value,
      payment_mode: paymentMode.value,
      mobile_network: mobileNetwork.value || "N/A",
      payment_reference: paymentRef.value || "N/A",
      vendor_name: vendorName.value,
      business_name: businessName.value,
      phone: phone.value,
      email: email.value,
      nrc: nrc.value,
      status: "Pending"
    };

    const apps = JSON.parse(localStorage.getItem("applications") || "[]");
    apps.push(application);
    localStorage.setItem("applications", JSON.stringify(apps));

    booth.status="Pending";
    localStorage.setItem("booths", JSON.stringify(booths));

    successNotification.style.display="block";
    setTimeout(()=>location.href="index.html",3000);
  },3000);
}
