console.log("Main JS is running");


function GetSelectedTextValue() {
    var name = document.getElementById("selectRole").value;

    if (name === "Shop") {
        document.getElementById("company").disabled = false;
    } else if (name === "Customer") {
        document.getElementById("company").disabled = true;
    }
}

function checkboxfunction(checkgst) {
    var gst = document.getElementById("gst");
    gst.disabled = checkgst.checked ? false : true;
    if (!gst.disabled) {
        gst.focus();
    }
}
$(document).ready(function() {
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    });
});

function finalprice() {
    const price = document.getElementById('productprice').value
    const discount = document.getElementById('productdiscount').value
    const sum = price * discount / 100
    const finalprice = price - sum
    document.getElementById('productfinalprice').value = finalprice
    console.log(finalprice)
}