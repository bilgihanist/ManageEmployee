
import React, { useState } from 'react';

function AddEmployeeModal({ isOpen, onCloseAddModal, onAddEmployee }) {

    const [formData, setFormaData] = useState({
      name: '',
      email: '',
      address: '',
      phone: '',
      gender: '',
      department: ''
    })
  
    function handleChange(e) {
      const { name, value } = e.target;
      setFormaData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      onAddEmployee(formData);
      onCloseAddModal();
      setFormaData({
        name: '',
        email: '',
        address: '',
        phone: '',
        gender: '',
        department: ''
      })
    }
  
    function handleCancel() {
      onCloseAddModal();
      setFormaData({
        name: '',
        email: '',
        address: '',
        phone: '',
        gender: '',
        department: ''
      })
    }
  
    if (!isOpen) return null;
  
    return (
      <>
        <div id="addEmployeeModal" className="modal fade show">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h4 className="modal-title">Add Employee</h4>
                  <button onClick={onCloseAddModal} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      required
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <div>
                      <label>
                        <input
                          type='radio'
                          name='gender'
                          value="Male"
                          onChange={handleChange}
                          checked={formData.gender === 'Male'}
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type='radio'
                          name='gender'
                          value="Female"
                          onChange={handleChange}
                          checked={formData.gender === 'Female'}
                        />
                        Female
                      </label>
                    </div>
  
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <div>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select Department</option>
                        <option value="Finace">Finance</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
  
                      </select>
                    </div>
                  </div>
                </div>
  
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Add</button>
                  <button onClick={handleCancel} type="button" className="btn btn-default">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
    )
  }

  export default AddEmployeeModal;