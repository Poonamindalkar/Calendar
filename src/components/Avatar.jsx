import * as React from "react";
import { Avatar } from "@fluentui/react-components";

export const Badge = () => (
  <>
    <Avatar name="John Doe" badge={{ status: "available" }} />
    <Avatar name="Jane Smith" badge={{ status: "busy" }} />
    <Avatar name="Maya Johnson" badge={{ status: "out-of-office" }} />
    <Avatar name="Julian Roche" badge={{ status: "away" }} />
   
    <Avatar
      name="John Doe"
      badge={{ status: "available", outOfOffice: true }}
    />
    <Avatar name="Allan Munger" badge={{ status: "busy", outOfOffice: true }} />
    <Avatar
      name="Jane Smith"
      badge={{ status: "out-of-office", outOfOffice: true }}
    />
    <Avatar
      name="Maya Johnson"
      badge={{ status: "away", outOfOffice: true }}
    />
    <Avatar
      name=  "Julian Roche"
      badge={{ status: "offline", outOfOffice: true }}
    />
  </>
);

export default Badge;