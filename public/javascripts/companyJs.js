var addproductbutton = document.getElementById('addproductbutton');
var addproduct = document.getElementById('addproduct')
var editproduct = document.getElementById('editproduct')
var editproductbutton = document.getElementById('editproductbutton');
var deleteproduct = document.getElementById('deleteproduct')
var deleteproductbutton = document.getElementById('deleteproductbutton');
var inbox = document.getElementById('inbox')

addproductbutton.addEventListener('click', () => {
    if (addproduct.style.display === 'none') {
        addproduct.style.display = 'block'

    } else {
        addproduct.style.display = 'none'
    }
})
editproductbutton.addEventListener('click', () => {
    if (editproduct.style.display === 'none') {
        editproduct.style.display = 'block'

    } else {
        editproduct.style.display = 'none'
    }
})
deleteproductbutton.addEventListener('click', () => {
    if (deleteproduct.style.display === 'none') {
        deleteproduct.style.display = 'block'
    } else {
        deleteproduct.style.display = 'none'
    }
})