import { TextField } from '@mui/material';

import utilities from 'styles/utilities.module.css';

interface PropType {
  name: string;
  setName(param: any): void;
  description: string;
  setDescription(param: any): void;
}

export const GroupInfo = ({ name, setName, description, setDescription }: PropType) => {
  return (
    <section id='group-information'>
      {/* Name input */}
      <h2 className={utilities.heading}>INFORMATION:</h2>
      <div className={utilities.inputFields}>
        <TextField
          label='Group name'
          variant='filled'
          className={utilities.input}
          required
          onChange={(e) => setName(() => e.target.value)}
          value={name}
        />
        {/* Description input */}
        <TextField
          label='Description'
          variant='filled'
          className={utilities.input}
          onChange={(e) => setDescription(() => e.target.value)}
          value={description}
        />
      </div>
    </section>
  );
};
