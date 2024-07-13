import { Suspense } from 'react';
import PageContent from './pageContent';

export const generateMetadata = () => {
  return {
    title: 'Play - Hello World',
  };
};

const Page = () => {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
};

export default Page;
