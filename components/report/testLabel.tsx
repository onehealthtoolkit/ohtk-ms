type TestLabelProps = {
  isTest: boolean;
};

const TestLabel: React.FC<TestLabelProps> = ({ isTest }) => {
  return isTest ? (
    <div className="bg-yellow-400 text-white text-center rounded px-2">
      Test
    </div>
  ) : null;
};

export default TestLabel;
