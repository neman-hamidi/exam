'use client';

import Exampleques from '@/app/components/exampleques/exampleques';

const QuestionPageClient = ({ nameCourse }) => {
  return (
    <div>
      <Exampleques namecourse={nameCourse} />
    </div>
  );
};

export default QuestionPageClient;
