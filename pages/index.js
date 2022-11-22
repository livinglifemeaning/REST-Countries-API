import { useEffect } from "react";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/countries");
  }, []);

  return <div>Loading...</div>;
};

export default index;
