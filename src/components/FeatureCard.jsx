const FeatureCard = ({ title, description, imgSrc }) => {
  return (
    <div className="bg-orange-200 rounded-xl shadow-md hover:shadow-lg p-6 transition duration-300 animate-zoom  flex flex-col justify-between">
      <h3 className="text-3xl font-semibold text-yellow-800 mb-2">{title}</h3>
      <p className="text-orange-700 text-lg">{description}</p>
      {imgSrc && <img src={imgSrc} alt={title} className="w-40 h-40 mx-auto mt-4" />}
    </div>
  );
};

export default FeatureCard;
