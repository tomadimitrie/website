import { redirect } from "next/navigation";

export default async function CvPage() {
  return redirect(
    "https://github.com/tomadimitrie/website/releases/latest/download/CV_Dimitrie-Toma_Furdui.pdf",
  );
}
