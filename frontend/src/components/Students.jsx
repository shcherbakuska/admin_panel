import React from 'react';
import './Students.css';

const Students = ({ students, loading }) => {
    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Курс</th>
                    <th>Группа</th>
                    <th>Факультет</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.surname}</td>
                        <td>{student.name}</td>
                        <td>{student.partonymic}</td>
                        <td>{student.course}</td>
                        <td>{student.group}</td>
                        <td>{student.faculty}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Students;
