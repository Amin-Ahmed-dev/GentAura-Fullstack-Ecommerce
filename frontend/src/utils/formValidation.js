import validator from 'validator'

export const validateField = (name, value) => {
    let error = ""
    value = value.trim()

    switch (name) {
        case 'name':
            if (!value) {
                error = "Full name is required!"
            } else if (value.length < 3) {
                error = "Must be at least 3 characters!"
            } else if (!validator.matches(value, /^[^0-9]*$/)) {
                error = "No numbers are allowed!"
            }
            break

        case 'email':
            if (!value) {
                error = "Email is required!"
            } else if (!validator.isEmail(value)) {
                error = "Invalid email format"
            }
            break
        
        case 'password':
            if (!value) {
                error = "Password is required!"
            } else if (value.length < 8) {
                error = "Must be at least 8 characters"
            } else if (!validator.isStrongPassword(value)) {
                error = "Weak password!"
            }
            break
        
        default:
            break;
    }

    return error
}