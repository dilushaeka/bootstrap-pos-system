
/*import CustomerController from "./controller/CustomerController.js";
import Customer from "./model/Customer.js";*/

const toDashboard= ()=> {
    toOrderPage();
}

const toOrderPage = ()=>{
    $('#orders').css('display','block');
    $('#customer').css('display','none');
    $('#product').css('display','none');
    $('#placeOrder').css('display','none');
}

const toCustomerPage = ()=>{
  $('#orders').css('display','none');
  $('#customer').css('display','block');
  $('#product').css('display','none');
  $('#placeOrder').css('display','none');
}

const toProductPage = ()=>{
  $('#orders').css('display','none');
  $('#customer').css('display','none');
  $('#product').css('display','block');
  $('#placeOrder').css('display','none');
}

const toPlaceOrderPage = ()=>{
  $('#orders').css('display','none');
  $('#customer').css('display','none');
  $('#product').css('display','none');
  $('#placeOrder').css('display','block');
}



const regexCusId = /^Cus-\d{3}$/;
const verifyCusId = $("#customerIdTxt").on("keyup", (e) => {
    if (regexCusId.test($("#customerIdTxt").val())) {
        $("#customerIdTxt").css("border", "2px solid green");
        $("#cusIdErr").css("display", "none");
        if (e.key === "Enter") {
            $("#customerNameTxt").focus();
        }
    } else {
        $("#customerIdTxt").css("border", "2px solid red");
        $("#cusIdErr").css("display", "block");
        $("#cusIdErr").text("wrong input format ex:- Cus-001");
    }
    verifyCustomer();
});

const regexCusName = /^[a-zA-Z\s']+$/;
const verifyCusName = $("#customerNameTxt").on("keyup", (e) => {
    if (regexCusName.test($("#customerNameTxt").val())) {
        $("#customerNameTxt").css("border", "2px solid green");
        $("#cusNameErr").css("display", "none");
        if (e.key === "Enter") {
            $("#customerEmailTxt").focus();
        }
    } else {
        $("#customerNameTxt").css("border", "2px solid red");
        $("#cusNameErr").css("display", "block");
        $("#cusNameErr").text("Invalied Name");
    }
    verifyCustomer();
});

const regexCusEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const verifyCusEmail = $("#customerEmailTxt").on("keyup", (e) => {
    if (regexCusEmail.test($("#customerEmailTxt").val())) {
        $("#customerEmailTxt").css("border", "2px solid green");
        $("#cusEmailErr").css("display", "none");
    } else {
        $("#customerEmailTxt").css("border", "2px solid red");
        $("#cusEmailErr").css("display", "block");
        $("#cusEmailErr").text("Invalied Email");
    }
    verifyCustomer();
});

const verifyCustomer = () => {
    if (
        regexCusId.test($("#customerIdTxt").val()) &&
        regexCusName.test($("#customerNameTxt").val()) &&
        regexCusEmail.test($("#customerEmailTxt").val())
    ) {
        $("#saveCustomerBtn").removeClass("disabled");
    } else {
        $("#saveCustomerBtn").addClass("disabled");
    }
};



// Verify Product Page Inputs

const regexProductId = /^P-\d{3}$/;
const verifyPId = $("#PIdTxt").on("keyup", (e) => {
    if (regexProductId.test($("#PIdTxt").val())) {
        $("#PIdTxt").css("border", "2px solid green");
        $("#PIdTxtErr").css("display", "none");
        if (e.key === "Enter") {
            $("#PUnitPriceTxt").focus();
        }
    } else {
        $("#customerIdTxt").css("border", "2px solid red");
        $("#PIdTxtErr").css("display", "block");
        $("#PIdTxtErr").text("wrong input format ex:- P-001");
    }
    verifyProduct();
});

const regexProductDesc= /^[a-zA-Z0-9\s]+$/;
const verifyProductDesc = $("#PDescTxt").on("keyup", (e) => {
    if (regexProductDesc.test($("#PDescTxt").val())) {
        $("#PDescTxt").css("border", "2px solid green");
        $("#PDescTxtErr").css("display", "none");
        if (e.key === "Enter") {
            $("#PUnitPriceTxt").focus();
        }
    } else {
        $("#PDescTxt").css("border", "2px solid red");
        $("#PDescTxtErr").css("display", "block");
        $("#PDescTxtErr").text("Invalid Name");
    }
    verifyProduct();
});

const regexProductPrice = /^\d+(\.\d{1,2})?$/;
const verifyProductPrice = $("#PUnitPriceTxt").on("keyup", (e) => {
    if (regexProductPrice.test($("#PUnitPriceTxt").val())) {
        $("#PUnitPriceTxt").css("border", "2px solid green");
        $("#PUnitPriceTxtErr").css("display", "none");
        if (e.key === "Enter") {
            $("#PQtyTxt").focus();
        }
    } else {
        $("#PUnitPriceTxt").css("border", "2px solid red");
        $("#PUnitPriceTxtErr").css("display", "block");
        $("#PUnitPriceTxtErr").text("Format is :- 99.99");
    }
    verifyProduct();
});

const regexProductQty = /^\d+$/;
const verifyProductQty = $("#PQtyTxt").on("keyup", (e) => {
    if (regexProductQty.test($("#PQtyTxt").val())) {
        $("#PQtyTxt").css("border", "2px solid green");
        $("#PQtyTxtErr").css("display", "none");
        if (e.key === "Enter") {
            $("#PQtyTxt").focus();
        }
    } else {
        $("#PQtyTxt").css("border", "2px solid red");
        $("#PQtyTxtErr").css("display", "block");
        $("#PQtyTxtErr").text("Input Valid Number");
    }
    verifyProduct();
});


const verifyProduct = () => {
    if (
        regexProductId.test($("#PIdTxt").val()) &&
        regexProductDesc.test($("#PDescTxt").val()) &&
        regexProductPrice.test($("#PUnitPriceTxt").val())&&
        regexProductQty.test($("#PQtyTxt").val())
    ) {
        $("#AddProduct").removeClass("disabled");
        console.log('Enabled');
    } else {
        $("#AddProduct").addClass("disabled");
        console.log('desabled');
    }
};

