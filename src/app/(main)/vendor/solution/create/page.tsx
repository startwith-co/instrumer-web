import SolutionCreateForm from './components/solution-create-form';

const SolutionCreatePage = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">솔루션 등록</h1>
      <SolutionCreateForm />
    </div>
  );
};

export default SolutionCreatePage;
