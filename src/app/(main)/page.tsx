import HomeSolutionSection from './components/home-solution-section';
import MainSection from './components/main-section';

const Home = () => {
  return (
    <main className="flex w-full flex-col gap-60 items-center mb-60">
      <MainSection />
      <HomeSolutionSection />
    </main>
  );
};

export default Home;
