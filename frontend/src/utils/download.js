import { pdfURL } from "./url";
import axios from "axios";

export const handleDownload = async (email, name) => {
  try {
    const response = await axios.get(`${pdfURL}/${email}.pdf`, {
      responseType: "blob",
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, `${name}-biodata.pdf`);
    } else {
      console.error("Failed to download file, status:", response.status);
    }
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};
