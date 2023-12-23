import Alert from '../components/Alert';

const AlertPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Component</h1>
      <Alert type="success" message="Success!" />
      <Alert type="warning" message="Warning!" />
      <Alert type="error" message="Error!" />
    </div>
  );
};

export default AlertPage;
