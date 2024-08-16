interface ResultDetailProps {
  params: {
    id: string; // 동적 경로에서 받아올 id
  };
}

export default function ResultDetail ({params} : ResultDetailProps) {
  return(
    <>
      {params.id}
    </>
  )
}