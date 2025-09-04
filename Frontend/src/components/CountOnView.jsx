import CountUp from "react-countup";
import useInViewAnimate from "../components/useInViewAnimate"; // Adjust path as needed

const CountOnView = () => {
  const [ref, isInView] = useInViewAnimate();

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 text-5xl font-bold text-orange-100 gap-4"
    >
      <div>
        {isInView && (
          <CountUp
            end={20000}
            duration={2}
            formattingFn={(val) => `${Math.round(val / 1000)}K`}
          />
        )}
      </div>
      <div>
        {isInView && <CountUp end={99} duration={2} suffix="%" />}
      </div>
      <div>
        {isInView && <CountUp end={100} duration={2} suffix="+" />}
      </div>
    </div>
  );
};

export default CountOnView;
