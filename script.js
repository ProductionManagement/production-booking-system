const bookingForm = document.getElementById('bookingForm');
const productionTable = document.getElementById('productionTable').querySelector('tbody');
const downloadBtn = document.getElementById('downloadBtn');

// Automatically set date and time
document.getElementById('date').value = new Date().toISOString().split('T')[0];
setInterval(() => {
  document.getElementById('time').value = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}, 1000);

// Initialize Select2 dropdowns
$(document).ready(() => {
  $('.select2').select2({ tags: true });
});

// Add booking to the table
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(bookingForm);
  const data = Object.fromEntries(formData.entries());
  const plan = parseFloat(data.plan || 0);
  const actual = parseFloat(data.actual || 0);
  const oee = plan > 0 ? ((actual / plan) * 100).toFixed(2) : '0';

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${data.date}</td>
    <td>${data.time}</td>
    <td>${data.shift}</td>
    <td>${data.lineLeader}</td>
    <td>${data.employeeCode}</td>
    <td>${data.model}</td>
    <td>${data.machine}</td>
    <td>${data.variant}</td>
    <td>${data.plan}</td>
    <td>${data.actual}</td>
    <td>${data.srNo}</td>
    <td>${data.hold}</td>
    <td>${data.reasonHold}</td>
    <td>${data.lossTime}</td>
    <td>${data.reasonLoss}</td>
    <td>${data.toolChange}</td>
    <td>${oee}</td>
  `;
  productionTable.appendChild(row);
  bookingForm.reset();
});

// Download data as CSV
downloadBtn.addEventListener('click', () => {
  const headers = [
    'Date', 'Time', 'Shift', 'Line Leader', 'Employee Code', 'Model', 'Machine',
    'Variant', 'Plan', 'Actual', 'Sr. No.', 'Hold', 'Reason for Hold', 'Loss Time',
    'Reason for Loss', 'Tool Change', 'OEE'
  ];
  let csvContent = headers.join(',') + '\n';

  const rows = productionTable.querySelectorAll('tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const rowData = Array.from(cells).map(cell => cell.innerText);
    csvContent += rowData.join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'production_bookings.csv';
  a.click();
  URL.revokeObjectURL(url);
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}
