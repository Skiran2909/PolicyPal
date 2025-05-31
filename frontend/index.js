const icons = document.querySelectorAll('.icon');
const contents = document.querySelectorAll('.content');
const form = document.querySelector('.quote-box form');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.quote-box form');
  form.addEventListener('submit', async (e) => {
    // ...
  });
});

// Initial setup: activate the first icon + content
if (icons.length > 0 && contents.length > 0) {
    icons[0].classList.add('active');
    contents[0].style.display = 'block';
    contents[0].classList.add('active');
}

// Add event listeners for click
icons.forEach(icon => {
    icon.addEventListener('click', () => {
        const type = icon.getAttribute('data-type');

        // Hide all contents and remove active class
        contents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        // Remove active class from all icons
        icons.forEach(i => i.classList.remove('active'));

        // Show selected content and mark active
        const selectedContent = document.getElementById(type);
        selectedContent.style.display = 'block';
        selectedContent.classList.add('active');

        icon.classList.add('active');
    });
});


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: form[0].value,
    phone: form[1].value,
    email: form[2].value,
    category: form[3].value,
    premiumTerm: form[4].value,
    sumAssured: form[5].value,
  };

  try {
    const res = await fetch('http://localhost:5000/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) form.reset();

  } catch (err) {
    alert('Failed to send quote request.');
  }
});