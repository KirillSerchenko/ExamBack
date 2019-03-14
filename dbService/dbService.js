class dbService {

    async initDB(){
        this.ObjectId = require('mongodb').ObjectID;
        const MongoClient = require('mongodb').MongoClient
        const client= await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })
        this.db = await client.db("ExamDB")
    }

    async getAll(collectionName){
        const collection = await this.db.collection(collectionName)
        const result= await collection.find().toArray()
        return result
    }

    async getById(id,collectionName){
        const collection = await this.db.collection(collectionName)
        const result= await collection.find({"_id":this.ObjectId(id)}).toArray()
        return result
     }

     async updateStatus(id,updatedData,collectionName){
        const collection = await this.db.collection("servers")
        const result= await collection.updateOne({"_id":this.ObjectId(id)},{$set:{'status':updatedData}}, { upsert: true })
        return result
     }

     async insertOne(data,collectionName){
        const collection = await this.db.collection(collectionName)
        const result= await collection.insertOne(data)
        return result
     }

}

module.exports = dbService