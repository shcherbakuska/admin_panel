from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base



DATABASE_URL = "postgresql://anya:Qq123456@db:5432/university_db"
# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Base class for models
Base = declarative_base()

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Using models
class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key = True, index = True)
    name = Column(String, nullable = False)
    surname = Column(String, nullable = False)
    partonymic = Column(String)
    course = Column(Integer)
    group = Column(String)
    faculty = Column(String)
    