import React from "react";
import { FaStar } from "react-icons/fa";

const FeedbackCard = ({ feedback, name, image }) => (
  <div className="w-[300px] h-full bg-orange-800 text-orange-100 p-6 rounded-xl shadow-md mx-4 shrink-0 flex flex-col justify-between">
    <p className="mb-4 text-base font-medium">{feedback}</p>

    <div className="flex items-center justify-between mt-4">
      <div>
        <h5 className="text-sm font-semibold">{name}</h5>
        <div className="flex gap-1 mt-1 text-yellow-400">
          {[...Array(5)].map((_, i) => <FaStar key={i} />)}
        </div>
      </div>

      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border border-emerald-300"
      />
    </div>
  </div>
  
);


export default FeedbackCard;
