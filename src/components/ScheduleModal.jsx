import { useRef, useEffect } from "react";
import { FiX, FiCalendar } from "react-icons/fi";
import gsap from "gsap";

const ScheduleModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Set initial state
      gsap.set(modalRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { y: 50, opacity: 0 });

      // Animate in
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      style={{ opacity: 0 }} // Set initial opacity
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-xl rounded-2xl bg-gradient-to-br from-black to-violet-950 p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-xl border border-white/10 bg-black/90 p-6 backdrop-blur-xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-violet-300 hover:text-violet-400"
          >
            <FiX className="h-6 w-6" />
          </button>

          <h3 className="mb-6 text-2xl font-bold text-violet-400">
            Schedule a Call
          </h3>

          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-black px-2 text-sm text-violet-300">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-violet-300/20 bg-transparent px-4 py-3 text-blue-50 outline-none transition-all duration-300 focus:border-violet-300"
                />
              </div>
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-black px-2 text-sm text-violet-300">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full rounded-lg border border-violet-300/20 bg-transparent px-4 py-3 text-blue-50 outline-none transition-all duration-300 focus:border-violet-300"
                />
              </div>
            </div>

            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-black px-2 text-sm text-violet-300">
                Meeting Topic
              </label>
              <input
                type="text"
                placeholder="Brief description of what you'd like to discuss"
                className="w-full rounded-lg border border-violet-300/20 bg-transparent px-4 py-3 text-blue-50 outline-none transition-all duration-300 placeholder:text-blue-50/30 focus:border-violet-300"
              />
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-violet-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-violet-600"
            >
              <FiCalendar className="transition-transform duration-300 group-hover:scale-110" />
              Schedule Meeting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
