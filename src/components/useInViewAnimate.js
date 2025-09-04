import { useState, useRef , useEffect } from "react";

const  useInViewAnimate = () => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(); // Stop observing once in view
                }
            },
            {threshold: 0.1} 
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, []);
    return [ref, isInView];
};

export default useInViewAnimate;