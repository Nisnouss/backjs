
// Afficher une quote
async function getAiQuote() {
    const url = 'http://localhost:3000/api/quote/aiQuote'
    const req = await fetch(url,{
        method: 'GET',
    })
    const data = await req.json()
    const divQuoteAi = document.querySelector('div[id = "aiquo"]');
    divQuoteAi.insertAdjacentHTML('afterbegin', `<p>${data.author}</p>`);
    divQuoteAi.insertAdjacentHTML('beforeend', `<p>${data.quote}</p>`);
    // console.log(await datas.json())
}
getAiQuote();

// Afficher une quote
async function getAllQuote() {
    const url = 'http://localhost:3000/api/quote/all'
    const req = await fetch(url,{
        method: 'GET',
    })
    const datas = await req.json()
    const divQuoteAll = document.querySelector('div[id = "allquo"]');
    datas.forEach(data => {
        divQuoteAll.insertAdjacentHTML('beforeend', `<p>${data.quote}</p>`);
        divQuoteAll.insertAdjacentHTML('beforeend', `<p>${data.author}</p>`);
        divQuoteAll.insertAdjacentHTML('beforeend', `<a href="editOrCreateQuote.html?id=${data._id}"> Afficher plus </a>`);
    });

    // console.log(await datas.json())
}
getAllQuote();


// Authentification
const button = document.querySelector('button');
button.addEventListener('click', async(e) => {
    e.preventDefault()
    const inputMail = document.querySelector('input[name = "email"]')
    const inputPwd = document.querySelector('input[name = "password"]')
    const valueMail = inputMail.value
    const valuePwd = inputPwd.value
    const url = 'http://localhost:3000/api/auth/login'

    const loginInfo = {
        email: valueMail,
        password: valuePwd
    }
    const req = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await req.json()

    localStorage.setItem('loginInfo', json.stringify(loginInfo))
})

// Création d'un compte
const buttonRegister = document.querySelector('button[id = "register"]');
buttonRegister.addEventListener('click', async(e) => {
    e.preventDefault()
    const inputMailRegister = document.querySelector('input[name = "emailinsc"]')
    const inputPwdRegister = document.querySelector('input[name = "passwordinsc"]')
    const valueMailRegister = inputMailRegister.value
    const valuePwdRegister = inputPwdRegister.value
    const url = 'http://localhost:3000/api/auth/register'

    const registerInfo = {
        email: valueMailRegister,
        password: valuePwdRegister
    }
    const datas = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    localStorage.setItem('registerInfo', JSON.stringify(registerInfo))
})