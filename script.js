const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.content, .specifications, .dimensions');

// Select all specifications content
const specificationsContents = document.querySelectorAll('.specifications_content');

// Show only the active product's specifications
function showSpecificationsAt(idx) {
    specificationsContents.forEach((content, i) => {
        content.style.display = i === idx ? 'block' : 'none';
    });
}

// Update showProductAt to also update specifications
function showProductAt(idx) {
    productContents.forEach((content, i) => {
        content.style.display = i === idx ? 'block' : 'none';
    });
    productChoices.forEach((choice, i) => {
        choice.classList.toggle('active', i === idx);
    });
    currentProductIndex = idx;
    showDimensionsAt(idx);
    showSpecificationsAt(idx); // Add this line
}

//OPTIMIZE Initialization: Display only the PRODUCT section
sections.forEach(section => {
    if (section.id === 'PRODUCT') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
});

//OPTIMIZE Event listener for each navbar link
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

        // If DIMENSIONS nav is clicked, update dimensions content to match current product
        if (targetID === 'DIMENSIONS') {
            showDimensionsAt(currentProductIndex);
        }
        // If SPECIFICATIONS nav is clicked, update specifications content to match current product
        if (targetID === 'SPECIFICATIONS') {
            showSpecificationsAt(currentProductIndex);
        }
    });
});

//TODO Download pop-up
const downloadButton = document.querySelector('.Download_Button');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('closePopup');

//OPTIMIZE Event listener for the download button
downloadButton.addEventListener('click', () => {
    popup.classList.remove('hidden'); // Show pop-up
});

//OPTIMIZE Event listener for the close button in the pop-up
closePopupButton.addEventListener('click', () => {
    popup.classList.add('hidden');
});

closePopupButton.addEventListener('mouseenter', () => {
    closePopupButton.src = "cross_red.svg";
});

closePopupButton.addEventListener('mouseleave', () => {
    closePopupButton.src = "cross_gray.svg";
});

//OPTIMIZE ...existing code...
// ...existing code...

const dimensionsContents = document.querySelectorAll('.dimensions_content');

function showDimensionsAt(idx) {
    dimensionsContents.forEach((content, i) => {
        content.style.display = i === idx ? 'block' : 'none';
    });
}

// Update showProductAt to also update dimensions
function showProductAt(idx) {
    productContents.forEach((content, i) => {
        content.style.display = i === idx ? 'block' : 'none';
    });
    productChoices.forEach((choice, i) => {
        choice.classList.toggle('active', i === idx);
    });
    currentProductIndex = idx;
    showDimensionsAt(idx); // Add this line
}

// ...existing code...
const productChoices = document.querySelectorAll('.pack_of_choice > div[class^="choice_product"]');
const productContents = document.querySelectorAll('.product_content');
let currentProductIndex = 0;

//OPTIMIZE Function to update active product display
function showProductAt(idx) {
    productContents.forEach((content, i) => {
        content.style.display = i === idx ? 'block' : 'none';
    });
    productChoices.forEach((choice, i) => {
        choice.classList.toggle('active', i === idx);
    });
    currentProductIndex = idx;
}

//OPTIMIZE Events on product selection
productChoices.forEach((choice, idx) => {
    choice.addEventListener('click', () => {
        showProductAt(idx);
    });
});

//OPTIMIZE Events on arrows
const leftArrow = document.querySelector('.Arrow_Left');
const rightArrow = document.querySelector('.Arrow_Right');

leftArrow.addEventListener('click', () => {
    let idx = currentProductIndex - 1;
    if (idx < 0) idx = productContents.length - 1; // Loop ke akhir
    showProductAt(idx);
});

rightArrow.addEventListener('click', () => {
    let idx = currentProductIndex + 1;
    if (idx >= productContents.length) idx = 0; // Loop ke awal
    showProductAt(idx);
});

//OPTIMIZE Initialize the first product view
showProductAt(0);
productChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
        // Hapus kelas 'active' dari semua elemen
        productChoices.forEach((c) => c.classList.remove('active'));
        // Tambahkan kelas 'active' ke elemen yang diklik
        choice.classList.add('active');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    //OPTIMIZE File list mapping (nama file di modal : path file PDF)
    const fileMap = {
        "RXT-7900P.pdf": "aurora_industrial_PC_RXT-7900P.pdf",
        "EX3-RDX Datasheet.pdf": "aurora-ultrasonic-ex3-rdx-datasheet-1.pdf",
        "BLIIoT IO Manual v3.1.pdf": "bliiot-m-series-ethernet-io-module-user-manual-v3-1.pdf",
        "ITX-15R Datasheet.pdf": "datasheet-aurora-industrial-pc-itx-15r.pdf",
        "RXT-4200P Datasheet.pdf": "datasheet-industrial-pc-rxt-4200p.pdf"
    };

    //OPTIMIZE Checkbox logic
    const checkAll = document.getElementById('check_all');
    const checkItems = document.querySelectorAll('.check_item');
    const downloadBtn = document.getElementById('download_selected');

    //OPTIMIZE Enable/disable download button
    function updateDownloadBtn() {
        const anyChecked = Array.from(checkItems).some(cb => cb.checked);
        downloadBtn.disabled = !anyChecked;
        if (anyChecked) {
            downloadBtn.classList.remove('inactive');
        } else {
            downloadBtn.classList.add('inactive');
        }
    }

    //OPTIMIZE Check all logic
    checkAll.addEventListener('change', function () {
        checkItems.forEach(cb => cb.checked = checkAll.checked);
        updateDownloadBtn();
    });

    //OPTIMIZE Individual checkbox logic
    checkItems.forEach(cb => {
        cb.addEventListener('change', function () {
            //OPTIMIZE If any unchecked, uncheck "all"
            if (!cb.checked) checkAll.checked = false;
            //OPTIMIZE If all checked, check "all"
            if (Array.from(checkItems).every(cb => cb.checked)) checkAll.checked = true;
            updateDownloadBtn();
        });
    });

    //OPTIMIZE Download logic
    downloadBtn.addEventListener('click', function () {
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

    //OPTIMIZE Inisialisasi
    updateDownloadBtn();
});

//todo Contact Us modal logic
const contactBtn = document.querySelector('.Button_Contact_Us');
const contactModal = document.getElementById('contact_modal');
const closeContactBtn = document.getElementById('closeContact');

contactBtn.addEventListener('click', () => {
    contactModal.classList.remove('hidden');
});

closeContactBtn.addEventListener('click', () => {
    contactModal.classList.add('hidden');
});

closeContactBtn.addEventListener('mouseenter', () => {
    closeContactBtn.src = "cross_red.svg";
});

closeContactBtn.addEventListener('mouseleave', () => {
    closeContactBtn.src = "cross_gray.svg";
});








//todo Contact Us send button logic
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const sendBtn = document.getElementById('sendBtn');

function updateSendBtn() {
    const nameFilled = nameInput.value.trim() !== '';
    const emailFilled = emailInput.value.trim() !== '';
    if (nameFilled && emailFilled) {
        sendBtn.disabled = false;
        sendBtn.classList.remove('inactive');
    } else {
        sendBtn.disabled = true;
        sendBtn.classList.add('inactive');
    }
}

nameInput.addEventListener('input', updateSendBtn);
emailInput.addEventListener('input', updateSendBtn);

// Optional: prevent form submit if not valid
sendBtn.addEventListener('click', function () {
    if (sendBtn.disabled) return;
    // See below for email sending
});

sendBtn.addEventListener('click', function () {
    if (sendBtn.disabled) return;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = encodeURIComponent("Contact from Aurora Store");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: I want to order Aurora products`);
    window.location.href = `mailto:aurorastoreindustrial@gmail.com?subject=${subject}&body=${body}`;
});

// ...existing code...

function isValidEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function updateSendBtn() {
    const nameFilled = nameInput.value.trim() !== '';
    const emailFilled = emailInput.value.trim() !== '';
    const emailValid = isValidEmail(emailInput.value.trim());

    // Email error style
    if (emailFilled && !emailValid) {
        emailInput.classList.add('input-error');
    } else {
        emailInput.classList.remove('input-error');
    }

    // Enable button only if all filled and email valid
    if (nameFilled && emailFilled && emailValid) {
        sendBtn.disabled = false;
        sendBtn.classList.remove('inactive');
    } else {
        sendBtn.disabled = true;
        sendBtn.classList.add('inactive');
    }
}

nameInput.addEventListener('input', updateSendBtn);
emailInput.addEventListener('input', updateSendBtn);

sendBtn.addEventListener('click', function (e) {
    if (sendBtn.disabled) return;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = encodeURIComponent("Contact from Aurora Store");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: I want to order Aurora products`);
    // Double check email validity before send
    if (!isValidEmail(email)) {
        emailInput.classList.add('input-error');
        return;
    }
    window.location.href = `mailto:aurorastoreindustrial@gmail.com?subject=${subject}&body=${body}`;
});

//todo arrow keyboard
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        const navLinksArr = Array.from(navLinks);
        let activeIdx = navLinksArr.findIndex((link) =>
            link.classList.contains("active")
        );
        if (activeIdx === -1) return;
        let nextIdx;
        if (e.key === "ArrowLeft") {
            nextIdx = (activeIdx - 1 + navLinksArr.length) % navLinksArr.length;
        } else {
            nextIdx = (activeIdx + 1) % navLinksArr.length;
        }
        navLinksArr[nextIdx].click();
        navLinksArr[nextIdx].focus();
    } else if (e.key === "ArrowLeft") {
        let idx = currentProductIndex - 1;
        if (idx < 0) idx = productContents.length - 1;
        showProductAt(idx);
    } else if (e.key === "ArrowRight") {
        let idx = currentProductIndex + 1;
        if (idx >= productContents.length) idx = 0;
        showProductAt(idx);
    }
});