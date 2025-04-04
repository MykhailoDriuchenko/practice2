var app = new Vue ({
    el:"#app",
    data:{
        products:[{id:1,title:"Bush", short_text:'Rough-skinned, aromatic, irregular shape', image:'Bush.jpg', desc:"This variety has a thick, rough skin and an irregular shape. It is highly aromatic and often used for zesting rather than juice."},
            {id:2,title:"Eureka", short_text:'Bright yellow, classic sour variety', image:'Eureka.jpg', desc:"A widely grown commercial lemon with a bright yellow color and a strong acidic flavor. It has few seeds and is commonly used for fresh juice, cooking, and garnishes."},
            {id:3,title:"Verna", short_text:'Smooth, elongated, with thin skin', image:'Verna.jpg', desc:"A Spanish variety that is elongated with smooth, thin skin. It has a mild acidity and a high juice content, making it ideal for drinks and culinary use."},
            {id:4,title:"Yen Ben", short_text:'Small, deep yellow, with juicy flesh', image:'Yen Ben.jpg', desc:"An Australian variety known for its small size, smooth yellow skin, and high juice yield. It is particularly popular for making lemonade and cocktails due to its intense flavor."},
            {id:5,title:"Yuzu", short_text:'Bumpy, fragrant, with a spicy citrus flavor', image:'Uzu.jpg', desc:"A unique Japanese citrus fruit with a bumpy, thick rind and a highly aromatic scent. Its flavor is a mix of lemon, lime, and grapefruit, often used in sauces, dressings, and desserts."}],
        product: [],
        btnVisible: 0,
        cart: [],
        contactFields: {
            name: '',
            userType: 'seed producer',
            companyName: '',
            otherSpecify: '',
            position: '',
            interested: '',
            city: '',
            country: '',
            telephone: '',
            email: '',
            captcha: ''
        },
        orderSubmitted: false
    },    
    mounted:function(){
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods:{
        getProduct:function(){
            if(window.location.hash){
                var id = window.location.hash.replace('#','');
                if(this.products && this.products.length>0){
                    for(i in this.products){
                        if(this.products[i] && this.products[i].id && id==this.products[i].id) this.product=this.products[i];
                    }
                }
            }
        },
        addItem:function(id){
            window.localStorage.setItem('prod', id);
        },
        addToCart:function(id){
            var cart = [];
            if(window.localStorage.getItem('cart')){
                cart = window.localStorage.getItem('cart').split(',');
            }
            
            if(cart.indexOf(String(id))==-1){
                cart.push(id);
                window.localStorage.setItem('cart',cart.join());
                this.btnVisible=1;
            }
        },
        checkInCart:function(){
            if(this.product && this.product.id && window.localStorage.getItem('cart') && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id))!=-1) this.btnVisible=1;
        },
        getCart:function(){
            this.cart = [];
            if(window.localStorage.getItem('cart')){
                var cartIds = window.localStorage.getItem('cart').split(',');
                if(cartIds.length>0){
                    for(var j=0; j<cartIds.length; j++){
                        for(var i=0; i<this.products.length; i++){
                            if(String(this.products[i].id) === cartIds[j]){
                                this.cart.push(this.products[i]);
                                break;
                            }
                        }
                    }
                }
            }
        },
        removeFromCart:function(id){
            if(window.localStorage.getItem('cart')){
                var cart = window.localStorage.getItem('cart').split(',');
                var index = cart.indexOf(String(id));
                if(index > -1){
                    cart.splice(index, 1);
                    window.localStorage.setItem('cart', cart.join());
                    this.getCart();
                }
            }
        },
        makeOrder:function(){
            this.orderSubmitted = true;
            window.localStorage.removeItem('cart');
            this.cart = [];
        }
    }
});