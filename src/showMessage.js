export function showMessage(message,type) {
    Toastify({
        text: message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "botton", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type == "success" ? "green" : "red"
        },
        onClick: function () {  } // Callback after click
    }).showToast();
}