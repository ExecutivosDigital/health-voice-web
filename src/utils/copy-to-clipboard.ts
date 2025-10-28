export const copyToClipboard = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    // modern clipboard API
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  } else {
    // fallback for unsupported browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback: Copy failed", err);
    }

    document.body.removeChild(textarea);
  }
};
