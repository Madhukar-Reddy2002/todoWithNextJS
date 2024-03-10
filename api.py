from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient("mongodb+srv://madhukarreddy:madhu22@tasks.g7z6gll.mongodb.net/?retryWrites=true&w=majority")
db = client["tasks"]
collection = db["topics"]

class Topic(BaseModel):
    title: str
    description: str

@app.post("/api/topics")
def create_topic(topic: Topic):
    topic_dict = topic.dict()
    inserted_topic = collection.insert_one(topic_dict)
    return {"id": str(inserted_topic.inserted_id)}

@app.get("/api/topics")
def read_topics():
    topics = list(collection.find())
    # Convert ObjectId to string for each document
    topics = [{**topic, "_id": str(topic["_id"])} for topic in topics]
    return topics

@app.get("/api/topics/{topic_id}")
def read_topic(topic_id: str):
    topic = collection.find_one({"_id": ObjectId(topic_id)})
    if topic:
        # Convert ObjectId to string
        topic["_id"] = str(topic["_id"])
        return topic
    raise HTTPException(status_code=404, detail="Topic not found")

@app.put("/api/topics/{topic_id}")
def update_topic(topic_id: str, updated_topic: Topic):
    collection.update_one(
        {"_id": ObjectId(topic_id)}, {"$set": updated_topic.dict()}
    )
    return {"message": "Topic updated successfully"}

@app.delete("/api/topics/{topic_id}")
def delete_topic(topic_id: str):
    collection.delete_one({"_id": ObjectId(topic_id)})
    return {"message": "Topic deleted successfully"}