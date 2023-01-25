const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const buttonSubmit = document.querySelector('button[type="submit"]');

buttonSubmit.addEventListener('click', onButtonSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onButtonSubmit(e) {
  e.preventDefault();

  let delayValue = +delay.value;
  let stepValue = +step.value;
  for (let position = 1; position <= +amount.value; position += 1) {
    createPromise(position, delayValue)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayValue += stepValue;
  }
}
