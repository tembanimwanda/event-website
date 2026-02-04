// ===== Admin Credentials =====
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Toggle role fields
function toggleFields(){
    const role = document.getElementById('role').value;
    document.getElementById('adminFields').style.display = role==="Admin"?"block":"none";
    document.getElementById('vendorFields').style.display = role==="Vendor"?"block":"none";
}

// Auto select role from URL parameter
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    if(role && (role==="Admin" || role==="Vendor")){
        document.getElementById('role').value = role;
        toggleFields();
    }
};

// ===== Booth Selection from boothPool =====
function selectBooth(booth, size, price){
  localStorage.setItem("selectedBooth", booth);
  localStorage.setItem("selectedSize", size);
  localStorage.setItem("selectedPrice", price);
  window.location.href = "booth-application.html";
}
function loadAvailableBooths(){
  const boothGrid = document.getElementById("boothGrid");
  if(!boothGrid) return;

  const booths = JSON.parse(localStorage.getItem("booths") || "[]");

  boothGrid.innerHTML = "";

  const available = booths.filter(b =>
    String(b.status).trim().toLowerCase() === "available"
  );

  if(available.length === 0){
    boothGrid.innerHTML =
      "<p style='color:#fff'>No booths available at the moment.</p>";
    return;
  }

  available.forEach(b=>{
  const card = document.createElement("div");
  card.className = "card available-glow";

  card.innerHTML = `
    <span class="price-tag">K${b.price}</span>
    <h3>Booth ${b.booth_number}</h3>
    <p><strong>Size:</strong> ${b.size}</p>
    <p><strong>Location:</strong> ${b.location || "Not specified"}</p>
    <button class="btn"
      onclick="applyBooth('${b.booth_number}')">
      Apply
    </button>
  `;

  boothGrid.appendChild(card);
});
}

function applyBooth(boothNumber){
  sessionStorage.setItem("selectedBooth", boothNumber);
  window.location.href = "booth-application.html";
}

/* ✅ LOAD IMMEDIATELY */
loadAvailableBooths();


/* ✅ FOR OTHER TABS */
window.addEventListener("storage", loadAvailableBooths);
function validateApply()
{
  const booth = sessionStorage.getItem("selectedBooth");
  if(!booth){
    alert("Please select an available booth first before applying.");
    document.getElementById("booths").scrollIntoView({behavior:"smooth"});
    return;
  }
  window.location.href = "booth-application.html";
}

// FAQ Accordion
  const faqQuestions = document.querySelectorAll("#faq .faq-question");
  for(let i=0; i<faqQuestions.length; i++){
    faqQuestions[i].addEventListener("click", function(){
      const parentCard = this.parentElement;
      const answer = parentCard.querySelector(".faq-answer");
      const icon = this.querySelector("i");

      // Toggle active state
      if(parentCard.classList.contains("active")){
        parentCard.classList.remove("active");
        answer.style.display = "none";
        icon.style.transform = "rotate(0deg)";
      } else {
        parentCard.classList.add("active");
        answer.style.display = "block";
        icon.style.transform = "rotate(180deg)";
      }
    });
  }