// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@email',
  password: 123,
  role: 1,
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/sign-up', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('sign-up', {
    // вказуємо назву контейнера
    name: 'sign-up',
    // вказуємо назву компонентів
    component: ['back-button', 'field', 'field-password', 'field-checkbox', 'field-select'],

    // вказуємо назву сторінки
    title: 'Sign-up',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      role: [
        { value: User.USER_ROLE.USER, text: 'Користувач' },
        {
            value: User.USER_ROLE.ADMIN,
            text: 'Адміністратор'
        },
        {
            value: User.USER_ROLE.DEVELOPER,
            text: 'Розробник'
        }
      ]
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/sign-up', function (req, res) {
   const { email, password, role } = req.body

   console.log(req.body)

   if(!email || !password || !role) {
     return res.status(400).json({
       message: "Помилка. обов'язкові поля відсутні",
     })
   }

   try {
      User.create({ email, password, role })

      return res.status(200).json({
        message: "Користувач успішно створений",
      })
    }  catch(err) {
      return res.status(400).json({
        message: err.message,
      })
    }
})

// Підключаємо роутер до бек-енду
module.exports = router