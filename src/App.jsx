import React, { useState } from "react";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import AddEmployeeModal from "./components/AddEmployeeModal";
import EditEmployeeModal from "./components/EditEmployeeModal";


function App() {

    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: "Brad Pitt",
            email: "bradpitt@gmail.com",
            address: "89 Chiaroscuro Rd, Portland, USA",
            phone: "(171) 555-2222"
        }
    ])

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

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

    return (
        <div className="container">
            <div className="table-wrapper">
                <Header onOpenAddModal={openAddModal} />
                {/* <Header onOpenAddModal={() => setIsAddModalOpen(true)}/>   isteğe bağlı inline yazılabilir. */}
                <EmployeeList employees={employees} onEditClick={editClick} />
                <AddEmployeeModal isOpen={isAddModalOpen} onCloseAddModal={closeAddModal} onAddEmployee={addEmployee} />
                {/* <AddEmployeeModal isOpen={isAddModalOpen} onCloseAddModal={() => setIsAddModalOpen(false)}/>  isteğe bağlı inline da yazılabilir.*/}
                <EditEmployeeModal
                    isOpen={isEditModalOpen} 
                    employee= {selectedEmployee}
                    onCloseEditModal={ () => {
                        setIsEditModalOpen(false);
                        setSelectedEmployee(null);
                    }}
                    onEditEmployee={editEmployee}
                    />
            </div>
        </div>
    )
}

//deneme 12

export default App;