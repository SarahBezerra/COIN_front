export default function EditCategory({ display, data }) {
  const style = {
    box: {
      top: "55px",
      bottom: "15px",
      left: "15px",
      right: "15px",
      borderRadius: "0 0 20px 20px",
      position: "fixed",
      backgroundColor: "#f8f8f8",
      boxShadow: "5px 5px 20px 70px rgba(0,0,0,0.6)",
      overflowY: "scroll",
      zIndex: "2",
    },
    top: {
      backgroundColor: "#1D204B",
      height: "40px",
      borderRadius: "20px 20px 0 0 ",
      padding: "8px 0 0 10px",
      margin: "0 15px 0px 15px",
      position: "fixed",
      right: "0px",
      left: "0px",
      top: "15px",
      zIndex: "3",
    },
    return: {
      color: "#fff",
      fontSize: "25px",
    },
    payment: {
      margin: "10px 10px 0 10px",
      borderBottom: "1px dashed #1d204b76",
      position: "relative",
    },
    title: { margin: "0 95px 0 0", fontSize: "18px", color: "#1D204B" },
    description: { margin: "0", fontSize: "16px", color: "#858585" },
    price: {
      color: "#145f24",
      fontSize: "16px",
      margin: "5px 0",
    },
    date: {
      margin: "0px",
      position: "absolute",
      top: "2px",
      right: "0px",
      color: "#535353",
    },
  };

  console.log(data);

  return (
    <div style={{ display: display }}>
      <div style={style.top}>
        <ion-icon
          style={style.return}
          name="return-up-back-outline"
          onClick={() => {
            document.location.reload(true);
          }}
        ></ion-icon>
      </div>
    </div>
  );
}
