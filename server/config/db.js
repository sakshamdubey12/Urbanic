const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://astharai572:astha123@merncluster.de2xyob.mongodb.net/urbanic?retryWrites=true&w=majority")
.then(()=>{
    console.log('Database connected');
})