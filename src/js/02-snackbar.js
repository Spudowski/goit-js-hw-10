// Opisany w dokumentacji
import iziToast from "izitoast";
// Kolejny import stylów
import "izitoast/dist/css/iziToast.min.css";


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name=delay]');
    const delay = parseInt(document.querySelector('input[name=delay]').value);
    const outcome = document.querySelector('input[name=state]:checked').value;


    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(outcome === 'fulfilled') {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay);
    });

    promise
        .then(delay => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                icon: '',
                close: '',
                zindex: '999',
                closeOnClick: 'true'
            });
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                icon: '',
                close: '',
                position: 'topRight',
                zindex: '999',
                closeOnClick: 'true'
            });
        })

    delayInput.value = '';

    document.querySelectorAll('input[name=state]').forEach(input => input.checked = false);

});