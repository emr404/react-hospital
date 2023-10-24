import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Label from '../components/Label';
import Input from '../components/Input';

const PatientForm = ({ title, isOpen, onSave, onCancel, patientToEdit, existingHospitalNumbers }) => {
    const [editedPatient, setEditedPatient] = useState({
        hospitalNumber: "",
        name: "",
        dateOfBirth: "",
        gender: "Male",
    });
    const [hospitalNumberWarning, setHospitalNumberWarning] = useState("");

    useEffect(() => {
        if (patientToEdit) {
            setEditedPatient({ ...patientToEdit });
        } else {
            setEditedPatient({
                hospitalNumber: "",
                name: "",
                dateOfBirth: "",
                gender: "Male",
            });
        }
    }, [patientToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "hospitalNumber") {
            const isNewHospitalNumber = value !== patientToEdit?.hospitalNumber;
            if (isNewHospitalNumber && existingHospitalNumbers.includes(value)) {
                setHospitalNumberWarning("Hospital number already exists");
            } else {
                setHospitalNumberWarning("");
            }
        }
        setEditedPatient({ ...editedPatient, [name]: value });
    };

    const isSaveDisabled = Object.values(editedPatient).some((value) => {
        if (typeof value === "string") {
            return value.trim().length === 0;
        }
        return !value;
    }) || (existingHospitalNumbers.includes(editedPatient.hospitalNumber) &&
        (!patientToEdit || (patientToEdit && patientToEdit.hospitalNumber !== editedPatient.hospitalNumber)));

    const handleSave = () => {
        if (Object.values(editedPatient).every(value => value) && (!existingHospitalNumbers.includes(editedPatient.hospitalNumber)
            || (patientToEdit && patientToEdit.hospitalNumber === editedPatient.hospitalNumber))) {
            onSave(editedPatient);
            setEditedPatient({
                hospitalNumber: "",
                name: "",
                dateOfBirth: "",
                gender: "Male",
            });
        }
    };

    if (!isOpen) {
        return null;
    }

    const { name, hospitalNumber, dateOfBirth, gender } = editedPatient;
    return (
        <Card title={title}>
            <form>
                <Label title="Hospital Number*" />
                <Input
                    name="hospitalNumber"
                    value={hospitalNumber}
                    onChange={handleChange}
                    warning={hospitalNumberWarning}
                />
                {hospitalNumberWarning && <p className="text-red-500">{hospitalNumberWarning}</p>}

                <Label title="Name*" />
                <Input
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
                <Label title="Date of Birth*" />
                <Input
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={handleChange}
                    isDate
                />
                <div className="mb-4">
                    <Label title="Gender*" />
                    <div className="ml-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={handleChange}
                                className="form-radio text-blue-500 focus:outline-none"
                            />
                            <span className="text-gray-900">Male</span>
                        </label>
                    </div>
                    <div className="ml-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === "Female"}
                                onChange={handleChange}
                                className="form-radio text-pink-500 focus:outline-none"
                            />
                            <span className="text-gray-900">Female</span>
                        </label>
                    </div>
                </div>
                <div className="mt-5 flex justify-end">
                    <Button
                        className="mr-2"
                        colour="gray"
                        clickAction={onCancel}
                        title="Cancel"
                    />
                    <Button
                        className={`${isSaveDisabled && "opacity-50 cursor-not-allowed"}`}
                        colour="blue"
                        clickAction={handleSave}
                        title="Save"
                        isDisabled={isSaveDisabled}
                    />
                </div>
            </form>
        </Card>
    );
};

export default PatientForm;