import {ProductController} from "./ProductController.js";

export class OrderController{
    constructor() {
        console.log('hello to order page');
        this.orders=this.getOrdersFromLocalStorage() || [];
        console.log(this.orders);
        this.productController= new ProductController();
        this.initOrderTbl(this.getOrdersFromLocalStorage());

        $('#cloceOrderDeailsModelBtn').on('click',()=>{
            $('#myModal').modal('hide');
        });
        this.setData();

    }

    handleEventHandlers(){
        $('#searchBarOrderTxt').on('input',(e)=>{
            const searchArr=[];
            this.getOrdersFromLocalStorage().map((result,index)=>{
                if (
                   result._ordId.toLowerCase().includes(e.target.value.toLowerCase()) ||
                   result._date.toLowerCase().includes(e.target.value.toLowerCase()) ||
                   result._cusId.toLowerCase().includes(e.target.value.toLowerCase())

                ){
                    searchArr.push(result);
                }
            });
            this.initOrderTbl(searchArr);
        });
    }

    setData(){
        let ordersCount=0;
        let total=0;
        this.orders.map((result,index)=>{
            if (result._date === new Date().toLocaleDateString()){
                ordersCount++;
                total+=Number(result._tot);
            }
        });
        $('#dateTxt').text(new Date().toLocaleDateString());
        $('#ordersCountTxt').text(ordersCount);
        console.log(typeof total);
        $('#totalRevenueTxt').text(total.toFixed(2));
        this.storeOrdersOnLocalStorage();
        this.initOrderTbl(this.getOrdersFromLocalStorage());
    }
    storeOrdersOnLocalStorage() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    getOrdersFromLocalStorage() {
        const storedOrders = localStorage.getItem('orders');
        return storedOrders ? JSON.parse(storedOrders) : null;
    }

    saveOrder(order){
        this.orders.push(order);
        this.storeOrdersOnLocalStorage();
        this.initOrderTbl(this.orders);
    }

    deleteOrder(index){
        console.log("req to delete...");
        this.orders.splice(index,1);
        this.initOrderTbl(this.orders);
    }

    viewOrderDetailsModel(order){
        $('#orderDetailsTbl').empty();
        const subtotal= Number(order._tot)-Number(order._discount);
        order._products.map((result,index)=>{
            const productIndex= this.productController.findIndexByProductId(result.product);
            const productName= this.productController.products[productIndex]._desc;
            const unitPrice= Number(this.productController.products[productIndex]._price);
            const rowPrice= unitPrice*Number(result.qty);
            let no= index+1;
            $('#orderDetailsTbl').append(
                $('<tr>').append(
                    $('<th scope="row">').text(no),
                    $('<td>').text(productName),
                    $('<td>').text(unitPrice),
                    $('<td>').text(result.qty),
                    $('<td>').text(rowPrice)
                )
            );
        });
        $('#orderDetailsTbl').append(
            $('<tr>').append(
                $('<td colspan="4">').text('Discount Is (%)'),
                $('<td>').text(order._discount ? order._discount:0.00)
            ),
            $('<tr>').append(
                $('<td colspan="4">').text('Subtotal Is ($ USD)'),
                $('<td>').text(subtotal)
            )
        );
        $('#myModal').modal('show');
    }

    initOrderTbl(arr) {
        $('#orderTbl').empty();
        if (!arr) {
            return;
        }
        arr.map((result, index) => {
            console.log(result);
            const deleteButton = $('<div class="btn btn-danger">delete</div>');
            deleteButton.on('click', () => {
                this.deleteOrder(index);
            });

            const viewOrderBtn = $('<div class="btn btn-success">view</div>');
            viewOrderBtn.on('click', () => {
                console.log("clicked!");
                this.viewOrderDetailsModel(result);
            });

            let no = index + 1;
            $('#orderTbl').append(
                $('<tr>').append(
                    $('<th scope="row">').text(no),
                    $('<td>').text(result._ordId),
                    $('<td>').text(result._cusId),
                    $('<td>').text(result._date),
                    $('<td>').text(result._tot),
                    $('<td>').append(viewOrderBtn)
                )
            );
        });
    }
}

const orderController= new OrderController();
orderController.setData();
orderController.handleEventHandlers();