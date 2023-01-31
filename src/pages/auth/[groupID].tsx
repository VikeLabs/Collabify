import { Container } from 'components/common';
import { LogInForm } from 'components/page_auth_groupID';
// import { AUTH_GROUP } from 'constants';
import { useRouter } from 'next/router';
import { PrivateGroupTokens } from 'helper/privateGroupTokens';
import { GROUP } from 'constants/index';

export default function PrivateGroupAuth() {
  const router = useRouter();
  const { groupID } = router.query;

  const handleSubmit = (
    inputPassword: string,
    callback: (err: string) => void
  ) => {
    fetch(`${GROUP}/auth/${groupID}`, {
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
            return res.text();
          default:
            console.log(res);
            callback('Something went wrong. Try again later.');
            break;
        }
      })
      .then((token) => {
        if (!token) return;

        if (!token) {
          throw new Error('Missing in response: access_token');
        }

        PrivateGroupTokens.setGroupToken(groupID as string, token);
        router.replace(`/${groupID}`);
      })
      .catch((e) => {
        callback('Something went wrong. Try again later.');
        console.log(e);
      });
  };

  return (
    <Container
      header='Private Group'
      leftIcon='ArrowBack'
      leftIconClick={() => router.replace('/')}
    >
      <LogInForm handleSubmit={handleSubmit} />
    </Container>
  );
}
