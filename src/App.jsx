import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import EmployeeModal from "./components/EmployeeModal";
import Pagination from "./components/pagination";


function App() {

    const [employees, setEmployees] = useState(() => {
        const savedEmployees = localStorage.getItem("employees");
        console.log("savedEmployees", savedEmployees);
        return savedEmployees ? JSON.parse(savedEmployees) : [];
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState([]); // kullanıcıların seçtiği çalışanları tutacak state
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 3;
    const indexOfLastEmployee = currentPage * itemsPerPage; // 3 * 1 = 3 
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage; // 3 - 3 = 0
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);    // 0, 3 derived state , computed state

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees])

    function openAddModal() {
        setIsAddModalOpen(true);
    }

    function closeAddModal() {
        setIsAddModalOpen(false);
    }

    function addEmployee(newEmployee) {
        setEmployees(prevEmployees => [
            ...prevEmployees, {
                ...newEmployee,
                id: Math.max(...prevEmployees.map(emp => emp.id), 0) + 1
            }
        ])
    }
    function editEmployee(updatedEmployee) {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === updatedEmployee.id ? updatedEmployee : emp
            )
        )
    }

    function editClick(employee) {
        setIsEditModalOpen(true);
        setSelectedEmployee(employee);
    }

    function deleteClick(employee) {
        const confirmed = window.confirm("silmek istediğinize emin misin uşağım?");
        if (confirmed) {
            setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employee.id)) // seçilen çalışanı diğer çaşılanlardan çıkartacağız. böylece çalışanlar array'i güncellenmiş olacak. 
            setSelectedEmployees([]); // tüm seçilen çalışanları sıfırlıyoruz.
        }
    }


    function deleteSelectedEmployees() {
        const confirmed = window.confirm("la olm bak çoklu seçiyorsun dikkat et");
        if (confirmed) {
            setEmployees(prevEmployees =>
                prevEmployees.filter(emp => !selectedEmployees.includes(emp.id)) // seçilen çalışanlar array'inde olmayanları alıyoruz. böylece seçilen çalışanlar silinmiş oluyor.
            );
            setSelectedEmployees([]); // tüm seçilen çalışanları sıfırlıyoruz.
        }
    }

    return (
        <div className="container">
            <div className="table-wrapper">
                <Header
                    onOpenAddModal={openAddModal}
                    onDeleteSelected={deleteSelectedEmployees}
                />
                {/* <Header onOpenAddModal={() => setIsAddModalOpen(true)}/>   isteğe bağlı inline yazılabilir. */}
                <EmployeeList
                    employees={currentEmployees}
                    onEditClick={editClick}
                    onDeleteClick={deleteClick}
                    selectedEmployees={selectedEmployees}
                    setSelectedEmployees={setSelectedEmployees}
                />
                <EmployeeModal
                    mode="add"
                    isOpen={isAddModalOpen}
                    onClose={closeAddModal}
                    onSubmit={addEmployee}
                />
                <EmployeeModal
                    mode="edit"
                    isOpen={isEditModalOpen}
                    employee={selectedEmployee}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedEmployee(null);
                    }}
                    onSubmit={editEmployee}
                />

                <div className="clearfix">
                    <div className="hint-text">Showing <b>{currentEmployees.length}</b> out of <b>{employees.length}</b> entries</div>
                    <Pagination
                        currentPage={currentPage} // şu anki sayfa numarası
                        totalPage={Math.ceil(employees.length / itemsPerPage)} // toplam çalışanı sayısını itemsPerPage'a bölüp yukarı yuvarlıyoruz.
                        //onPageChange
                    />
                </div>

            </div>
        </div>
    )
}


export default App;