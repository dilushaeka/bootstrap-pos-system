import {Customer} from "../model/Customer.js";

export class CustomerController {
    constructor() {
        this.customers = this.getCustomersFromLocalStorage() || [];
        // Initialize customer table
        this.initCusTbl(this.customers);
    }

    bindEventHandlers() {
        // Event handler for save customer button
        $("#saveCustomerBtn").on('click', this.handleSaveCustomer.bind(this));

        // Event handler for update customer button
        $("#updateCustomerBtn").on('click', this.handleUpdateCustomer.bind(this));

        // Event handler for search customer text input
        $('#searchCustomerTxt').on('input', (e) => {
            this.findCustomers(e.target.value);
        });
    }

    // Method to save a customer
    saveCustomer(customer) {
        if (this.findIndexFromCustomerId(customer._id) === -1) {
            console.log(customer);
            if (confirm('Are You Sure ?')) {
                this.customers.push(customer);
                this.storeCustomersOnLocalStorage();
                this.initCusTbl(this.customers);
                // Display a success toast, with a title
                toastr.success(customer._name + ' is Registered.');
                return;
            }
            toastr.error('Something Went Wrong...');
        } else {
            toastr.error('customer id repeated...');
            console.log('customer id repeated...');
        }
        document.getElementById("exampleFormControlInput1").text("");
    }

    // Method to update an existing customer
    updateCustomer(customer) {
        // Find the index of the updatable customer
        const index = this.findIndexFromCustomerId(customer.id);
        if (confirm('Are You Sure?')) {
            if (index !== -1) { // Check if the customer exists
                this.customers[index] = customer;
                this.storeCustomersOnLocalStorage();
                this.initCusTbl(this.customers);
                toastr.info(customer._name + ' is Updated.');
            } else {
                toastr.error('Customer id repeated or wrong...');
            }
        }

    }

    // Method to delete a customer
    deleteCustomer(customerId) {
        if (confirm('Are You Sure ?')) {
            console.log(customerId);
            this.customers.splice(customerId, 1);
            this.storeCustomersOnLocalStorage();
            this.initCusTbl(this.customers);
            toastr.error('Customer Deleted!');
        }

    }

    // Method to find customers based on a search string
    findCustomers(searchString) {
        $('#cusTblBody').empty();
        if (!this.customers) {
            return;
        }
        this.customers.map((result, index) => {
            if (
                result._name.toLowerCase().includes(searchString.toLowerCase()) ||
                result._email.toLowerCase().includes(searchString.toLowerCase())
            ) {
                const tr = $('<tr>').on('click', () => {
                    console.log('Click on table row');
                    this.setDataToTxt(result);
                });
                const deleteButton = $('<svg xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; color: red" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n' +
                    '  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>\n' +
                    '  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>\n' +
                    '</svg>');
                deleteButton.on('click', () => {
                    this.deleteCustomer(index);
                });
                let no = index + 1;
                $('#cusTblBody').append(
                    tr.append(
                        $('<th scope="row">').text(no),
                        $('<td>').text(result._id),
                        $('<td>').text(result._name),
                        $('<td>').text(result._email),
                        $('<td>').append(deleteButton)
                    )
                );
            }
        });
    }

    // Method to find the index of a customer using customer ID
    findIndexFromCustomerId(customerId) {
        return this.customers.findIndex((customer) => customerId === customer._id);
    }

    // Method to store customers on local storage in the browser
    storeCustomersOnLocalStorage() {
        localStorage.setItem('customers', JSON.stringify(this.customers));
    }

    // Method to get all customers from local storage in the browser
    getCustomersFromLocalStorage() {
        const storedCustomers = localStorage.getItem('customers');
        return storedCustomers ? JSON.parse(storedCustomers) : null;
    }

    // Event handler for save customer button
    handleSaveCustomer() {
        const cusId = $("#customerIdTxt").val().trim();
        const cusName = $("#customerNameTxt").val().trim();
        const cusMail = $("#customerEmailTxt").val().trim();
        this.saveCustomer(new Customer(cusId, cusName, cusMail));
    }

    // Event handler for update customer button
    handleUpdateCustomer() {
        const cusId = $("#customerIdTxt").val().trim();
        const cusName = $("#customerNameTxt").val().trim();
        const cusMail = $("#customerEmailTxt").val().trim();
        this.updateCustomer(new Customer(cusId, cusName, cusMail));
    }

    // Method to set data to text inputs
    setDataToTxt(customer) {
        console.log(customer);
        $("#customerIdTxt").val(customer._id);
        $("#customerNameTxt").val(customer._name);
        $("#customerEmailTxt").val(customer._email);
    }

    // Method to initialize the customer table
    initCusTbl(cusArr) {
        console.log('Init call');
        $('#cusTblBody').empty();
        if (!cusArr) {
            return;
        }
        cusArr.map((result, index) => {
            const tr = $('<tr>').on('click', () => {
                console.log('Click on table row');
                this.setDataToTxt(result);
            });
            const deleteButton = $('<svg xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; color: red" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n' +
                '  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>\n' +
                '  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>\n' +
                '</svg>');
            deleteButton.on('click', () => {
                this.deleteCustomer(index);
            });
            let no = index + 1;
            $('#cusTblBody').append(
                tr.append(
                    $('<th scope="row">').text(no),
                    $('<td>').text(result._id),
                    $('<td>').text(result._name),
                    $('<td>').text(result._email),
                    $('<td>').append(deleteButton)
                )
            );
        });
    }
}

const customerController = new CustomerController();
customerController.bindEventHandlers();
