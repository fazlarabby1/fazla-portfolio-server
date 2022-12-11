require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5i4qdkw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const projectsCollection = client.db('fazlaPortfolio').collection('projectsData');

        app.get('/projects', async (req,res)=>{
            const query = {};
            const cursor = projectsCollection.find(query);
            const allProjects = await cursor.toArray();
            res.send(allProjects);
        });
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectsCollection.findOne(query);
            res.send(project);
        });
    }
    finally {

    }
}
run().catch(error => console.log(error))


app.get('/', (req, res) => {
    res.send('fazla portfolio is running');
})
app.listen(port, () => {
    console.log(`Portfolio server running on ${port}`)
})