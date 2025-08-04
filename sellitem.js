const steps = document.querySelectorAll('.step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('sellForm');
    const reviewContent = document.getElementById('reviewContent');

    let currentStep = 0;

    function showStep(n) {
      steps.forEach((step, index) => {
        step.classList.toggle('active', index === n);
      });
      prevBtn.disabled = n === 0;
      nextBtn.style.display = n === steps.length - 1 ? 'none' : 'inline-block';
      submitBtn.style.display = n === steps.length - 1 ? 'inline-block' : 'none';

      if (n === steps.length - 1) {
        fillReview();
      }
    }

    function validateStep() {
      clearErrors();
      let valid = true;

      // Validate inputs in current step
      const inputs = steps[currentStep].querySelectorAll('input, select, textarea');

      inputs.forEach(input => {
        if (!input.checkValidity()) {
          valid = false;
          const errorElem = document.getElementById(input.id + 'Error');
          if (errorElem) {
            errorElem.textContent = input.validationMessage || 'This field is required';
          }
        }
      });

      return valid;
    }

    function clearErrors() {
      document.querySelectorAll('.error').forEach(e => e.textContent = '');
    }

    function fillReview() {
      const title = form.title.value;
      const category = form.category.options[form.category.selectedIndex].text;
      const brand = form.brand.options[form.brand.selectedIndex].text;
      const description = form.description.value;
      const price = form.price.value;
      const shipping = form.shipping.value;
      const photo = form.photo.files[0] ? form.photo.files[0].name : 'No image uploaded';

      reviewContent.innerHTML = `
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Brand:</strong> ${brand}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Price:</strong> $${price}</p>
        <p><strong>Shipping Cost:</strong> $${shipping}</p>
        <p><strong>Photo:</strong> ${photo}</p>
      `;
    }

    nextBtn.addEventListener('click', () => {
      if (validateStep()) {
        currentStep++;
        showStep(currentStep);
      }
    });

    prevBtn.addEventListener('click', () => {
      currentStep--;
      showStep(currentStep);
    });

    form.photo.addEventListener('change', () => {
      const file = form.photo.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          const imgPreview = document.getElementById('imgPreview');
          imgPreview.src = e.target.result;
          imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (validateStep()) {
        alert('Form submitted! Now send this data to your backend.');
        // Here, you would do your fetch/AJAX call to backend API
        form.reset();
        currentStep = 0;
        showStep(currentStep);
        document.getElementById('imgPreview').style.display = 'none';
      }
    });

    showStep(currentStep);