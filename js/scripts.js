addEventListener('DOMContentLoaded', () => {
    // Capurando el formulario y todos los campos input.
    const   form = document.getElementById('formulario'),
            usuario = document.getElementById('usuario'),
            email = document.getElementById('email'),
            password = document.getElementById('passw'),
            passwordConfirmar = document.getElementById('passw-confirmar')


    form.addEventListener('submit', e => {
        // Previniendo el envío del formulario,
        // ... hasta que se hagan todas las comprobaciones de los campos.
        e.preventDefault()

        // Validación de campos del formulario.
        validarCampos()
    })

    // Función validar campos.
    const validarCampos = () => {
        // Capturando los valores ingresados por el usuario.
        const   usuarioValor = usuario.value.trim(),
                emailValor = email.value.trim(),
                passwordValor = password.value.trim(),
                passwordConfirmarValor = passwordConfirmar.value.trim()

        // Validación campo vacío usuario.
        if (!usuarioValor) {
            // Función Validación del campo con error.
            validacionFalla(usuario, 'Campo vacío')
        } else {
            // Función Validación del campo correcto.
            validacionCorrecta(usuario)
        }

        // Validación campo vacío email.
        if (!emailValor) {
            validacionFalla(email, 'Campo vacío')
        } else if (!validaEmail(emailValor)) {
            validacionFalla(email, 'El email no es válido')
        } else {
            validacionCorrecta(email)
        }

        // Validando campo de Password.
        const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/

        if (!passwordValor) {
            validacionFalla(password, 'Campo vacío')
        } else if (passwordValor.length < 8) {
            validacionFalla(password, 'El password debe contener mínimo 8 caracteres')
        } else if (!passwordValor.match(er)) {
            validacionFalla(password, 'El password debe tener al menos una mayúscula, una minúscula y un número')
        } else {
            validacionCorrecta(password)
        }

        // Validando el campo de confirmación de Password.
        if (!passwordConfirmarValor) {
            validacionFalla(passwordConfirmar, 'Confirme su password')
        } else if (passwordValor !== passwordConfirmarValor) {
            validacionFalla(passwordConfirmar, 'Los password no coinciden')
        } else {
            validacionCorrecta(passwordConfirmar)
        }
    }


    // Función validacionFalla()
    const validacionFalla = (input, message) => {
        const   formControl = input.parentElement,
                aviso = formControl.querySelector('p')

        aviso.innerText = message
        formControl.className = 'form-control falla'
    }


    // Función validacionCorrecta()
    const validacionCorrecta = input => {
        const   formControl = input.parentElement,
                aviso = formControl.querySelector('p')

        formControl.className = 'form-control correcta'

        if (aviso.childNodes[0] !== undefined) {
            aviso.childNodes[0].remove()
        }
    }


    const validaEmail = email => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }
})

