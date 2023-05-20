export async function fetchData(data1, data2) {
  try {
    const response1 = await fetch(`http://localhost:5678/api/${data1}`);
    const response2 = await fetch(`http://localhost:5678/api/${data2}`);
    let works = await response1.json();
    let categories = await response2.json();;
    return { works, categories }
  } catch (error) {
    console.log(error);
  }
}
export function makeGallery(array) {
  const gallery = document.querySelector('.portfolio__gallery')
  for (let i = 0; i < array.length; i++) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    img.src = array[i].imageUrl;
    figcaption.innerText = array[i].title;
  }
}
export function filter(array) {
  let buttons = document.querySelectorAll('[data-id]');
  let gallery = document.querySelector('.portfolio__gallery');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let newArray = array.filter((item) => item.categoryId == button.dataset.id);
      if (newArray.length !== array.length) {
        gallery.innerHTML = '';
        buttons.forEach((btn) =>
          btn.classList.remove('btn--active'));
        button.classList.add('btn--active');
        makeGallery(button.dataset.id != 0 ? newArray : array);
      }
    });
  });
};
async function getPromise() {
  let inputEmail = document.querySelector('#input__email').value;
  let inputPassword = document.querySelector('#input__password').value;
  let dataLog = {
    "email": inputEmail,
    "password": inputPassword
  };
  let chargeUtile = JSON.stringify(dataLog);
  try {
    let response = await fetch("http://localhost:5678/api/users/login",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: chargeUtile
      });
    let promise = await response.json();
    return promise
  } catch (error) {
    console.log(error);
  }
};
export async function logIn() {
  let indexUrl = './index.html';
  let errorLog = document.querySelector('.log__error');
  let log = document.querySelector('.log');
  log.addEventListener('submit', async (e) => {
    e.preventDefault();
    let promise = await getPromise();
    if ('userId' in promise) {
      sessionStorage.setItem('token', promise.token);
      window.location.href = indexUrl;
    } else {
      errorLog.classList.remove('invisible')
        ;
    }
  });
}
export function adminMode() {
  let token = sessionStorage.getItem('token');
  if (token != null) {
    visibility();
    adminListener()

  }
}

function visibility() {
  let hidden = document.querySelectorAll('.hidden');
  let logout = document.querySelector('.nav__login');
  let header = document.querySelector('header')
  header.style.marginTop = '6em';
  let btnGallery = document.querySelector('.portfolio ul')
  logout.innerText = 'logout';
  btnGallery.classList.add('hidden')
  hidden.forEach(element => element.classList.toggle('hidden'));

}

function adminListener() {
  let logout = document.querySelector('.nav__login');
  let btnModifier = document.querySelectorAll('span .hidden')
  let myModal = document.querySelector('#myModal')
  let myModalCloseBtn = document.querySelector('#modal__close')
  logout.addEventListener('click', () => sessionStorage.clear());
  btnModifier.addEventListener('click', () => myModal.show())
  myModalCloseBtn.addEventListener('click', () => myModal.close())
  }



