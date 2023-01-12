import { Container } from 'components/Container';
import { LogInForm } from 'components/GroupHome/Auth/LogInForm';
import { AUTH_GROUP } from 'constants';
import { useRouter } from 'next/router';
import { PrivateGroupTokens } from 'helper/privateGroupTokens';

export default function PrivateGroupAuth() {
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
            return res.json();
          default:
            console.log(res);
            callback('Something went wrong. Try again later.');
            break;
        }
      })
      .then((data) => {
        if (!data) return;

        const access_token = data['access_token'];
        if (!access_token) {
          throw new Error('Missing in response: access_token');
        }

        PrivateGroupTokens.setGroupToken(groupID, access_token);
        router.replace(`/${groupID}`);
      })
      .catch((e) => {
        console.log(e);
        callback('Something went wrong. Try again later.');
      });
  };

  return (
    <Container
      header='Private Group'
      leftIcon={'ArrowBack'}
      leftIconClick={() => router.replace(`/`)}
    >
      <LogInForm handleSubmit={handleSubmit} />;
    </Container>
  );
}
