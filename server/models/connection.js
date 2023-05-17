const mongoose = require('mongoose')

 const db = mongoose.connect('mongodb://localhost:27017/redux', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

mongoose.set('strictQuery', true);


const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  photo:{
    type:String
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  blocked:{
    type:Boolean,
    default:false
  }

})


module.exports = {
  user: mongoose.model('user',userSchema)
} 