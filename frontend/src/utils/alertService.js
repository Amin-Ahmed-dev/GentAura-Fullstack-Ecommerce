import Swal from 'sweetalert2';

// The "Gentaura" Base Theme
const LuxurySwal = Swal.mixin({
    customClass: {
        popup: 'swal-luxury-popup',
        confirmButton: 'btn btn-primary px-5 py-2 ms-2',
        cancelButton: 'btn btn-secondary px-5 py-2 me-2',
        title: 'swal-luxury-title',
        htmlContainer: 'swal-luxury-content'
    },
    buttonsStyling: false,
    background: '#1A1D24',
    color: '#F5F5F0',
});

// Success Modal
export const showSuccess = (title, text) => {
    LuxurySwal.fire({
        icon: 'success',
        iconColor: '#C6A664', // Aged Brass
        title: title.toUpperCase(),
        text: text,
        confirmButtonText: 'CONTINUE',
    });
};

// Error Modal
export const showError = (title, text) => {
    LuxurySwal.fire({
        icon: 'error',
        iconColor: '#D9534F', // Danger Red
        title: title.toUpperCase(),
        text: text,
        confirmButtonText: 'RETRY',
    });
};

// Show Toast
export const showToast = (title, icon = 'success') => {
    LuxurySwal.fire({
        toast: true,
        position: 'top-end',
        icon: icon,
        iconColor: icon === 'success' ? '#C6A664' : '#D9534F',
        title: title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#2B2F38',
    });
};

// Confirmation Modal
export const confirmAction = async (title, text, confirmBtn = "YES, PROCEED") => {
    const result = await LuxurySwal.fire({
        title: title.toUpperCase(),
        text: text,
        icon: 'warning',
        iconColor: '#9A6A44',
        showCancelButton: true,
        confirmButtonText: confirmBtn,
        cancelButtonText: 'CANCEL',
        reverseButtons: true
    });
    return result.isConfirmed;
};

/** 5. PROCESSING MODAL (For slow API calls) **/
export const showLoading = (title = "Processing...") => {
    LuxurySwal.fire({
        title: title.toUpperCase(),
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};

export const closeLoading = () => Swal.close();