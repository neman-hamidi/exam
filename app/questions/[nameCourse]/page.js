// app/questions/[nameCourse]/page.jsx

export async function generateStaticParams() {
  return [
    { nameCourse: 'shimi' },
    { nameCourse: 'konkur' },
    { nameCourse: 'zist' },
  ];
}

import QuestionPageClient from './QuestionPageClient';

const Page = ({ params }) => {
  return (
    <div>
      <QuestionPageClient nameCourse={params.nameCourse} />
    </div>
  );
};

export default Page;
