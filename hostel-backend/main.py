from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (allows Next.js frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
DATABASE_URL = "postgresql://postgres:1234@localhost:5432/hostel_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# Table Model
class Complaint(Base):
    __tablename__ = "complaints"

    complaint_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer)
    category = Column(String)
    description = Column(Text)
    status = Column(String, default="Pending")


# Create tables if not exist
Base.metadata.create_all(bind=engine)


# Insert Complaint
@app.post("/complaint")
def create_complaint(data: dict):
    session = SessionLocal()

    new_complaint = Complaint(
        student_id=data["student_id"],
        category=data["category"],
        description=data["description"],
        status="Pending"
    )

    session.add(new_complaint)
    session.commit()
    session.close()

    return {"message": "Complaint submitted successfully"}

@app.put("/complaint/{complaint_id}")
def update_complaint(complaint_id: int):
    session = SessionLocal()

    complaint = session.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()

    if complaint:
        complaint.status = "Resolved"
        session.commit()

    session.close()

    return {"message": "Complaint resolved"}

# Get All Complaints
@app.get("/complaints")
def get_complaints():
    session = SessionLocal()
    complaints = session.query(Complaint).all()

    result = []
    for c in complaints:
        result.append({
            "complaint_id": c.complaint_id,
            "student_id": c.student_id,
            "category": c.category,
            "description": c.description,
            "status": c.status
        })

    session.close()
    return result