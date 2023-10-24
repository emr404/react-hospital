import React, { useState } from 'react';
import PatientForm from './PatientForm';
import patientsData from '../data/patientsData'
import PatientDetails from './PatientDetails';
import DeletePatient from './DeletePatient';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';


const PatientsTable = () => {
    const [patients, setPatients] = useState(patientsData);
    const [modals, setModals] = useState({
        edit: { isOpen: false, patientToEdit: null },
        add: { isOpen: false },
        view: { isOpen: false, selectedPatient: null },
        delete: { confirmPatient: null },
    });

    const openModal = (modalType, data = null) => {
        setModals({ ...modals, [modalType]: { isOpen: true, ...data } });
    };

    const closeModal = (modalType) => {
        setModals({ ...modals, [modalType]: { isOpen: false } });
    };

    const saveEditedPatient = (editedPatient) => {
        const updatedPatients = patients.map((patient) =>
            patient.id === editedPatient.id ? editedPatient : patient
        );

        setPatients(updatedPatients);
        closeModal('edit');
    };

    const deletePatient = (patient) => {
        openModal('delete', { confirmPatient: patient });
    };

    const confirmDelete = () => {
        const updatedPatients = patients.filter((p) => p.id !== modals.delete.confirmPatient.id);
        setPatients(updatedPatients);
        closeModal('delete');
    };

    const addPatient = (newPatient) => {
        const id = Date.now();
        const updatedPatients = [...patients, { id, ...newPatient }];
        setPatients(updatedPatients);
        closeModal('add');
    };

    const viewDetails = (patient) => {
        openModal('view', { selectedPatient: patient });
    };

    const TableHeading = ({ title }) => {
            return (
                <th className="px-6 py-3 whitespace-nowrap md:break-normal lg:break-all">{title}</th>
            )
        }
    const TableData = ({ title }) => {
            return (
                <th className="px-6 py-4 whitespace-nowrap">{title}</th>
            )
        }
    return (
        <div>
            <div className={`p-12 w-full ${Object.values(modals).some((modal) => modal.isOpen) ? 'blur-xl' : ''}`}>
                <Button
                    title='ADD PATIENT'
                    colour='green'
                    clickAction={() => openModal('add')}
                    className='float-right mb-2'
                />
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-md text-left text-white">
                        <thead className="text-lg text-white uppercase bg-gray-500 dark:bg-gray-900">
                            <tr>
                                <TableHeading title='Hospital Number' />
                                <TableHeading title='Name' />
                                <TableHeading title='Date of Birth' />
                                <TableHeading title='Gender' />
                                <TableHeading />
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id} className='border-t bg-gray-800'>
                                    <TableData title={patient.hospitalNumber} />
                                    <TableData title={patient.name} />
                                    <TableData title={new Date(patient.dateOfBirth).toLocaleDateString()} />
                                    <TableData title={patient.gender} />
                                    <TableData title={
                                        <div className="flex justify-center">
                                            <Button
                                                clickAction={() => viewDetails(patient)}
                                                title={<FontAwesomeIcon icon={faEye} />}
                                                colour='gray'
                                                className='mr-6'
                                            />
                                            <Button
                                                clickAction={() => openModal('edit', { patientToEdit: patient })}
                                                title={<FontAwesomeIcon icon={faEdit} />}
                                                colour='blue'
                                                className='mr-6'
                                            />
                                            <Button
                                                clickAction={() => deletePatient(patient)}
                                                title={<FontAwesomeIcon icon={faTrash} />}
                                                colour='red'
                                            />
                                        </div>
                                        } />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <PatientDetails
                isOpen={modals.view.isOpen}
                patient={modals.view.selectedPatient}
                onClose={() => closeModal('view')}
            />
            <PatientForm
                title='Edit Patient'
                isOpen={modals.edit.isOpen}
                onCancel={() => closeModal('edit')}
                onSave={saveEditedPatient}
                patientToEdit={modals.edit.patientToEdit}
                existingHospitalNumbers={patients.map((patient) => patient.hospitalNumber)}
            />
            <PatientForm
                title='Add Patient'
                isOpen={modals.add.isOpen}
                onCancel={() => closeModal('add')}
                onSave={addPatient}
                patientToEdit={null}
                existingHospitalNumbers={patients.map((patient) => patient.hospitalNumber)}
            />
            <DeletePatient
                confirmDeletePatient={modals.delete.confirmPatient}
                onCancel={() => closeModal('delete')}
                onDelete={confirmDelete}
            />
        </div>
    );
};

export default PatientsTable;