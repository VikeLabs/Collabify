import { useState } from 'react';
import { Container } from 'components/Container';
import { LogInForm } from 'components/GroupHome/Auth/LogInForm';

export default () => {
  /**
   * @param {string} inputPassword
   */
  const handleSubmit = (inputPassword) => {
    //
  };

  return (
    <Container header='Private Group'>
      <LogInForm handleSubmit={handleSubmit} />;
    </Container>
  );
};
