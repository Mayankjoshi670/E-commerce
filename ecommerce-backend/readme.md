in controllers FOlder 
// app.get("/users" , (req , res):any=>{
// res.send("sneding data");
// })
// Or we can do this 
// const controlerA = (req , res)=>{
//     res.send("sending data");
// }
// app.get("/users" , controlerA)
//  these controler are in controler folder 


in models folder we write schemas 
 middleWares  you know you know 
 all handlers we need to use let say any one directly want to log in into admin page he cant because he will go at fist this middlewares and check weather it is verified user or not 

 as we know that we are using typescript 
 so we need to define types so all types are in type folder 

 in utils folder we have 
 all feature  we need to use again and again (let say we need to find average which takes array and return average we make a util of it )


 in src > utils >feature.ts  we create this file to connect to databse 
 tsc --w  // npm start watch mode is use to build automatically ts files to js files 
 and run your js file with nodemon  npm run dev 

src-> 
 middleware :) middleware 
 models :) all schemas are defined in models eg user schema , product schema , coupen etc.
 routes :) app.get("/",(req , res)=>{})
 controllers :) we write all (rq, res) wala work heare other wasie code gone out of 100 lines => result => now route will be app.get("/",controller1)
 types :) typescript ke types 
 utils :) database 


 we have to write try catch block again and again we need to costomize them at first we have create ErrorHandler class why gives error as per our choise but we need to optmixe that code so we will use our tryCatch block 

 installed Multer new library :Multer is a Node.js middleware used for handling multipart/form-data, which is primarily used for uploading files. It is commonly used in web applications where users need to upload files such as images, documents, or videos.