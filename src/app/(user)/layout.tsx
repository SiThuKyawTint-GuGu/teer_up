import { Grid } from "@radix-ui/themes";
import { ReactNode } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Grid columns="1">
      <div className="max-w-[400px] mx-auto py-[50px]">{children}</div>
    </Grid>
  );
};

export default Layout;
