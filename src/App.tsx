import Error from './components/Error/Error';
import GameOverScreen from './components/GameOverScreen/GameOverScreen';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Main from './components/Main/Main';
import Progress from './components/Progress/Progress';
import Question from './components/Question/Question';
import StartScreen from './components/StartScreen/StartScreen';
import { useQuizContext } from './hooks/useQuizContext';
import { QuizStatus } from './CONSTANTS';

import './App.scss';

function App() {
  const { status } = useQuizContext();

  let content;
  switch (status) {
    case QuizStatus.loading:
      content = <Loader />;
      break;
    case QuizStatus.error:
      content = <Error />;
      break;
    case QuizStatus.ready:
      content = <StartScreen />;
      break;
    case QuizStatus.active:
      content = (
        <>
          <Progress />
          <Question />
        </>
      );
      break;
    case QuizStatus.done:
      content = <GameOverScreen />;
      break;
    default:
      content =
        'Something went wrong with loading the app, contact the developer.';
      break;
  }

  return (
    <div id="app">
      <Header />
      <Main>{content}</Main>
    </div>
  );
}

export default App;
