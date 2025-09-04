import FeatureCard from "../components/FeatureCard";
import assets1 from "../assets/feature1.png";
import assets2 from "../assets/feature2.png";
import assets3 from "../assets/feature3.png";
import assets4 from "../assets/feature4.png";
import assets5 from "../assets/feature5.png";
import Tilt from 'react-parallax-tilt';
import useInViewAnimate from "../components/useInViewAnimate";
import starterImg from "../assets/starter.png";
import mainCourseImg from "../assets/maincourse.png"; 
import dessertImg from "../assets/dessert.png";
import snackImg from "../assets/snack.png";
import RiceBowlImg from "../assets/ricebowl.png";
import Carousel from '../components/Carousel';
import bgImage from "../assets/background4.png";

const foodImages = [starterImg, mainCourseImg, dessertImg, snackImg, RiceBowlImg];
const foodLabels = ["Starter", "Main Course", "Dessert", "Snack", "Beverage"];

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

function Features() {
  return (
    <>
      <section className="pt-24 pb-10 px-4 bg-center bg-cover text-center" style={{ backgroundImage: `url(${bgImage})` }}>
        <div>
          <AnimatedCard>
            <h2 className="text-5xl font-bold text-orange-200 mb-12">
              Why You'll Love Our RecipeRadar
            </h2>
          </AnimatedCard>

          <div className="container px-4 md:px-12 mx-auto">
            {/* Row 1 - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[assets1, assets2, assets3].map((img, index) => (
                <AnimatedCard key={index}>
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    scale={1.05}
                    transitionSpeed={1000}
                  >
                    <FeatureCard
                      title={["Smart Search", "Personalized Picks", "Instructions"][index]}
                      description={[
                        "Quickly find recipes by ingredients, cuisine, or dietary preferences.",
                        "Get recipe suggestions based on your likes and cooking habits.",
                        "Easy-to-follow directions with images or video walkthroughs.",
                      ][index]}
                      imgSrc={img}
                    />
                  </Tilt>
                </AnimatedCard>
              ))}
            </div>

            {/* Row 2 - 2 Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {[assets4, assets5].map((img, index) => (
                <AnimatedCard key={index}>
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    scale={1.05}
                    transitionSpeed={1000}
                  >
                    <FeatureCard
                      title={["Save Favorites", "Nutritional Info"][index]}
                      description={[
                        "Bookmark your favorite recipes and access them anytime.",
                        "View calories, macros, and dietary info for every recipe.",
                      ][index]}
                      imgSrc={img}
                    />
                  </Tilt>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
<section className="pt-16 text-center">
        <AnimatedCard>
<h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-orange-800 mb-12">
  Explore Our Delicious Categories
</h1>
        </AnimatedCard>

        {/* Carousel Section */}
        <div className="max-w-6xl mx-auto">
          <Carousel
            slides={foodImages.map((img, idx) => {
              return (
                <div className="relative pt-6 rounded-2xl text-center">
                  <img
                    src={img}
                    alt={foodLabels[idx]}
                    className="h-100 mx-auto object-contain"
                  />
                </div>
              );
            })}
          />
        </div>
        <AnimatedCard>
<div className="text-lg sm:text-2xl md:text-4xl bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent font-extrabold mt-8 pb-4 ">
  From sizzling snacks to dreamy desserts — explore every craving in one place!
</div>
        </AnimatedCard>
      </section>
      </section>

      {/* Category Section */}
      
    </>
  );
}

export default Features;
