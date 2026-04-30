document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    const dataTable = document.getElementById('dataTable');
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const countDisplay = document.getElementById('recordCount');

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    // Load existing data
    let records = JSON.parse(localStorage.getItem('epiRecords')) || [];
    renderTable();

    // Handle form submission
    dataForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newRecord = {
            id: Date.now(),
            patientId: document.getElementById('patientId').value,
            disease: document.getElementById('disease').value,
            date: document.getElementById('date').value,
            location: document.getElementById('location').value
        };

        records.push(newRecord);
        localStorage.setItem('epiRecords', JSON.stringify(records));
        
        dataForm.reset();
        renderTable();
    });

    // Function to display records
    function renderTable() {
        dataTable.innerHTML = '';
        countDisplay.innerText = `${records.length} Records`;

        records.forEach(record => {
            const row = `
                <tr class="hover:bg-slate-50 transition">
                    <td class="px-6 py-4 font-medium text-blue-600">#${record.patientId}</td>
                    <td class="px-6 py-4">${record.disease}</td>
                    <td class="px-6 py-4 text-slate-500">${record.date}</td>
                    <td class="px-6 py-4">${record.location}</td>
                    <td class="px-6 py-4">
                        <button onclick="deleteRecord(${record.id})" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            dataTable.innerHTML += row;
        });
    }

    // Delete record function
    window.deleteRecord = (id) => {
        records = records.filter(r => r.id !== id);
        localStorage.setItem('epiRecords', JSON.stringify(records));
        renderTable();
    };
});
