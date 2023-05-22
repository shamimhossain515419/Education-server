const express = require('express');
const cors = require('cors')//cors for own server connected with own
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();//dotenv config
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());





const uri = "mongodb+srv://education515419:eRiBTVjeK6wfnlPe@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});

async function run() {
     try {
          // Connect the client to the server	(optional starting in v4.7)
          await client.connect();
          const ProfessorCollection = client.db("EducationDB").collection("professor");

          // Send a ping to confirm a successful connection

       app.get('/professor', async(req,res)=>{
           const result= await ProfessorCollection.find().toArray();;
           res.send(result);
       })

       app.get('/professor/:id',  async(req,res)=>{
          const id= req.params.id;
          
          const qeury={_id: new ObjectId (id)};
          const result= await ProfessorCollection.findOne(qeury);
          res.send(result);
       })


          await client.db("admin").command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
     } finally {
          // Ensures that the client will close when you finish/error
          //     await client.close();
     }
}
run().catch(console.dir);



app.get('/', (req, res) => {
     res.send('Server is ok')
});

app.listen(port, () => {
     console.log('Port is Ok');
})