import { FC } from 'react';

const ErrorPage: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-red-50">
      <div className="text-center">
        <h1 className="text-4xl text-red-600 font-bold">Oops! Something went wrong...</h1>
        <p className="mt-4 text-xl text-red-500">
          We are having trouble processing your request. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
