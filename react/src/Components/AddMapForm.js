import React, { useRef } from 'react';
import { Grid } from '@material-ui/core'
import { postMap } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const AddMapForm = () => {
    const classes = useStyles();

    const descRef = useRef();
    const titleRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();
        const description = descRef.current.value;
        const title = titleRef.current.value;
        
        // Current User ID = 1
        postMap(1, title, description);
    }

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Create New Public Map</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={classes.form}
                          noValidate
                          onSubmit={handleSubmit}
                          spacing={3}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    name="title"
                                    titleRef={titleRef}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    descRef={descRef}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default AddMapForm;