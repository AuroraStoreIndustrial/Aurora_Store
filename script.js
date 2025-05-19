const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.content'); // Changed '.konten' to '.content'

// Initialization: Display only the PRODUCT section
sections.forEach(section => {
    if (section.id === 'PRODUCT') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
});

// Event listener for each navbar link
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetID = link.getAttribute('data-target');

        // Show only the matching section
        sections.forEach(section => {
            section.style.display = section.id === targetID ? 'block' : 'none';
        });

        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Download pop-up
const downloadButton = document.querySelector('.Download_Manual_Book_Button');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('closePopup');

// Event listener for the download button
downloadButton.addEventListener('click', () => {
    popup.classList.remove('hidden'); // Show pop-up
});

// Event listener for the close button in the pop-up
closePopupButton.addEventListener('click', () => {
    popup.classList.add('hidden');
});

closePopupButton.addEventListener('mouseenter', () => {
    closePopupButton.src = "cross_red.svg";
});

closePopupButton.addEventListener('mouseleave', () => {
    closePopupButton.src = "cross_gray.svg";
});

// ...existing code...

const productChoices = document.querySelectorAll('.pack_of_choice > div[class^="choice_product"]');
const productContents = document.querySelectorAll('.product_content');

productChoices.forEach((choice, idx) => {
    choice.addEventListener('click', () => {
        productContents.forEach(content => content.style.display = 'none');
        const target = document.getElementById('product' + (idx + 1) + '_content');
        if (target) target.style.display = 'block';

        productChoices.forEach(c => c.classList.remove('active'));
        choice.classList.add('active');
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // File list mapping (nama file di modal : path file PDF)
    const fileMap = {
        "RXT-7900P.pdf": "aurora_industrial_PC_RXT-7900P.pdf",
        "EX3-RDX Datasheet.pdf": "aurora-ultrasonic-ex3-rdx-datasheet-1.pdf",
        "BLIIoT IO Manual v3.1.pdf": "bliiot-m-series-ethernet-io-module-user-manual-v3-1.pdf", 
        "ITX-15R Datasheet.pdf": "datasheet-aurora-industrial-pc-itx-15r.pdf",         
        "RXT-4200P Datasheet.pdf": "datasheet-industrial-pc-rxt-4200p.pdf"
    };

    // Checkbox logic
    const checkAll = document.getElementById('check_all');
    const checkItems = document.querySelectorAll('.check_item');
    const downloadBtn = document.getElementById('download_selected');

    // Enable/disable download button
    function updateDownloadBtn() {
        const anyChecked = Array.from(checkItems).some(cb => cb.checked);
        downloadBtn.disabled = !anyChecked;
        if (anyChecked) {
            downloadBtn.classList.remove('inactive');
        } else {
            downloadBtn.classList.add('inactive');
        }
    }

    // Check all logic
    checkAll.addEventListener('change', function() {
        checkItems.forEach(cb => cb.checked = checkAll.checked);
        updateDownloadBtn();
    });

    // Individual checkbox logic
    checkItems.forEach(cb => {
        cb.addEventListener('change', function() {
            // If any unchecked, uncheck "all"
            if (!cb.checked) checkAll.checked = false;
            // If all checked, check "all"
            if (Array.from(checkItems).every(cb => cb.checked)) checkAll.checked = true;
            updateDownloadBtn();
        });
    });

    // Download logic
    downloadBtn.addEventListener('click', function() {
        checkItems.forEach((cb, idx) => {
            if (cb.checked) {
                const fileName = cb.parentElement.querySelector('p').textContent.trim();
                const fileUrl = fileMap[fileName];
                if (fileUrl) {
                    const a = document.createElement('a');
                    a.href = fileUrl;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }
        });
    });

    // Inisialisasi
    updateDownloadBtn();
});