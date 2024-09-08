document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('uploadModal');
    const closeModalButton = document.getElementById('closeModal');
    const chooseFileInput = document.getElementById('chooseFile');
    const fileDropArea = document.getElementById('fileDropArea');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const cancelButton = document.getElementById('cancelButton');
    const importButton = document.querySelector('#uploadForm button[type="submit"]');
    const fileName = document.getElementById('fileName');
    const cancelUpload = document.getElementById('cancelUpload');
    const openUploadModalButton = document.getElementById('openUploadModal');
    const dataTable = document.getElementById('dataTable');
    const dataTableContainer = document.getElementById('dataTableContainer');
    const errorContainer = document.createElement('p');
    errorContainer.className = 'text-red-600 text-xs mt-2';

    function showModal() {
      modal.style.display = 'flex';
      errorContainer.textContent = '';
      modal.querySelector('.p-6').appendChild(errorContainer);
    }

    function closeModal() {
      modal.style.display = 'none';
      errorContainer.textContent = '';
    }

    function addDataRow(fileName, semester, subject, division,description) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${fileName}</td>
        <td>${semester}</td>
        <td>${subject}</td>
        <td>${division}</td>
        <td>${description}</td>
        
      `;
      dataTable.querySelector('tbody').appendChild(row);
    }

    openUploadModalButton.addEventListener('click', showModal);

    closeModalButton.addEventListener('click', closeModal);

    chooseFileInput.addEventListener('change', function (event) {
      const files = event.target.files;
      if (files.length > 0) {
        fileName.innerHTML = '';
        Array.from(files).forEach(file => {
          const fileItem = document.createElement('div');
          fileItem.textContent = file.name;
          fileName.appendChild(fileItem);
        });
        progressContainer.style.display = 'flex';
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          if (progress > 100) {
            progress = 100;
            clearInterval(interval);
          }
          progressBar.style.width = `${progress}%`;
          progressText.textContent = `${progress}% done`;
        }, 100);
      }
    });

    cancelUpload.addEventListener('click', function () {
      chooseFileInput.value = '';
      fileName.innerHTML = '';
      progressContainer.style.display = 'none';
    });

    cancelButton.addEventListener('click', closeModal);

    document.getElementById('uploadForm').addEventListener('submit', function (event) {
      event.preventDefault();
      if (chooseFileInput.files.length === 0) {
        errorContainer.textContent = 'Please select at least one file';
      } else {
        // Display the uploaded data in the table
        const semester = document.getElementById('semester').value;
        const subject = document.getElementById('subject').value;
        const division = document.getElementById('division').value;
        const description = document.getElementById('description').value;
        
        Array.from(chooseFileInput.files).forEach(file => {
          addDataRow(file.name, semester, subject, division,description);
        });

        dataTableContainer.style.display = 'block';
        dataTable.style.display = 'table';
        closeModal();
      }
    });
  });
