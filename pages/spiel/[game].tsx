import { GetServerSideProps } from 'next';
import { GameInterface } from '../../interfaces/game';
import firestoreDb from '../../utils/firestoreDb';

interface GamePageInterface {
  game: GameInterface;
}

const GamePage: React.FC<{ game: GameInterface }> = ({ game }) => {
  return <pre>{JSON.stringify(game, null, 2)}</pre>;
};

export const getServerSideProps: GetServerSideProps<GamePageInterface> = async ({
  res,
  query,
}) => {
  let game = query['game'];

  if (game instanceof Array) {
    game = game[0];
  }

  const docRef = firestoreDb.collection('games').doc(game);
  const doc = await docRef.get();

  if (!doc.exists) {
    res.writeHead(307, { Location: '/' });
  }

  return {
    props: {
      game: doc.data() as GameInterface,
    },
  };
};

export default GamePage;
