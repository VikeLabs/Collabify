import { Alert, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { GROUP } from '../constants';

export default function Home() {
    const router = useRouter();

    const [hasError, setHasError] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

    const [nameError, setNameError] = useState(''); // name err
    const [descError, setDescError] = useState(''); // description err

    const createGroup = () => {
        // Error handling
        if (name.length < 2) {
            setNameError(() => 'Enter valid name'); // TODO: set name error messages
        }
        if (description == '') {
            setDescError(() => 'A description is required'); // TODO: set description error messages
        }
        // seperate return to display all helper text before quitting function
        if (nameError || descError) return null;

        // Make request when enough information provided
        fetch(GROUP, {
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
                icon: 'book',
                background: 'orange',
            }),
        })
            .then(() => router.push(`/${name}`))
            .catch((e) => setHasError(e));
    };

    return (
        <div>
            <h1>Create group</h1>

            <TextField
                id='outlined-basic'
                error={nameError !== '' ? true : false}
                helperText={nameError !== '' ? nameError : null}
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                id='outlined-basic'
                error={descError !== '' ? true : false}
                helperText={descError !== '' ? descError : null}
                placeholder='Description'
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <Button
                disabled={name == '' || description == '' ? true : false}
                onClick={() => createGroup()}
            >
                Create Group
            </Button>
        </div>
    );
}
