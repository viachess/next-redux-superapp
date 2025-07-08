type PageProps = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function UserPage(props: PageProps) {
  const params = await props.params;
  return <div>Individual user page. id: {params.userId}</div>;
}
