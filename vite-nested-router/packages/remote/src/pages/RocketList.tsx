import { useLoaderData, LoaderFunction, Link } from "react-router-dom";
import { LoaderData, Rocket } from "../types";

type ListRocketResponse = {
  data: {
    rockets: Rocket[];
  };
};

export const loader = (async () => {
  const listResponse = await fetch(
    "https://spacex-production.up.railway.app/",
    {
      credentials: "omit",
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
      },
      body: '{"query":"query Rockets {\\n  rockets {\\n    id\\n    name\\n  }\\n}\\n","variables":{},"operationName":"Rockets"}',
      method: "POST",
      mode: "cors",
    }
  );

  return (await listResponse.json()) as ListRocketResponse;
}) satisfies LoaderFunction;

export default function RocketList() {
  const data = useLoaderData() as LoaderData<typeof loader>;
  return (
    <>
      <h1>Rocket List</h1>
      <ul>
        {data.data.rockets.map((item) => (
          <li key={item.id}>
            <Link to={item.id}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
