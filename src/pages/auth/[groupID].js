import { Container } from 'components/Container';
import { LogInForm } from 'components/GroupHome/Auth/LogInForm';
import { AUTH_GROUP } from 'constants';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  const { groupID } = router.query;

  /**
   * @param {string} inputPassword
   * @param {(errorMessage: string) => void} callback
   */
  const handleSubmit = (inputPassword, callback) => {
    fetch(`${AUTH_GROUP}/${groupID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: inputPassword }),
    })
      .then((res) => {
        switch (res.status) {
          case 401:
            callback('Password incorrect.');
            break;
          case 200:
            router.replace(`/${groupID}`);
            break;
          default:
            console.log(res);
            callback('Something went wrong. Try again later.');
            break;
        }
      })
      .catch((e) => {
        console.log(e);
        callback('Something went wrong. Try again later.');
      });
  };

  return (
    <Container header='Private Group'>
      <LogInForm handleSubmit={handleSubmit} />;
    </Container>
  );
};
