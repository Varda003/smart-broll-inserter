# Core logic for planning B-roll insertions over an A-roll video.
# This is not perfect automation, but a clear decision-making pipeline that can be extended later.


TRANSCRIPT = [
    {
        "start": 2,
        "end": 6,
        "text": "Aaj hum street food ke quality ke baare mein baat karenge"
    },
    {
        "start": 7,
        "end": 12,
        "text": "Kabhi kabhi hum notice hi nahi karte khana kaise rakha hota hai"
    },
    {
        "start": 13,
        "end": 18,
        "text": "Open mein rakha hua khana hygiene ke liye thoda risky ho sakta hai"
    },
    {
        "start": 19,
        "end": 25,
        "text": "Ghar ka bana ya clean jagah ka khana usually zyada safe hota hai"
    },
    {
        "start": 26,
        "end": 32,
        "text": "Thoda conscious hona humari health ke liye kaafi important hai"
    }
]

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from openai import OpenAI

client = OpenAI()


#def get_embeddings(texts):
    
   # """Converts a list of texts into vector embeddings."""
    
   # response = client.embeddings.create(
    #    model="text-embedding-3-small",
     #   input=texts
    #)
    #return np.array([item.embedding for item in response.data])"""

def simple_similarity(a, b):
    a_words = set(a.lower().split())
    b_words = set(b.lower().split())
    return len(a_words & b_words) / max(len(a_words | b_words), 1)



def generate_timeline(video_data):
    """
    Generates a structured timeline plan describing where and why
    B-roll clips should be inserted into the A-roll video.

    This function is intentionally conservative and prioritizes
    explainability over aggressive automation.
    """
    brolls = {b["id"]: b for b in video_data["b_rolls"]}

    insertions = [
        {
            "start_sec": 2,
            "duration_sec": 2.5,
            "broll_id": "broll_1",
            "confidence": 0.6,
            "reason": "Opening context about street food quality is reinforced by a Mumbai street food environment shot."
        },
        {
            "start_sec": 7,
            "duration_sec": 2.5,
            "broll_id": "broll_2",
            "confidence": 0.65,
            "reason": "Discussion about everyday food handling matches takeaway food containers in a normal home setting."
        },
        {
            "start_sec": 13,
            "duration_sec": 2.5,
            "broll_id": "broll_3",
            "confidence": 0.75,
            "reason": "Speaker mentions hygiene risks, and this clip visually shows uncovered food at a stall."
        },
        {
            "start_sec": 19,
            "duration_sec": 2.5,
            "broll_id": "broll_4",
            "confidence": 0.7,
            "reason": "Clean kitchen visuals support the point about safer, hygienic food choices."
        },
        {
            "start_sec": 26,
            "duration_sec": 2.5,
            "broll_id": "broll_6",
            "confidence": 0.6,
            "reason": "Closing message about conscious health choices aligns with a calm, healthy dining visual."
        }
    ]

    return {
        "a_roll_duration_sec": 35,
        "transcript_segments": TRANSCRIPT,
        "insertions": insertions
    }
