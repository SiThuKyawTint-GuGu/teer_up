import StudentTable from "@/page-containers/school/students/StudentTable";

interface Props {
  params: { id: string };
}

export default function StudentDetailsPage({ params: { id } }: Props) {
  return (
    <>
      <StudentTable id={id} />
    </>
  );
}
