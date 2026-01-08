import json
from broll_planner import generate_timeline

with open("video_url.json", "r") as f:
    video_data = json.load(f)

timeline = generate_timeline(video_data)

with open("../output/timeline_plan.json", "w") as f:
    json.dump(timeline, f, indent=2)

print("Timeline plan generated successfully.")
