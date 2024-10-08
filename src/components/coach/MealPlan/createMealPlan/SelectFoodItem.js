import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FoodItemTable from '../../Table/FoodItemTable';
import { Box, Modal, Tooltip } from '@mui/material';

export default function SelectFoodItemModal({ open, handleFoodModalClose, onFoodItemSelect }) {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '90%',
        },
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
        maxHeight: '75vh',
        overflowY: 'auto',
    };

    return (
        <Modal
            open={open}
            onClose={handleFoodModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle} position="relative">
                {/* Pass the onFoodItemSelect function to the FoodItemTable */}
                <FoodItemTable onClose={handleFoodModalClose} onFoodItemSelect={onFoodItemSelect} />
                <Tooltip
                    onClick={handleFoodModalClose}
                    sx={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}
                >
                    <CloseIcon />
                </Tooltip>
            </Box>
        </Modal>
    );
}
