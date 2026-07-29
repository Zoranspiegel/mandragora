import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <Button type="button" className="bg-white shadow-md text-black">
      <FcGoogle size={30} />
      Google
    </Button>
  );
}
