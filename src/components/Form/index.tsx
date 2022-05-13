import { Box, SxProps } from "@mui/system";

const styles: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "0 20px",
  backgroundColor: "#fafafa",
  fontFamily: 'Roboto',
  textAlign: "center",
};

interface Props {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ children, onSubmit }: Props) {
  return (
    <Box sx={styles} component="form" onSubmit={onSubmit}>
      {children}
    </Box>
  );
}
