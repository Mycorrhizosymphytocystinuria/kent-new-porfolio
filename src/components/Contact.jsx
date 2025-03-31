import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img
      src={src}
      alt="decorative background"
    />
  </div>
);

const Contact = () => {
  return (
    <div
      id="contact"
      className="my-20 min-h-96 w-screen px-10"
    >
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase tracking-wider text-violet-300">
            Let's Connect
          </p>

          <AnimatedTitle
            title="Ready to <b>T</b>urn Your <br /> Ideas Into <br /> Re<b>a</b>lity?"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button
              title="Send Message"
              containerClass="bg-violet-500 hover:bg-violet-600"
            />
          </div>

          <div className="mt-10 flex flex-col items-center">
            <p className="text-sm text-violet-300">or reach out directly:</p>
            <a
              href="mailto:your.email@example.com"
              className="mt-2 text-lg font-semibold hover:text-violet-300 transition-colors"
            >
              kentashley011@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
