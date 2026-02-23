import { releaseToDroplet } from "@booze/dv-cd";

const config = {
  appName: "app-booze-api",
  appPort: 3001,
  dropletHost: "booze-droplet",
  dockerImageName: "app-booze-api",
  workingDirectory: "/opt/app-booze-api",
  environmentFile: ".env.production"
};

await releaseToDroplet(config);
