import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Label from '../components/Label';

const PatientDetails = ({ patient, onClose, isOpen }) => {
    if (isOpen) {
        const { name, hospitalNumber, dateOfBirth, gender } = patient;
        const patientDetails = [
            { label: "Name:", value: name },
            { label: "Hospital Number:", value: hospitalNumber },
            { label: "Date of Birth:", value: new Date(dateOfBirth).toLocaleDateString() },
            { label: "Gender:", value: gender },
        ];
        return (
            <Card title="Patient Details">
                {patientDetails.map(({ label, value }, i) => (
                    <div key={i}>
                        <Label title={label} />
                        <p className="text-gray-900 font-semibold mb-4">{value}</p>
                    </div>
                ))}
                <div className="mt-4 flex justify-end">
                    <Button
                        title="Close"
                        colour="gray"
                        clickAction={onClose}
                    />
                </div>
            </Card>
        );
    }
};

export default PatientDetails;