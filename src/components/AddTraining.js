import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: new Date(),
        duration: '',
        activity: '',
        customer: '',

    })
    const handleClickOpen = () => {
        setTraining({ ...training, customer: props.row.value[1].href });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    };

    const inputChanged = event => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleDate = newDate => {
        setTraining({ ...training, date: newDate })
    }


    return (
        <div>
            <Button size="small" onClick={handleClickOpen}>
                Add Training Session
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training Session</DialogTitle>
                <DialogContent>

                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            clearable
                            renderInput={(props) => <TextField
                                margin="dense"
                                fullWidth
                                variant="standard"{...props} />}
                            label="Date"
                            value={training.date}
                            onChange={date => handleDate(date)}
                        />
                    </LocalizationProvider>


                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        label="Duration (mins)"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining;