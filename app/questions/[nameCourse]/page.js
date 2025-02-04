"use client";
import { useParams } from "next/navigation";
import Exampleques from "@/app/components/exampleques/exampleques";
const PostPage = () => {
  const paramss = useParams();
  // console.log(paramss);
  const { nameCourse } = paramss;

  return (
    <div>

      <Exampleques  namecourse={nameCourse}/>
    </div>
  );
};

export default PostPage;
