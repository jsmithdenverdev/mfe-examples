import { useLoaderData, LoaderFunction } from "react-router-dom";
import { LoaderData, Rocket } from "../types";

type RocketDetailResponse = {
  data: {
    rocket: Rocket;
  };
};

export const loader = (async ({ params }: { params: any }) => {
  const details = await fetch("https://spacex-production.up.railway.app/", {
    credentials: "omit",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "content-type": "application/json",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
    },
    body: `{\"query\":\"query Rocket($rocketId: ID!) {\\n  rocket(id: $rocketId) {\\n    active\\n    boosters\\n    company\\n    cost_per_launch\\n    country\\n    description\\n    diameter {\\n      feet\\n      meters\\n    }\\n    engines {\\n      engine_loss_max\\n      layout\\n      number\\n      propellant_1\\n      propellant_2\\n      thrust_sea_level {\\n        kN\\n        lbf\\n      }\\n      thrust_to_weight\\n      thrust_vacuum {\\n        kN\\n        lbf\\n      }\\n      type\\n      version\\n    }\\n    first_flight\\n    first_stage {\\n      burn_time_sec\\n      engines\\n      fuel_amount_tons\\n      reusable\\n    }\\n    height {\\n      feet\\n      meters\\n    }\\n    id\\n    landing_legs {\\n      material\\n      number\\n    }\\n    mass {\\n      kg\\n      lb\\n    }\\n    name\\n    payload_weights {\\n      id\\n      kg\\n      lb\\n      name\\n    }\\n    second_stage {\\n      burn_time_sec\\n      engines\\n      fuel_amount_tons\\n      \\n      thrust {\\n        kN\\n        lbf\\n      }\\n    }\\n    stages\\n    success_rate_pct\\n    type\\n    wikipedia\\n  }\\n}\",\"variables\":{\"rocketId\":\"${params["id"]}\"},\"operationName\":\"Rocket\"}`,
    method: "POST",
    mode: "cors",
  });

  return (await details.json()) as RocketDetailResponse;
}) satisfies LoaderFunction;

export default function RocketDetails({}) {
  const data = useLoaderData() as LoaderData<typeof loader>;

  return (
    <>
      <h1>Rocket Details</h1>
      <p>{data.data.rocket.name}</p>
      <p>{data.data.rocket.description}</p>
    </>
  );
}
