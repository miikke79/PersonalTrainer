import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        firstname: '',
        lastname: '',
        date: '',
        activity: '',
        duration: '',

    })
    const handleClickOpen = () => {
        console.log(props.row.value[1].href);
        setTraining({
            firstname: props.row.data.firstname,
            lastname: props.row.data.lastname,
            date: props.row.data.date,
            activity: props.row.data.activity,
            duration: props.row.data.duration,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(props.row.value[1].href, training);
        handleClose();
    };

    const inputChanged = event => {
        setTraining({ ...training, [event.target.name]: event.target.value })
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

                    <TextField
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={inputChanged}
                        label="Date"
                        fullWidth
                        variant="standard"
                    />

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