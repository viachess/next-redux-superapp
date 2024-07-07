type PageProps = {
  params: {
    userId: string;
  };
};

export default function UserPage({ params }: PageProps) {
  return <div>Individual user page. id: {params.userId}</div>;
}
