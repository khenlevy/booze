import { releaseToDroplet } from "@r-f-booze/dv-cd";

const config = {
  appName: "app-booze-api",
  appPort: 3001,
  dropletHost: "r-f-booze-droplet",
  dockerImageName: "app-booze-api",
  workingDirectory: "/opt/app-booze-api",
  environmentFile: ".env.production"
};

await releaseToDroplet(config);
