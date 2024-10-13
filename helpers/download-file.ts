/**
 * Helper method to download a file from a given URL.
 * 
 * @param url - The API endpoint or file URL to fetch the file from.
 * @param filename - The desired name for the downloaded file.
 */
export const downloadFile = async (url: string, filename: string) => {
  try {
    // Fetch the file from the given URL
    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Failed to fetch the file");
    }

    // Convert the response into a blob (binary large object)
    const blob = await response.blob();

    // Create a URL for the blob
    const downloadUrl = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up and remove the link element from the document
    document.body.removeChild(link);

    // Release the object URL to free memory
    window.URL.revokeObjectURL(downloadUrl);

  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
