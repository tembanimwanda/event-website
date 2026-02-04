
let booths = [];
let editIndex = null;

// ===== ELEMENTS =====
const boothNoInput = document.getElementById("boothNo");
const sizeInput = document.getElementById("size");
const priceInput = document.getElementById("price");
const statusInput = document.getElementById("status");
const locationInput = document.getElementById("location");
const boothTable = document.getElementById("boothTable");

// ===== LOAD BOOTHS =====
function loadBooths(){
  booths = JSON.parse(localStorage.getItem("booths") || "[]");
  render();
}

// ===== SAVE BOOTH =====
function saveBooth(){
  const boothNo = boothNoInput.value.trim();
  const size = sizeInput.value;
  const priceValue = priceInput.value.trim();
  const status = statusInput.value;
  const location = locationInput.value.trim();

  if(!boothNo || !size || !priceValue || !location){
    alert("Please fill all fields!");
    return;
  }

  const price = Number(priceValue);
  if(isNaN(price) || price <= 0){ alert("Enter a valid price"); return; }

  const booth = {booth_number: boothNo, size, price, status, location};

  if(editIndex !== null){
    booths[editIndex] = booth;
    editIndex = null;
  } else {
    if(booths.some(b=>b.booth_number===boothNo)){
      alert("Booth already exists");
      return;
    }
    booths.push(booth);
  }

  localStorage.setItem("booths", JSON.stringify(booths));
  clearForm();
  render();
}

// ===== RENDER AVAILABLE BOOTHS =====
function render(){
  boothTable.innerHTML="";
  booths.filter(b => b.status === "Available").forEach(b=>{
    boothTable.innerHTML+=`
      <tr>
        <td>${b.booth_number}</td>
        <td>${b.size}</td>
        <td>K${b.price}</td>
        <td>${b.location}</td>
        <td>
          <button class="action delete" onclick="removeBooth('${b.booth_number}')"><i class="fas fa-trash"></i> Delete</button>
        </td>
      </tr>`;
  });
}

// ===== DELETE =====
function removeBooth(boothNo){
  if(!confirm(`Delete booth ${boothNo}?`)) return;
  booths = booths.filter(b => b.booth_number !== boothNo);
  localStorage.setItem("booths", JSON.stringify(booths));

  // Also remove linked applications if exist
  const apps = JSON.parse(localStorage.getItem("applications") || "[]");
  const cleaned = apps.filter(a => a.booth_number !== boothNo);
  localStorage.setItem("applications", JSON.stringify(cleaned));

  render();
}

// ===== CLEAR FORM =====
function clearForm(){
  boothNoInput.value="";
  sizeInput.value="";
  priceInput.value="";
  statusInput.value="Available";
  locationInput.value="";
  editIndex=null;
}

// ===== LOGOUT =====
function logout(){
  sessionStorage.clear();
  window.location.href="admin.html";
}

// ===== INITIAL LOAD =====
document.addEventListener("DOMContentLoaded", loadBooths);