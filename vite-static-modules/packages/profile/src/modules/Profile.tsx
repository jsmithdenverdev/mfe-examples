type ProfileProps = { name: string };

export default function Profile({ name }: ProfileProps) {
  return (
    <>
      <div
        style={{
          background: "blue",
          padding: "10px",
        }}
      >
        <h3>{name}</h3>
      </div>
    </>
  );
}
