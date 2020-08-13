const express = require('express');
let jwt  = require('jsonwebtoken');
const router = express.Router();
let config=require('./config');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;
let secret = 'hungrycomeeat2020';

// declare axios for making http requests
const axios = require('axios');
var db;
const dburl='mongodb+srv://test1:testone1@cluster0-h4wip.mongodb.net/test?retryWrites=true&w=majority';
console.log(dburl);
MongoClient.connect(dburl,{ useNewUrlParser: true,useUnifiedTopology: true }, (err, database) => {
if (err) return console.log(err);
db = database.db('testone');
});


// User API like ,login,reister,enumerate

// User Authentication API
    router.route('/authuser').post(async (req, res) =>{
        try{
            const email = req.body.email;
            const password = req.body.password;
            const result=await db.collection('users').findOne({"email": email});
            if (result.password){
              const passwordComparision=await bcrypt.compare(password, result.password);
              if(passwordComparision){
                // generate user access token and send authtoken as response
                const authToken=generateToken(req,result._id,result.role,result.userName);
                successResponse(req,res,{authToken}); 
              }
              else{
                errorResponse(req,res,"Invalid Email or password",500);
              }
            } else{
              errorResponse(req,res,"Invalid Email or password",500);
            }
        } catch(error){
            errorResponse(req,res,error,500);
        }
    });
    
    // API to create new user
    router.route('/registeruser').post(async (req, res)=> {
      try{
        const userName = req.body.userName;
        const firstName= req.body.firstName;
        const lastName=req.body.lastName;
        const email=req.body.email;
        const password = req.body.password;
        const address= req.body.address;
        const postalCode=req.body.postalCode;
        const mobile=req.body.mobile;
        const newUser={userName,firstName,password,lastName,email,address,postalCode,mobile};
        const users= await db.collection('users').find().toArray();
        // check if no users are present in users collection then make new user "Admin" else just "user"
        if(users.length===0){
          newUser.role="Admin";
        } else {
          newUser.role="User";
        }
        // get uer by email and verify if email is already taken some other user
        const user= await db.collection('users').findOne({"email": email});
              if(!user){
                  const hash=await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
                  newUser.password=hash
                  const createdUser=await db.collection('users').insertOne(newUser);
                  successResponse(req,res,{id:createdUser.ops._id});  
              }
              else{
                  errorResponse(req,res,"EmailId is already taken",500);
              }
      } catch(error){
        errorResponse(req,res,error,500);
      }
    });


    // API to enumerate All users
    router.route('/users').get(async(req,res)=>{
      try{
          const users=await db.collection('users').find({},{projection:{password:0}}).toArray();
          successResponse(req,res,users);
      }catch(error){
          errorResponse(req,res,error);
      }
    })


    // API to get user user
    router.route('/users/:id').get(async(req,res)=>{
      try{
          const user=await db.collection('users').findOne({"_id":ObjectId(req.params.id)},{projection:{password:0}});
          successResponse(req,res,user);
      }catch(error){
          errorResponse(req,res,error);
      }
    })




// Resturants CRUD API's

    // API to create new Resturant
    router.route('/resturant').post((req,res)=>{
      try{
        const name=req.body.name;
        const image=req.body.image;
        const description=req.body.description;
        const address=req.body.address;
        const totalSeats=req.body.totalSeats;
        const newResturant={name,image,description,address,totalSeats};
        db.collection('resturant').insertOne(newResturant,(err, results) => {
            if(err){
              errorResponse(req,res,err,500);
            } else{
              successResponse(req,res,results);
            }
        })
      }
      catch(err){
        errorResponse(req,res,err,500);
      }
    })

    // API to Update a resturant
    router.route('/resturant/:id').put(async (req,res)=>{
      try{
        const name=req.body.name;
        const image=req.body.image;
        const description=req.body.description;
        const address=req.body.address;
        const totalSeats=req.body.totalSeats;
        const newResturant={name,image,description,address,totalSeats};
        const results=await db.collection('resturant').updateOne({"_id":ObjectId(req.params.id)},{$set:newResturant});
        successResponse(req,res,results);
      }
      catch(err){
        errorResponse(req,res,err,500);
      }
    })


    // API to enumerate all Resturants
    router.route('/resturant').get(async (req,res)=>{
      try{
          const results=await db.collection('resturant').find().toArray();
          successResponse(req,res,results);
      } catch(error){
          errorResponse(req,res,error,500);
      }
    })

    // API to get a Resturant details
    router.route('/resturant/:id').get(async(req,res)=>{
        try{
            const restult=await db.collection('resturant').findOne({"_id":ObjectId(req.params.id)});
            successResponse(req,res,result);
        }catch(eror){
            errorResponse(req,res,error,500);
        }
    })

    // API to delete resturant
    router.route('/resturant/:id').delete(async (req,res)=>{
      try{
       const result= await db.collection('resturant').deleteOne({"_id":ObjectId(req.params.id)});
        successResponse(req,res,result.deletedCount);
      }catch(error){
          errorResponse(req,res,error,500);
      }
    })




// menu CRUD API's

    // API to update MenuItem
    router.route('/menu/:id').put(async (req,res)=>{
      try{
        const name = req.body.name;
        const price=req.body.price;
        const description=req.body.description;
        const resturant=req.body.resturant;
        const image=req.body.image;
        const menuItem={name,price,description,image,resturant};
        const result=await db.collection('menu').updateOne({"_id":ObjectId(req.params.id)},{$set:menuItem});
        successResponse(req,res,result);
      } catch(error){
        errorResponse(req,res,error,500);
      }
    })

      // API to create new MenuItem
    router.route('/menu').post(async (req,res)=>{
      try{
        const name = req.body.name;
        const price=req.body.price;
        const description=req.body.description;
        const image=req.body.image;
        const resturant=req.body.resturant;
        const menuItem={name,price,description,image,resturant};
        const result=await db.collection('menu').insertOne(menuItem);
        successResponse(req,res,result.ops);
      } catch(error){
        errorResponse(req,res,error,500);
      }
    })


    // API to enumerate all Resturants
    router.route('/menu').get(async(req,res)=>{
      try{
          const results=await  db.collection('menu').find().toArray();
          successResponse(req,res,results);
      } catch(error){
          errorResponse(req,res,error,500);
      }
    })

    // API to get a Menu details
    router.route('/menu/:id').get(async (req,res)=>{
      try{
        const result=await db.collection('menu').findOne({"_id":ObjectId(req.params.id)});
        successResponse(req,res,result);
      }catch(error){
        errorResponse(req,res,error,500);
      }    
    })

    // API to delete resturant
    router.route('/menu/:id').delete(async (req,res)=>{
        try{
            const result=await db.collection('menu').deleteOne({"_id":ObjectId(req.params.id)});
            successResponse(req,res,result);
        }catch(error){
            errorResponse(req,res,error,500);
        }
    })

    // API to get menu items by resturant 
    router.route('/resturantmenu/:resturnatId').get(async (req,res)=>{
        try{
              const results=await  db.collection('menu').find({"resturant":req.params.resturnatId}).toArray();
              successResponse(req,res,results);
          } catch(error){
              errorResponse(req,res,error,500);
          }
    })



// Booking CRUD API's

    // API to create new Booking
    router.route('/booking').post(async (req,res)=>{
      try{
        const userName = req.body.userName;
        const userId = req.body.userId;
        const date=req.body.date;
        const numberofSeats=req.body.numberofSeats;
        const time=req.body.time;
        const resturantId=req.body.resturantId;
        const newBooking={resturantId,userId,userName,date,numberofSeats,time};
        const result=await db.collection('booking').insertOne(newBooking);
        successResponse(req,res,result.ops);
      } catch(error){
        errorResponse(req,res,error,500);
      }
    })


    // API to enumerate all Bookings
    router.route('/booking').get(async(req,res)=>{
      try{
          const results=await  db.collection('booking').find().toArray();
          successResponse(req,res,results);
      } catch(error){
          errorResponse(req,res,error,500);
      }
    })

    // API to get a booking details
    router.route('/booking/:id').get(async (req,res)=>{
      try{ 
          const result=db.collection('booking').findOne({"_id":ObjectId(req.params.id)})
          successResponse(req,res,result);
      }
      catch(error){
          errorResponse(req,res,error,500);
      }  
    })

    // API to delete booking
    router.route('/booking/:id').delete(async (req,res)=>{
        try{
          const result=await db.collection('booking').deleteOne({"_id":ObjectId(req.params.id)});
          successResponse(req,res,result);
        }
        catch(error){
          errorResponse(req,res,error,500);
        }
    })



// Order CRUD API's

    // API to create new order
    router.route('/order').post(async (req,res)=>{
      try{
        const userId = req.body.userId;
        const numberOfItems=req.body.numberOfItems;
        const items = req.body.items;
        const totalAmount = req.body.totalAmount;
        const gst = req.body.gst;
        const subTotal = req.body.subTotal;
        const newOrder={userId,numberOfItems,items,totalAmount,gst,subTotal};
        const result=await db.collection('order').insertOne(newOrder);
        successResponse(req,res,result.ops);
      } catch(error){
        errorResponse(req,res,error,500);
      }
    })


    // API to enumerate all orders
    router.route('/order').get(async(req,res)=>{
      try{
          const results=await  db.collection('order').find().toArray();
          successResponse(req,res,results);
      } catch(error){
          errorResponse(req,res,error,500);
      }
    })

    // API to get a order details
    router.route('/order/:id').get(async (req,res)=>{
      try{
        const result=await db.collection('order').findOne({"_id":ObjectId(req.params.id)});
        successResponse(req,res,result);
      }catch(error){
        errorResponse(req,res,error,500);
      }
    })

    // API to delete order
    router.route('/order/:id').delete(async (req,res)=>{
      try{
        const result=await db.collection('order').deleteOne({"_id":ObjectId(req.params.id)});
              successResponse(req,res,result);
      }catch(error){
        errorResponse(req,res,error,500);
      }
    })



// Response handler
/**
 * Description: Returns an API as handled error response
 * @param req: Object, request object
 * @param res: Object, response object
 * @param message: String, error message
 * @param statusCode: Number, HTTP status code
 * @access public instance method
 * @return API Response Object
 */
function errorResponse(req, res, message, statusCode = 200) {
	let response = {
		isError: true,
		data: {
			'message': message
		}
	};
	return res.status(statusCode).json(response);
}

/**
 * Description: Returns an API as handled sucess response
 * @param req: Object, request object
 * @param res: Object, response object
 * @param data: Object, API data
 * @param statusCode: Number, HTTP status code
 * @access public instance method
 * @return Response Object
 */
function successResponse(req, res, data, statusCode = 200) {
	let response = {
		isError: false,
		data: data
  };
	return res.status(statusCode).json(response);
}




// Generate Access token
const generateToken=(req, userId, role,userName,opts)=> {
  opts = opts || {};
  // By default, expire the token after 7 days.
  // NOTE: the value for 'exp' needs to be in seconds since
  // the epoch as per the spec!
  let expiresDefault = '7d';
  let token = jwt.sign({
    userId:  userId,
    role:role,
    userName:userName,
    agent: req.headers['user-agent']
  }, secret, { expiresIn: opts.expires || expiresDefault });
  return token;
}


const authorizeToken=(req,res,next)=>{
  const token=req.headers.token;
  if(token){
    let tokenData=jwt.decode(token);
    req.userId=tokenData.userId;
    req.role=tokenData.role;
    next();
  } else{
    responseHandler.errorResponse(req,res,'Invalid request',500);
  }
}

    
module.exports = router;