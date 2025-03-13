

import EmployeeItem from "./EmployeeItem";

// EmployeeList distrat yaparak props olarak gelen employees'i alıyoruz.
function EmployeeList({ employees, onEditClick, onDeleteClick,selectedEmployees,setSelectedEmployees }) {

  function toggleSelectAll(event) { // parametre olarak event göndermek zorundayız.
    if (event.target.checked) {
      setSelectedEmployees(employees.map(emp => emp.id));  // tüm açlışan verilerini alıyoruz.
    }else {
      setSelectedEmployees([]); 
    }
  }

  function toggleSelectEmployee(employeeId){ // burada EmployeeItem'daki tekil toggleları seçiyoruz. 
      setSelectedEmployees(prevSelected => 
        prevSelected.includes(employeeId) ? prevSelected.filter(id => id !== employeeId) : [...prevSelected, employeeId]
      );
       //setSelectedEmployees([]); 
  }

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>
            <span className="custom-checkbox">
              <input 
                  type="checkbox" 
                  id="selectAll" 
                  checked = {employees.length > 0 && selectedEmployees.length === employees.length}
                  onChange={(e) => toggleSelectAll(e)}
                />
              <label htmlFor="selectAll"></label>
            </span>
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          employees.map(employee => (
            <EmployeeItem 
              key={employee.id} 
              employee={employee} 
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              isSelected= {selectedEmployees.includes(employee.id)}
              onToggleSelect = {toggleSelectEmployee}
              />
          ))
        }
      </tbody>
    </table>
  )
}

export default EmployeeList;

