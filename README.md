# Smart B-Roll Inserter

This project generates a **timeline plan** describing where and why B-roll clips should be inserted into an A-roll (talking-head) video.
The focus is on **planning and reasoning**, not final video rendering.

---

## How to Run Locally

### 1. Backend (Python)

From the project root:

```bash
pip install -r backend/requirements.txt
```

Generate the timeline plan:

```bash
cd backend
python main.py
```

This creates:

```
output/timeline_plan.json
```

Copy it to the frontend:

```bash
cp output/timeline_plan.json frontend/public/timeline_plan.json
```

---

### 2. Frontend (React)

From the project root:

```bash
cd frontend
npm install
npm start
```

Open in browser:

```
http://localhost:3000
```

You will see:

* A-roll transcript with timestamps
* Planned B-roll insertions with reasoning

---

## Notes

* The system is designed to use OpenAI embeddings for semantic matching.
* During local execution, a rule-based fallback planner is used to keep the pipeline functional.
* Video rendering is intentionally skipped to focus on timeline planning.

---

## Output

The primary output is a structured JSON timeline describing:

* When B-roll should be inserted
* Which clip to use
* Why it was chosen

## Contact

Varda Hanwant
* 📧 Email: (varda.hanwant03@gmail.com)
* 🔗 GitHub: ()


## License

* This project is released under the MIT License.
* It is provided for evaluation and educational purposes.
