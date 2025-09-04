import useInViewAnimate from "../components/useInViewAnimate";
import bgImage from "../assets/background4.png";

const AnimatedCard = ({ children }) => {
  const [ref, isVisible] = useInViewAnimate();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

function Contact() {
  return (
    <section className="w-full flex items-center justify-center bg-center bg-cover px-4 py-24" style={{ backgroundImage: `url(${bgImage})` }}>
      <div>
        <AnimatedCard>
        <h1 className="text-yellow-200 text-5xl font-bold text-center mb-8">
          Contact Us
        </h1>
        </AnimatedCard>
        {/* Gradient Border Wrapper */}
        <AnimatedCard>
        <div className="relative rounded-2xl p-[6px] bg-gradient-to-tr from-red-700 via-yellow-200 to-red-700 shadow-lg">
          {/* Inner White Form with space from border */}
          <form className="bg-orange-100 rounded-2xl p-8 w-[90vw] max-w-lg shadow-xl">
            {/* Name */}
            <div className="mb-4 text-left">
              <label
                className="block text-yellow-800 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your Name"
              />
            </div>

            {/* Email */}
            <div className="mb-4 text-left">
              <label
                className="block text-yellow-800 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your Email"
              />
            </div>

            {/* Message */}
            <div className="mb-4 text-left">
              <label
                className="block text-yellow-800 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              className="bg-orange-400 hover:bg-orange-500 transition text-orange-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </AnimatedCard>
      </div>
    </section>
  );
}

export default Contact;
