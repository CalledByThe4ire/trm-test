import '../scss/app.scss';
import $ from 'jquery';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('.app');

  const [rowHeader, rowMiddle] = Array.from(app.querySelectorAll('.row'));

  const [button1, button2] = Array.from(app.querySelectorAll('button'));

  const form = app.querySelector('.form');

  const formDataContainer = app.querySelector('.form__data');

  button1.addEventListener('click', () =>
    rowHeader.classList.toggle('d-none', !rowHeader.classList.contains('d-none'))
  );

  button2.addEventListener('click', () => {
    const [first, second, third] = Array.from(rowMiddle.querySelectorAll('.col'));

    if (first.classList.contains('order-0') && second.classList.contains('order-1')) {
      first.classList.remove('order-0');
      first.classList.add('order-1');
      second.classList.remove('order-1');
      second.classList.add('order-0');
    } else if (first.classList.contains('order-1') && second.classList.contains('order-0')) {
      first.classList.remove('order-1');
      first.classList.add('order-0');
      second.classList.remove('order-0');
      second.classList.add('order-1');
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = JSON.stringify(Object.fromEntries(new FormData(event.target)), null, 2);

    formDataContainer.classList.remove('d-none');
    formDataContainer.textContent = formData;

    try {
      const res = await fetch('api/employees');

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      alert(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error.message);
    }
  });

  $('.modal').modal('show');
});
