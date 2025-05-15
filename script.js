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
    closePopupButton.src = "Source/IMG/SVG/Cross_Red.svg";
});

closePopupButton.addEventListener('mouseleave', () => {
    closePopupButton.src = "Source/IMG/SVG/Cross_gray.svg";
});