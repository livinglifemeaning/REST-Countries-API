import { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/countries");
  }, []);

  return (
    <div style={{ width: "100%", display: "grid", placeContent: "center" }}>
      <img src="/earth.png" alt="" />
    </div>
  );
};

export default Index;
