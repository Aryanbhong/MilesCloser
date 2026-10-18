
import { useRef, useState } from "react";
import { Image, Send, X, Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useChatStore } from "../../utils/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please select an image smaller than 5 MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.error) {
        toast.error("Unable to preview this image");
        return;
      }

      setImagePreview(reader.result);
    };

    reader.onerror = () => {
      toast.error("Unable to read this image");
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Couldn't send your message. Please try again.");
    }
  };

  const canSend = Boolean(text.trim() || imagePreview);

  return (
    <div className="w-full">

      {imagePreview && (
        <div className="mb-3 flex items-start gap-3 rounded-2xl border border-fuchsia-400/20 bg-[#1b102b]/95 p-3 shadow-[0_0_25px_rgba(217,70,239,0.08)] backdrop-blur-xl">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Selected image preview"
              className="h-20 w-20 rounded-xl border border-fuchsia-400/20 object-cover shadow-lg shadow-fuchsia-950/20"
            />

            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove attached image"
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-blue-500 text-white shadow-lg transition hover:scale-110 hover:shadow-fuchsia-500/30 active:scale-95"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="pt-1">
            <p className="text-sm font-semibold text-purple-100">
              Image attached
            </p>
            <p className="mt-1 text-xs text-purple-300/60">
              Ready to share your moment 💗
            </p>
          </div>
        </div>
      )}

    
      <form
        onSubmit={handleSendMessage}
        className="flex items-end gap-2 rounded-[1.5rem] border border-fuchsia-400/15 bg-[#160d22]/95 p-2 shadow-[0_8px_35px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-300 focus-within:border-fuchsia-400/40 focus-within:shadow-[0_0_30px_rgba(217,70,239,0.09)] sm:gap-3 sm:p-3"
      >
       
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach an image"
          title="Attach an image"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 sm:h-11 sm:w-11 ${
            imagePreview
              ? "border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.1)]"
              : "border-white/5 bg-white/[0.03] text-purple-300/70 hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
          }`}
        >
          <Image className="h-5 w-5" />
        </button>

        
        <div className="flex min-w-0 flex-1 items-center">
          <input
            type="text"
            className="w-full min-w-0 border-0 bg-transparent px-1 py-3 text-sm text-purple-50 outline-none placeholder:text-purple-300/40 focus:outline-none focus:ring-0 sm:px-2 sm:text-base"
            placeholder="Write a little something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Type a message"
            autoComplete="off"
          />
        </div>

     
        {!text && !imagePreview && (
          <div className="hidden items-center justify-center px-1 sm:flex">
            <Heart className="h-4 w-4 text-fuchsia-400/40" />
          </div>
        )}

      
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          title="Send message"
          className={`group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 sm:h-11 sm:w-11 ${
            canSend
              ? "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-blue-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.2)] hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(217,70,239,0.35)] active:translate-y-0 active:scale-95"
              : "cursor-not-allowed border border-white/5 bg-white/[0.03] text-purple-300/25"
          }`}
        >
          <Send
            className={`h-[18px] w-[18px] transition-transform duration-300 ${
              canSend ? "group-hover:translate-x-0.5" : ""
            }`}
          />
        </button>
      </form>

    
      <div className="mt-2 flex items-center justify-center gap-1.5">
        <Heart className="h-3 w-3 fill-fuchsia-400/70 text-fuchsia-400/70" />
        <p className="text-[10px] font-medium tracking-wide text-purple-300/45 sm:text-xs">
          Every message makes a memory
        </p>
      </div>
    </div>
  );
};

export default MessageInput;

