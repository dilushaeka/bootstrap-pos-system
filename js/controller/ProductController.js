import {Product} from "../model/Product.js";


export class ProductController {
    constructor() {
        this.products = this.getProductsFromLocalStorage() || [];
        this.initProductTbl(this.products);
    }


    bindEventHandlers() {
        $("#UpdateProductBtn").on('click', this.handleUpdateProduct.bind(this));
        $("#AddProduct").on('click', this.handleSaveProduct.bind(this));
        $('#productSearch').on('input', (e) => {
            this.findProducts(e.target.value);
        });
    }

    saveProduct(product) {
        console.log(product);
        if (confirm('Are You Sure ?')) {
            if (this.findIndexByProductId(product._pId) === -1) {
                console.log(product);
                this.products.push(product);
                this.storeProductsOnLocalStorage();
                this.initProductTbl(this.products);
                toastr.success(product._desc + ' is Saved.');
            } else {
                toastr.error('Product Code is Duplicated!');
            }
        }
    }

    updateProduct(product) {
        // Find the index of the updatable customer
        const index = this.findIndexByProductId(product._pId);
        if (confirm('Are You Sure ?')) {
            if (index !== -1) { // Check if the customer exists
                this.products[index] = product;
                this.storeProductsOnLocalStorage();
                this.initProductTbl(this.products);
                toastr.info(product._desc + ' is Updated.');
            } else {
                toastr.error('Something Wnt Wrong');
            }
        }

    }


    updateProductQty(cart) {
        cart.map((result,index)=>{
            let indexOfProduct= this.findIndexByProductId(result.product);
            this.products[indexOfProduct]._qtyOnHand -= result.qty
        });
        this.storeProductsOnLocalStorage();
        this.initProductTbl(this.getProductsFromLocalStorage());
    }


    deleteProduct(productId) {
        console.log(productId);
        if (confirm('Are You Sure ?')) {
            this.products.splice(productId, 1);
            this.storeProductsOnLocalStorage();
            this.initProductTbl(this.products);
            toastr.error('Product Deleted!');
        }
    }

    findProducts(searchString) {
        $('#ProductTbl').empty();
        if (!this.products) {
            return;
        }
        this.products.map((result, index) => {
            if (
                result._desc.toLowerCase().includes(searchString.toLowerCase()) ||
                result._pId.toLowerCase().includes(searchString.toLowerCase())
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
                    this.deleteProduct(index);
                });
                let no = index + 1;
                $('#ProductTbl').append(
                    tr.append(
                        $('<th scope="row">').text(no),
                        $('<td>').text(result._pId),
                        $('<td>').text(result._desc),
                        $('<td>').text(result._price),
                        $('<td>').text(result._qtyOnHand),
                        $('<td>').append(deleteButton)
                    )
                );

            }

        });
    }

    storeProductsOnLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    findIndexByProductId(productId) {
        return this.products.findIndex((product) => productId === product._pId);
    }

    getProductsFromLocalStorage() {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : null;
    }

    handleSaveProduct() {
        console.log('handler calling...');
        const pId = $("#PIdTxt").val().trim();
        const pDesc = $("#PDescTxt").val().trim();
        const qty = $("#PQtyTxt").val().trim();
        const price = $("#PUnitPriceTxt").val().trim();
        this.saveProduct(new Product(pId, pDesc, price, qty));
    }

    handleUpdateProduct() {
        console.log('handler calling...');
        const pId = $("#PIdTxt").val().trim();
        const pDesc = $("#PDescTxt").val().trim();
        const qty = $("#PQtyTxt").val().trim();
        const price = $("#PUnitPriceTxt").val().trim();
        this.updateProduct(new Product(pId, pDesc, price, qty));
    }


    setDataToTxt(product) {
        console.log(product);
        $("#PIdTxt").val(product._pId);
        $("#PDescTxt").val(product._desc);
        $("#PQtyTxt").val(product._qtyOnHand);
        $("#PUnitPriceTxt").val(product._price);
    }

    initProductTbl(productArr) {
        console.log('Init call');
        $('#ProductTbl').empty();
        if (!productArr) {
            return;
        }
        productArr.map((result, index) => {
            const tr = $('<tr>').on('click', () => {
                console.log('Click on table row');
                this.setDataToTxt(result);
            });
            const deleteButton = $('<svg xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; color: red" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n' +
                '  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>\n' +
                '  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>\n' +
                '</svg>');
            deleteButton.on('click', () => {
                this.deleteProduct(index);
            });
            let no = index + 1;
            $('#ProductTbl').append(
                tr.append(
                    $('<th scope="row">').text(no),
                    $('<td>').text(result._pId),
                    $('<td>').text(result._desc),
                    $('<td>').text(result._price),
                    $('<td>').text(result._qtyOnHand),
                    $('<td>').append(deleteButton)
                )
            );
        });
    }
}

const productController = new ProductController();
productController.bindEventHandlers();