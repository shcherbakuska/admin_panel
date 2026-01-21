from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from database.database import Base, engine, get_db, Student
from pydantic import BaseModel

Base.metadata.create_all(bind=engine)

app = FastAPI()

class StudentOut(BaseModel):
    id: int
    name: str
    surname: str
    partonymic: str
    course: int
    group: str
    faculty: str

    class Config:
        orm_mode = True  # Это позволяет Pydantic использовать данные из SQLAlchemy моделей

class StudentsResponse(BaseModel):
    total: int
    students: List[StudentOut]

class StudentCreate(BaseModel):
    name: str
    surname: str
    partonymic: str = None
    course: int
    group: str
    faculty: str

    class Config:
        orm_mode = True 

# Получить список студентов
@app.get("/api/students", response_model=StudentsResponse)
def get_students(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1),
    db: Session = Depends(get_db)
):
    total = db.query(Student).count()
    students = db.query(Student).offset(skip).limit(limit).all()
    return {"total": total, "students": students}

# Добавить студента
@app.post("/api/students", response_model=StudentOut)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    db_student = Student(**student.dict())  # Преобразуем Pydantic модель в SQLAlchemy модель
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

# Удалить студента
@app.delete("/api/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Студент не найден!")
    db.delete(student)
    db.commit()
    return {"message": "Студент удален."}

