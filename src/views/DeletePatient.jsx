import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const DeletePatient = ({ confirmDeletePatient, onCancel, onDelete }) => {
    if (confirmDeletePatient) {
        return (
            <Card title='Confirm Deletion'>
                <p>Are you sure you want to delete <strong>{confirmDeletePatient.name}</strong>?</p>
                <div className="mt-4 flex justify-end">
                    <Button
                        colour='gray'
                        clickAction={onCancel}
                        title='Cancel'
                    />
                    <Button
                        colour='red'
                        clickAction={onDelete}
                        title='Delete'
                    />

                </div>
            </Card>
        );
    }
};

export default DeletePatient;