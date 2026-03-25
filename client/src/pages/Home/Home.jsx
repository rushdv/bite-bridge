import Banner from "./Banner";
import FeaturedFoods from "./FeaturedFoods";
import HowItWorks from "./HowItWorks";
import MissionSection from "./MissionSection";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
        >
            <Banner />
            <FeaturedFoods />
            <HowItWorks />
            <MissionSection />
        </motion.div>
    );
};

export default Home;
