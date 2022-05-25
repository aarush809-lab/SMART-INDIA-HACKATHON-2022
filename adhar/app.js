const express=require('express');
const app=express();
const path=require('path');
const bodyparser=require('body-parser');
const Razorpay=require('razorpay');



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use(express.json());


const razorpay=new Razorpay({
    key_id: 'rzp_test_nD57zqOoDS50hb',
    key_secret: 'km2N7SH5T54e7YopSDC5Ghop'
})


app.get('/',(req,res)=>{
    res.render('Home');
})
app.get('/payment',(req,res)=>{
    res.render('Payment')
})
app.get('/enroll',(req,res)=>{
    res.render('Enrollment')
})
app.get('/update',(req,res)=>{
    res.render('UPDATE')
})

app.post('/pay',(req,res)=>{
    console.log(req.body);
   
    res.render('Payment',{name:req.body.name,gender:req.body.radiobutton,email:req.body.email,phone:req.body.phone,date:req.body.date,address:req.body.address})
    
})
app.post('/order',(req,res)=>{
    let option={
        amount: 1000,
        currency:"INR"
    }

    razorpay.orders.create(option,function(err,order){
        console.log(order)
        res.json(order);
    })
})
app.post('/is-order-complete',(req,res)=>{
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentdoc)=>{
        console.log(paymentdoc)
        if(paymentdoc.status=='captured'){
            res.send('payment successfull')
        }
        else{
            res.send("failed");
        }
    })
    })
app.post('/is-order-complete',(req,res)=>{
razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentdoc)=>{
    console.log(paymentdoc)
    if(paymentdoc.status=='captured'){
        res.send('payment successfull')
    }
    else{
        res.send("failed");
    }
})
})
app.listen('3000',()=>{
    console.log("server started");
})
