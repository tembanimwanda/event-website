// ===== DATA =====
let applications = JSON.parse(localStorage.getItem("applications") || "[]");
let booths = JSON.parse(localStorage.getItem("booths") || "[]");

// ===== UPDATE STATS =====
function updateStats(){
  let available = 0, occupied = 0;

  booths.forEach(b => {
    if(b.status === "Available") available++;
    if(b.status === "Occupied") occupied++;
  });

  const totalEl = document.getElementById("totalBooths");
  const availEl = document.getElementById("availableBooths");
  const occEl = document.getElementById("occupiedBooths");

  totalEl.innerText = booths.length;
  availEl.innerText = available;
  occEl.innerText = occupied;

  // Optional: highlight numbers dynamically
  totalEl.parentElement.style.boxShadow = `0 0 15px ${booths.length > 0 ? '#3498db' : '#ccc'}`;
  availEl.parentElement.style.boxShadow = `0 0 15px ${available > 0 ? '#2ecc71' : '#ccc'}`;
  occEl.parentElement.style.boxShadow = `0 0 15px ${occupied > 0 ? '#e74c3c' : '#ccc'}`;
}

// ===== RENDER APPLICATIONS =====
function renderApplications(){
  const table = document.getElementById("applicationsTable");
  table.innerHTML = "";

  if(applications.length===0){
    table.innerHTML = "<tr><td colspan='7'>No applications yet</td></tr>";
    updateStats();
    return;
  }

  applications.forEach((app,i)=>{
    table.innerHTML += `
      <tr>
        <td>${app.vendor_name}</td>
        <td>${app.business_name}</td>
        <td>Booth ${app.booth_number}</td>
        <td>${app.location}</td>
        <td>${app.phone}</td>
        <td><span class="status ${app.status}">${app.status}</span></td>
        <td>
          <button class="approve" onclick="approve(${i})">Approve</button>
          <button class="reject" onclick="reject(${i})">Reject</button>
          <button class="delete" onclick="deleteApplication(${i})">Delete</button>
        </td>
      </tr>
    `;
  });

  updateStats();
}

// ===== ACTIONS =====
function approve(i){
  applications[i].status = "Approved";
  const booth = booths.find(b=>b.booth_number==applications[i].booth_number);
  if(booth) booth.status="Occupied";
  saveAll();
}

function reject(i){
  applications[i].status = "Rejected";
  const booth = booths.find(b=>b.booth_number==applications[i].booth_number);
  if(booth) booth.status="Available";
  saveAll();
}

function deleteApplication(i){
  if(!confirm("Delete this application?")) return;
  const booth = booths.find(b=>b.booth_number==applications[i].booth_number);
  if(booth) booth.status="Available";
  applications.splice(i,1);
  saveAll();
}

// ===== SAVE + REFRESH =====
function saveAll(){
  localStorage.setItem("applications", JSON.stringify(applications));
  localStorage.setItem("booths", JSON.stringify(booths));
  renderApplications();
}

// ===== INITIAL LOAD =====
renderApplications();