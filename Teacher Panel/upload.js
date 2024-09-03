document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('uploadModal');
    const closeModalButton = document.getElementById('closeModal');
    const chooseFileInput = document.getElementById('chooseFile');
    const fileDropArea = document.getElementById('fileDropArea');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const cancelButton = document.getElementById('cancelButton');
    const importButton = document.getElementById('importButton');
    const fileName = document.getElementById('fileName');
    const cancelUpload = document.getElementById('cancelUpload');
    const openUploadModalButton = document.getElementById('openUploadModal');
    const errorContainer = document.createElement('p'); // Create error message element
    errorContainer.className = 'text-red-600 text-xs mt-2'; // Style for error message

    function showModal() {
        modal.style.display = 'flex'; // Display the modal
        errorContainer.textContent = ''; // Clear any previous error messages
    }

    function closeModal() {
        modal.style.display = 'none'; // Hide the modal
        errorContainer.textContent = ''; // Clear any previous error messages
    }

    // Open modal when button is clicked
    openUploadModalButton.addEventListener('click', showModal);

    // Close modal when close button is clicked
    closeModalButton.addEventListener('click', closeModal);

    // Handle file input change
    chooseFileInput.addEventListener('change', function (event) {
        const files = event.target.files;
        if (files.length > 0) {
            fileName.innerHTML = ''; // Clear previous file names
            Array.from(files).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.textContent = file.name;
                fileName.appendChild(fileItem);
            });
            progressContainer.style.display = 'flex';
            // Simulate upload progress
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

    // Cancel file upload
    cancelUpload.addEventListener('click', function () {
        chooseFileInput.value = ''; // Clear file input
        fileName.innerHTML = ''; // Clear file names
        progressContainer.style.display = 'none'; // Hide progress container
    });

    // Cancel button in modal
    cancelButton.addEventListener('click', closeModal);

    // Import button in modal
    importButton.addEventListener('click', function () {
        if (chooseFileInput.files.length === 0) { // Check if no files are selected
            errorContainer.textContent = alert('Please select at least one file before importing.');
            modal.appendChild(errorContainer); // Append error message to the modal
            return; // Stop further execution
        }
        // If files are selected
        alert(`Files Imported: ${Array.from(chooseFileInput.files).map(file => file.name).join(', ')}`);
        closeModal();
    });

    // Handle drag and drop
    fileDropArea.addEventListener('dragover', function (event) {
        event.preventDefault();
        fileDropArea.classList.add('bg-gray-100');
    });

    fileDropArea.addEventListener('dragleave', function () {
        fileDropArea.classList.remove('bg-gray-100');
    });

    fileDropArea.addEventListener('drop', function (event) {
        event.preventDefault();
        fileDropArea.classList.remove('bg-gray-100');
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            chooseFileInput.files = files; // Set the files to file input
            chooseFileInput.dispatchEvent(new Event('change')); // Trigger file input change event
        }
    });
});
