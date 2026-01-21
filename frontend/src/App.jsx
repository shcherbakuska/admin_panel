import React, { useState, useEffect } from 'react';
import Students from './components/Students';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage, setStudentsPerPage] = useState(10); 
    const [totalStudents, setTotalStudents] = useState(0);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/students?skip=${(currentPage - 1) * studentsPerPage}&limit=${studentsPerPage}`
                );
                const data = await response.json();

                setStudents(data.students);
                setTotalStudents(data.total); 
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, [currentPage, studentsPerPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleStudentsPerPageChange = (value) => {
        setStudentsPerPage(value);
        setCurrentPage(1); 
    };

    return (
        <div className="container">
            <header>
                <h1>Административная панель</h1>
            </header>
            <Students students={students} loading={loading} />
            <Pagination
                studentsPerPage={studentsPerPage}
                totalStudents={totalStudents}
                currentPage={currentPage}
                paginate={paginate}
                onStudentsPerPageChange={handleStudentsPerPageChange}
            />
        </div>
    );
};

export default App;
